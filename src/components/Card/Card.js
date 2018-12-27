import React, { Component } from 'react';
import cardBack from '../../static/images/Back.png';

class Card extends Component {
    render() {
        const { isShown, name, image, description } = this.props;
        if (isShown === true) {
          return (
            <div>
              <img className="Cards" alt={name} src={image}></img>
              <div>{name}</div>
              <div className="Description">{description}</div>
            </div>
          );
        }
        return (
          <img className="Cards" alt="Card Back" src={cardBack}></img>
        );
    }
}

export default Card;