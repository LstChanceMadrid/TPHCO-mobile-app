import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    // stocks
      sHContainer : {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor : 'rgba(15, 15, 15, 1)',
        paddingLeft: 10
    },
    sHLeft : {
        flex: 1,
        justifyContent: 'flex-start'
    },
    sHRight : {
        flex: 1,
        justifyContent: 'center',
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
    }
})