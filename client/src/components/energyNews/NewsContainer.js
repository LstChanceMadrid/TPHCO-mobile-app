import React, { Component } from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View} from 'react-native';
import NewsHeader from './header/EnergyNewsHeader'
import NewsArticle from './newsArticle/NewsArticle';
import axios from 'axios'
import BottomBanner from '../global/BottomBanner';
import { URL } from '../../constants/constants'

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

        axios.post(URL.NEWS_ARTICLES_URL).then(response => {

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
            <View style={styles.container}>
                <NewsHeader />
                
                <ScrollView style={styles.newsScroll}>
                    {articleArray}
                </ScrollView>

                <BottomBanner />
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
    }, 
    text : {
        color : 'white'
    }
})