import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text> Home </Text>
        <Button
          title="Electronics"
          onPress={() =>
            this.props.navigation.navigate('Products', {
              category: 'Electronics',
            })
          }
        />
        <Button
          title="Books"
          onPress={() =>
            this.props.navigation.navigate('Products', {
              category: 'Books',
            })
          }
        />
        <Button
          title="Cart"
          onPress={() => this.props.navigation.navigate('Cart')}
        />
      </View>
    );
  }
}

export default HomeScreen;
