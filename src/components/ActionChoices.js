import React, { Component } from "react";
import PropTypes from "prop-types";

class ActionChoices extends Component {
  render() {
    return (
      <div className="action-choices">
        {this.props.renderBlockButton()}
        {this.props.renderCardChoiceButton()}
      </div>
    );
  }
}

export default ActionChoices;
