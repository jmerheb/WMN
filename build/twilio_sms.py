# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
# Set environment variables for your credentials
# Read more at http://twil.io/secure
account_sid = # Add this from twilio
auth_token = # Add this from twilio

def send_twilio_message(text_message, recipient):
  client = Client(account_sid, auth_token)
  print('test')
  print(recipient)
  message = client.messages.create(
    body=text_message,
    from_= # Add this from twilio ,
    to= recipient 
  )
  return message.sid 
