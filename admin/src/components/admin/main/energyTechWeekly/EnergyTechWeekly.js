import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { actionType } from '../../../../store/actionTypes/actionTypes';
import { connect } from 'react-redux';
import { URL } from '../../../../constants/constants'

class EnergyTechWeekly extends Component {

  getIssues = async () => {
    let issueList = []

    await axios.post(URL.ADMIN_ENERGY_TECH_WEEKLY_URL).then(response => {
      let issue = response.data.response

      issue.map((issue, i) => {
        let year = issue.week.slice(0,4)
        let month = issue.week.slice(4,6)
        let day = issue.week.slice(6,9)

        let issueItem = 
          <div key={i} className='issue-item'>
            <p>{issue.title}</p>
            <p>{month}/{day}/{year}</p>
          </div>

        
        return issueList.push(issueItem)
      })
    })

    this.props.setIssueList(issueList)
  }

  componentDidMount = () => {
    this.getIssues()
  }

  render() {
    return (
      <div>
        <h1 className='header'>Energy Tech Weekly page</h1>
        <div className='issue-list'>
        {this.props.issueList}
        </div>
        <div className='new-issue'>
        <Link to={'/admin/energyTechWeekly/newIssue'}><button>New Issue</button></Link>
        </div>
      </div>
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
    setIssueList: (value) => dispatch({type: actionType.SET_ISSUE_LIST, value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnergyTechWeekly)