import Item from "./item";
import BaseEntity from "./baseEntity";

class Location extends BaseEntity {
  public readonly locationName: string;
  public readonly description: string;
  public readonly onDepartMessage: string;
  public readonly onArriveMessage: string;
  public readonly items: Item[];

  constructor(
    locationName?: string,
    description?: string,
    initialItems?: Item[],
    onDepartMessage?: string,
    onArriveMessage?: string
  ) {
    super();

    this.locationName = locationName || "Nowhere.";
    this.description = description || "There's nothing here to see";
    this.items = initialItems || [];
    this.onDepartMessage = onDepartMessage || "";
    this.onArriveMessage = onArriveMessage || "";
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
