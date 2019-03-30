import React, { Component } from "react";
import PropTypes from "prop-types";

class Actions extends Component {
  static propTypes = {
    handleCoup: PropTypes.func.isRequired,
    getIncome: PropTypes.func.isRequired,
    handleForeignAid: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <div className="actions">
          <button className="button" onClick={this.props.handleCoup}>
            Coup
          </button>
          <button className="button" onClick={this.props.getIncome}>
            Income
          </button>
          <button className="button" onClick={this.props.handleForeignAid}>
            Foreign Aid
          </button>
        </div>
      </div>
    );
  }
}

export default Actions;
