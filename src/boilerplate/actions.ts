export const enum BaseActions {
  move = "move",
  interact = "interact",
  attack = "attack",
  look = "look"
}

export const actions: { [key: string]: string[] } = {
  move: ["walk", "run", "move", "head"],
  interact: ["use", "touch", "press"],
  attack: ["hit", "smack", "slap"],
  look: ["look", "glance"]
};
