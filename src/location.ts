import Item from "./item";

class Location {
	description = "There's nothing here to see";
	items: Item[] = [];
	map: number[][];

	constructor(map: number[][], initialItems: Item[]) {
		this.map = map;
		this.items = initialItems;
	}
}

export default Location;
