import React, { Component } from 'react';
import { HashRouter as Router, Route, hashHistory } from "react-router-dom";
import MovieSearchContainer from "./containers/MovieSearch/MovieSearchContainer";
import MovieDetailContainer from "./containers/MovieDetails/MovieDetailContainer";

export default class App extends Component {
  render() {
    return (
      <Router history = {hashHistory}>
        <div className = "container">
          <Route exact path = "/" component = {MovieSearchContainer} />
          <Route path = "/movie/:id" component = { MovieDetailContainer} />
          <Route path = "/info/:id" />
        </div>
      </Router>
    );
  }
}
