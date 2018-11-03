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
    };
    this.changeCoin = this.changeCoin.bind(this);
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
          <button>Exchange</button>
          <button value = {2} onClick ={this.changeCoin}>Steal</button>
        </div>

        <div className="Board">
          <div className="Bank">
            <img src={coin} alt="Coin"></img>
          </div>

          <div className="P1-cards">
            <img src={duke} onMouseOver alt="Duke" className="Cards"></img>
            <img src={assassin} alt="Assassin" className="Cards"></img>
          </div>

          <div className="P2-cards">
            <img src={captain} alt="Captain" className="Cards"></img>
            <img src={contessa} alt="Contessa" className="Cards"></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Coup;
