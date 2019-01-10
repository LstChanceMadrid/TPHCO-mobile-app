import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import styles from './styles/styles'


export default class EnergyTechheader extends Component {

    render() {
        return (
            <View style={styles.eTHContainer}>
                <Text style={styles.eTHQuestion}>Is this email not displaying correctly?</Text>
                <Text style={styles.eTHBrowser}>View it in your browser.</Text>
                <View style={styles.eTHLogoWrapper}>
                    <Image style={styles.eTHLogo} resizeMode={'contain'} source={require('../../styles/images/energy-tech-header.png')} />
                </View>
            </View>
        )
    }
}