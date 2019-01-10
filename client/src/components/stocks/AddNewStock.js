import React, {Component} from 'react';
import {Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class AddNewStock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            isVisible: true
        }
    }




    render() {
        const alterVisibility = () => {
            this.setState({
                ...this.state,
                isVisible: false
            })
        }

        if (this.props.isVisible && this.state.isVisible) {
            return (
                <View style={styles.modal}>
                    <View style={styles.modal}>
                    <View style={styles.inputContainer}>
                        <Text style={{color: 'blue'}}>Ticker:</Text>

                        <TextInput style={styles.input} autoCapitalize={'none'} placeholder={'Ticker'} placeholderTextColor={'rgba(0, 0, 0, 0.5)'} onChangeText={(newTicker) => this.setState({...this.state, newTicker})} />
                    </View>
                        <TouchableOpacity onPress={() => alterVisibility()} style={styles.addButton}>
                            <Text>Add Stock</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection:'row',
        marginTop: 75,
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50,
        zIndex: 1

    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    addButton: {
        backgroundColor: 'yellow'
    }
})