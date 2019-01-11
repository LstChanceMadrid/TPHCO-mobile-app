import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AddNewStock from './AddNewStock';

export default class AddStockToggle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            isRemoveVisible: false,
            isAddVisible: false
        }
    }

    render() {
        const alterVisibility = (type) => {
            if (type === "add") {
                this.setState({
                    ...this.state,
                    isAddVisible: true
                }) 
            }

            if (type === "remove") {
                this.setState({
                    ...this.state,
                    isRemoveVisible: true
                })
            }
        }


            

        if  (this.state.isAddVisible) {
            return (
                <View style={styles.stockModalToggle}>
                    <AddNewStock />
                </View> 
            )
        } else if (this.state.isRemoveVisible) {
            return (
                <View style={styles.stockModalToggle}>
                    <Text style={styles.buttonText}>HHHIIIIIIIIIIIIIII</Text>
                </View> 
            )
        } else {
            return (
                <View style={styles.stockModalToggle}>
                    <TouchableOpacity onPress={() => alterVisibility('add')}>
                        <Text style={styles.buttonText}>Add Stock</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alterVisibility('remove')}>
                        <Text style={styles.buttonText}>Remove Stock</Text>
                    </TouchableOpacity>
                </View> 
            )
        } 
    }
}

const styles = StyleSheet.create({
    stockModalToggle: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'blue',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 96,
        zIndex:1
    },
    buttonText: {
        color: 'white',
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
    }
})