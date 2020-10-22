import React, {Component} from 'react';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {electronics, books} from '../Data';
import {connect} from 'react-redux';

class ProductsScreen extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      qty: 1,
      cart: {},
    };
  }

  getProductsByCategory() {
    const {category} = this.props.route.params;
    switch (category) {
      case 'Electronics':
        return electronics;
      case 'Books':
        return books;
    }
  }

  buy(product) {
    const qty = this.state.qty;
    const cart = {...product, qty};
    this.setState({cart: cart, modalOpen: true});
  }

  increaseQty(cart) {
    const product = {...cart, qty: cart.qty + 1};
    this.setState({cart: product});
  }

  decreaseQty(cart) {
    if (cart.qty > 1) {
      const product = {...cart, qty: cart.qty - 1};
      this.setState({cart: product});
    }
  }

  render() {
    const products = this.getProductsByCategory();
    const {cart} = this.state;
    return (
      <View>
        <ScrollView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {products.map((product, index) => (
              <TouchableOpacity key={product.id}>
                <Text>{product.name}</Text>
                <Image
                  source={{uri: product.image}}
                  style={{width: 100, height: 100}}
                />
                <Button title="Beli" onPress={() => this.buy(product)} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Modal visible={this.state.modalOpen} transparent={true}>
          <View style={{flex: 1, backgroundColor: 'black', opacity: 0.5}} />
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 16}}
              onPress={() => this.setState({modalOpen: false})}>
              <Text>X</Text>
            </TouchableOpacity>
            <Image
              source={{uri: cart.image}}
              style={{width: 100, height: 100}}
            />
            <Text>{cart.name}</Text>
            <Text>{cart.price}</Text>
            <Text>Jumlah</Text>
            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 16}}
              onPress={() => this.decreaseQty(cart)}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{cart.qty}</Text>
            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 16}}
              onPress={() => this.increaseQty(cart)}>
              <Text>+</Text>
            </TouchableOpacity>

            <Button
              title="Beli Sekarang"
              onPress={() => {
                this.props.addItemToCart(cart);
                this.setState({modalOpen: false});
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapsDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => {
      dispatch({type: 'ADD_TO_CART', payload: product});
    },
  };
};

export default connect(null, mapsDispatchToProps)(ProductsScreen);
