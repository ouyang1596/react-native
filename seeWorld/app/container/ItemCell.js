import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    SectionList,
    Image
} from 'react-native';
import moment from 'moment';
require('moment/locale/zh-cn');//moment汉化
export default class Item extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <View>
                <View style={styles.root}>
                    <Image style={styles.imagestyle} source={{ uri: this.props.data.contentImg }} />
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.props.data.title}</Text>
                        <View style={styles.itemContent}>
                            <Text style={styles.userName}>{this.props.data.userName}</Text>
                            <View style={{ flex: 1 }}></View>
                            <Text>{moment(this.props.data.date).fromNow()}</Text>
                        </View>
                    </View>
                </View >
                <View style={styles.divider}></View>
            </View>
        );
    }
    componentDidMount() {
        console.log("componentDidMount");
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        color: 'black'
    },
    divider: {
        height: 0.5,
        backgroundColor: '#0ff',
    },
    itemContent: {
        marginTop: 4,
        flexDirection: 'row',
    },
    userName: {
        flex: 1,
        fontSize: 14,
        color: '#87CEFA',
    },
    imagestyle: {
        width: 60,
        height: 60,
    }
});