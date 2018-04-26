const defaultState = {
  input: "",
  loading: false,
  data: [],
  info: [],
  titles: [],
  fullData: [],
  errors: [],
  totalResults: 0, 
  movieError: false,
  inputError: false,
  index: "",
  currentPage: 1,
};

export default function MovieFormReducer(state = defaultState, action) {
  const { payload, type } = action;

  switch (type) {
    case "UPDATE_INPUT": {
      return {
        ...state,
        input: payload.input
      };
      break;
    }
    case "INPUT_ERROR": {
      return {
        ...state, 
        inputError: payload.error
      }
    }
    case "INPUT_RESET": {
      return {
        ...state, 
        input: ""
      }
    }
    case "GET_MOVIE_PENDING": {
      return {
        ...state,
        loading: true
      };
      break;
    }
    case "GET_MOVIE_FULFILLED": {
      // console.log(payload.res.data);
      return Object.assign({}, state, { throwError: false, inputError: false,  data: payload.data.Search, totalResults: payload.data.totalResults})
      break;
    }
    case "GET_MOVIE_REJECTED": {
      console.log(payload.err);
      return {
        ...state, 
        movieError: true, loading: false
      }
      break;
    }
    case "GET_INFO_PENDING": {
      console.log("going");
      return {
        ...state,
        loading: true
      };
      break;
    }
    case "GET_INFO_FULFILLED": {
      console.log("payload", payload.info);
      console.log("done")
      return Object.assign({}, state, { loading: false, info: payload.info   }
      );
      break;
    }

    case "GET_FULLDATA": {
      return Object.assign({}, state, { fullData: payload.fullInfo }
      )
      break;
    };

    case "STOP_DATA": {
      return Object.assign({}, state, { data: payload.data, info: payload.data }
      );
      break;
    }

    case "UPDATE_INDEX": {
      return Object.assign({}, state, { index: payload.index}
      )
      break;
    }

    case "UPDATE_PAGE": {
      console.log("red", payload.pageNumber);
      return {
        ...state,
        currentPage: payload.pageNumber
      }
    }
    default: {
      return state;
    }

  }
} 