import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    SectionList,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemCell from '../container/ItemCell';
import ScrollableTabView, {
    ScrollableTabBar
} from 'react-native-scrollable-tab-view';
export default class Main extends Component {
    static navigationOptions = {
        title: '首页',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" size={25} color={tintColor} />
        )
    };
    constructor(props) {
        super(props);
        this.state = { discounts: [{ key: '大护法' }] };
        console.disableYellowBox = true;
    }
    getInitialState() {
        return {
            isRefreshing: false,
        };
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        this.get();
    }
    get = () => {
        return new Promise((resolve, reject) => {
            fetch('http://route.showapi.com/582-2?typeId=9&page=1&showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f', {
                method: 'GET',
            }).then((response) => {
                return response.json();
            }).then((responseData) => {
                console.log(responseData.showapi_res_body.pagebean.contentlist);
                this.setState({ discounts: responseData.showapi_res_body.pagebean.contentlist, isRefreshing: false });
            }).catch((err) => {
                console.error(err);
            });
        });
    };

    onPress = (article) => {
        console.log("onPress = (article)");
        const { navigate } = this.props.navigation;
        navigate('Web', { article });
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={flatListStyles.container}>
                {/* <ScrollableTabView
                    renderTabBar={() => (
                        <ScrollableTabBar
                            tabStyle={flatListStyles.tab}
                            textStyle={flatListStyles.tabText}
                        />
                    )}
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarUnderlineStyle={flatListStyles.tabBarUnderline}
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa"
                >
                    <Text tabLabel={"科技咖"}></Text>
                </ScrollableTabView> */}
                <FlatList
                    data={this.state.discounts}
                    // renderItem={({ item }) => <Text style={flatListStyles.item}>{item.title}</Text>}
                    renderItem={({ item }) => <ItemCell data={item} onPressHandle={this.onPress} ></ItemCell>}
                    refreshControl={
                        <RefreshControl
                            style={flatListStyles.refreshControlBase}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            title="Loading..."
                            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    }
                />
                {/* <ScrollableTabView
                    renderTabBar={() => (
                        <ScrollableTabBar
                            tabStyle={flatListStyles.tab}
                            textStyle={flatListStyles.tabText}
                        />
                    )}
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarUnderlineStyle={flatListStyles.tabBarUnderline}
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa"
                >
                    <View tabLabel={"科技咖"} style={flatListStyles.base}>
                        <FlatList
                            data={this.state.discounts}
                            // renderItem={({ item }) => <Text style={flatListStyles.item}>{item.title}</Text>}
                            renderItem={({ item }) => <ItemCell data={item} onPressHandle={this.onPress} ></ItemCell>}
                            refreshControl={
                                <RefreshControl
                                    style={flatListStyles.refreshControlBase}
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh}
                                    title="Loading..."
                                    colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                                />
                            }
                        />
                    </View>
                </ScrollableTabView> */}
            </View>
        );
    }
    componentDidMount() {
        this.get();
    }
}

const flatListStyles = StyleSheet.create({
    base: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    refreshControlBase: {
        backgroundColor: 'transparent'
    },
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    }
});
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 22
//     },
//     sectionHeader: {
//         paddingTop: 2,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingBottom: 2,
//         fontSize: 14,
//         fontWeight: 'bold',
//         backgroundColor: 'skyblue',
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
// });