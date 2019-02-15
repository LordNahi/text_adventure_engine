import Item from "./item";

class Location {
	public readonly locationName: string;
	public readonly description: string;
	public readonly items: Item[];

	constructor(
		locationName?: string,
		description?: string,
		initialItems?: Item[]
	) {
		this.locationName = locationName || "Nowhere.";
		this.description = description || "There's nothing here to see";
		this.items = initialItems || [];
	}
}

export default Location;
