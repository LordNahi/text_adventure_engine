import Locations from "./locations";
import Location from "./entities/location";
import Player from "./entities/player";
import Narrator from "./entities/narrator";

// TODO: Break the narrator out into its own class ...
// TODO: Ideally, the user could specify a JSON file for the entire game,
//       allowing for ability to create own adventures, instead of being
//       either a 'number | Location', it should only consist of Location's
//       and we run a script that parses the users JSON and converts each
//       room into Location object, the load will simply fail is they don't
//       format their JSON correctly...

const world: Location[][] = [
  [Locations.desk],
  [Locations.chainFinancialOffice]
];
const player = new Player(world, 0, 0);
const narrator = new Narrator(player);

function beginStory() {
  narrator.intro();
  narrator.promptUser();
}

// Start the adventure ...
beginStory();
