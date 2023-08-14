# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
# Set environment variables for your credentials
# Read more at http://twil.io/secure
account_sid = 'AC085e02fe5d83d3c9303423455aa509bc'
auth_token = '77905f0ec10e529a20c5ee03bf6da88a'

def send_twilio_message(text_message, recipient):
  client = Client(account_sid, auth_token)
  print('test')
  print(recipient)
  message = client.messages.create(
    body=text_message,
    from_="+18777644093",
    to= recipient # 9293897076"
  )
  return message.sid