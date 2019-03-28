import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 30, 40, 1)',
        justifyContent: 'center',
        padding: 20,
    },
    credentialContainer: {
        borderRadius: 25,
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 10
      },
      rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      title: {
        textAlign: 'center',
        fontWeight: 'bold'
      },
      input: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 1)',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 20,
        marginTop: 20
      },
      buttonText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center'
      },
      errorMessage: {
        color: 'red',
        textAlign: 'center'
      },
      errorMessageFP: {
        color: 'red',
        textAlign: 'center',
        padding: 5
      },
      emailSent: {
        color: 'black',
        textAlign: 'center',
        padding: 5
      },
      logo: {
        width: 300,
        height: 150,
        tintColor: 'rgba(255, 255, 255, 1)',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      forgotPassword: {
        textAlign: 'left',
        color: 'blue',
        fontSize: 12
      },
      orRegister: {
        textAlign: 'right'
      },
      register: {
        color: 'blue'
      },
      orLogin: {
        textAlign: 'right'
      },
      login: {
        color: 'blue'
      },
      registerButton: {
        backgroundColor: 'blue',
        width: 120,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
      },
      loginButton: {
        backgroundColor: 'blue',
        width: 75,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
      },
      nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
      },
      name : {
        width: '45%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 1)',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 20,
      }
})