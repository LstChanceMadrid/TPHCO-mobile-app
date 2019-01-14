import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AddStock from './AddStock';
import RemoveStock from './RemoveStock';
import * as actions from '../../store/actions'

class stockModalToggle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            isAddVisible: false,
            isRemoveVisible: false,
            handleTicker: ''
        }
    }

    render() {
        const alterVisibility = (type) => {
            if (type === "add") {
                this.setState({
                    ...this.state,
                    isAddVisible: true,
                    isRemoveVisible: false,
                    handleTicker: ''
                }) 
            }

            if (type === "remove") {
                this.setState({
                    ...this.state,
                    isRemoveVisible: true,
                    isAddVisible: false,
                    handleTicker: ''
                })
            }

            if (type === "close") {
                this.setState({
                    ...this.state,
                    isAddVisible: false,
                    isRemoveVisible: false,
                    handleTicker: ''
                })
            }
        }

        const addStock = () => {
            axios.post('http://localhost:5000/newStock', {
                username: this.props.username,
                handleTicker: this.state.handleTicker.toUpperCase()
            }).then(response => {
                console.log(response.data)
            }).catch(e => console.log(e))

            // alterVisibility()
        }
        const removeStock = () => {
            axios.post('http://localhost:5000/removeStock', {
                username: this.props.username,
                handleTicker: this.state.handleTicker.toUpperCase()
            }).then(response => {
                console.log(response.data)
            }).catch(e => console.log(e))

            // alterVisibility()
        }
            

        if  (this.state.isAddVisible) {
            return (
                <View style={styles.stockModalToggle}>
                    <View style={styles.modal}>
                        <View style={styles.buttonBorder}>
                            <TouchableOpacity onPress={() => alterVisibility('close')} style={styles.addButton}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.ticker}>Ticker:</Text>

                            <TextInput style={styles.input} autoCapitalize={'none'} placeholder={'Ticker'} placeholderTextColor={'rgba(0, 0, 0, 0.5)'} onChangeText={(handleTicker) => this.setState({...this.state, handleTicker})} />
                        </View>
                        <View style={styles.buttonBorder}>
                            <TouchableOpacity onPress={() => addStock()} style={styles.addButton}>
                                <Text style={styles.buttonText}>Add Stock</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> 
            )
        } else if (this.state.isRemoveVisible) {
            return (
                <View style={styles.stockModalToggle}>
                    <View style={styles.modal}>
                        <View style={styles.buttonBorder}>
                            <TouchableOpacity onPress={() => alterVisibility('close')} style={styles.addButton}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.ticker}>Ticker:</Text>

                            <TextInput style={styles.input} autoCapitalize={'none'} placeholder={'Ticker'} placeholderTextColor={'rgba(0, 0, 0, 0.5)'} onChangeText={(handleTicker) => this.setState({...this.state, handleTicker})} />
                        </View>
                        <View style={styles.buttonBorder}>
                            <TouchableOpacity onPress={() => removeStock()} style={styles.addButton}>
                                <Text style={styles.buttonText}>Remove Stock</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> 
            )
        } else {
            return (
                <View style={styles.stockModalToggle}>
                    <View style={styles.buttonBorder}>
                        <TouchableOpacity onPress={() => alterVisibility('add')}>
                            <Text style={styles.buttonText}>Add Stock</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.buttonBorder}>
                        <TouchableOpacity onPress={() => alterVisibility('remove')}>
                            <Text style={styles.buttonText}>Remove Stock</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            )
        } 
    }
}
const mapStateToProps = state => {
    return {
        isAddVisible: state.isAddVisible,
        isRemoveVisible: state.isRemoveVisible
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openAddStock: () => dispatch(actions.openAddStock()),
        openRemoveStock: () => dispatch(actions.openRemoveStock())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(stockModalToggle)


const styles = StyleSheet.create({
    stockModalToggle: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(15, 15, 15, 1)',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 96,
        zIndex:1,
        paddingBottom: 2
    },
    buttonText: {
        color: 'rgba(150, 150, 150, 1)',
        flex: 1,
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
        // fontWeight: 'bold',
        padding: 2
    },
    modal: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'rgba(15, 15, 15, 1)',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'white',
        padding: 2,
        paddingLeft: 10,
        borderRadius: 5,
        width: 100
    },
    ticker: {
        color: 'rgba(150, 150, 150, 1)',
        fontWeight: 'bold',
        padding: 2,
        paddingRight: 4
    },
    buttonBorder: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2
    }

})