import React, { Component } from 'react';
import cardBack from '../../static/images/Back.png';

class Card extends Component {
    render() {
        const { isShown, name, image, description } = this.props;
        if (isShown === true) {
          return (
            <div className="card-holder">
              <img className="cards" alt={name} src={image}></img>
              <div className="description">
                <div className="description name">{name}</div>
                <div className="description info">{description}</div>
              </div>
            </div>
          );
        }
        return (
          <div className="card-holder">
            <img className="cards card-back" alt="Card Back" src={cardBack}></img>
          </div>
        );
    }
}

export default Card;