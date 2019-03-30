import React, { Component } from 'react'
import axios from 'axios'
import { TODAY } from '../../../../../constants/time'
import { URL } from '../../../../../constants/constants'

export default class NewIssue extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleInput = (e) => {
        let targetArray = []
        if (e.target.value.trim() === '') {
            delete this.state.issue[e.target.name]
            console.log(this.state)
        } else {
            this.setState({
                ...this.state,
                issue: {
                    ...this.state.issue,
                    [e.target.name]: e.target.value
                }
            })
        }        
    }

    imageParagraphLoop = (first, last) => {
        let imageParagraph = []

        for (let i = first; i <= last; i++) {
            let duo = 
                <div key={i} className='issue-image-paragraph'>
                    <div className='issue-image'>
                        <label className='energy-tech-label'>Image {i}:</label>
                        <input className='issue-input image-input' type='url' name={`image${i}`} placeholder={`Image ${i} url`} onChange={(e) => this.handleInput(e)} />
                    </div>

                    <div className='issue-paragraph'>
                        <label className='energy-tech-label paragraph-label'>Paragraph {i}:</label>
                        <textarea className='issue-input paragraph-input'  type='text' name={`paragraph${i}`} onChange={(e) => this.handleInput(e)} />
                    </div>
                </div>

            imageParagraph.push(duo)
        }
        return imageParagraph
    }

    listItemLoop = () => {
        let list = []

        for (let i = 1; i <= 20; i++) {
            let item = 
                <div key={i} className='issue-listitem'>
                    <label className='energy-tech-label'>List Item {i}:</label>
                    <textarea className='listitem-input' type='text' name={`listitem${i}`} onChange={(e) => this.handleInput(e)} />
                </div>

            list.push(item)
        }

        return list
    }

    addIssue = () => {
        axios.post(URL.ADMIN_ADD_ISSUE_URL, {
            issue: this.state.issue
        }).then(response => {
            this.setState({
                message: response.data.message
            })
        }).catch(e => {
            console.log(e)
            this.setState({
                ...this.state,
                message: `There seems to be an error`
            })
        })
    }

    setStateFillers = (imageQuan, paragraphQuan, listitemsQuan) => {
        for (let i = 1; i <= imageQuan; i++) {
            let image = `image${i}`

            this.setState({
                ...this.state,
                [image]: '',
            })
        }

        for (let i = 1; i <= paragraphQuan; i++) {
            let paragraph = `paragraph${i}`

            this.setState({
                ...this.state,
                [paragraph]: '',
            })
        }

        for (let i = 1; i <= listitemsQuan; i++) {
            let listitem = `listitem${i}`

            this.setState({
                ...this.state,
                [listitem]: '',
            })
        }
    }

    yearMonthDay = () => {
        let day = TODAY.DAY
        let month = TODAY.MONTH
        let year = TODAY.YEAR
        
        let yearMonthDay = `${year}${month}${day}`

        this.setState({
            ...this.state,
            yearMonthDay
        })
    }

    componentDidMount = async () => {
        this.yearMonthDay()
        // this.setStateFillers(10, 10, 20)
    }

  render() {
    console.log(this.state)
    return (
      <div className='container'>
        <h1>New Issue Page</h1>

        <h2>Do Not Refresh Page. Refreshing page will erase any currently input date.</h2>

        <p>The fields "Title", "Week", "Author", and "Source" are required</p>
        
        <div>
            <p>Instructions:</p>

            <p><b>Enter the week as YearMonthDay format.</b></p>

            <p>- (Ex. {this.state.yearMonthDay})</p>

            <p><b>Enter all information exactly how you want it to appear on the E-Tech issue. Capitalization and grammar matters.</b></p>

            <p><b>Leaving a portion blank will skip the section with no penalty and continue filling in the next filled sections.</b></p>

            <p>- (Ex. filling paragraph 1, paragraph 4, and paragraph 9 will look the same as filling out paragraph 1, paragraph 2, and paragraph 3. filling out paragraph 1, image 4, paragraph 4, and paragraph 10 will look the same as filling out paragraph 1, image 2, paragraph 2, and paragraph 3.)</p>

            <p><b>The Video will show up right underneath the title.</b></p>

            <p><b>Each image will appear above the next paragraph entered. for an image and/or video, right click the image/video and click "Copy Image Address" to get the proper URL to the image</b></p>

            <p><b>If you choose to have a list of items does change this slightly, List items will show up inbetween paragraph 5 and image6/paragraph 6. Put each list item in. The portion you want to appear above the list use in the sections above listitem1. The portion you want below the List, enter starting at image6 and below.</b></p>

            <p></p>
        </div>

        <div className='new-issue-form'>
            <div className='issue-title'>
                <label className='energy-tech-label'>Title:</label>

                <input className='issue-input' type='text' name='title' placeholder='Issue Title' onChange={(e) => this.handleInput(e)} required autoFocus />
            </div>

            <div className='issue-week-author'>
                <div className='issue-week'>
                    <label className='energy-tech-label'>Week:</label>

                    <input className='issue-input' type='text' name='week' onChange={(e) => this.handleInput(e)} placeholder={`ex. ${this.state.yearMonthDay}`} min={8} max={8} required />
                </div>

                <div className='issue-author'>
                    <label className='energy-tech-label'>Author:</label>

                    <input className='issue-input' width='contain' type='text' name='author' placeholder='Author' onChange={(e) => this.handleInput(e)} required />
                </div>
            </div>

            {this.imageParagraphLoop(1,5)}

            {this.listItemLoop()}

            {this.imageParagraphLoop(6,10)}

            <div className='issue-title'>
                <label className='energy-tech-label'>Source:</label>

                <input className='issue-input' type='text' name='source' placeholder='Issue Source' onChange={(e) => this.handleInput(e)} required />
            </div>
        </div>

        <button onClick={() => this.addIssue()}>Add Issue</button>

        <p>{this.state.message}</p>
      </div>
    )
  }
}
