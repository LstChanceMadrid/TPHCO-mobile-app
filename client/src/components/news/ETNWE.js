import React, { Component } from 'react'
import axios from 'axios'
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export default class ETNWE extends Component {
  constructor(props) {
      super(props)
      this.state = {
          ...this.state
      }
    }



    componentWillMount = () => {
        axios.get('https://mailchi.mp/0c3ae53337a9/tudor-pickering-holt-energy-tech-5-22-18?e=937331d9a7').then(response => {
            console.log(response.data)
            this.setState({...this.state, data: response.data})
        }).catch(e => console.log(e))
    }


      render() {
        
          
        
        
        return (
            <Text style={{color:'white', zIndex: 20}}>Some placeholder</Text>
        )


      }
  }