import React, {Component} from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class NewsArticle extends Component {

   constructor(props) {
       super(props)
       this.state = {
       ...this.state
       }
   }

    articleImages = () => {
        if (this.props.article.urlToImage === null) {
            return <View style={styles.image} width={Dimensions.get('screen').width/3} resizeMode={'contain'}  />
        } else {
            return <Image style={styles.image} width={Dimensions.get('screen').width}  resizeMode={'contain'} source={{uri : this.props.article.urlToImage}} />
        }
    }

    articleContent = () => {
        return (
            <View style={styles.newsArticle}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.article.title}</Text>
                <Text style={styles.story} numberOfLines={4} ellipsizeMode={'tail'}>{this.props.article.description}</Text>
            </View>
        )
    }

    render() {
        let articleId = this.props.article.source.id
        if (articleId === 'reuters') {
            return (
                <TouchableOpacity style={styles.reutersContainer} onPress={() => Linking.openURL(`${this.props.article.url}`)}>
                    {this.articleImages()}
                    
                    {this.articleContent()}
                </TouchableOpacity>
            )
        } else if (articleId === 'bloomberg') {
            return (
                <TouchableOpacity style={styles.bloombergContainer} onPress={() => Linking.openURL(`${this.props.article.url}`)}>
                    {this.articleImages()}
                    
                    {this.articleContent()}
                </TouchableOpacity>
            )
        } else if (articleId === 'cnbc') {
            return (
                <TouchableOpacity style={styles.bloombergContainer} onPress={() => Linking.openURL(`${this.props.article.url}`)}>
                    {this.articleImages()}
                    
                    {this.articleContent()}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(`${this.props.article.url}`)}>
                    {this.articleImages()}
                    
                    {this.articleContent()}
                </TouchableOpacity>
            )
        }
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(50, 50, 50, 1)',
        zIndex: 1,
        padding: 10
    },
    reutersContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 128, 0, 1)',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(50, 50, 50, 1)',
        zIndex: 1,
        padding: 10
    },
    bloombergContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(40, 0, 215, 1)',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(50, 50, 50, 1)',
        zIndex: 1,
        padding: 10
    },
    cNBCContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 137, 207, 1)',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(50, 50, 50, 1)',
        zIndex: 1,
        padding: 10
    },
    newsArticle: {
        flex: 1,
        paddingHorizontal: 10
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    image: {
        flex: 1,
        height: '100%'
    },
    story: {
        color: 'white'
    }
})