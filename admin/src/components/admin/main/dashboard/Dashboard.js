import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { actionType } from '../../../../store/actionTypes/actionTypes';
import { URL } from '../../../../constants/constants';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timestampArray: ''
        }
    }

    componentDidMount = async () => {
        await axios.post(URL.ADMIN_TIMESTAMPS_URL).then(response => {
            this.props.setTimestamps(response.data.timestamps)
        }).catch(e => console.log(e))

        this.timestampsMap()
    }

    timestampsMap = async () => {
        let timestampArray = []

        await this.props.timestamps.map((timestamp,i) => {
            return timestampArray.push(
                <div key={i}>
                    <p>{timestamp.username} - total timestamps: {timestamp.timestamp.length}</p>
                    <p>{timestamp.timestamp}</p>
                </div>
            )
        })

        this.setState({
            ...this.state,
            timestampArray: timestampArray
        })
    }
    
  render() {
    return (
      <div>
        <p>Dashboard page</p>
        {this.state.timestampArray}
        <p>Dashboard page</p>
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
        setTimestamps: (value) => dispatch({type: actionType.TIMESTAMPS, value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
