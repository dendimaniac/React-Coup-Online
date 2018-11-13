import React, { Component } from 'react';
import './App.css';
import duke from './images/Duke.png';
import contessa from './images/Contessa.png';
import captain from './images/Captain.png';
import assassin from './images/Assassin.png';
import ambassador from './images/Ambassador.png';
import coin from './images/Coin.png';

class Coup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCoin: 0,
      currentCard: 0,
      isChallenging: false,
      challengeResult: false,
      isBlocking: false,
      blockResult: false,
      cards: [
        {
          image: duke,
          name: 'Duke',
          description: 'TAX: Takes 3 coins from Treasury + Blocks Foreign Aid',
        },
        {
          image: contessa,
          name: 'Contessa',
          description: 'Blocks assassination',
        },
        {
          image: captain,
          name: 'Captain',
          description: 'STEAL: Steal 2 coins from another player + Blocks stealing',
        },
        {
          image: assassin,
          name: 'Assassin',
          description: 'ASSASSINATE: Pay 3 coins to assassinate another player',
        },
        {
          image: ambassador,
          name: 'Ambassador',
          description: 'EXCHANGE: Exchange cards with Court Deck + Blocks stealing',
        },
      ]
    };
    this.changeCoin = this.changeCoin.bind(this);
    this.randomCard = this.randomCard.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state.myCoin !== nextState.myCoin)/*  || (this.state.currentCard !== nextState.currentCard) */) {
      return false;
    }
    else {
      return true;
    }
  }

  randomCard = () => {
    let random = Math.floor(Math.random() * this.state.cards.length);
    return (
      <div className="Cards">
        <img src={this.state.cards[random].image} alt="Card"></img>
        <div className="Description">
          {this.state.cards[random].description}
        </div>
      </div>
    );
  }

  changeCoin = (event) => {
    this.setState({myCoin: this.state.myCoin + Number(event.target.value)});
  }

  render() {
    return (
      <div className="App">
        <div className="Actions">
          <button>Challenge</button>
          <button>Block</button>
          <button value = {1} onClick = {this.changeCoin}>Income</button>
          <button value = {2} onClick ={this.changeCoin}>Foreign Aid</button>
          <button value = {-7} onClick ={this.changeCoin}>Coup</button>
          <button value = {3} onClick ={this.changeCoin}>Tax</button>
          <button value = {-3} onClick ={this.changeCoin}>Assassinate</button>
          <button onClick = {this.randomCard}>Exchange</button>
          <button value = {2} onClick ={this.changeCoin}>Steal</button>
        </div>

        <div className="Board">
          <div className="Bank">
            <img src={coin} alt="Coin"></img>
          </div>

          <div className="P1-cards">
            {this.randomCard()}
            {this.randomCard()}
          </div>

          <div className="P2-cards">
            {this.randomCard()}
            {this.randomCard()}
          </div>
        </div>
      </div>
    );
  }
}

export default Coup;
