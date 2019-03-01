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
  public readonly onDepartMessage: string;
  public readonly onArriveMessage: string;
  public readonly items: Item[];

  constructor(
    locationName?: string,
    description?: string,
    northDescription?: string,
    eastDescription?: string,
    southDescription?: string,
    westDescription?: string,
    onDepartMessage?: string,
    onArriveMessage?: string,
    initialItems?: Item[]
  ) {
    super();

    this.locationName = locationName || "Nowhere.";
    this.description = description || "There's nothing here to see";
    this.northDescription = northDescription || "";
    this.eastDescription = eastDescription || "";
    this.southDescription = southDescription || "";
    this.westDescription = westDescription || "";
    this.onDepartMessage = onDepartMessage || "";
    this.onArriveMessage = onArriveMessage || "";
    this.items = initialItems || [];
  }

  public describe = () => {
    return this.description;
  };

  public onDepart = () => {
    return this.onDepartMessage;
  };

  public onArrive = () => {
    return this.onArriveMessage;
  };

  public addItem = (item: Item) => {
    this.items.push(item);
  };
}

export default Location;
