import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Image, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Footer from './footers/Footer'
import News from './news/NewsContainer'
import StocksContainer from './stocks/StocksContainer'




class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state

    }
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })
  }
  
  render() {

    return (
      <View style={styles.container}>

        <StocksContainer username={this.props.username} />

        <News />
        
        <Image style={styles.logo} resizeMode={'contain'} source={require('../styles/images/tphco.png')} />

        <Footer component={this.props.componentId}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    // username : state.username
  }
}

export default connect(mapStateToProps)(Dashboard)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    paddingBottom: 75
  },
  logo: {
    width: 300,
    height: 200,
    // tintColor: 'rgba(0, 0, 0, 1)',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text : {
    color: 'white'
  }
})
