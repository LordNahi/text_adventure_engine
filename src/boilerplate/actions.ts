export const enum BaseActions {
  move = "move",
  interact = "interact",
  attack = "attack",
  look = "look",
  collect = "collect",
}

export const actions: { [key: string]: string[] } = {
  move: ["walk", "run", "move", "head"],
  interact: ["use", "touch", "press"],
  attack: ["hit", "smack", "slap", "strike"],
  look: ["look", "glance"],
  collect: ["collect", "take", "pickup", "grab", "acquire"],
};
