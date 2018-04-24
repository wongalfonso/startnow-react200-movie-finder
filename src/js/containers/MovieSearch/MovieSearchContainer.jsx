import React from "react";
import { connect } from "react-redux";
import Img from "react-image";
import { Link } from "react-router-dom";
// import List from "./MovieSearchList"
import {
  inputSearch,
  updateInput,
  getMovieInfo,
  updateMovies,
  updateArr,
  updateIndex
} from "./MovieSearchActions"

class MovieSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputButton = this.handleInputButton.bind(this);
    this.movieInfoSearch = this.movieInfoSearch.bind(this);
    // this.List = this.List.bind(this);
    this.combineData = this.combineData.bind(this);
  }
  componentDidUpdate() {
    const { data, info, dispatch } = this.props;
    // console.log("data", data.length);
    // console.log("info", info.length);
    // console.log("info", info);
    // console.log("info", info);
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
    // console.log("form", input);
    dispatch(inputSearch(input));
  }

  combineData(data, info) {
    console.log("data", data, info)
    const { dispatch } = this.props;
    var fullData = [];
    var dataCopy = data.slice();
    var infoCopy = info.slice();    
    for (var i = 0; i < dataCopy.length; i++) {
      var dataID = dataCopy[i].imdbID;
      var movies = {};
      for (var j = 0; j < infoCopy.length; j++) {
        var infoID = infoCopy[j].imdbID;
        console.log("ids", dataID, infoID)
        if (dataID === infoID) {
          // console.log("Title", dataCopy[i].Title);
          movies.Title = dataCopy[i].Title
          movies.Poster = dataCopy[i].Poster,
          movies.Year = data[i].Year,
          movies.Plot = info[i].Plot,
          movies.Director = info[i].Director
          movies.Actors = info[i].Actors,
          movies.Rated = info[i].Rated,
          movies.Released = info[i].Released,
          movies.imdbRating = info[i].imdbRating,
          movies.Website = info[i].Website,
          movies.Runtime = info[i].Runtime,
          movies.Genre = info[i].Genre,
          movies.Metascore = info[i].Metascore,
          movies.Awards = info[i].Awards
          infoCopy.splice(j, 1);
          console.log("movies", movies);
          fullData.push(movies);
        }

      }
    }
    console.log("full created", fullData);
    // console.log("fullData", fullData);
    dispatch(updateMovies(fullData));
    var blankArr = [];
    dispatch(updateArr(blankArr));
  }


  movieInfoSearch(index) {
    const { dispatch } = this.props;
    dispatch(updateIndex(index));

  }
 
  render() {
    const { data, fullData, info, dispatch, index, loading } = this.props;
    var arr = [];
    fullData.map((titles, i) => {
      arr.push(titles.Title)
    });
    return (
      <div className="">
        <h1>Movie Finder</h1>
        <form>
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
        <table className="table">
          <tbody>
            {fullData.map((movie, i) => {
              return (
                <tr key={i}>
                  <td >
                    <div className="movieSearch">
                      <div className="row movieSearchRow">
                        <div className="col-md-4 text-center left">
                          <Img src={movie.Poster} height={245} width={190} />
                        </div>
                        <div className="col-md-8 right">
                          <div className="text-center" ><h2>{movie.Title}</h2></div>
                          <div className="text-center" ><b>{movie.Year}</b></div>
                          <hr />
                          <div>{movie.Plot}</div>
                          <div className="text-center button">
                            <Link to ={`movie/${movie.Title}`}>
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
  loading: store.movie.loading
})

export default connect(mapStoreToProps)(MovieSearchContainer);