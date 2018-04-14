import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import firebaseAccount from './firebase_account.json'

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: firebaseAccount.apiKey,
      authDomain: "one-time-password-amqo.firebaseapp.com",
      databaseURL: "https://one-time-password-amqo.firebaseio.com",
      projectId: "one-time-password-amqo",
      storageBucket: "one-time-password-amqo.appspot.com",
      messagingSenderId: "284693081398"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
