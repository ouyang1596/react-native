import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
export default class CategoryItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.onPressHandle(this.props.data) }}>
                <View>
                    <View style={styles.base}>
                        <Text style={styles.title}>{this.props.data.name}</Text>
                    </View>
                    <View style={{ height: 0.5, backgroundColor: '#0ff' }}></View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: 'black'
    },
});