import React, {Component} from 'react';
import {Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class AddStockToggle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
        }
    }




    render() {
        if (this.props.isVisible) {
            return null
        } else {
            return (
                <Text style={styles.buttonText}>Add New Stock</Text>
            )
        }
    }
}

const styles = StyleSheet.create({
    buttonText: {
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
    }
})