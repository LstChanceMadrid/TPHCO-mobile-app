import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import NewsHeader from '../headers/NewsHeader'
import NewsArticle from './NewsArticle';

export default class NewsContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NewsHeader />
                
                <ScrollView>
                    <NewsArticle />
                    <NewsArticle />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%'

    },
    text : {
        color : 'white'
    }
})