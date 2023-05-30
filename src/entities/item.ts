import { Parser } from "../types";

class Item {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  public readonly descriptionUntouched?: string;

  private moved: boolean = false;

  constructor(item: Parser.Item) {
    const { id, name, description, descriptionUntouched } = item;

    this.id = id;
    this.name = name;
    this.description = description;
    this.descriptionUntouched = descriptionUntouched;
  }

  set hasMoved(value: boolean) {
    this.moved = value;
  }

  get hasMoved(): boolean {
    return this.moved;
  }

  public inspect = () => {
    const vowels = "aeiou";

    let startsWithVowel = false;
    if (vowels.split("").indexOf(this.name[0]) > -1) {
      startsWithVowel = true;
    }

    return startsWithVowel ? "It's an " + this.name : "It's a " + this.name;
  };
}

export default Item;
