import React, {Component} from 'react';
import {Dimensions, StyleSheet, ScrollView, Text, View} from 'react-native';
import NewsHeader from '../headers/NewsHeader'
import NewsArticle from './NewsArticle';
import axios from 'axios'

class NewsContainer extends Component {
    _isMounted=false

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            articles: []
        }
    }

    grabArticles = () => {

        axios.post('http://localhost:5000/api/newsArticles').then(response => {

        this.setState({...this.state,
            articles: response.data.articles.articles
        })
        
        }).catch(e => console.log(e))
    }

    componentDidMount = () => {

        this._isMounted=true

        this.grabArticles()
    }

    componentWillUnmount = () => {
        this._isMounted=false
    }

    render() {
        let articleArray = []

        this.state.articles.map((article, i) => {
            let articleData = <NewsArticle key={i} article={article} />
            articleArray.push(articleData)
        })

        return (
            <View height={Dimensions.get('screen').height/2.5} style={styles.container}>
                <NewsHeader />
                
                <ScrollView style={styles.newsScroll}>
                    {articleArray}
                    <View style={{height:45}}></View>
                </ScrollView>
            </View>
        )
    }
}

export default NewsContainer

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%'

    },
    newsScroll: {
        width: '100%',
        height: '100%',
    }, 
    text : {
        color : 'white'
    }
})