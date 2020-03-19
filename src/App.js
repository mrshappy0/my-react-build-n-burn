import React, { Component } from "react";
import "./App.css";
import AddNewPerson from "./AddNewPerson";
import Search from "./Search";

import "font-awesome/css/font-awesome.min.css";

const apiUrl = "http://react-build-and-burn.herokuapp.com";

class App extends Component {
  state = {
    people: [],
    newPerson: {
      firstName: "",
      lastName: "",
      role: "student"
    },
    searchTerm: "",
    currentFilter: "all",
    currentSort: ""
  };
  componentDidMount() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(people => {
        this.setState({ people });
      });
  }

  addNewPerson = newPerson => {
    this.setState(state => {
      state.people = [...state.people, newPerson];
      return state;
    });
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPerson)
    }).catch(error => console.log(error.message));
  };

  displayedPeople = () => {
    return this.state.people
      .filter(person => {
        if (!this.state.searchTerm) {
          return true;
        } else {
          return (
            person.firstName
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase()) ||
            person.lastName
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase())
          );
        }
      })
      .filter(person => {
        if (this.state.currentFilter == "all") {
          return true;
        } else {
          return person.role === this.state.currentFilter;
        }
      })
      .sort((a, b) => {
        if (!this.state.currentSort) {
          return 0;
        } else {
          return a[this.state.currentSort] >= b[this.state.currentSort]
            ? 1
            : -1;
        }
      });
  };

  updateSearchTerm = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  updateCurrentFilter = event => {
    this.setState({
      currentFilter: event.target.value
    });
  };

  updateCurrentSort = sortCriterion => {
    this.setState({
      currentSort: sortCriterion
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Student Roster</h1>
          <div className="search-and-filter">
            <Search
              searchTerm={this.state.searchTerm}
              updateSearchTerm={this.updateSearchTerm}
            />
            <form className="filter">
              <select
                onChange={this.updateCurrentFilter}
                value={this.state.currentFilter}
              >
                <option value="all">Show All</option>
                <option value="student">Show only students</option>
                <option value="teacher">Show only teachers</option>
                <option value="administrator">Show only administdators</option>
              </select>
            </form>
          </div>
        </header>
        <main>
          <table className="people-table">
            <thead>
              <tr>
                <th>
                  First Name
                  <button
                    className={
                      this.state.currentSort === "firstName"
                        ? "active-sort"
                        : undefined
                    }
                    onClick={() => {
                      this.updateCurrentSort("firstName");
                    }}
                  >
                    <i className="fa fa-caret-down"></i>
                  </button>
                </th>
                <th>
                  Last Name
                  <button
                    className={
                      this.state.currentSort === "lastName"
                        ? "active-sort"
                        : undefined
                    }
                    onClick={() => {
                      this.updateCurrentSort("lastName");
                    }}
                  >
                    <i className="fa fa-caret-down"></i>
                  </button>
                </th>
                <th>
                  Role
                  <button
                    className={
                      this.state.currentSort === "role"
                        ? "active-sort"
                        : undefined
                    }
                    onClick={() => {
                      this.updateCurrentSort("role");
                    }}
                  >
                    <i className="fa fa-caret-down"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.displayedPeople().map(person => {
                return (
                  <tr>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <AddNewPerson addNewPerson={this.addNewPerson} />
        </main>
      </div>
    );
  }
}

export default App;
