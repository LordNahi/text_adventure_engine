import readline, { Interface as ReadlineInterface } from "readline";

import { getUniqueResponse } from "../data/uniqueResponses";
import { actions, BaseActions } from "../boilerplate/actions";
import Player from "./player";

class Narrator {
  player: Player;
  prompt: ReadlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  inputLog: string[] = [];
  messageLog: string[] = [];

  constructor(player: Player) {
    this.player = player;
  }

  intro = () => {
    /**
     * TODO: Make a function that generates this ascii art ...
     */

    const anIntranelTale = [
      String.raw`                  _____       _                        _   _______    _       `,
      String.raw`    /\           |_   _|     | |                      | | |__   __|  | |      `,
      String.raw`   /  \   _ __     | |  _ __ | |_ _ __ __ _ _ __   ___| |    | | __ _| | ___  `,
      String.raw`  / /\ \ | '_ \    | | | '_ \| __| '__/ _' | '_ \ / _ \ |    | |/ _' | |/ _ \ `,
      String.raw` / ____ \| | | |  _| |_| | | | |_| | | (_| | | | |  __/ |    | | (_| | |  __/ `,
      String.raw`/_/    \_\_| |_| |_____|_| |_|\__|_|  \__,_|_| |_|\___|_|    |_|\__,_|_|\___| `
    ];
    console.log(anIntranelTale.join("\n"));
    console.log("\n");

    this.logResponse(
      "You're sitting at your desk bored, you haven't been for lunch and you decide you're hungry for a ham Schiacciata. It's a cold winters day, you hear light rain pitter patter windows behind you."
    );
  };

  handleAnswer = (answer: string) => {
    const words = answer.split(" ");

    let verb = "";
    let noun = "";

    // Split up words ...
    switch (words.length) {
      case 1:
        verb = words[0];
        break;
      case 2:
        verb = words[0];
        noun = words[1];
        break;
    }

    // Handle action ...
    if (verb === "") {
      this.logResponse("You do nothing.");
    } else {
      if (this.isAction(BaseActions.move, verb)) {
        this.logResponse(this.player.move(noun));
      } else if (this.isAction(BaseActions.interact, verb)) {
      } else if (this.isAction(BaseActions.attack, verb)) {
      } else if (this.isAction(BaseActions.look, verb)) {
        this.logResponse(this.player.look());
      } else {
        /**
         * Finally check for an unique inputs ...
         */
        const response = getUniqueResponse(verb);

        if (response) {
          this.logResponse(response);
        } else {
          this.logResponse("I don't know how to " + verb);
        }
      }
    }
  };

  logFormat = (string: string, lineLength: number = 15) => {
    const words = string.split(" ");
    const lines = [];

    while (words.length > 0) {
      lines.push(words.splice(0, lineLength));
    }

    console.log("\n");
    for (const line of lines) {
      console.log("    ", line.join(" "));
    }
    console.log("\n");
  };

  logResponse = (response: string) => {
    this.messageLog.push(response);

    this.logFormat(response);
  };

  logAnswer = (answer: string) => {
    this.inputLog.push(answer);
  };

  promptUser = () => {
    this.prompt.question("What do you do?: ", (answer: string) => {
      this.logAnswer(answer);
      this.handleAnswer(answer);

      this.promptUser();
    });
  };

  isAction = (actionType: string, action: string) => {
    return actions[actionType].indexOf(action) >= 0;
  };
}

export default Narrator;
