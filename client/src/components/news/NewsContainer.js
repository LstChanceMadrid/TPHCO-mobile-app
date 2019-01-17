import React, {Component} from 'react';
import {Dimensions, Image, Linking, Modal, StyleSheet, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import NewsHeader from '../headers/NewsHeader'
import NewsArticle from './NewsArticle';
import axios from 'axios'

class NewsContainer extends Component {
    _isMounted=false

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            articles: [],
            newsModalVisible: false
        }
    }

    toggleModal = (visible) => {
        this.setState({
            ...this.state,
            newsModalVisible: visible
        })
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

            let articleData = (




                <View key={i}>
                    <Modal
                    animationType='none'
                    transparent={true}
                    visible={this.state.newsModalVisible}
                    >
                    <View style={styles.newsModal}>
                        <ScrollView 
                        height={Dimensions.get('screen').height} 
                        width={Dimensions.get('screen').width/1.1}>
                            <View style={styles.imageContainer}>
                                <Image  width={Dimensions.get('screen').width/1} style={styles.image} resizeMode={'contain'} source={{uri: article.urlToImage}} />
                            </View> 

                           <Text style={styles.text}>{article.title}</Text>
                           <Text style={styles.text}>{article.content}</Text>
                           <Text style={styles.text}>{article.description}</Text>
                           <Text style={styles.text}>{article.author}</Text>
                           <Text style={styles.text}>{article.source.name}</Text>
                           <Text style={styles.text}>{article.url}</Text>
                           <Text style={styles.text}>{article.urlToImage}</Text>
                            
                            
                            
                            






                           <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
                                <Text style={styles.text}>Source</Text>
                            
                            </TouchableOpacity>

                        </ScrollView>
                        
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => this.toggleModal(false)}>
                            <Text style={{color: 'white', backgroundColor: 'red', fontSize: 18, padding: 5}}>_\/_</Text>
                        </TouchableOpacity>
                    </Modal>
            
                    <TouchableOpacity onPress={() => this.toggleModal(true)}>
                        <NewsArticle key={i} article={article}/>
                    </TouchableOpacity>
                </View>
            )

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
    imageContainer: {
        paddingTop: '10%'
    },
    newsScroll: {
        // width: '100%',
        // height: '100%',
    }, 
    text : {
        color : 'white',
        fontSize: 16,
        padding: 10
    },
    newsModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    closeButton: {
        flex: 1,
        position: 'absolute',
        top: '5%',
        left: '5%'
    },
    image:{
        width: '100%',
        height: '75%',
    }
})