const axios = require('axios')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const express = require('express')
const NewsAPI = require('newsapi');
const nodemailer = require('nodemailer')
const pgp = require('pg-promise')();
const secret = require('./secrets')

const app = express()
const DATABASE_URL = secret.databaseSecret
const db = pgp(DATABASE_URL);
const newsapi = new NewsAPI(secret.newsAPISecret);
const port = process.env.PORT || 5000 || 3000
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => res.send('Hello World!'))
 
app.post('/register', (req, res) => {

    let username = req.body.username
    let email = req.body.email
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let company = req.body.company
    let position = req.body.position
    let password = req.body.password

    db.one('Select username, email FROM users WHERE username = $1 OR email = $2', [username, email]).then(response =>{
        if (response) {
            res.json({isAuthenticated: false, errorMessage: 'username/email already exists'})
        }
    }).catch(e => {
        if (e.code === 0) {

            bcrypt.hash(password, saltRounds).then(hash => {

                db.any(`INSERT INTO users (username, email, firstname, lastname, company, position, password) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [username, email, firstName, lastName, company, position, hash]).then(response => {

                    res.json({isAuthenticated: true, response: response.data})
                }).catch(e => console.log(e))
            }).catch(e => console.log(e))
        } else {
            let errorMessage = `We're Sorry! We are having some minor difficulties. Please wait a few minutes and then try again.`
                
            res.json({isAuthenticated: false, errorMessage: errorMessage})
            console.log('alt error')
        }
    })
})

app.post('/login', (req, res) => {
    let usernameOrEmail = req.body.usernameOrEmail
    let password = req.body.password
    db.one(`SELECT * FROM users WHERE username = $1 OR email = $1`, [usernameOrEmail]).then(response => {
        bcrypt.compare(password, response.password).then(result => {
            if (result) {
                let user = {
                    username: response.username,
                    email: response.email,
                    firstName: response.firstname,
                    lastName: response.lastname,
                    company: response.company,
                    position: response.position
                }
                res.json({isAuthenticated: true, user: user})
            } else {
                let errorMessage = `this username/email does not exist or the connected password is incorrect`
                
                res.json({isAuthenticated: false, errorMessage: errorMessage})
            }
        })
    }).catch(e => {
        console.log(e.code)
        if (e.code === 0) {
            console.log('authentication denied', e)

            let errorMessage = `this username/email does not exist or the connected password is incorrect`
            res.json({isAuthenticated: false, errorMessage: errorMessage})
        } else {
            console.log(e)

            let errorMessage = `We're Sorry! We are having some minor difficulties. Please wait a few minutes and then try again.`
            res.json({errorMessage: errorMessage})
        }
    }).catch(e => console.log('alt error', e))
})

app.post('/storeTickers', (req, res) => {
    db.any('SELECT * FROM tickers').then(response => {
        res.json({defaultTickers: response})
    }).catch(e => console.log(e))
})

app.post('/timestamp', (req, res) => {
    let username = req.body.username

    db.one('SELECT * FROM users WHERE username = $1', [username]).then(response => {

        let username = response.username
        let email = response.email
        let company = response.company
        let position = response.position
        let timestamp = new Date().toLocaleTimeString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        let universaltimestamp = new Date().toISOString()

        db.none(`UPDATE timestamps SET username = '${username}', email = '${email}', company = '${company}', position = '${position}', timestamp = timestamp || '{${timestamp}}', universaltimestamp = universaltimestamp || '{${universaltimestamp}}' WHERE username = '${username}'`).catch(e => {
            console.log(e)
            if (e.name === 'QueryResultError') {
                db.one(`UPDATE timestamps SET (timestamp = timestamp || '{${timestamp}}', universaltimestamp = universaltimestamp || '{${universaltimestamp}}') WHERE username = '${username}'`).catch(e => console.log(e))
            }
        }).catch(e => console.log(e))

        res.json({username: username, email: email})
    }).catch(e => console.log(e))
})

app.post('/addStock', (req, res) => {
    let handleTicker = req.body.handleTicker
    let username = req.body.username

    axios.get(`https://api.iextrading.com/1.0/stock/${handleTicker}/chart/1m`).then(response => {

        if (response.data === 'Unknown symbol') {
            res.json({errorMessage: 'Unknown symbol'})
        } else {
            db.one(`UPDATE users SET tickers = tickers || '{${handleTicker}}' WHERE username = '${username}'`).catch(e => console.log(e))
        }
    }).catch(e => console.log(e))
})

app.post('/removeStock', (req, res) => {
    let handleTicker = req.body.handleTicker
    let username = req.body.username

    db.one(`UPDATE users SET tickers = ARRAY_REMOVE(tickers, '${handleTicker}') WHERE username = '${username}'`).catch(e => console.log(e))
})

app.post('/altstory', (req, res) => {
    let week = req.body.week
    if (week === 'current') {
        db.any(`SELECT week FROM stories`).then(response => {
            let stories = []

            response.map(story => {
                stories.push(parseInt(story.week))
            })

            let currentStories = Math.max(...stories)
            return currentStories
        }).then(currentStories => {
            db.any(`SELECT * FROM stories WHERE week = '${currentStories}'`).then(response => {
                res.json({altStory: response})
            }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    } else {
        db.any('SELECT * FROM stories WHERE week = $1', [week]).then(response => {
            res.json({altStory: response})
        }).catch(e => console.log(e))
    }
})

app.post('/tickers', (req, res) => {

    let username = req.body.username
    db.one(`SELECT tickers FROM users WHERE username = $1`, [username]).then(response => {

        let tickers = response.tickers
        res.json({tickers: tickers})
    }).catch(e => {
        if (e.name === "QueryResultError") {
            console.log('authentication denied')

            let error = `this username/email does not exist or connected password is incorrect`
            res.json({isAuthenticated: false, error: error})
        } else {
            console.log('alt error', e)

            let error = `We're Sorry! We are having some minor difficulties. Please wait a few minutes and then try again.`
            res.json({error:error})
        }
    }) 
})

app.post('/api/newsArticles', (req, res) => {

    let splitDate = new Date().toLocaleTimeString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).split('/')

    let today = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
      
    newsapi.v2.everything({
        q: '"Tudor Pickering Holt & Co." OR "Tudor Pickering Holt and Co." OR "Tudor, Pickering, Holt & Co." OR (Tudor AND Pickering AND Holt) OR "Maynard Holt" OR Oil OR ("Green New Deal" OR "Natural Gas" OR OPEC OR Permian OR LNG OR Marcellus OR "Powder river basin" OR "Eagle ford" OR "Midland basin" OR "Delaware basin" OR Bakken OR Niobrara OR "Crude oil" OR "Energy Tech" OR "Energy Technology" OR "Offshore drilling" OR "Vaca Muerta" OR "Brent crude" OR WTI OR "Henry hub" OR "Beto o’rourke") NOT (skin OR Netflix) NOT gym NOT food NOT political NOT art NOT painting NOT kitchen NOT bedroom',
        sources: 'abc-news, bbc-news, bloomberg, business-insider, buzzfeed, cnbc, cnn, reuters, the-huffington-post, the-new-york-times, the-wall-street-journal',
        // domains: '',
        // exludeDomains: '',
        from: today,
        to: today,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 60
        // page: ''
      }).then(async response => {
        let articles = response.articles

        let filteredResponse = []

        for (let i in articles) {
            if (articles[i].author !== null || articles[i].description !== null) {
                filteredResponse.push(articles[i])
            }
        }

        let filteredArray = []

        for (let article = 0; article < filteredResponse.length + 1; article++) {
            article = 0
            
            for (let article2 = 1; article2 < filteredResponse.length; article2++) {
                if (filteredResponse[0].description.split(' ', 6)[0] === filteredResponse[article2].description.split(' ', 6)[0] && filteredResponse[0].description.split(' ', 6)[5] === filteredResponse[article2].description.split(' ', 6)[5]) {
                    filteredResponse.shift()
                    article2 = 0
                }
            }
            filteredArray.push(filteredResponse[0])
            filteredResponse.shift()
        }        
        res.json({articles: filteredArray})
    }).catch(e=>console.log(e))
})

app.post('/energyTechWeekly', (req, res) => {
    let week = req.body.week
    if (week === 'current') {
        db.any(`SELECT week FROM energytechweekly ORDER BY week ASC`).then(response => {
            let issues = []
            // sets the array of all the week date values
            response.map(issue => {
                issues.push(parseInt(issue.week))
            })
            // selects the highest value
            let currentIssue = Math.max(...issues)
            return currentIssue
        }).then(currentIssue => {
            db.one(`SELECT * FROM energytechweekly WHERE week = '${currentIssue}'`).then(response => {
                res.json({issue: response})
            }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    } else {
        db.one(`SELECT * FROM energytechweekly WHERE week = '${week}'`).then(response => {
            res.json({issue: response})
        }).catch(e => console.log(e))
    }
})

app.post('/energyTechWeeklyTitles', (req, res) => {
    db.any('SELECT week, title FROM energytechweekly ORDER BY week ASC').then(response => {
        res.json({title: response})
    }).catch(e => console.log(e))
})

app.post('/events', (req, res) => {
    db.any('SELECT * FROM events ORDER by date ASC').then(response => {
        res.json({events: response})
    }).catch(e => console.log(e))
})

app.post('/forgotPassword', (req, res) => {
    let email = req.body.email

    db.one(`SELECT * FROM users WHERE email = '${email}'`).then(response => {
        const token = crypto.randomBytes(20).toString('hex')
        const expriration = Date.now() + 360000

        db.one(`UPDATE users SET resetpasswordtoken = '${token}', resetpasswordexpires = '${expriration}' WHERE email = '${email}'`).catch(e => console.log(e))

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${secret.recoveryEmailAccount}`,
                pass: `${secret.recoveryEmailPassword}`
            }
        })

        const mailOptions = {
            from: 'TPHCO_mobile@gmail.com',
            to: `${email}`,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested to reset the password of your TPHCO Mobile account.
            
            Click on the following link to reset you password.
            
            http://localhost:3000/resetPassword/${token}
            
            If you did not request this password reset, ignore this email. Your password will remain unchanged.`
        }

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.log('transporter error', err)
            } else {
                console.log(response)
                res.status(200).json('Recovery email has been sent')
            }
        })

        res.json({exists: true})
    }).catch(e => {
        console.log(e)
        let errorMessage = 'That email address is not recognized. Please Try again or register for a new account.'

        res.json({exists: false, errorMessage})
    })
})

//
// reset password version
//

app.get('/resetPassword/:token', async (req, res) => {
    let userToken = req.params.token
    let isExpired
    await db.one(`SELECT resetpasswordtoken, resetpasswordexpires, email FROM users WHERE resetpasswordtoken = '${userToken}'`).then(response => {
        // check if the authentication token for the password recovery is working

        let expirationDate = parseInt(response.resetpasswordexpires)
        if (Date.now() > expirationDate) {
            return isExpired = true
        } else {
            return isExpired = false
        }

    }).catch(e => {
        console.log(e)

        // return e === 'There has been an error'
    })
    if (isExpired) {
        res.send('Your reset request has expired. Please request a new password reset.')
    } else {
        res.send(userToken)
    }
})

//
// admin interface
//

app.post('/admin/timestamps', (req, res) => {
    db.any('SELECT * FROM timestamps').then(response => {
        res.json({timestamps: response})
    })
})

app.post('/admin/stocks', (req, res) => {
    db.any('SELECT * FROM tickers').then(response => {
        res.json({response: response})
    }).catch(e => console.log(e))
})

app.post('/admin/energyTechWeekly', (req, res) => {
    db.any('SELECT week, title FROM energytechweekly ORDER BY week ASC').then(response => {
        res.json({response: response})
    }).catch(e => console.log(e))
})

app.post('/admin/addStock', (req, res) => {
    let ticker = req.body.ticker.toUpperCase()
    let name = req.body.name
    let segment = req.body.segment
    
    db.none(`SELECT ticker FROM tickers WHERE ticker = '${ticker}'`).then(() => {
        db.none(`INSERT INTO tickers (ticker, name, segment) VALUES ('${ticker}', '${name}', '${segment}')`).then(() => {
            res.json({success: true, message: `${name} has been added to your pre-populated stocks list`})
        }).catch(e => {
            console.log(e)

            res.json({success: false, message: `There seems to be an error`})
        })
    }).catch(e => {
        console.log(e)
        res.json({success: false, message: `${ticker} is already in your list of stocks`})
    })

})

app.post('/admin/removeStock', (req, res) => {
    let ticker = req.body.ticker
    let name = req.body.name

    db.none(`DELETE FROM tickers WHERE ticker = '${ticker}'`).then(() => {

        res.json({success: true, message: `'${name}' has been removed`})
    }).catch(e => console.log(e))
})

app.post('/admin/addIssue', async (req, res) => {
    const issue = req.body.issue
    
    let makeFieldsArray = (issue) => {
        let fieldName = Object.keys(issue)
        let filledFields = `${fieldName[0]}`
        
        for (let i = 1; i <= fieldName.length - 1; i++) {
            
            filledFields += `, ${fieldName[i]}`
        }
        return filledFields
    }

    let makeFieldsVarArray = (issue) => {
        let fieldName = Object.keys(issue)
        let filledFields = `${fieldName[0]}`
        let filledFieldsVarOne = `'${issue[filledFields]}'`
        let filledFieldsVar = filledFieldsVarOne
        
        for (let i = 1; i <= fieldName.length - 1; i++) {
            let newVar = `, '${issue[fieldName[i]].replace(/'/g, "&-&")}'`
            filledFieldsVar += newVar
        }

        return filledFieldsVar
    }

    await makeFieldsArray(issue)
    await makeFieldsVarArray(issue)

    console.log(makeFieldsArray(issue))
    console.log(makeFieldsVarArray(issue))

    db.none(`INSERT INTO energyTechWeekly
    (
        ${makeFieldsArray(issue)}
    )
    VALUES
    (
        ${makeFieldsVarArray(issue)}
    )`
    ).then(() => {
        res.json({message: 'Your new issue has been added.'})
    }).catch(e => {
        console.log(e)
        let message = `There seems to be an error`
        res.json({message: message})
    })
})

app.post('/admin/tPHEvents', (req, res) => {
    db.any('SELECT * FROM events ORDER by date ASC').then(response => {
        res.json({events: response})
    }).catch(e => console.log(e))
})






console.log(new Date().toLocaleTimeString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
}))
console.log (new Date().toISOString())


// const makeitup = () => {
//     let ticker = `AAV`
//     let name = `Advantage Oil & Gas`
//     let segment = `EXPLORATION & PRODUCTION`
    
//     db.any(`INSERT INTO tickers (ticker, name, segment) VALUES ('${ticker}', '${name}', '${segment}')`)
// }

// const makeitup = () => {
//     db.any(`SELECT week FROM energytechweekly`).then(response => {
//         let issues = []

//         response.map(issue => {
//             issues.push(parseInt(issue.week))
//         })

//         let currentIssue = Math.max(...issues)
//         return currentIssue
//     }).then(currentIssue => {
//         db.one(`SELECT * FROM energytechweekly WHERE week = '${currentIssue}'`).then(response => {
//             console.log(response)
//             res.json({issue: response})
//         })
//     })
// }



// const makeitup = () => {
//     let title = ''
//     let author = ''
//     let sourceurl = ''
//     let imageurl = ''
//     let content = ``
//     let week = '20181030'
//     let publisher = ''
//     let weeklytitle = 'So, you think you have AI Talent - TPH E-Tech 10-30-18'

//     db.any(`INSERT INTO stories (title, author, sourceurl, imageurl, content, week, publisher, weeklytitle) VALUES ('${title}', '${author}', '${sourceurl}', '${imageurl}', '${content}', '${week}', '${publisher}', '${weeklytitle}')`)
// }






// makeitup()











app.listen(port, () => console.log('server up'))






// const makeitup = () => {
    
//     db.any(`ALTER TABLE energytechnews ADD source VARCHAR`)
// }

