import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../styles/styles'


class NewsHeader extends Component {
    render() {
        return (
            <View style={styles.nHContainer}>
                <Text style={styles.nHTitle}>TOP STORIES</Text>

                <Text style={styles.nHDate}>From NewsAPI.org</Text>
            </View>
        )
    }
}

export default NewsHeader