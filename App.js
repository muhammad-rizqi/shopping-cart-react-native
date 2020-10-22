import React, {Component} from 'react';
import {Provider} from 'react-redux';
import ShoppingCart from './src/ShoppingCart';
import store from './src/store';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );
  }
}

export default App;
