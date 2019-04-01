import React, { Component } from "react";
import PropTypes from "prop-types";

class Menu extends Component {
  state = {
    newRoom: null,
    existingRoom: null
  };

  static propTypes = {
    prop: PropTypes
  };

  joinRoom = event => {
    event.preventDefault();
    // this.props.history.push(`${}`)
  };

  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  render() {
    return (
      <div className="menu">
        <div className="room-create">
          <button className="button">Create Room</button>
        </div>
        <div className="room-join">
          <form onSubmit>
            <input
              className="room-input"
              type="text"
              name="existingRoom"
              placeholder="Enter existing room name"
            />
            <button type="submit" className="button">
              Join Room
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Menu;
