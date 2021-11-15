# Send whatsapp message from nodejs via twilio


### Send message with this API:

```
POST /api/sendWhatsapp HTTP/1.1
Host: twilio-whatsapp-nodejs.vercel.app
Content-Type: application/json
Content-Length: 243

{
    "to": "+8801878238418",
    "message": "Sending message from API.",
    "twilio_account_sid": "AC209cc2038a0cd9553c97ba476c1h8fdb",
    "twilio_auth_token": "1d0890ecd0f689859d07a8ec05825b70",
    "twilio_sandbox": "+14155237776"
}
```
> For sandbox number, sid and auth token do the followings:
- Create account
- Activate [sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox) for whatsapp.
- Get SID and Auth token [here](https://console.twilio.com/) (Auth token is inside Project Info)

Source code is updated at [this API](https://twilio-whatsapp-nodejs.vercel.app)

`vecel.json` file is for deploy on vercel. Tested and working fine with current version.

More info for whatsapp in twilio [here](https://www.twilio.com/docs/whatsapp/quickstart/node#whatsnext-for-whatsapp-and-node)