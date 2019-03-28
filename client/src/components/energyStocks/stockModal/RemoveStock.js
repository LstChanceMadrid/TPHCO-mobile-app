import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { actionType } from '../../../store/actionTypes/actionTypes'
import { URL } from '../../../constants/constants'

class RemoveStock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            isVisible: true
        }
    }

    render() {

        const removeStock = () => {
            axios.post(URL.REMOVE_STOCK_URL, {
                username: this.props.user.username,
                newTicker: this.state.newTicker
            }).then(response => {
                console.log(response.data)
            }).catch(e => console.log(e))
        }
        

        return (
            <View style={styles.modal}>
            <TouchableOpacity onPress={() => this.props.closeRemoveStock()} style={styles.addButton}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Text style={{color: 'blue'}}>Ticker:</Text>

                    <TextInput style={styles.input} autoCapitalize={'none'} placeholder={'Ticker'} placeholderTextColor={'rgba(0, 0, 0, 0.5)'} onChangeText={(newTicker) => this.setState({...this.state, newTicker})} />
                </View>
                    <TouchableOpacity onPress={() => removeStock()} style={styles.addButton}>
                        <Text>Remove Stock</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeRemoveStock: () => dispatch({type: actionType.CLOSE_REMOVE_STOCK})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveStock)

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