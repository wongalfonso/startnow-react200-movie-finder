const defaultState = {
  input: "",
  loading: false,
  data: [],
  info: [],
  titles: [],
  fullData: [],
  errors: [],
  error: false,
  index: "",
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
    case "GET_MOVIE_PENDING": {
      return {
        ...state,
        loading: true
      };
      break;
    }
    case "GET_MOVIE_FULFILLED": {

      return Object.assign({}, state, { loading: false, data: payload.data.Search })
      break;
    }
    case "GET_MOVIE_REJECTED": {
      return Object.assign({}, state, {loading: false ,errors: payload.err, error: true})
      break;
    }
    case "GET_INFO_PENDING": {
      return {
        ...state,
        loading: true
      };
      break;
    }
    case "GET_INFO_FULFILLED": {
      return Object.assign({}, state, { loading: false, info: payload.info }
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
    default: {
      return state;
    }

  }
} 