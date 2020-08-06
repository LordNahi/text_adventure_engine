class Item {
  public readonly name: string;
  public readonly description: string;
  public readonly initialPlacementDescription?: string;

  private moved: boolean = false;

  constructor(
    name: string,
    description: string,
    initialPlacementDescription?: string
  ) {
    this.name = name;
    this.description = description;
    this.initialPlacementDescription = initialPlacementDescription;
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
