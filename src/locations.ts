import Location from "./entities/location";
import items, * as Items from "./items";

const desk = new Location(
  "Desk",
  "I'm sitting at my messy desk, at a glance, there are approximately five empty AllPress coffee cups that need to be thrown out.",
  [items.coffeeCup],
  "",
  "",
  "Behind me is the ChainFinancial team area, currently mysteriously empty..."
);

const chainFinancialOffice = new Location(
  "ChainFinancial area",
  "I'm standing in the ChainFinancial space of our the office, interestingly there doesn't appear to be anybody around, last time I checked the office was full? Strange...",
  []
);

const locations = {
  desk,
  chainFinancialOffice,
};

export default locations;
