const actions = require("./actions");
const directions = require("./directions");

const readline = require("readline");

const narrator = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const inputLog = [];
const messageLog = [];

const xx = 0;
const yy = 0;
const world = [
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1]
];

function promptUser() {
    narrator.question("What do you do?: ", answer => {
        logAnswer(answer);
        handleAnswer(answer);

        promptUser();
    });
}

function handleAnswer(answer) {
    const words = answer.split(" ");

    let action = "";
    let parameter = "";

    // Split up words ...
    switch (words.length) {
        case 1:
            action = words[0];
            break;
        case 2:
            action = words[0];
            object = words[1];
            break;
    }

    // Handle action ...
    if (action === "") {
        logResponse("You do nothing.");
    } else {
        if (isAction("move", action)) {
            move(parameter);
        } else if (isAction("interact", action)) {
        } else if (isAction("attack", action)) {
        } else {
            logResponse("I don't know how to " + action);
        }
    }
}

function move(direction) {
    switch (direction) {
        case "north":
            break;
        case "east":
            break;
        case "south":
            break;
        case "west":
            break;
        default:
            logResponse(direction + " is not a direction.");
            break;
    }
}

function isAction(actionType, action) {
    return actions[actionType].indexOf(action) >= 0;
}

function intro() {
    console.log(
        "                  _____       _                        _   _______    _       "
    );
    console.log(
        "    /\\           |_   _|     | |                      | | |__   __|  | |      "
    );
    console.log(
        "   /  \\   _ __     | |  _ __ | |_ _ __ __ _ _ __   ___| |    | | __ _| | ___  "
    );
    console.log(
        "  / /\\ \\ | '_ \\    | | | '_ \\| __| '__/ _` | '_ \\ / _ \\ |    | |/ _` | |/ _ \\"
    );
    console.log(
        " / ____ \\| | | |  _| |_| | | | |_| | | (_| | | | |  __/ |    | | (_| | |  __/"
    );
    console.log(
        "/_/    \\_\\_| |_| |_____|_| |_|\\__|_|  \\__,_|_| |_|\\___|_|    |_|\\__,_|_|\\___|"
    );
    console.log("\n");
    console.log(
        "You're sitting at your desk bored, you haven't been for lunch yet and you\ndecide you're hungry for a ham Schiacciata. It's a cold winters day, light\nrain pitter patters on the roof.",
        "\n"
    );
}

function logAnswer(answer) {
    inputLog.push(answer);
}

function logResponse(response) {
    messageLog.push(response);

    console.log("\n", response, "\n");
}

function beginStory() {
    intro();
    promptUser();
}

// Start the adventure ...
beginStory();

class IntranelAdventure {}
