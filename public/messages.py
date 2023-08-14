from google.cloud import firestore
import calendar
import time
from datetime import datetime
import twilio_sms

# function that lists messages of a client
def list_chat(user, selectedClient):
     db = firestore.Client()
     user_ref = db.collection('users').document(user)
     selectedClient_ref = db.collection('clients').document(selectedClient)
     messages = db.collection('messages').where('sender','==', user_ref).where('receiver', '==', selectedClient_ref).stream()
     clicked_messages = []
     for message in messages:
         clicked_messages.append({'message': message.get('message'),'ts': message.get('ts')})

     sorted_clicked_messages = sorted(clicked_messages, key=lambda x: x['ts'])
     return sorted_clicked_messages[::-1]

# function that creates a message and sends the SMS
def create_messages(user_doc_ref, message_dict:dict):
    db = firestore.Client()
    message_receiver_id = message_dict['receiver']
    message_receiver_ref = db.collection('clients').document(message_receiver_id)
    message_receiver = receiver_number(message_receiver_ref)
    text_message = message_dict['textMessage']

    twilio_text_message = str(text_message) + "\n\nIf you have any questions, please email us at @. Do not reply." #update later
    sms_id = twilio_sms.send_twilio_message(twilio_text_message, message_receiver)

    current_GMT = time.gmtime()
    time_stamp = calendar.timegm(current_GMT)
    date_time = datetime.fromtimestamp(time_stamp)
    str_date_time = date_time.strftime("%Y-%m-%d, %H:%M:%S ")

    created, doc_ref = db.collection('messages').add({'receiver': message_receiver_ref, 'sender':user_doc_ref, 'message':text_message, 'ts':str_date_time, 'sms_id':sms_id})
    return doc_ref.id

def receiver_name(ref):
    client_doc = ref.get()
    return client_doc.get('name')

def receiver_number(ref):
    client_doc = ref.get()
    return client_doc.get('number')

def sender_name(ref):
    user_doc = ref.get()
    return user_doc.get('username')

def update_messages(message_dict:dict):
    pass
    