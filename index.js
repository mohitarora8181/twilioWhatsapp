require('dotenv').config()
const express = require('express')
var cors = require('cors')
const path = require('path')
const qrcode = require('qrcode')


const app = express()
app.use(express.json())
app.use(cors())
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => {
  res.render('test',message="")
})

app.post('/received',async (req,res)=>{
  res.render('test',message=req.body.body)
})

app.get('/image', async (req, res) => {
  const url = "http://wa.me/+14155238886?text=join%20brain-tone";
  const qr = await qrcode.toDataURL(url);
  res.send(`<center><img src="${qr}" alt="QR Code"/><center/>`);
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
    console.log(req.body)

    await client.messages
      .create({
        from: `whatsapp:${sandbox}`,
        body: req.body.message,
        to: `whatsapp:+91${req.body.to}`,
      })
      .then((message) => {
        // res.status(200).json({
        //   msg: 'Your message sent successfully!',
        //   message,
        // })
        res.redirect("/")
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
