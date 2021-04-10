import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    first_name: '',
  }

  componentDidMount () {
    axios.get("http://localhost:5000/users").then(response => {
        console.log(response);
      })
  }

  

  handleChange = event => {
    this.setState({ first_name: event.target.value });

  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      first_name: this.state.first_name
    };

    axios.post(
      "http://localhost:5000/users",
      {
        first_name: this.state.first_name,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}