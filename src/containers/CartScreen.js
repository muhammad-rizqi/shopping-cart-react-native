import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import CartIcon from '../components/CartIcon';
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
      const filter = products.map((product) => product.price * product.qty);
      console.log(filter);
      total = filter.reduce((acc, cvv) => acc + cvv);
    }
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../icons/go-back-left-arrow.png')}
              style={{width: 20, height: 20, margin: 8}}
            />
          </TouchableOpacity>
          <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold', margin: 8}}>
            Shopping Cart
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}>
            <CartIcon />
          </TouchableOpacity>
        </View>

        <ScrollView style={{flex: 1}}>
          {products.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={{
                margin: 8,
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: product.image}}
                  style={styles.productImage}
                />

                <View style={{marginLeft: 16}}>
                  <Text style={{fontSize: 18}}>{product.name}</Text>
                  <Text>Rp. {product.price}</Text>
                  <Text>Jumlah</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={styles.smallButton}
                      onPress={() => this.props.decreaseQty(product)}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={{width: 30}}>{product.qty}</Text>
                    <TouchableOpacity
                      style={styles.smallButton}
                      onPress={() => this.props.increaseQty(product)}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Button
                title="Hapus"
                onPress={() => this.props.removeItem(index)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={{fontSize: 24, margin: 8}}>
          {total != 0 ? 'Total Rp.' + total : ''}
        </Text>
      </View>
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

const styles = StyleSheet.create({
  productImage: {
    width: 80,
    height: 80,
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
