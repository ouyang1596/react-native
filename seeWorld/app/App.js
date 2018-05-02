/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import CategoryContainer from './container/CategoryContainer';
import MainContainer from './container/MainContainer';
import WebViewPager from './container/WebViewPager';
import ItemCell from './container/ItemCell';
import Splash from './container/Splash';
const tabNavi = TabNavigator({
  main: { screen: MainContainer },
  category: { screen: CategoryContainer },
}, {
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3e9ce9',
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff'
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      }
    },
  });
const stackNavi = StackNavigator({
  Splash: { screen: Splash },
  Home: {
    screen: tabNavi,
    navigationOptions: {
      headerLeft: null
    }
  },
  Category: { screen: CategoryContainer },
  Web: { screen: WebViewPager },
}, {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20
      },
      headerTintColor: '#fff'
    }
  }
);
export default stackNavi;