import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";

const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer
})



export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))