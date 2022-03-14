import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers'
import { persistStore } from 'redux-persist'
const middleware = [thunk];

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store)