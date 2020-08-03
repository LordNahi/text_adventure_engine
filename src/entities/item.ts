import BaseEntity from "./baseEntity";

class Item {
  private name: string;
  private description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  public inspect = () => {
    const vowels = "aeiou";

    let startsWithVowel = false;
    if (vowels.split("").indexOf(this.name[0]) > -1) {
      startsWithVowel = true;
    }

    return startsWithVowel ? "It's an " + this.name : "It's a " + this.name;
  };

  public describe = () => {
    return this.description;
  };
}

export default Item;
