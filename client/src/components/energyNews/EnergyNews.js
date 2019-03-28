import React, {Component} from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import NewsArticle from './newsArticle/NewsArticle';
import axios from 'axios'
import BottomBanner from '../global/BottomBanner'
import { URL } from '../../constants/constants'


class NewsContainer extends Component {
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
            articles: response.data.articles
        })
      
      }).catch(e => console.log(e))
    }

    componentDidMount = () => {
        this.grabArticles()
    }

    render() {
        let articleArray = []

        this.state.articles.map((article, i) => {
            let articleData = <NewsArticle key={i} article={article} />
            articleArray.push(articleData)
        })

        return (
            <View style={styles.container}>
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
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    newsScroll: {
        width: '100%',
        height: '100%',
    }, 
    text : {
        color : 'white'
    }
})