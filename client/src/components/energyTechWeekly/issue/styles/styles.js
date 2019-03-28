import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container : {
        backgroundColor: 'rgba(106, 109, 142, 1)',
        padding: 10,
    },
    by: {
        color: 'rgba(200, 200, 200, 1)',
        paddingTop: 12
    },
    title: {
        color: 'rgba(125, 251, 250, 1)',
        fontWeight: 'bold',
        fontSize: 15,
    },
    title2: {
        color: 'rgba(125, 251, 250, 1)',
        fontSize: 13
    },
    author: {
        color: 'rgba(200, 200, 200, 1)',
        fontSize: 13,
        
    },
    paragraph : {
        fontSize : 12,
        color: 'white',
        paddingBottom: 10
    },
    storyWrapper: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        paddingBottom: 10
    },
    listItem : {
        fontSize : 12,
        color: 'white',
        paddingBottom: 10
    },
    list: {
        padding: 10
    },
    image: {
        width: '100%',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 150
    },
    index : {
        fontSize : 14,
        fontWeight: 'bold',
        color: 'white',
    }
})