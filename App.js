/**
 * News feed App 
 *
 * @author Gavin Brown
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Routes from './src/components/navigation/index';

export default class App extends React.Component {
  render() {
    return (
      <Routes />
    )
  }
}

const styles = StyleSheet.create({

});
