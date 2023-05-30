import Player from "./entities/player";
import Narrator from "./entities/narrator";

import WorldManager from "./managers/worldManager";
import ItemManager from "./managers/itemManager";

// TODO: Break the narrator out into its own class ...
// TODO: Ideally, the user could specify a JSON file for the entire game,
//       allowing for ability to create own adventures, instead of being
//       either a 'number | Location', it should only consist of Location's
//       and we run a script that parses the users JSON and converts each
//       room into Location object, the load will simply fail is they don't
//       format their JSON correctly...

const itemManager = new ItemManager();
const worldManager = new WorldManager(itemManager);

worldManager.loadWorld("intranel");

const world = worldManager.getGrid();
const start = worldManager.getStart();

const startTile = world.find((tile) => {
  if (tile === null) return false;

  return tile.id === start;
});

if (!startTile) throw new Error("Failed to find start location");

const player = new Player(world, startTile.x, startTile.y);
const narrator = new Narrator(player);

function beginStory() {
  narrator.intro();
  narrator.promptUser();
}

// Start the adventure ...
beginStory();
