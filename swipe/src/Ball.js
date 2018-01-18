import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';

class Ball extends Component {

  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 }
    }).start();
  }

  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.square} />
      </Animated.View>
    );
  }
}

const styles = {
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'black'
  }
}

export default Ball;
