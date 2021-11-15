require('dotenv').config()
const express = require('express')
var cors = require('cors')
const wbm = require('wbm');

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

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

// Temp route
app.post('/api/v1/sendWhatsapp', (req, res) => {
  console.log(req.body)

  client.messages
    .create({
      from: 'whatsapp:+14155238856', // Temporary sandbox number
      body: req.body.message,
      to: `whatsapp:${req.body.to}`,
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err))
  res.status(200).json({
    message: 'Your message sent successfully!',
  })
})

// Temp route
app.get('/api/v1/whatsapp', (req, res) => {
  console.log(req.body)

  wbm.start().then(async () => {
    const phones = ['+8801850844444'];
    const message = 'Good Morning.';
    await wbm.send(phones, message);
    await wbm.end();
}).catch(err => console.log(err));

  res.status(200).json({
    message: 'Your message sent successfully!',
  })
})


app.listen(process.env.PORT || 5000)
