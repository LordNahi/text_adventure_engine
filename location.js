class Location {
    description = "There's nothing here to see";
    items = [];
    map;

    constructor(map, initialItems) {
        this.map = map;
        this.item = initialItems;
    }
}
