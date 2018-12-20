class Item {
	name;
	description;

	constructor(name, description) {
		this.name = name;
		this.description = description;
	}

	inspect() {
		const vowels = "aeiou";

		let startsWithVowel = false;
		if (vowels.split("").indexOf(this.name[0]) > -1) {
			startsWithVowel = true;
		}

		console.log(
			startsWithVowel ? "It's an " + this.name : "It's a " + this.name
		);
	}

	describe() {
		console.log(this.description);
	}
}

export default Item;
