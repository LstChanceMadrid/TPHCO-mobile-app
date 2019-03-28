import { StyleSheet } from 'react-native'
import { screenHeight } from '../../../constants/dimensions'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 55, 80, 1)'
    },
    settingsContainer: {
        marginBottom: screenHeight/12 + 10
    },
    stockTitle: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(100, 100, 100, 1)'
    },
    banner: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 55, 80, 1)',
        paddingBottom: 10,
        width: '100%',
        bottom: 0
    }
})