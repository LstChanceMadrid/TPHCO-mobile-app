import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../news/weekly/styles/styles'


class ETech20181218 extends Component {

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.storyWrapper}>
                <Text style={styles.title}></Text>
                <Text style={styles.by}>By <Text style={styles.author}></Text></Text>
                <Text style={styles.paragraph}></Text>
            </View>
            </View>
        )
    }
}


export default ETech20181218