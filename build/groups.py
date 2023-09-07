from google.cloud import firestore
import messages
import calendar
import time
from datetime import datetime

# function that lists all groups
def list_groups():
    db = firestore.Client()
    groups = db.collection('groups').stream()
    # not sending back entire document, just sending back id and name
    return [{'id':glizz.id, 'groupname':glizz.get('groupname')} for glizz in groups] 

# function that lists messages for a group
def list_group_chat(user, groupId):
     db = firestore.Client()
     messages = db.collection('groups').document(groupId).collection('messages').stream()
     clicked_messages = []
     for message in messages:
         clicked_messages.append({'message': message.get('message'),'ts': message.get('ts')})

     sorted_clicked_messages = sorted(clicked_messages, key=lambda x: x['ts'])
     return sorted_clicked_messages[::-1] 

# function that creates a group
def create_group(group_dict:dict):
    db = firestore.Client()
    group_name = group_dict['groupname']
    group_members = group_dict['members']
    group_refs = [db.collection('clients').document(id) for id in group_members]
    created, doc_ref = db.collection('groups').add({'groupname':group_name, 'members':group_refs})
    return doc_ref.id

# function that creates a group message
def message_group(user_doc_ref, group_message_dict:dict):
    db = firestore.Client()
    group_message = group_message_dict['groupMessage']
    group_id = group_message_dict['groupId']
    
    group_ref = db.collection('groups').document(group_id)
    group_doc = group_ref.get()
    group = group_doc.to_dict()
    for member in group['members']:
        member_id = member.id
        message_dict = {'receiver': member_id, 'textMessage': group_message}
        messages.create_messages(user_doc_ref, message_dict)

    current_GMT = time.gmtime()
    time_stamp = calendar.timegm(current_GMT)
    date_time = datetime.fromtimestamp(time_stamp)
    str_date_time = date_time.strftime("%Y-%m-%d, %H:%M:%S ")

    created, doc_ref = db.collection('groups').document(group_id).collection('messages').add({'sender':user_doc_ref, 'message':group_message, 'ts':str_date_time})
    return doc_ref.id
    
def update_group(group_dict:dict):
    pass

# function that deletes a group
def delete_group(group_id:str):
    db = firestore.Client()
    db.collection('groups').document(group_id).delete()