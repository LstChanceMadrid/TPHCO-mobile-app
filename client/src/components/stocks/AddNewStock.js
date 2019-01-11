import React, {Component} from 'react';
import axios from 'axios'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

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

        const addStock = () => {
            axios.post('http://localhost:5000/newStock', {
                username: this.props.username,
                newTicker: this.state.newTicker
            }).then(response => {
                console.log(response.data)
            }).catch(e => console.log(e))

            // alterVisibility()
        }
        

            return (
                <View style={styles.modal}>
                    <View style={styles.modal}>
                    <View style={styles.inputContainer}>
                        <Text style={{color: 'blue'}}>Ticker:</Text>

                        <TextInput style={styles.input} autoCapitalize={'none'} placeholder={'Ticker'} placeholderTextColor={'rgba(0, 0, 0, 0.5)'} onChangeText={(newTicker) => this.setState({...this.state, newTicker})} />
                    </View>
                        <TouchableOpacity onPress={() => addStock()} style={styles.addButton}>
                            <Text>Add Stock</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50,
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