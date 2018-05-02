import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class WebViewPager extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.article.userName,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" size={25} color={tintColor} />
        ),
        // headerRight: (
        //     <Icon.Button
        //         name="md-share"
        //         backgroundColor="transparent"
        //         underlayColor="transparent"
        //         activeOpacity={0.8}
        //         onPress={() => {
        //             navigation.state.params.handleShare();
        //         }}
        //     />
        // )
    });
    render() {
        const { params } = this.props.navigation.state;
        console.log("url==" + params.article.url);
        return (
            <WebView
                // ref={(ref) => {
                //     this.webview = ref;
                // }}
                style={styles.base}
                source={{ uri: params.article.url }}
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
                scalesPageToFit
                decelerationRate="normal"
                onShouldStartLoadWithRequest={() => {
                    const shouldStartLoad = true;
                    return shouldStartLoad;
                }}
                onNavigationStateChange={this.onNavigationStateChange}
                renderLoading={this.renderLoading}
            />
        );
    }
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
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