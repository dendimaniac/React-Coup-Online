import React, { Component } from 'react';
import './App.css';
import duke from './images/Duke.png';
import contessa from './images/Contessa.png';
import captain from './images/Captain.png';
import assassin from './images/Assassin.png';
import ambassador from './images/Ambassador.png';
import cardBack from './images/Back.png';
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
    let cardToDeck = {};
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        cardToDeck = {...cards[i]};
        deck.push(cardToDeck);
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
      hand[i] = {...deck[random]};
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

  showCard = (playerIndex) => {
    const player = [...this.state.player];
    const playerHand = player[playerIndex].hand;
    return (
      playerHand.map((card) => {
        if (card.isShown === true) {
          return (
            <div>
              <img className="Cards" src={card.image}></img>
              <div>{card.name}</div>
              <div>{card.description}</div>
            </div>
          );
        }
        else if (card.isShown === false) {
          return (
            <img className="Cards" src={cardBack}></img>
          );
        }
      })
    );
  }

  getIncome = () => {
    const player = [...this.state.player];
    const index = this.state.isBot ? 1 : 0;
    let activePlayer = player[index];
    if (activePlayer.coin < 10) {
      activePlayer.coin += 1;
      player.splice(index, 1, activePlayer);
    }
    this.setState({
      isBot: !this.state.isBot,
      player: player,
    });
  }

  getForeignAid = () => {
    const player = [...this.state.player];
    const index = this.state.isBot ? 1 : 0;
    const activePlayer = player[index];
    if (activePlayer.coin < 10) {
      if (activePlayer.coin <= 8) activePlayer.coin += 2;
      else activePlayer.coin += 1;
      player.splice(index, 1, activePlayer);
    }
    this.setState({
      isBot: !this.state.isBot,
      player: player,
    });
  }

  toCoup = () => {
    const player = [...this.state.player];

    const activeIndex = this.state.isBot ? 1 : 0;
    const targetIndex = this.state.isBot ? 0 : 1;

    const activePlayer = player[activeIndex];
    const targetPlayer = player[targetIndex];

    if (activeIndex === 1) {
      this.coupPlayer(activeIndex, targetIndex, player, activePlayer, targetPlayer);
    } else {
      this.coupBot(activeIndex, targetIndex, player, activePlayer, targetPlayer);
    }
    console.log(player);
  }

  coupPlayer = (activeIndex, targetIndex, player, activePlayer, targetPlayer) => {
    let cardIndex = 0;
    if (activePlayer.coin >= 7) {
      activePlayer.coin -= 7;
      do {
        cardIndex = prompt("Which card to coup?");
      } while (targetPlayer.hand[cardIndex - 1].isShown === true);
      targetPlayer.hand[cardIndex - 1].isShown = true;
      player.splice(activeIndex, 1, activePlayer);
      player.splice(targetIndex, 1, targetPlayer);
    }
    this.setState({
      isBot: !this.state.isBot,
      player: player,
    });
  }

  coupBot = (activeIndex, targetIndex, player, activePlayer, targetPlayer) => {
    let cardIndex = 0;
    if (activePlayer.coin >= 7) {
      activePlayer.coin -= 7;
      do {
        cardIndex = Math.floor(Math.random());
      } while (targetPlayer.hand[cardIndex].isShown === true);
      targetPlayer.hand[cardIndex].isShown = true;
      player.splice(activeIndex, 1, activePlayer);
      player.splice(targetIndex, 1, targetPlayer);
    }
    this.setState({
      isBot: !this.state.isBot,
      player: player,
    });
  }

  toBlock = () => {

  }

  render() {
    return (
      <div className="App">
        <div className="Actions">
          <button onClick={this.toCoup}>Coup</button>
          <button onClick={this.getIncome}>Income</button>
          <button onClick={this.getForeignAid}>Foreign Aid</button>
        </div>

        <div className="Board">
          <div className="Bank">
            <img src={coin} alt="Coin"></img>
          </div>

          <div className="P1-cards">
            {this.showCard(0)}
          </div>

          <div className="P2-cards">
            {this.showCard(1)}
          </div>
        </div>
      </div>
    );
  }
}

export default Coup;