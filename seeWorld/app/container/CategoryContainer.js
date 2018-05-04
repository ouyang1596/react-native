import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryItem from '../container/CategoryItem';
const REQUEST_URL = "http://route.showapi.com/582-1?showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f";
export default class Category extends Component {
  static navigationOptions = {
    title: '分类',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-pricetags" size={25} color={tintColor} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      typeList: [],

    };
    console.disableYellowBox = true;
  }
  get = () => {
    return new Promise((resolve, reject) => {
      fetch(REQUEST_URL, {
        method: 'GET',
      }).then((response) => {
        return response.json();
      }).then((responseData) => {
        console.log(responseData.showapi_res_body.typeList);
        this.setState({
          typeList: responseData.showapi_res_body.typeList,
        });

      }).catch((err) => {
        console.error(err);
      });
    });
  };
  onPress = (item) => {
    const { navigate } = this.props.navigation;
    navigate('Home', { item });
  };
  render() {
    return (
      <FlatList
        data={this.state.typeList}
        renderItem={({ item }) => <CategoryItem data={item} onPressHandle={this.onPress}></CategoryItem>}
      />
    );
  }
  componentDidMount() {
    this.get();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0',
  }
});