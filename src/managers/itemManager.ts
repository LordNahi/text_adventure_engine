import Item from "../entities/item";
import { Parser } from "../types";

class ItemManager {
  private items = new Map<number, Parser.Item>();

  public addItem(item: Parser.Item) {
    if (this.items.has(item.id))
      throw new Error(`Item "${item.id}" already exists`);

    this.items.set(item.id, item);
  }

  public makeItem(id: number) {
    if (!this.items.has(id)) throw new Error(`Item "${id}" does not exist`);

    const itemData = this.items.get(id) as Parser.Item;

    return new Item(itemData);
  }
}

export default ItemManager;
