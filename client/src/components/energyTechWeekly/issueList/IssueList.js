import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { actionType } from '../../../store/actionTypes/actionTypes';
import BottomBanner from '../../global/BottomBanner';
import { URL } from '../../../constants/constants'

class IssueList extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  componentDidMount = () => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: 'Weekly Issues',
          color: 'white',
          alignment: 'center'
        }
      }
    })
  }

  //
  // sets the week to the issue selected and selects the issue and alternate stories to the issue
  //

  selectIssue = (week) => {
    this.props.setWeek(week)
    
    axios.post(URL.ENERGY_TECH_WEEKLY_URL, {
      week: week
    }).then(response => {
      this.props.setIssue(response.data.issue)
    }).catch(e => console.log(e))

    axios.post(URL.ALT_STORY_URL, {
      week: week
    }).then(response => {
      this.props.setAltStories(response.data.altStory)
    }).catch(e => console.log(e))

    Navigation.pop(this.props.componentId)
  }

  //
  // the list of issues and how they are formatted
  //
  
  issueList = () => {
    let issueList = []

    this.props.issueTitles.map((issue, i) => {
      let year = issue.week.slice(0,4)
      let month = issue.week.slice(4,6)
      let day = issue.week.slice(6,9)

      let issueOption = (
        <TouchableOpacity key={i} onPress={() => this.selectIssue(issue.week)}>
          <View style={styles.issueContainer}>
            <Text style={styles.title}>{issue.title}</Text>
            <Text style={styles.week}>{month}/{day}/{year}</Text>
          </View>
        </TouchableOpacity>
      )
      issueList.push(issueOption)
    })
    return issueList
  }
    
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.issueList()}
        </ScrollView>

        <View Style={styles.banner}>
          <BottomBanner />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    week: state.week
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAltStories: (value) => dispatch({type: actionType.SET_ALT_STORIES, value}),
    setIssue: (value) => dispatch({type: actionType.ISSUE_INFORMATION, value}),
    setWeek: (value) => dispatch({type: actionType.SET_WEEK, value})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(IssueList)

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  issueContainer: {
    borderBottomWidth: 1,
    backgroundColor: 'black',
    padding: 5,
    borderBottomColor: 'rgba(55, 55, 55, 1)'
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  week: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(200, 200, 200, 1)'
  },
  banner: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 55, 80, 1)',
    paddingBottom: 10,
    width: '100%',
    bottom: 0
  }
})