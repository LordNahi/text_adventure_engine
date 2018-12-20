export const inputLog = [];
export const messageLog = [];

const readline = require("readline");
const narrator = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const world = [
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1]
];
const directions = ["north", "east", "south", "west"];
const actions = {
	move: ["walk", "run", "move", "head"],
	interact: ["use", "touch", "press"],
	attack: ["hit", "smack", "slap"]
};

function promptUser() {
	narrator.question("What do you do?: ", answer => {
		logAnswer(answer);
		handleAnswer(answer);

		promptUser();
	});
}

function handleAnswer(answer) {
	switch (answer) {
		case "exit":
			return narrator.close();
		default:
			logResponse("I didn't understand that?");
	}
}

function logAnswer(answer) {
	inputLog.push(answer);
}

function logResponse(response) {
	messageLog.push(response);

	console.log("\n", response, "\n");
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

function beginStory() {
	intro();
	promptUser();
}

// Start the adventure ...
beginStory();

class IntranelAdventure {}
