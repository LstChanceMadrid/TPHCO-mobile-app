import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';


class ETech20180410 extends Component {

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.storyWrapper}>
                <Text style={styles.title}>TITLE</Text>
                <Text style={styles.author}>By SOMEONE</Text>
                <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
            </View>
        )
    }
}


export default ETech20180410

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'rgba(106, 109, 142, 1)',
        padding: 10,
    },
    title: {
        color: 'rgba(125, 251, 250, 1)',
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 12
    },
    author: {
        color: 'rgba(200, 200, 200, 1)',
        fontSize: 13,
    },
    paragraph : {
        fontSize : 12,
        color: 'white'

    },
    storyWrapper: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        paddingBottom: 10
    }
})