import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import NewsHeader from '../headers/NewsHeader'

export default class News extends Component {
    render() {
        return (
            <View>
                <NewsHeader />
                
                <ScrollView>
                    <Text style={styles.text}>News API</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text : {
        color : 'white'
    }
})