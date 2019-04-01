import React, { Component } from "react";
import PropTypes from "prop-types";
import ActionChoices from "./ActionChoices";
import Player from "./Player";

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
        <Player
          position="start"
          isBot={this.props.isBot}
          currentTurn={this.props.currentTurn}
          text="Bot"
          playerIndex={1}
          renderCard={this.props.renderCard}
          getCoins={this.props.getCoins}
        />

        <ActionChoices
          renderBlockButton={this.props.renderBlockButton}
          renderCardChoiceButton={this.props.renderCardChoiceButton}
        />

        <Player
          position="end"
          isBot={!this.props.isBot}
          currentTurn={this.props.currentTurn}
          text="Player"
          playerIndex={0}
          renderCard={this.props.renderCard}
          getCoins={this.props.getCoins}
        />
      </div>
    );
  }
}

export default Board;
