import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    // footer
    container : {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        height: 75,
        backgroundColor : 'rgba(15, 15, 15, 1)',
        zIndex: 2
    },
    button : {
        width: '30%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: 'blue',
    },
    buttonText : {
        paddingHorizontal: 5,
        textAlign: 'center',
        fontSize: 10,
        color: 'white'
    }
})