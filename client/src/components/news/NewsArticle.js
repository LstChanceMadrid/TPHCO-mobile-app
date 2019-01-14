import React, {Component} from 'react';
import {Dimensions, Image, Linking, StyleSheet, Text, View} from 'react-native';
import axios from 'axios'

export default class NewsArticle extends Component {

   constructor(props) {
       super(props)
       this.state = {
       ...this.state
       }
   }



    render() {
        console.log(this.props.article.url)
        
        let articleImages = () => {
            if (this.props.article.urlToImage === "") {
                return <Image style={styles.image} width={Dimensions.get('screen').width/3} resizeMode={'contain'} source={require("../../../src/styles/images/tph-block.png")} />
            } else {
                return <Image style={styles.image} width={Dimensions.get('screen').width}  resizeMode={'contain'} source={{uri : this.props.article.urlToImage}} />
            }
        }

        return (
            <View style={styles.container} onPress={() => Linking.openURL(this.props.article.url)}>
                {articleImages()}
                
                <View style={styles.newsArticle}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.article.title}</Text>
                    <Text style={styles.story} numberOfLines={4} ellipsizeMode={'tail'}>{this.props.article.description}</Text>
                </View>
            </View>
        )
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