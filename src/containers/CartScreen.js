import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import cartItems from '../reducers/cartItems';

class CartScreen extends Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props.cartItems);
    const products = this.props.cartItems;
    let total = 0;
    if (products.length !== 0) {
      const filter = products.map((product) => product.price);
      console.log(filter);
      total = filter.reduce((acc, cvv) => acc + cvv);
    }
    return (
      <ScrollView>
        <Text>{total}</Text>
        {products.map((product, index) => (
          <TouchableOpacity key={index}>
            <Text>{product.name}</Text>
            <Image
              source={{uri: product.image}}
              style={{width: 100, height: 100}}
            />
            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 16}}
              onPress={() => this.props.decreaseQty(product)}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{product.qty}</Text>
            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 16}}
              onPress={() => this.props.increaseQty(product)}>
              <Text>+</Text>
            </TouchableOpacity>

            <Button
              title="Hapus"
              onPress={() => this.props.removeItem(index)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (index) => dispatch({type: 'REMOVE_FROM_CART', payload: index}),
    increaseQty: (product) =>
      dispatch({type: 'INCREASE_CART_QTY', payload: product}),
    decreaseQty: (product) =>
      dispatch({type: 'DECREASE_CART_QTY', payload: product}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
