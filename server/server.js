const axios = require('axios')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const NewsAPI = require('newsapi');
const pgp = require('pg-promise')();
const secret = require('./secrets')

const app = express()
const DATABASE_URL = secret.databaseSecret
const db = pgp(DATABASE_URL);
const newsapi = new NewsAPI(secret.newsAPISecret);
const port = process.env.PORT || 5000
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

    db.one(`SELECT username, email, password FROM users WHERE username = $1 OR email = $1`, [usernameOrEmail]).then(response => {
        bcrypt.compare(password, response.password).then(result => {
            if (result) {
                
                res.json({isAuthenticated:true, user: response})
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

app.post('/timeStamp', (req, res) => {
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
        })

        res.json({username: username, email: email})
    }).catch(e => console.log(e))
})

app.post('/newStock', (req, res) => {
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

    db.any(`UPDATE users SET tickers = ARRAY_REMOVE(tickers, '${handleTicker}') WHERE username = '${username}'`).catch(e => console.log(e))
})

app.post('/altstory', (req, res) => {
    let week = req.body.week

    db.any('SELECT * FROM stories WHERE week = $1', [week]).then(response => {

        res.json({altStory: response})
    }).catch(e => console.log(e))
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

    console.log('inside news arricles api')
    newsapi.v2.everything({
        sources: 'business-insider',
        q: 'oil',
        from: today,
        to: today
      }).then(response => {
          console.log(response.totalResults)
        res.json({articles: response})
    }).catch(e=>console.log(e))
      
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




const makeitup = () => {
    
    db.any(`DELETE FROM timestamps WHERE username = 'user'`)
}


app.listen(port, () => console.log('server up'))