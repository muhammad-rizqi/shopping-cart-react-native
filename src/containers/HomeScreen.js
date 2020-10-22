import React, {Component} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CartIcon from '../components/CartIcon';

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold', margin: 8}}>
            Belanja di Sopy
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}>
            <CartIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Products', {
              category: 'Electronics',
            })
          }
          style={styles.category}>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCW44dGkMRhoCD3IuEDwaVXxQiCQzG3vuL_A&usqp=CAU',
            }}
            style={styles.categoryImage}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Electronics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Products', {category: 'Books'})
          }
          style={styles.category}>
          <Image
            source={{
              uri:
                'https://lithub.com/wp-content/uploads/2019/07/used-books-store-2.jpg',
            }}
            style={styles.categoryImage}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Books</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  categoryImage: {
    height: 150,
    width: 150,
    borderRadius: 10,
    marginTop: 20,
  },
});
