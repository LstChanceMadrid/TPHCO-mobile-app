import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Image, Text, View } from 'react-native'
import { styles } from './styles/styles'
import EnergyTechAltStoryContainer from '../altStory/EnergyTechAltStoryContainer'



class Issue extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.state
    }
  }

  image = (issue, x) => {
    let image = `image${x}`
    if (issue[image] !== null) {
      return <View key={'i' + x}><Image style={styles.image} width={'100%'} resizeMode={'contain'} source={{uri: issue[image]}} /></View>
    } else {
      return <View key={'i' + x}></View>
    }
  }

  paragraph = (issue, x) => {
    let paragraph = `paragraph${x}`

    if (issue[paragraph] !== null) {
      return <Text key={'p' + x} style={styles.paragraph}>{issue[paragraph].replace(/(&-&)/g, "'")}</Text>
    } else {
      return <View key={'p' + x}></View>
    }
  }

  FlatList = (issue, x) => {
    items = []
    if (issue.listitem1 !== null) {
      const listItem = (issue, x) => {
        let listItem = `listitem${x}`
        if (issue[listItem] !== null) {
          items.push({key: issue[listItem].replace(/(&-&)/g, "'"), id: x})
        }
      }

      for (let i = 1; i <= 20; i++) {
        listItem(issue, i)
      }
    }

    return <FlatList
              key={x}
              style={styles.list}
              data={items}
              renderItem={({item, index}) => <Text style={styles.listItem}>{index + 1}. {item.key}</Text>} 
            />
  }
  
  
  issueInformation = () => {
    let issue = this.props.issue
    let issueInformation = []

    issueInformation.push(<Text key={'title'} style={styles.title}>{issue.title}</Text>)
    
    issueInformation.push(<View key={'author'}><Text style={styles.by}>By: <Text style={styles.author}>{issue.author}</Text></Text></View>)

    issueInformation.push(this.image(issue, 1))
    issueInformation.push(this.paragraph(issue, 1))

    issueInformation.push(this.image(issue, 2))
    issueInformation.push(this.paragraph(issue, 2))

    issueInformation.push(this.image(issue, 3))
    issueInformation.push(this.paragraph(issue, 3))

    issueInformation.push(this.image(issue, 4))
    issueInformation.push(this.paragraph(issue, 4))

    issueInformation.push(this.image(issue, 5))
    issueInformation.push(this.paragraph(issue, 5))

    issueInformation.push(this.FlatList(issue, issue.title))

    issueInformation.push(this.image(issue, 6))
    issueInformation.push(this.paragraph(issue, 6))

    issueInformation.push(this.image(issue, 7))
    issueInformation.push(this.paragraph(issue, 7))

    issueInformation.push(this.image(issue, 8))
    issueInformation.push(this.paragraph(issue, 8))

    issueInformation.push(this.image(issue, 9))
    issueInformation.push(this.paragraph(issue, 9))

    issueInformation.push(this.image(issue, 10))
    issueInformation.push(this.paragraph(issue, 10))

    return issueInformation
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.storyWrapper}>
              {this.issueInformation()}
          </View>
        </View>

        <EnergyTechAltStoryContainer />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Issue)
