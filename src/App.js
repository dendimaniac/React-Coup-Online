import React, { Component } from "react";
import "./App.css";
import cards from "./static/cards";
import Card from "./components/Card/Card";

class Coup extends Component {
  state = {
    deck: this.createDeck(),
    players: [],
    isBot: false,
    toShowBlockChoice: false,
    toShowCardChoice: false
  };

  componentWillMount() {
    const drawnCards = this.drawCards(4);
    this.createPlayers(drawnCards);
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

  drawCards = noOfCards => {
    const deck = [...this.state.deck];
    const drawnCards = Array.from(Array(noOfCards), () => null).map(() => {
      const index = Math.floor(Math.random() * deck.length);
      const card = deck[index];
      deck.splice(index, 1);
      return card;
    });
    this.setState({ deck });
    return drawnCards;
  };

  createPlayers = drawnCards => {
    const players = Array.from(Array(2), () => null).map((player, i) => {
      return {
        coin: 2,
        hand: drawnCards.slice(i * 2, i * 2 + 2)
      };
    });
    this.setState({ players });
  };

  renderCard = playerIndex => {
    if (this.state.players.length === 0) {
      return null;
    }
    const players = [...this.state.players];
    const playerHand = players[playerIndex].hand;
    return playerHand.map(card => <Card {...card} />);
  };

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
      toShowBlockChoice: false,
      toShowCardChoice: false,
      players
    });
  };

  handleForeignAid = () => {
    this.setState({
      toShowBlockChoice: true,
      toShowCardChoice: false
    });
  };

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
      toShowBlockChoice: false,
      players
    });
  };

  handleCoup = () => {
    const players = [...this.state.players];
    const index = this.state.isBot ? 1 : 0;
    const activePlayer = players[index];
    if (activePlayer.coin < 7) {
      this.setState({
        toShowBlockChoice: false
      });
    } else if (activePlayer.coin >= 7) {
      this.setState({
        toShowCardChoice: true,
        toShowBlockChoice: false
      });
    }
  };

  toCoup = cardIndex => {
    const players = [...this.state.players];

    const activeIndex = this.state.isBot ? 1 : 0;
    const targetIndex = this.state.isBot ? 0 : 1;

    const activePlayer = players[activeIndex];
    const targetPlayer = players[targetIndex];

    if (activePlayer.coin < 7) {
      return;
    }
    activePlayer.coin -= 7;
    targetPlayer.hand[cardIndex].isShown = true;
    players.splice(activeIndex, 1, activePlayer);
    players.splice(targetIndex, 1, targetPlayer);
    this.setState({
      isBot: !this.state.isBot,
      toShowCardChoice: false,
      players
    });
  };

  toBlock = () => {
    this.setState({
      isBot: !this.state.isBot,
      toShowBlockChoice: false
    });
  };

  renderBlockButton = () => {
    if (
      this.state.toShowBlockChoice === false ||
      this.state.toShowCardChoice === true
    ) {
      return null;
    }
    return (
      <div className="block-button">
        <button className="button" onClick={this.toBlock}>
          Block
        </button>
        <button className="button" onClick={this.getForeignAid}>
          Pass
        </button>
      </div>
    );
  };

  renderCardChoiceButton = () => {
    if (
      this.state.toShowCardChoice === false ||
      this.state.toShowBlockChoice === true
    ) {
      return null;
    }
    return (
      <div className="card-choice-button">
        <button className="button" onClick={() => this.toCoup(0)}>
          Card 1
        </button>
        <button className="button" onClick={() => this.toCoup(1)}>
          Card 2
        </button>
      </div>
    );
  };

  currentTurn(isBotTurn) {
    return isBotTurn ? "text-bold" : "text-fade";
  }

  getCoins = playerIndex => {
    if (this.state.players.length === 0) {
      return null;
    }
    const players = [...this.state.players];
    return players[playerIndex].coin + " Coins";
  };

  render() {
    return (
      <div className="app">
        <div className="actions">
          <button className="button" onClick={this.handleCoup}>
            Coup
          </button>
          <button className="button" onClick={this.getIncome}>
            Income
          </button>
          <button className="button" onClick={this.handleForeignAid}>
            Foreign Aid
          </button>
        </div>

        <div className="board">
          <div className="board-item start">
            <div
              className={`name start right ${this.currentTurn(
                this.state.isBot
              )}`}
            >
              Bot
            </div>
            <div className="player-cards">{this.renderCard(1)}</div>
            <div className="start left">{this.getCoins(1)}</div>
          </div>

          <div className="action-choices">
            {this.renderBlockButton()}
            {this.renderCardChoiceButton()}
          </div>

          <div className="board-item end">
            <div
              className={`name end right ${this.currentTurn(
                !this.state.isBot
              )}`}
            >
              Player
            </div>
            <div className="player-cards">{this.renderCard(0)}</div>
            <div className="end left">{this.getCoins(0)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Coup;

/* var flattenObject = function(ob) {
  var toReturn = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;


  function load(configFile, callback) {
    if (!fs.existsSync(configFile))
    {
      throw new Error("Unable to find configuration file from " + configFile);
    }

    var data = fs.readFileSync(configFile);
    var conf = JSON.parse(data);
    _.extend(this.config, conf);

    callback(conf);
  }



Which code snippet has better rendering performance?

A:

.nav {
    left: -250px;
    transition: left 300ms linear;
}

.nav--open {
    left: 0px;
    transition: left 300ms linear;
}
B:

.nav {
    transform: translateX(-250px);
    transition: transform 300ms linear;
}

.nav--open {
    transform: none;
    transition: transform 300ms linear;
}
}; */
