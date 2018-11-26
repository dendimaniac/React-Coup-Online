import React, { Component } from 'react';
import './App.css';
import duke from './images/Duke.png';
import contessa from './images/Contessa.png';
import captain from './images/Captain.png';
import assassin from './images/Assassin.png';
import ambassador from './images/Ambassador.png';
import coin from './images/Coin.png';

const cards = [
  {
    image: duke,
    name: 'Duke',
    description: 'TAX: Takes 3 coins from Treasury + Blocks Foreign Aid',
    isShown: false,
  },
  {
    image: contessa,
    name: 'Contessa',
    description: 'Blocks assassination',
    isShown: false,
  },
  {
    image: captain,
    name: 'Captain',
    description: 'STEAL: Steal 2 coins from another player + Blocks stealing',
    isShown: false,
  },
  {
    image: assassin,
    name: 'Assassin',
    description: 'ASSASSINATE: Pay 3 coins to assassinate another player',
    isShown: false,
  },
  {
    image: ambassador,
    name: 'Ambassador',
    description: 'EXCHANGE: Exchange cards with Court Deck + Blocks stealing',
    isShown: false,
  },
]

class Coup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: 0,
      player: 0,
      isBot: false,
    };

    this.createDeck = this.createDeck.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.getIncome = this.getIncome.bind(this);
    this.coupPlayer = this.coupPlayer.bind(this);

    this.state.deck = this.createDeck();
  }

  /*
  shouldComponentUpdate = (nextProps, nextState) => {
    if ((this.state.myCoin !== nextState.myCoin) || (this.state.currentCard !== nextState.currentCard)) {
      return false;
    }
    else {
      return true;
    }
  }
  */

  componentWillMount() {
    let player = [this.createPlayer(), this.createPlayer()];
    this.setState({
      player: player,
    });
  }

  createDeck = () => {
    let deck = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        deck.push(cards[i]);
      }
    }
    return deck;
  }

  createPlayer = () => {
    let random = 0;
    let hand = [{}, {}];
    let deck = [...this.state.deck];
    for (let i = 0; i < 2; i++) {
      random = Math.floor(Math.random() * deck.length);
      hand[i] = deck[random];
      deck.splice(random, 1);
    }
    this.setState({
      deck: deck,
    })
    return {
      coin: 2,
      hand: hand,
    };
  }

  getIncome = () => {
    const player = [...this.state.player];
    const index = this.state.isBot ? 1 : 0;
    let activePlayer = player[index];
    if (activePlayer.coin < 10) {
      activePlayer.coin += 1;
    }
    player.splice(index, 1, activePlayer);
    this.setState({
      isBot: !this.state.isBot,
      player: player,
    });
  }

  toCoup = () => {
    const player = [...this.state.player];
    const index = this.state.isBot ? 0 : 1;
    let targetPlayer = player[index];
    console.log(player);
    if (index === 0) {
      this.coupPlayer(index, player, targetPlayer);
    }
    else {
      this.coupBot(index, player, targetPlayer);
    }
  }

  coupPlayer = (index, player, targetPlayer) => {
    let cardIndex = 0;
    if (targetPlayer.coin >= 7) {
      targetPlayer.coin -= 7;
      do {
        cardIndex = Math.floor(Math.random());
      } while(targetPlayer.hand[cardIndex].isShown === true);
      targetPlayer.hand[cardIndex].isShown = true;
      player.splice(index, 1, targetPlayer);
      this.setState({
        isBot: !this.state.isBot,
        player: player,
      });
    }
  }

  coupBot = (index, player, targetPlayer) => {
    let cardIndex = 0;
    if (targetPlayer.coin >= 7) {
      targetPlayer.coin -= 7;
      do {
        cardIndex = prompt("Which card to coup?");
      } while (targetPlayer.hand[cardIndex - 1].isShown === true);
      targetPlayer.hand[cardIndex - 1].isShown = true;
      player.splice(index, 1, targetPlayer);
      this.setState({
        isBot: !this.state.isBot,
        player: player,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Actions">
          <button onClick={this.toCoup}>Coup</button>
          <button onClick={this.getIncome}>Income</button>
        </div>

        <div className="Board">
          <div className="Bank">
            <img src={coin} alt="Coin"></img>
          </div>

          <div className="P1-cards">
          </div>

          <div className="P2-cards">
          </div>
        </div>
      </div>
    );
  }
}

export default Coup;
