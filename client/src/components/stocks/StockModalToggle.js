import React, {Component} from 'react';
import { connect } from 'react-redux'
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AddStock from './AddStock';
import RemoveStock from './RemoveStock';
import * as actions from '../../store/actions'

class stockModalToggle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            isAddVisible: false
        }
    }

    render() {
        const alterVisibility = (type) => {
            if (type === "add") {
                this.props.openAddStock
                this.setState({
                    ...this.state,
                    isAddVisible: true
                }) 
            }

            if (type === "remove") {
                this.props.openRemoveStock
                this.setState({
                    ...this.state,
                    isRemoveVisible: true
                })
            }
        }
            

        if  (this.props.isAddVisible) {
            return (
                <View style={styles.stockModalToggle}>
                    <AddStock />
                </View> 
            )
        } else if (this.props.isRemoveVisible) {
            return (
                <View style={styles.stockModalToggle}>
                    <RemoveStock />
                </View> 
            )
        } else {
            return (
                <View style={styles.stockModalToggle}>
                    <TouchableOpacity onPress={this.props.openAddStock}>
                        <Text style={styles.buttonText}>Add Stock</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.openRemoveStock}>
                        <Text style={styles.buttonText}>Remove Stock</Text>
                    </TouchableOpacity>
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
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        padding: 2
    }
})