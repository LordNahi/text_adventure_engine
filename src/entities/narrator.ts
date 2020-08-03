import readline, { Interface as ReadlineInterface } from "readline";

import { getUniqueResponse } from "../data/uniqueResponses";
import { actions, BaseActions } from "../boilerplate/actions";
import Player from "./player";
import { format } from "path";

class Narrator {
  player: Player;
  prompt: ReadlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  inputLog: string[] = [];
  messageLog: string[] = [];
  movementLog: string[] = [];
  visitedLog: string[] = [];

  constructor(player: Player) {
    this.player = player;

    const firstRoom = this.player.visitedLocations[0];
    this.movementLog.push(firstRoom.id);
    this.visitedLog.push(firstRoom.id);
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
      String.raw`/_/    \_\_| |_| |_____|_| |_|\__|_|  \__,_|_| |_|\___|_|    |_|\__,_|_|\___| `,
    ];
    console.log(anIntranelTale.join("\n"));

    /**
     * TODO: This log message should fetch the message from a stored level file,
     * for now, just stuck with a hard coded string.
     */

    this.handleResponse(
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
      this.handleResponse("You do nothing.");
    } else {
      if (this.isAction(BaseActions.move, verb)) {
        this.handleResponse(this.player.move(noun));
        this.movementLog.push(this.player.currentLocation.id);

        this.handleResponse(
          this.player.currentLocation.onArrive(this.hasPlayerVisitedLocation())
        );
      } else if (this.isAction(BaseActions.interact, verb)) {
      } else if (this.isAction(BaseActions.attack, verb)) {
      } else if (this.isAction(BaseActions.look, verb)) {
        this.handleResponse(this.player.look());
      } else {
        /**
         * Finally check for unique input ...
         */
        const response = getUniqueResponse(verb);

        if (response) {
          this.handleResponse(response);
        } else {
          this.handleResponse(`I don't know how to "${verb}"`);
        }
      }
    }
  };

  logAnswer = (answer: string) => {
    this.inputLog.push(answer);
  };

  formatResponse = (response: string, lineLength: number = 15) => {
    this.messageLog.push(response);

    let formattedResponse = "";
    let lines = [];
    let words = response.split(" ");

    while (words.length > 0) {
      lines.push(words.splice(0, lineLength));
    }

    for (const line of lines) {
      formattedResponse += `    ${line.join(" ")}`;

      if (line.length === lineLength) {
        formattedResponse += "\n";
      }
    }

    return formattedResponse;
  };

  handleResponse = (response: string | string[]) => {
    if (!response) {
      return;
    }

    let compiledResponse = "";

    if (Array.isArray(response)) {
      /**
       * Here we take each formatted response passed and
       * compile it into one large formatted response ...
       */

      // Cleanse response of empty strings ...
      response.forEach((res: string, index: number, arr: Array<string>) => {
        if (!res) {
          arr.splice(index, 1);
        }
      });

      // Rebuild each line from the response ...
      response.forEach((res: string, index: number) => {
        compiledResponse += `${this.formatResponse(res)}`;

        if (response.length !== index + 1) {
          compiledResponse += "\n";
        }
      });
    } else {
      // Just add the one response ...
      compiledResponse += `${this.formatResponse(response)}`;
    }

    console.log(`\n${compiledResponse}\n`);
  };

  hasPlayerVisitedLocation = () => {
    /**
     * Pretty sure you over engineered this, could try
     * simply storing a boolean in the Location class that
     * checks whether or not the area had been visited ...
     */

    const visitedLogLength = this.visitedLog.length;
    const visitedLocationsLength = this.player.visitedLocations.length;
    const newestLocation = this.player.visitedLocations[
      visitedLocationsLength - 1
    ];

    if (visitedLocationsLength > visitedLogLength) {
      this.visitedLog.push(newestLocation.id);

      return false;
    }
    return true;
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
