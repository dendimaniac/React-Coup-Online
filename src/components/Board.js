import React, { Component } from "react";
import PropTypes from "prop-types";

class Board extends Component {
  static propTypes = {
    isBot: PropTypes.bool.isRequired,
    currentTurn: PropTypes.func.isRequired,
    renderCard: PropTypes.func.isRequired,
    getCoins: PropTypes.func.isRequired,
    renderBlockButton: PropTypes.func.isRequired,
    renderCardChoiceButton: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="board">
        <div className="board-item start">
          <div
            className={`name start right ${this.props.currentTurn(this.props.isBot)}`}
          >
            Bot
          </div>
          <div className="player-cards">{this.props.renderCard(1)}</div>
          <div className="start left coins">{this.props.getCoins(1)}</div>
        </div>

        <div className="action-choices">
          {this.props.renderBlockButton()}
          {this.props.renderCardChoiceButton()}
        </div>

        <div className="board-item end">
          <div
            className={`name end right ${this.props.currentTurn(!this.props.isBot)}`}
          >
            Player
          </div>
          <div className="player-cards">{this.props.renderCard(0)}</div>
          <div className="end left coins">{this.props.getCoins(0)}</div>
        </div>
      </div>
    );
  }
}

export default Board;
