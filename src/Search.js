import React, { Component } from "react";

export default function Search(props) {
  return (
    <form className="search">
      <input
        onChange={props.updateSearchTerm}
        type="text"
        name="search-term"
        value={props.searchTerm}
      ></input>
      <i className="fa fa-search"></i>
    </form>
  );
}
