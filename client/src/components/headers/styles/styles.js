import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    // energy tech
    eTHContainer : {
        padding: 10,
        top: 0
    },
    eTHQuestion : {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 8,
        fontWeight: 'bold'
    },
    eTHBrowser : {
        textAlign: 'center',
        color : 'rgba(255, 100, 100, 1)',
        fontSize : 8,
    },
    eTHLogoWrapper: {
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    eTHLogo: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    // stocks
      sHContainer : {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        width: '100%',
        backgroundColor : 'rgba(15, 15, 15, 1)',
        padding: 10,
        paddingTop: 40,
        zIndex: 2
    },
    sHLeft : {
        flex: 2,
        justifyContent: 'flex-start'

    },
    sHRight : {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    sHDisclaimer: {
        color : 'rgba(150, 150, 150, 1)',
        fontSize: 8
    },
    sHTitle : {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 20,
        fontWeight: 'bold'
    },
    sHDate : {
        color : 'rgba(150, 150, 150, 1)',
        fontSize : 20,
        fontWeight: 'bold'
    },
    sHLink : {
        fontSize: 9,
        fontStyle: "italic",
        color: 'rgba(110, 90, 25, 1)'
    },
    // news
    nHContainer : {
        backgroundColor : 'rgba(15, 15, 15, 1)',
        padding: 10
    },
    nHTitle : {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 20,
        fontWeight: 'bold'
    },
    nHDate : {
        color : 'rgba(150, 150, 150, 1)',
        fontSize : 10,
    }
})