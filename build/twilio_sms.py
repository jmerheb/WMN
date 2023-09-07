# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
# Set environment variables for your credentials
# Read more at http://twil.io/secure
account_sid = 'AC8c072f0291fa7c463c78a833fc849345'
auth_token = '8a4ac6cae00b558cf3c0698b04b3b2db'

def send_twilio_message(text_message, recipient):
  client = Client(account_sid, auth_token)
  print('test')
  print(recipient)
  message = client.messages.create(
    body=text_message,
    from_="+18669365256",
    to= recipient 
  )
  return message.sid 