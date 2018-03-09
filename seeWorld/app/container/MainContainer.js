import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
    }
    get = () => {
        return new Promise((resolve, reject) => {
            fetch('http://route.showapi.com/582-2?typeId=9&page=1&showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f', {
                method: 'GET',
            }).then((response) => {
                return response.json();
                // console.log(JSON.stringify(response));//1
                // console.log(response.contentlist);//1
                // this.setState({
                //     discounts: [
                //         { key: '大护法' },
                //         { key: '绣春刀II：修罗战场' },
                //         { key: '神偷奶爸3' },
                //         { key: '神奇女侠' },
                //         { key: '摔跤吧，爸爸' },
                //         { key: '悟空传' },
                //         { key: '闪光少女' },
                //     ]
                // })
            }).then((responseData) => {
                console.log(responseData.showapi_res_body.pagebean.contentlist);
                this.setState({ discounts: responseData.showapi_res_body.pagebean.contentlist });
                // console.log(JSON.stringify(response));//1
                // console.log(response.contentlist);//1
                // this.setState({
                //     discounts: [
                //         { key: '大护法' },
                //         { key: '绣春刀II：修罗战场' },
                //         { key: '神偷奶爸3' },
                //         { key: '神奇女侠' },
                //         { key: '摔跤吧，爸爸' },
                //         { key: '悟空传' },
                //         { key: '闪光少女' },
                //     ]
                // })
            }).catch((err) => {//2
                console.error(err);
            });
        });
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={flatListStyles.container}>
                <Text style={flatListStyles.item} onPress={this.get}>fetch请求</Text>
                <FlatList
                    data={this.state.discounts}
                    renderItem={({ item }) => <Text style={flatListStyles.item}>{item.title}</Text>}
                />
            </View>
            // <View style={styles.container}>
            //     <Text style={styles.item} onPress={this.get}>fetch请求</Text>
            //     <SectionList
            //         sections={[
            //             { title: 'L', data: [{ key: '李四' }] },
            //             { title: 'W', data: [{ key: '王五' }] },
            //             { title: 'Z', data: [{ key: '赵六' }, { key: '张三' }] },
            //         ]}
            //         renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
            //         renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            //     />
            // </View >
        );
    }
}

const flatListStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
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