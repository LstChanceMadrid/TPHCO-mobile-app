import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import * as screen from '../constants/screenLayouts'
import { AsyncStorage, Image, StyleSheet, Text, View } from 'react-native'
import { actionType } from '../store/actionTypes/actionTypes';
import { postLoginNavigation } from '../constants/navigation'
import { URL } from '../constants/constants'

class Initializing extends Component {

    _retrieveAsyncStorageLoginStatus = async () => {
        try {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')

            return JSON.parse(isLoggedIn)
        } catch (error) {
            console.log(error)
        }
    }
    
    _retrieveUser = async () => {
        try {
            const userString = await AsyncStorage.getItem('user')

            const user = JSON.parse(userString)
    
            this.props.setUser(user)

        } catch (error) {
            console.log(error)
        } 
    }

    _retrieveUserSettings = async () => {
        try {
            // let userSettings = await AsyncStorage.getAllKeys().then(res => {
            //     console.log(res)
            // })

            let defaultTickers = await AsyncStorage.getItem('defaultTickers')
            console.log(defaultTickers)
            this.props.setDefaultTickers(JSON.parse(defaultTickers))
            
        } catch (error) {
            console.log(error)
        }
    }

    _retrieveNewTickers = async () => {
        axios.post(URL.STORE_TICKERS_URL).then(async response => {
            let defaultTickersArray = []
            console.log(this.props.defaultTickers)
        
            for (let i = 0; i <= response.data.defaultTickers - 1; i++) {
                if (!response.data.defaultTickers[i].ticker === this.props.defaultTickers[i].ticker) {
                    console.log('doesnt match')
                } else {
                    console.log('matches')
                }
            }
            // await response.data.defaultTickers.map(item => {
            //     for (let i = 0; i < this.props.defaultTickers.length - 1; i++) {
            //         console.log(item)
            //         if (!item.ticker) {
            //             item.isActive = true
            //             defaultTickersArray.push(item)
            //         } else {
            //             defaultTickersArray.push(item)
            //         }
            //     }
            // })

            console.log(defaultTickersArray)
            return defaultTickersArray = this.props.defaultTickers
            
        }).then(defaultTickersArray => {
            console.log(defaultTickersArray)

            AsyncStorage.setItem("defaultTickers", JSON.stringify(defaultTickersArray))

            this.props.setDefaultTickers(defaultTickersArray)

        }).catch(e => console.log(e))
      }

    componentDidMount = async () => {

        //
        // check if user is already logged in
        //

        let status = await this._retrieveAsyncStorageLoginStatus().then(response => {
            return response
        })       

        if (status === true) {
        // if (false) {
            await this._retrieveUser()
            await this._retrieveUserSettings()
            // await this._retrieveNewTickers()
            
            await axios.post(URL.ENERGY_TECH_WEEKLY_URL, {
                week: this.props.week
            }).then(response => {
                this.props.setIssue(response.data.issue)
            }).catch(e => console.log(e))

            await axios.post(URL.ALT_STORY_URL, {
                week: this.props.week
            }).then(response => {
                this.props.setAltStories(response.data.altStory)
            }).catch(e => console.log(e))

            await axios.post(URL.ENERGY_TECH_WEEKLY_TITLES_URL).then(response => {
            this.props.setIssueTitles(response.data.title)
            }).catch(e => console.log(e))

            await axios.post(URL.TIMESTAMP_URL, {
                username: this.props.user.username,
                email: this.props.user.email
            }).catch(e => console.log(e))

            Navigation.setDefaultOptions({
                statusBar: {
                    style: 'light'
                }
            })

            //
            // sends the user to the full application stack
            //

            postLoginNavigation()
           
        } else {

            //
            // sends the user to credentials stack
            //

            Navigation.setRoot({
                root : {
                    stack: {
                        options: {
                            statusBar: {
                                style: 'light'
                            },
                            topBar: {
                                drawBehind: true,
                                visible: false,
                            }
                        },
                        id: 'PreLoginStack',
                        children: [
                            {component: screen.forgotPassword},
                            {component : screen.register},
                            {component : screen.login}
                        ]
                    }
                }
            })
        }     
    }

     render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} resizeMode={'contain'} source={require('../assets/tphco.png')} />

                <Text style={styles.loading}> Loading... </Text>
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
        setDefaultTickers: (value) => dispatch({type: actionType.DEFAULT_TICKERS, value}),
        setUser: (value) => dispatch({type: actionType.USER, value}),
        setIssue: (value) => dispatch({type: actionType.ISSUE_INFORMATION, value}),
        setAltStories: (value) => dispatch({type: actionType.SET_ALT_STORIES, value}),
        setIssueTitles: (value) => dispatch({type: actionType.SET_ISSUE_TITLES, value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Initializing)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 55, 80, 1)'
    },
    logo: {
        position: 'absolute',
        top: 0,
        width: '90%',
        height: '45%',

    },
    loading: {
        color: 'white',
        fontSize: 24
    }
})