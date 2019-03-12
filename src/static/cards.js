import duke from "./images/Duke.png";
import contessa from "./images/Contessa.png";
import captain from "./images/Captain.png";
import assassin from "./images/Assassin.png";
import ambassador from "./images/Ambassador.png";

export default [
  {
    image: duke,
    name: "Duke",
    description: "TAX: Takes 3 coins from Treasury + Blocks Foreign Aid",
    isShown: false
  },
  {
    image: contessa,
    name: "Contessa",
    description: "Blocks assassination",
    isShown: false
  },
  {
    image: captain,
    name: "Captain",
    description: "STEAL: Steal 2 coins from another player + Blocks stealing",
    isShown: false
  },
  {
    image: assassin,
    name: "Assassin",
    description: "ASSASSINATE: Pay 3 coins to assassinate another player",
    isShown: false
  },
  {
    image: ambassador,
    name: "Ambassador",
    description: "EXCHANGE: Exchange cards with Court Deck + Blocks stealing",
    isShown: false
  }
];
