import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { actionType } from '../../../store/actionTypes/actionTypes';
import { URL } from '../../../constants/constants'

class AddStock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state
        }
    }

    render() {

        const addStock = () => {
            axios.post(URL.ADD_STOCK_URL, {
                username: this.props.user.username,
                newTicker: this.state.newTicker
            }).then(response => {
                console.log(response.data)
            }).catch(e => console.log(e))
        }

        return (
            <View style={styles.modal}>
                    <TouchableOpacity onPress={() => this.props.closeAddStock()} style={styles.addButton}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Text style={{color: 'blue'}}>Ticker:</Text>

                    <TextInput style={styles.input} autoCapitalize={'none'} placeholder={'Ticker'} placeholderTextColor={'rgba(0, 0, 0, 0.5)'} onChangeText={(newTicker) => this.setState({...this.state, newTicker})} />
                </View>
                    <TouchableOpacity onPress={() => addStock()} style={styles.addButton}>
                        <Text>Add Stock</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        isRemoveVisible: state.isRemoveVisible,
        isAddVisible: state.isAddVisible
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeAddStock: () => dispatch({type: actionType.CLOSE_ADD_STOCK})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStock)


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
    }
})