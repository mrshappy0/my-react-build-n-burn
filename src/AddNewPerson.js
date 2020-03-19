import React, { Component } from "react";

export default class AddNewPerson extends Component {
  state = {
    people: [],
    newPerson: {
      firstName: "",
      lastName: "",
      role: "student"
    }
  };

  updateNewPerson = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState(state => {
      state.newPerson[key] = value;
      return state;
    });
  };

  addNewPerson = event => {
    event.preventDefault();

    const newPerson = {
      firstName: this.state.newPerson.firstName,
      lastName: this.state.newPerson.lastName,
      role: this.state.newPerson.role
    };

    this.setState(state => {
      state.newPerson = {
        firstName: "",
        lastName: "",
        role: "student"
      };
      return state;
    });
    this.props.addNewPerson(newPerson)
  };

  render() {
    return (
      <form className="add-new" onSubmit={this.addNewPerson}>
        <h2>Add New Person</h2>
        <input
          onChange={this.updateNewPerson}
          type="text"
          name="firstName"
          placeholder="First Name"
          value={this.state.newPerson.firstName}
        ></input>
        <input
          onChange={this.updateNewPerson}
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={this.state.newPerson.lastName}
        ></input>
        <select
          required
          name="role"
          value={this.state.newPerson.role}
          onChange={this.updateNewPerson}
        >
          <option value="student">Student</option>
          <option value="teacher">teacher</option>
          <option value="administrator">Administrator</option>
        </select>
        <input type="submit" value="Add Person"></input>
      </form>
    );
  }
}
