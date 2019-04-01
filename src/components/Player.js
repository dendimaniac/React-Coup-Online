import React, { Component } from "react";
import PropTypes from "prop-types";

class Player extends Component {
  render() {
    return (
      <div className={`board-item ${this.props.position}`}>
        <div
          className={`name right ${
            this.props.position
          } ${this.props.currentTurn(this.props.isBot)}`}
        >
          {this.props.text}
        </div>
        <div className="player-cards">
          {this.props.renderCard(this.props.playerIndex)}
        </div>
        <div className={`left coins ${this.props.position}`}>
          {this.props.getCoins(this.props.playerIndex)}
        </div>
      </div>
    );
  }
}

export default Player;
