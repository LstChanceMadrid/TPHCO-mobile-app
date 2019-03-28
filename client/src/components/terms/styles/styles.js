import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    agreeContainer: {
        flex: 1,
        paddingTop: 50,
        paddingRight: 25,
        paddingLeft: 25,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 30, 40, 1)',
      },
      logo: {
        width: 300,
        paddingBottom: 100,
        tintColor: 'rgba(255, 255, 255, 1)'
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 1)',
      },
      instructions: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 1)',
        marginBottom: 5,
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: 50,
        width: 200,
        margin: 25,
      },
      ok: {
        color: 'rgba(0, 30, 40, 1)',
        fontWeight: 'bold',
        fontSize: 20
      },
      termsButtonContainer: {
        padding: 0,
        margin: 0,
      },
      termsButtonText: {
        padding: 5,
        paddingBottom: 15,
        color: 'rgba(110, 90, 25, 1)',
        textAlign: 'center',
        fontSize: 22
      },
      termsContainer : {
        flex: 1,
        padding: 20
      },
      copyRight : {
        paddingTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      termsParagraphContainer: {
        flex: 1,
        paddingTop: 20,
        
      },
      terms: {
        fontSize: 16,
        textAlign: 'justify',
      },
      link: {
        fontSize: 16,
        textAlign: 'justify',
        color: 'blue'
      },
      FINRA: {
        paddingTop: 20,
        fontSize: 16,
        textAlign: 'justify',
      }
})