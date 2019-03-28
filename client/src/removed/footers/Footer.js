import React, {Component} from 'react';
import {Linking, Text, View, TouchableOpacity} from 'react-native';
import { Navigation } from 'react-native-navigation';
import styles from './styles/styles'


class Footer extends Component {

    render() {

        const footerLayout = (middleButton) => {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (this.props.component === "EnergyStocks") {
                            Navigation.push(this.props.component, {
                                component: {
                                    name: 'EnergyTechWeekly',
                                    options: {
                                        topBar : {
                                            visible : 'false'
                                            }
                                        }
                                    }
                                })
                            } else {
                                return
                            }
                        }
                    }>
                        <Text style={styles.buttonText}>Energy Technology</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (this.props.component === "EnergyStocks") {
                            {Linking.openURL('https://www.tphco.com/')}
                        } else {
                            Navigation.pop(this.props.component)
                        }
                    }}>
                        <Text style={styles.buttonText}>{middleButton}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Upcoming TPH/PWP Event Schedule</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        if (this.props.component === "EnergyStocks") {
            let middleButton = "Go To TPH Website"
            
            return footerLayout(middleButton)

        } else {
            let middleButton = "Back To Home Screen"

            return footerLayout(middleButton)
        }
    } 
}

export default Footer