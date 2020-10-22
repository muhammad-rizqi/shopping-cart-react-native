import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const CartIcon = (props) => {
  return (
    <View style={styles.icon}>
      <Image
        source={{
          uri: 'https://img.icons8.com/material-sharp/2x/shopping-cart.png',
        }}
        style={styles.iconImage}
      />
      <Text style={styles.iconBadge}>{props.cartItems.length}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state,
  };
};

export default connect(mapStateToProps)(CartIcon);

const styles = StyleSheet.create({
  icon: {
    width: 50,
    padding: 8,
    height: 50,
    justifyContent: 'center',
  },
  iconImage: {
    height: 24,
    width: 24,
  },
  iconBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'cyan',
    borderRadius: 8,
    fontSize: 10,
    textAlign: 'center',
    width: 16,
    height: 16,
  },
});
