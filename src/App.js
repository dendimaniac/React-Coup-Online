import React, { Component } from 'react';
import './App.css';
import cards from './static/cards';
import Card from './components/Card/Card';

class Coup extends Component {
  state = {
    deck: this.createDeck(),
    players: [],
    isBot: false,
    toShow: false,
  };

  componentWillMount() {
    const drawnCards = this.drawCards(4)
    this.createPlayers(drawnCards)
  }

  createDeck() {
    const deck = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        deck.push({ ...cards[i] });
      }
    }
    return deck;
  }

  drawCards = (noOfCards) => {
    const deck = [...this.state.deck];
    const drawnCards = Array.from(Array(noOfCards), () => null).map(() => {
      const index = Math.floor(Math.random() * deck.length)
      const card = deck[index]
      deck.splice(index, 1)
      return card
    })
    this.setState({ deck })
    return drawnCards
  }

  createPlayers = (drawnCards) => {
    const players = Array.from(Array(2), () => null).map((player, i) => {
      return {
        coin: 2,
        hand: drawnCards.slice(i * 2, i * 2 + 2)
      }
    })
    this.setState({ players })
  }

  renderCard = (playerIndex) => {
    if (this.state.players.length === 0) {
      return null;
    }
    const players = [...this.state.players];
    const playerHand = players[playerIndex].hand;
    return (
      playerHand.map(card => <Card {...card} />)
    );
  }

  getIncome = () => {
    const players = [...this.state.players];
    const index = this.state.isBot ? 1 : 0;
    const activePlayer = players[index];
    if (activePlayer.coin < 10) {
      activePlayer.coin += 1;
      players.splice(index, 1, activePlayer);
    }
    this.setState({
      isBot: !this.state.isBot,
      players,
    });
  }

  handleForeignAid = () => {
    this.setState({
      toShow: true,
    })
  }

  getForeignAid = () => {
    const players = [...this.state.players];
    const index = this.state.isBot ? 1 : 0;
    const activePlayer = players[index];
    if (activePlayer.coin < 10) {
      if (activePlayer.coin <= 8) activePlayer.coin += 2;
      else activePlayer.coin += 1;
      players.splice(index, 1, activePlayer);
    }
    this.setState({
      isBot: !this.state.isBot,
      toShow: false,
      players,
    });
  }

  toCoup = () => {
    const players = [...this.state.players];

    const activeIndex = this.state.isBot ? 1 : 0;
    const targetIndex = this.state.isBot ? 0 : 1;

    const activePlayer = players[activeIndex];
    const targetPlayer = players[targetIndex];

    if (activeIndex === 1) {
      this.coupPlayer(activeIndex, targetIndex, players, activePlayer, targetPlayer);
    } else {
      this.coupBot(activeIndex, targetIndex, players, activePlayer, targetPlayer);
    }
  }

  coupPlayer = (activeIndex, targetIndex, players, activePlayer, targetPlayer) => {
    let cardIndex = 0;
    if (activePlayer.coin < 7) {
      return;
    }
    activePlayer.coin -= 7;
    do {
      cardIndex = prompt("Which card to coup?");
    } while (targetPlayer.hand[cardIndex - 1].isShown === true);
    targetPlayer.hand[cardIndex - 1].isShown = true;
    players.splice(activeIndex, 1, activePlayer);
    players.splice(targetIndex, 1, targetPlayer);
    this.setState({
      isBot: !this.state.isBot,
      players,
    });
  }

  coupBot = (activeIndex, targetIndex, players, activePlayer, targetPlayer) => {
    let cardIndex = 0;
    if (activePlayer.coin < 7) {
      return;
    }
    activePlayer.coin -= 7;
    do {
      cardIndex = Math.floor(Math.random());
    } while (targetPlayer.hand[cardIndex].isShown === true);
    targetPlayer.hand[cardIndex].isShown = true;
    players.splice(activeIndex, 1, activePlayer);
    players.splice(targetIndex, 1, targetPlayer);
    this.setState({
      isBot: !this.state.isBot,
      players,
    });
  }

  toBlock = () => {
    this.setState({
      isBot: !this.state.isBot,
      toShow: false,
    });
  }

  renderBlockButton = () => {
    if (this.state.toShow === false) {
      return null;
    }
    return (
      <div>
        <button onClick={this.toBlock} className="block-fa">Block</button>
        <button onClick={this.getForeignAid} className="no-block-fa">Pass</button>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="Actions">
          <button onClick={this.toCoup}>Coup</button>
          <button onClick={this.getIncome}>Income</button>
          <button onClick={this.handleForeignAid}>Foreign Aid</button>
        </div>

        <div className="Board">
          <div className="P1-cards">
            {this.renderCard(0)}
            {this.renderBlockButton()}
          </div>

          <div className="P2-cards">
            {this.renderCard(1)}
          </div>
        </div>
      </div>
    );
  }
}

export default Coup;