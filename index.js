require('dotenv').config()
const express = require('express')
var cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  // console.log('URL from middleware => ' + req.url)
  console.log('-------------------------------------------------------------')
  console.log(req.protocol + '://' + req.headers.host + req.baseUrl + req.url)
  console.log('-------------------------------------------------------------')
  next()
})

// Temp route
app.post('/api/sendWhatsapp', async (req, res) => {
  try {
    // Get sandbox, sid & token  from .env file or from req.body
    const sandbox = process.env.TWILIO_SANDBOX || req.body.twilio_sandbox
    const accountSid =
      process.env.TWILIO_ACCOUNT_SID || req.body.twilio_account_sid
    const authToken =
      process.env.TWILIO_AUTH_TOKEN || req.body.twilio_auth_token
    
    const client = require('twilio')(accountSid, authToken)

    await client.messages
      .create({
        from: `whatsapp:${sandbox}`,
        body: req.body.message,
        to: `whatsapp:${req.body.to}`,
      })
      .then((message) => {
        res.status(200).json({
          msg: 'Your message sent successfully!',
          message,
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          message:
            'Failed to send message. Please check your twilio sid, token and mobile number',
          err,
        })
      })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      msg: 'Somethig went wrong',
      err,
    })
  }
})

app.listen(process.env.PORT || 5000)
