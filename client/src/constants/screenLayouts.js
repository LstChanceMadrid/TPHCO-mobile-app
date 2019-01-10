
export const register = {
    id: 'Register',
    name: 'Register',
    options: {
        title: {
            text: 'Register'
        },
        topBar: {
            visible: 'false',
            title: {
                text: 'Register'
            }
        }
    }
}


export const login = {
    id: 'Login',
    name: 'Login',
    options: {
        title: {
            text: 'Login'
        },
        topBar: {
            visible: 'false',
            title: {
                text: 'Login'
            }
        }
    }
}


export const preLoginStack = { 
    id: 'PreLoginStack',
    options: {
        topBar: {
            visible: 'false'
        }
    },
    children: [
        {component : register},
        {component : login}
    ]
}


export const agreeToTerms = {
    id: 'AgreeToTerms',
    name: 'AgreeToTerms',
    options: {
        title: {
            text: 'AgreeToTerms'
        },
        topBar: {
            visible: 'false'
        }
    }
}


export const termsOfService = {
    id: 'TermsOfService',
    name: 'TermsOfService',
    options: {
        title: {
            text: 'TermsOfService'
        },
        topBar: {
            visible: 'true',
            title: {
                text: 'Terms of Service'
            }
        }
    }
}


export const dashboard = {
    id: 'Dashboard',
    name: 'Dashboard',
    options: {
        title: {
            text: 'Dashboard'
        },
        topBar: {
            visible: 'false',
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
        title: {
            text: 'EnergyTechWeekly'
        },
        topBar: {
            visible: 'false',
        }
    }
}