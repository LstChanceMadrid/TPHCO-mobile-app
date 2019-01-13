import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class NewsArticle extends Component {

    render() {
        return (
            <View style={styles.container}>
                
                <Image style={styles.image} resizeMode={'contain'} source={require('url(../../../src/styles/images/tph-block.png')} />
                <View style={styles.newsArticle}>
                    <Text style={styles.title}>Title</Text>
                    <Text style={styles.story}>STORY OF THE ARTICLE</Text>
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(50, 50, 50, 1)',
        zIndex: 1,
        padding: 10
    },
    newsArticle: {
        flex: 1,
        paddingHorizontal: 10
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    image: {
        padding: 10
    },
    story: {
        color: 'white'
    }
})