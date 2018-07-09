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
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemCell from '../container/ItemCell';
import ScrollableTabView, {
    ScrollableTabBar
} from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
const REQUEST_URL = "http://route.showapi.com/582-2?typeId=";
const REQUEST_URL_PAGE = "&page=";
const REQUEST_URL_SHOWAPI = "&showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f";
let pageNo = 1;
let mItem = {};
let loadMoreTime = 0;
export default class Main extends Component {
    static navigationOptions = {
        title: '首页',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" size={25} color={tintColor} />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            discounts: [],
            tabShow: false,
            isLoading: true,
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing: false,//下拉控制
            item: {},
        };
        console.disableYellowBox = true;
    }
    getInitialState() {
        return {
            isRefreshing: false,
        };
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        pageNo = 1;
        this.get(pageNo);
    }
    get = (pageNo) => {
        return new Promise((resolve, reject) => {
            fetch(REQUEST_URL + mItem.id + REQUEST_URL_PAGE + pageNo + REQUEST_URL_SHOWAPI, {
                method: 'GET',
            }).then((response) => {
                return response.json();
            }).then((responseData) => {
                console.log(responseData.showapi_res_body.pagebean.contentlist);
                this.state.discounts.map((item) => {
                    // console.log("id==" + item.id);
                    if (pageNo > 1) {
                        //去重
                        responseData.showapi_res_body.pagebean.contentlist.map((item2) => {
                            console.log("id==" + item.id);
                            if (item.id == item2.id) {
                                responseData.showapi_res_body.pagebean.contentlist.splice(item2);
                            }
                        });
                    }
                });
                this.setState({
                    discounts: pageNo == 1 ? responseData.showapi_res_body.pagebean.contentlist : this.state.discounts.concat(responseData.showapi_res_body.pagebean.contentlist), isRefreshing: false, isLoading: false,
                    showFoot: 0,
                });

            }).catch((err) => {
                console.error(err);
            });
        });
    };

    onPress = (article) => {
        console.log("onPress = (article)");
        const { navigate } = this.props.navigation;//ES6解构赋值 navigate是navigation的一部分
        navigate('Web', { article });
    };
    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={flatListStyles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={flatListStyles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        // if ((pageNo != 1) && (pageNo >= totalPage)) {
        //     return;
        // } else {
        //     pageNo++;
        // }
        const time = Date.parse(new Date()) / 1000;
        if (time - loadMoreTime > 1) {
            //底部显示正在加载更多数据
            this.setState({ showFoot: 2 });
            //获取数据
            // this.fetchData(pageNo);
            pageNo++;
            this.get(pageNo);
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }
    _separator() {
        return <View style={{ height: 1, backgroundColor: '#999999' }} />;
    }
    render() {
        const { navigate } = this.props.navigation;
        if (this.state.tabShow) {
            return (
                <ScrollableTabView
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
                    {/* this.props.navigation.state.params.item.name */}
                    <View tabLabel={mItem.name} style={flatListStyles.base}>
                        <FlatList
                            data={this.state.discounts}
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
                            ListFooterComponent={this._renderFooter.bind(this)}
                            onEndReached={this._onEndReached.bind(this)}
                            onEndReachedThreshold={1}
                        // ItemSeparatorComponent={this._separator}
                        />
                    </View>
                </ScrollableTabView>
            );
        } else {
            return null;
        }
        // return (
        //     <View style={flatListStyles.container}>
        //         {/* <ScrollableTabView
        //             renderTabBar={() => (
        //                 <ScrollableTabBar
        //                     tabStyle={flatListStyles.tab}
        //                     textStyle={flatListStyles.tabText}
        //                 />
        //             )}
        //             tabBarBackgroundColor="#fcfcfc"
        //             tabBarUnderlineStyle={flatListStyles.tabBarUnderline}
        //             tabBarActiveTextColor="#3e9ce9"
        //             tabBarInactiveTextColor="#aaaaaa"
        //         >
        //             <Text tabLabel={"科技咖"}></Text>
        //         </ScrollableTabView> */}
        //         {/* <FlatList
        //             data={this.state.discounts}
        //             // renderItem={({ item }) => <Text style={flatListStyles.item}>{item.title}</Text>}
        //             renderItem={({ item }) => <ItemCell data={item} onPressHandle={this.onPress} ></ItemCell>}
        //             refreshControl={
        //                 <RefreshControl
        //                     style={flatListStyles.refreshControlBase}
        //                     refreshing={this.state.isRefreshing}
        //                     onRefresh={this.onRefresh}
        //                     title="Loading..."
        //                     colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
        //                 />
        //             }
        //         /> */}
        //         <ScrollableTabView
        //             renderTabBar={() => (
        //                 <ScrollableTabBar
        //                     tabStyle={flatListStyles.tab}
        //                     textStyle={flatListStyles.tabText}
        //                 />
        //             )}
        //             tabBarBackgroundColor="#fcfcfc"
        //             tabBarUnderlineStyle={flatListStyles.tabBarUnderline}
        //             tabBarActiveTextColor="#3e9ce9"
        //             tabBarInactiveTextColor="#aaaaaa"
        //         >
        //             <View tabLabel={"科技咖"} style={flatListStyles.base}>
        //                 <FlatList
        //                     data={this.state.discounts}
        //                     // renderItem={({ item }) => <Text style={flatListStyles.item}>{item.title}</Text>}
        //                     renderItem={({ item }) => <ItemCell data={item} onPressHandle={this.onPress} ></ItemCell>}
        //                     refreshControl={
        //                         <RefreshControl
        //                             style={flatListStyles.refreshControlBase}
        //                             refreshing={this.state.isRefreshing}
        //                             onRefresh={this.onRefresh}
        //                             title="Loading..."
        //                             colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
        //                         />
        //                     }
        //                 />
        //             </View>
        //         </ScrollableTabView>
        //     </View>
        // );
    }
    componentDidMount() {
        store.get('item').then((item) => {
            mItem = item;
            this.get(pageNo);
        });
        setTimeout(() => {
            this.setState({
                tabShow: true
            });
        }, 0)
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
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});