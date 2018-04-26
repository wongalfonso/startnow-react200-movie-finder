import React from "react";
import { connect } from "react-redux";
import Img from "react-image";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

import {
  inputSearch,updateInput,getMovieInfo,updateMovies,updateArr,updateIndex,currentPage,inputError,resetInput} from "./MovieSearchActions"
import { isBoolean } from "util";

class MovieSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputButton = this.handleInputButton.bind(this);
    this.movieInfoSearch = this.movieInfoSearch.bind(this);
    this.navPages = this.navPages.bind(this);
    this.combineData = this.combineData.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  componentDidUpdate() {
    const { data, info, dispatch, loading } = this.props;
    console.log(loading);
    if (data.length > 0 && info.length > 0) {
      this.combineData(data, info);
    }
  }
  handleInput(e) {
    const value = e.target.value
    const { dispatch } = this.props;
    dispatch(updateInput(value));
  }

  handleInputButton(e) {
    e.preventDefault();
    const { dispatch, input } = this.props;
    if (input.length === 0) {
      this.throwErr
      const error = true;
      dispatch(inputError(error))
    } else {
      const search = input.toLowerCase();
      dispatch(inputSearch(search));
      dispatch(resetInput(""))
      this.noError()
      document.getElementById("form").reset();
    }
  }

  throwErr() {
    const { input, inputError, movieError} = this.props;
    var error;
    var search = input.toUpperCase();
    (inputError === true) ? error = "Please Enter a Movie!" : ""
    (movieError === true) ? error = `Sorry either we can't find the movie ${search} in our database or it doesn't exist` : ""
    console.log(movieError);
    return (
      <div className =" col-md-12 alert alert-danger">{error}</div>
    )

  }

  noError() {
    return (
      <div></div>
    )
  }

  combineData(data, info) {
    const { dispatch } = this.props;
    var fullData = [];
    var dataCopy = data.slice(0);
    var infoCopy = info.slice(0);
    for (var i = 0; i < dataCopy.length; i++) {
      var dataID = dataCopy[i].imdbID;
      var movies = {};
      for (var j = 0; j < infoCopy.length; j++) {
        var infoID = infoCopy[j].imdbID;
        if (dataID === infoID) {

          movies.Title = dataCopy[i].Title,
            movies.Poster = dataCopy[i].Poster,
            movies.Year = dataCopy[i].Year,
            movies.Plot = info[i].Plot,
            movies.Director = info[i].Director,
            movies.Actors = info[i].Actors,
            movies.Rated = info[i].Rated,
            movies.Released = info[i].Released,
            movies.imdbRating = info[i].imdbRating,
            movies.Website = info[i].Website,
            movies.Runtime = info[i].Runtime,
            movies.Genre = info[i].Genre,
            movies.Metascore = info[i].Metascore,
            movies.Awards = info[i].Awards,
            infoCopy.splice(j, 1);
          fullData.push(movies);
        }

      }
    }
    dispatch(updateMovies(fullData));
    var blankArr = [];
    dispatch(updateArr(blankArr));
  }


  movieInfoSearch(index) {
    const { dispatch } = this.props;
    dispatch(updateIndex(index));

  }

  changePage(pageNumber) {
    const { dispatch } = this.props;
    dispatch(currentPage(pageNumber));
  }

  navPages() {
    const { totalResults, currentPage } = this.props;
    var results = parseInt(totalResults);
    results = Math.ceil(results / 10);
    var pageNumber = parseInt(currentPage);
    var navPages = [];
    for (var i = 1; i < results; i++) {
      navPages.push(i);
    }
    var listNumbers = navPages.filter((number) => number > pageNumber -1);
    listNumbers = listNumbers.filter((number) => number < pageNumber + 5);
    if (listNumbers.length !==0) {
      listNumbers.push(navPages.length);
    }
    var last = pageNumber + 5; 
    var first = pageNumber
    return (
      <nav className="Page navigation">
      <ul className="pagination justify-content-end">
        {listNumbers.map((pages, pageNumber, listNumbers) => {
          (pages === navPages.length)? listNumbers = "Last" : listNumbers = pages
          return (          
            <li className="page-item" key = {pageNumber}>
              <a className="page-link"  onClick = {() => this.changePage(pages)} href="#">{listNumbers}</a>
            </li>
          )
        })
        }
        </ul>
      </nav>
    )
  }


  render() {
    const { fullData, dispatch, index, loading, totalResults, currentPage, input, inputError } = this.props;
    var arr = [];
    fullData.map((titles, i) => {
      arr.push(titles.Title)
    });
    var err;
    return (
      <div className="">
        <div>{this.navPages()}</div>
        <form id = "form">
          <div className="input-group">
            <input
              className="form-control input"
              onChange={this.handleInput}
              type="text"
            />
            <span className="input-group-btn">
              <button className="btn btn-secondary"
                type="submit"
                onClick={this.handleInputButton}>
                Go!
              </button>
            </span>
          </div>
        </form>
        <div id="errors" className = "row text-center">{(inputError === true) ? this.throwErr() : this.noError()}
        </div>
        <table className="table">
          <tbody>
            {fullData.map((movie, i) => {
              return (
                <tr key={i}>
                  <td >
                    <div className="movieSearch">
                      <div className="row movieSearchRow">
                        <div className="col-md-4 text-center left">
                          <Img src={movie.Poster} id="poster"/>
                        </div>
                        <div className="col-md-8 right">
                          <div className="text-center" ><h2>{movie.Title}</h2></div>
                          <div className="text-center" ><b>{movie.Year}</b></div>
                          <hr />
                          <div>{(movie.Plot.length > 300) ? movie.Plot.substring(0,300) + "...": movie.Plot}</div>
                          <div className="text-center button">
                            <Link to={`movie/${movie.Title}`}>
                              <button
                                className="btn btn-primary infoBtn"
                                onClick={() => this.movieInfoSearch(i)}>
                                More Information
                                </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    )
  }
}

const mapStoreToProps = (store) => ({
  input: store.movie.input,
  data: store.movie.data,
  info: store.movie.info,
  fullData: store.movie.fullData,
  index: store.movie.index,
  loading: store.movie.loading,
  totalResults: store.movie.totalResults,
  currentPage: store.movie.currentPage,
  inputError: store.movie.inputError,
  movieError: store.movie.movieError
})

export default connect(mapStoreToProps)(MovieSearchContainer);