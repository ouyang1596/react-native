import React, { Component } from 'react';
import { Dimensions, Animated } from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';
import SplashScreen from 'react-native-splash-screen';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');
export default class Splash extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }
  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg} />
    );
  }
  componentDidMount() {//render()后会执行这个
    const { navigate } = this.props.navigation;
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    SplashScreen.hide();
    this.timer = setTimeout(() => {
      // navigate('Category');
      NavigationUtil.reset(this.props.navigation, 'Home');
    }, 1000);
  }
}