import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Img from "react-image";

class MovieDetailContainer extends React.Component{
  constructor(props){
    super(props);
  }

  movieWaiting () {
    return (
      <div className = "text-center">
        <h2>Loading...</h2>
      </div>
    )
  }

  movieRender() {
    const { fullData, index } = this.props;
    var fullMovie = fullData[index];

    return (
      <div className = "movieInfo">
        <h1>Movie Finder</h1>        
        <div className="row">
          <div className="col-md-6">
            <Link to="/">Go Back</Link>
          </div>
        </div>        
        <div className="row infoRow">
          <div className="col-md-4">
            <div className="moviePoster">
              <Img src = {fullMovie.Poster} />              
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <b>Movie Details</b>
              </div>
              <div className="card-body">                
                <h3><b>{fullMovie.Title}</b></h3>
                <div className="row infoRow">                
                  <div className="col-md-4 infoBubble">Released {fullMovie.Year}</div>
                  <div className="col-md-4 infoBubble">{fullMovie.Runtime}</div>
                  <div className="col-md-4 infoBubble">{fullMovie.Genre}</div>
                </div>

                <div className="row infoRow">
                  <div className="col-md-12"><b>Actors</b></div>
                </div>                
                {/* <div className="row"><div className="col-md-12">
                {movie.Actors}</div></div> */}
                <div className="row infoRow">
                  <div className="col-md-12"><b>Plot</b></div>
                </div>
                <div className="row">
                  <div className="col-md-12">                    
                    {fullMovie.Plot}
                  </div>
                </div>

                <div className="row infoRow">
                <div className="col-md-12"><b>Awards</b></div>
                </div>
                <div className="row">
                  <div className="col-md-12">                    
                    {fullMovie.Awards}
                  </div>
                </div>

                <div className="row infoRow">
                  <div className="col-md-12">
                    {fullMovie.Metascore}/ 100
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {fullMovie.imdbRating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { fullData, index } = this.props;
    return (
      (index !== undefined ) ? this.movieRender() : this.movieWaiting()
    )
  }
}
const mapStoreToProps = (store) => ({
  fullData: store.movie.fullData,
  index: store.movie.index
})

export default connect(mapStoreToProps)(MovieDetailContainer);