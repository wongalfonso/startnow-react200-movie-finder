import { combineReducers } from "redux";
import MovieFormReducer from "./containers/MovieSearch/MovieSearchReducer"

const rootReducer = combineReducers({
  movie: MovieFormReducer
 });

 export default rootReducer;