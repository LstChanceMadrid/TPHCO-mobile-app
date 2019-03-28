import PasswordRecovery from "../components/authentication/ForgotPassword";

export const register = {
    id: 'Register',
    name: 'Register',
    options: {
        statusBar: {
            style: 'light'
        },
        title: {
            text: 'Register'
        },
        topBar: {
            visible: false,
            drawBehind: true,
        }
    }
}


export const login = {
    id: 'Login',
    name: 'Login',
    options: {
        statusBar: {
            style: 'light'
        },
        title: {
            text: 'Login'
        },
        topBar: {
            visible: false,
            drawBehind: true, 
        }
    }
}

export const forgotPassword = {
    id: 'ForgotPassword',
    name: 'ForgotPassword',
    options: {
        statusBar: {
            style: 'light'
        },
        title: {
            text: 'Forgot Password'
        },
        topBar: {
            visible: true,
            drawBehind: false, 
        }
    }
}


export const preLoginStack = { 
    id: 'PreLoginStack',
    options: {
        statusBar: {
            style: 'light'
        },
        topBar: {
            visible: false,
            drawBehind: true,
        }
    },
    children: [
        {component : forgotPassword},
        {component : register},
        {component : login}
    ]
}


export const agreeToTerms = {
    id: 'AgreeToTerms',
    name: 'AgreeToTerms',
    options: {
        statusBar: {
            style: 'light'
        },
        title: {
            text: 'AgreeToTerms'
        },
        topBar: {
            visible: false,
            drawBehind: true,
        }
    }
}


export const termsOfService = {
    id: 'TermsOfService',
    name: 'TermsOfService',
    options: {
        statusBar: {
            style: 'light'
        },
        title: {
            text: 'TermsOfService'
        },
        topBar: {
            visible: true,
            drawBehind: false,
            title: {
                text: 'Terms of Service'
            }
        }
    }
}


export const energyStocks = {
    id: 'EnergyStocks',
    name: 'EnergyStocks',
    options: {
        statusBar: {
            style: 'light'
        },
        title: {
            text: 'EnergyStocks'
        },
        topBar: {
            visible: false,
            drawBehind: true,
        },
        children : [{
            component : {
                name : "EnergyTechWeekly"
            }
        }]
    }
}


export const energyTechWeekly = {
    id: 'EnergyTechWeekly',
    name: 'EnergyTechWeekly',
    options: {
        statusBar: {
            style: 'light'
        },
        title: {
            text: 'EnergyTechWeekly'
        },
        topBar: {
            visible: false,
        }
    }
}