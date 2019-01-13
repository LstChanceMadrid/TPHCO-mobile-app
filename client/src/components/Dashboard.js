import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Image, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Footer from './footers/Footer'
import NewsContainer from './news/NewsContainer'
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

        <StocksContainer style={styles.stocksContainer} username={this.props.username} />

        <NewsContainer style={styles.newsContainer} />

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
  stocksContainer: {
    height: '60%'
  },
  newsContainer: {
    height: '40%'
  }, 
  text : {
    color: 'white'
  }
})
