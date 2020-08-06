import Item from "./item";
import BaseEntity from "./baseEntity";

class Location extends BaseEntity {
  /**
   * Currently looks like I'm overload the constructor but in the
   * future I plan to have this data loaded into a JSON file and have
   * a script build up each of these classes, each param will likely
   * be replaced with a single payload object ...
   */

  public readonly locationName: string;
  public readonly description: string;
  public readonly northDescription: string;
  public readonly eastDescription: string;
  public readonly southDescription: string;
  public readonly westDescription: string;
  public readonly items: Item[];

  constructor(
    locationName: string,
    description: string,
    initialItems?: Item[],
    northDescription?: string,
    eastDescription?: string,
    southDescription?: string,
    westDescription?: string
  ) {
    super();

    this.locationName = locationName;
    this.description = description;
    this.northDescription = northDescription || "";
    this.eastDescription = eastDescription || "";
    this.southDescription = southDescription || "";
    this.westDescription = westDescription || "";
    this.items = initialItems || [];
  }

  public describe = () => {
    const itemDescriptions = this.items.map((item: Item) => {
      return !item.hasMoved && item.initialPlacementDescription
        ? item.initialPlacementDescription
        : `A ${item.name} is here.`;
    });

    return [
      this.description,
      this.northDescription,
      this.eastDescription,
      this.southDescription,
      this.westDescription,
      ...itemDescriptions,
    ];
  };

  public onArrive = (hasVisited?: boolean) => {
    if (!hasVisited) {
      return this.describe();
    } else {
      return "";
    }
  };

  public addItem = (item: Item) => {
    this.items.push(item);
  };
}

export default Location;
