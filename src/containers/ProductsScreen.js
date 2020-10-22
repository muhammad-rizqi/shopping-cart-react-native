import React, {Component} from 'react';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {electronics, books} from '../Data';
import {connect} from 'react-redux';
import CartIcon from '../components/CartIcon';

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
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../icons/go-back-left-arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold', margin: 8}}>
            {this.props.route.params.category}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}>
            <CartIcon />
          </TouchableOpacity>
        </View>

        <ScrollView style={{flex: 1}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {products.map((product, index) => (
              <TouchableOpacity key={product.id} style={styles.product}>
                <Image
                  source={{uri: product.image}}
                  style={styles.productImage}
                />
                <Text>{product.name}</Text>
                <Text>Rp. {product.price}</Text>
                <Button title="Beli" onPress={() => this.buy(product)} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Modal visible={this.state.modalOpen} transparent={true}>
          <TouchableOpacity
            style={{flex: 1, backgroundColor: 'black', opacity: 0.5}}
            onPress={() =>
              this.setState({modalOpen: false})
            }></TouchableOpacity>
          <View style={{backgroundColor: '#eee', padding: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{uri: cart.image}} style={styles.productImage} />
              <View style={{marginLeft: 16}}>
                <Text style={{fontSize: 18}}>{cart.name}</Text>
                <Text>Rp. {cart.price}</Text>
                <Text>Jumlah</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => this.decreaseQty(cart)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={{width: 30}}>{cart.qty}</Text>
                  <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => this.increaseQty(cart)}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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

const styles = StyleSheet.create({
  headerContainer: {flexDirection: 'row', alignItems: 'center'},
  backIcon: {width: 20, height: 20, margin: 8},
  product: {
    flexBasis: '45%',
    margin: 8,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    margin: 8,
    borderRadius: 5,
  },
  smallButton: {
    backgroundColor: 'cyan',
    borderRadius: 5,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
