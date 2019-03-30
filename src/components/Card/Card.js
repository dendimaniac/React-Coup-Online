import React, { Component } from "react";
import PropTypes from "prop-types";
import cardBack from "../../static/images/Back.png";

class Card extends Component {
  static propTypes = {
    isShown: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    const { isShown, name, image, description } = this.props;
    if (isShown === true) {
      return (
        <div className="card-holder">
          <img className="cards" alt={name} src={image} />
          <div className="description">
            <div className="description card-name">{name}</div>
            <div className="description info">{description}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="card-holder">
        <img className="cards card-back" alt="Card Back" src={cardBack} />
      </div>
    );
  }
}

export default Card;
