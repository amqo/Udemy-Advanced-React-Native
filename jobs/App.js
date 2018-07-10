import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Constants } from "expo";

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  render() {

    const ReviewNavigator = createStackNavigator({
      review: ReviewScreen,
      settings: SettingsScreen
    },
    {
      navigationOptions: {
        headerStyle: styles.stackHeaderStyle
      }
    });

    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: createBottomTabNavigator({
        map: MapScreen,
        deck: DeckScreen,
        review: ReviewNavigator
      })
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: Constants.statusBarHeight
      }
    })
  },
  stackHeaderStyle: {
    ...Platform.select({
      android: {
        marginTop: -Constants.statusBarHeight
      }
    })
  }
});
