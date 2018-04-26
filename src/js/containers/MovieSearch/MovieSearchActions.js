import axios from "axios";

export const inputSearch = (search) => (dispatch, state) => {
  var requestMovies = axios.get(`/movie/search/${search}`);
  var arr = []
  var respArr = [];
  var element = {};
  dispatch({
    type: "GET_MOVIE",
    payload:
      requestMovies
        .then(res => {
          res.data.Search.map((ids, i) => {
            arr.push(ids.imdbID);
          })
          getInfo(arr)
          return { data: res.data }
        })
        .catch(err => {
          return { err };
        })
  })
  const getInfo = (arr) => {
    var requestInfo = axios.get(`/movie/info/${arr}`);
    dispatch({
      type: "GET_INFO",
      payload: requestInfo
        .then(res => {
          return { info: res.data }
      })
      .catch(err => {
        return console.log(err);
      })
    })
  }
}

// export function getMovieInfo(movie) {
//   return {
//     type: "GET_INFO",
//     payload:
//       axios.get("/info/plot/")
//         .then(res => {
//           console.log("info", res.data);
//           return { info: res.data }
//         })
//   }
// }

export function updateInput(input) {
  return {
    type: "UPDATE_INPUT",
    payload: { input }
  }
}

export function inputError(error) {
  return {
    type: "INPUT_ERROR",
    payload: { error }
  }
}
export function resetInput(error) {
  return {
    type: "RESET_INPUT",
    payload: { error }
  }
}
export function updateMovies(fullInfo) {
  return {
    type: "GET_FULLDATA",
    payload: { fullInfo }
  }
}

export function updateArr(data) {
  return {
    type: "STOP_DATA",
    payload: { data }
  }
}
export function updateIndex(index) {
  return {
    type: "UPDATE_INDEX",
    payload: { index }
  }
}

export function currentPage(pageNumber) {
  return {
    type: "UPDATE_PAGE",
    payload: { pageNumber }
  }
}