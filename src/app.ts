import readline from "readline";

import Location from "./entities/location";
import { actions, BaseActions } from "./boilerplate/actions";
import { Directions } from "./boilerplate/directions";
import { BaseSpace, Point } from "./types";

// TODO: Break the narrator out into its own class ...
// TODO: Ideally, the user could specify a JSON file for the entire game,
//       allowing for ability to create own adventures, instead of being
//       either a 'number | Location', it should only consist of Location's
//       and we run a script that parses the users JSON and converts each
//       room into Location object, the load will simply fail is they don't
//       format their JSON correctly...

const narrator = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const inputLog = [];
const messageLog = [];

const position: Point = { x: 0, y: 0 };

// Locations ...
const desk = new Location(
  "Desk",
  "I'm sitting at my messy desk, at a glance, there are approximately five empty AllPress coffee cups that need to be thrown out."
);

const world: (Location | number)[][] = [[desk]];

function promptUser() {
  narrator.question("What do you do?: ", answer => {
    logAnswer(answer);
    handleAnswer(answer);

    promptUser();
  });
}

function handleAnswer(answer: string) {
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
    logResponse("You do nothing.");
  } else {
    if (isAction(BaseActions.move, verb)) {
      move(noun);
    } else if (isAction(BaseActions.interact, verb)) {
    } else if (isAction(BaseActions.attack, verb)) {
    } else if (isAction(BaseActions.look, verb)) {
      look();
    } else {
      logResponse("I don't know how to " + verb);
    }
  }
}

function look() {
  const currentLocation = world[position.y][position.x];

  if (typeof currentLocation === "number") {
    switch (currentLocation) {
      case BaseSpace.EmptySpace:
        logResponse("There's nothing of interest here.");
        break;
    }
  } else {
    logResponse(currentLocation.description);
  }
}

function move(direction: string) {
  if (direction === "") {
    logResponse("Where?");
    return;
  }

  switch (direction) {
    case Directions.North:
      if (canMove(position, 0, -1)) {
        logResponse("Headed North...");
        position.y += -1;
      }
      break;
    case Directions.East:
      if (canMove(position, 1, 0)) {
        logResponse("Headed East...");
        position.x += 1;
      }
      break;
    case Directions.South:
      if (canMove(position, 0, 1)) {
        logResponse("Headed South...");
        position.y += 1;
      }
      break;
    case Directions.West:
      if (canMove(position, -1, 0)) {
        logResponse("Headed West...");
        position.x += -1;
      }
      break;
    default:
      logResponse(direction + " is not a direction.");
      break;
  }
}

function canMove(currentPosition: Point, x: number, y: number) {
  const xx = currentPosition.x + x;
  const yy = currentPosition.y + y;
  const potentialLocation = world[yy] && world[yy][xx];

  let canMove = false;

  if (potentialLocation) {
    if (typeof potentialLocation === "number") {
      switch (potentialLocation) {
        case BaseSpace.EmptySpace:
          canMove = true;
          break;
        case BaseSpace.wall:
          logResponse("A wall blocks your way...");
          break;
      }
    } else {
      canMove = true;
    }
  }

  !canMove && logResponse("You are unable to move.");

  return canMove;
}

function isAction(actionType: string, action: string) {
  return actions[actionType].indexOf(action) >= 0;
}

function intro() {
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
  logFormat(
    "You're sitting at your desk bored, you haven't been for lunch and you decide you're hungry for a ham Schiacciata. It's a cold winters day, light rain pitter patters on the roof."
  );
}

function logAnswer(answer: string) {
  inputLog.push(answer);
}

function logResponse(response: string) {
  messageLog.push(response);

  logFormat(response);
}

function logFormat(string: string, lineLength: number = 15) {
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
}

function beginStory() {
  intro();
  promptUser();
}

// Start the adventure ...
beginStory();
