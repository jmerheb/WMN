from flask import Flask, request, make_response
import logging
from google.cloud import firestore
import client
import auth
import messages
import groups

app = Flask(__name__)
db = firestore.Client()

# Log in user and gives them an authToken
@app.route('/login', methods=['POST'])
def login_post():
   credentials = request.json
   username = credentials['username']
   password = credentials['password']
   success, response_value = auth.login(username, password)
   if success:
      return jsend_response(True, {"authToken": response_value})
   else:
      return jsend_response(False, {"message": response_value})

# REST endpoint for listing clients
@app.route('/clients', methods=['GET'])
def list_clients():
    authorized, auth_result = auth.authorize(request)
    if authorized:
       client_list = client.list_clients()
       return jsend_response(True, {'clients': client_list})
    else:
       return jsend_response(False, {"message": auth_result})

# REST endpoint for creating a client
@app.route('/clients', methods=['POST'])
def create_client():
    authorized, auth_result = auth.authorize(request)
    if authorized:
       client_data = request.json
       client.create_client(client_data)
       return jsend_response(True, {})
    else:
        return jsend_response(False, {"message": auth_result})

# REST endpoint for deleting a client
@app.route('/clients/<client_id>', methods=['DELETE'])
def delete_client(client_id):
    authorized, auth_result = auth.authorize(request)
    if authorized:
        client.delete_client(client_id)
        return jsend_response(True, {})
    else:
        return jsend_response(False, auth_result)

# REST endpoint for listing messages between user and clicked client
@app.route('/messages/<selectedClient>', methods=['GET'])
def list_chat(selectedClient):
    authorized, auth_result = auth.authorize(request)
    if authorized:
        message_list = messages.list_chat(auth_result['sub'], selectedClient)
        return jsend_response(True, {'messages': message_list})
    else:
        return jsend_response(False, auth_result)

# REST endpoint for creating messages between user and clicked client
@app.route('/messages', methods=['POST'])
def create_message():
    authorized, auth_result = auth.authorize(request)
    if authorized:
        messageBody = request.json
        usersub = auth_result['sub']
        user_doc_ref = db.collection('users').document(usersub)
        messages.create_messages(user_doc_ref, messageBody)
        return jsend_response(True, {})
    else:
        return jsend_response(False, auth_result)

# REST endpoint for listing groups
@app.route('/groups', methods=['GET'])
def list_groups():
    authorized, auth_result = auth.authorize(request)
    if authorized:
       group_list = groups.list_groups()
       return jsend_response(True, {'groups': group_list})
    else:
       return jsend_response(False, {"message": auth_result})

# REST endpoint for creating groups
@app.route('/groups', methods=['POST'])
def create_group():
    authorized, auth_result = auth.authorize(request)
    if authorized:
       group_data = request.json
       groups.create_group(group_data)
       return jsend_response(True, {})
    else:
        return jsend_response(False, {"message": auth_result})

# REST endpoint for listing group messages
@app.route('/groups/messages/<selectedGroup>', methods=['GET'])
def list_group_chat(selectedGroup):
    authorized, auth_result = auth.authorize(request)
    if authorized:
        message_list = groups.list_group_chat(auth_result['sub'], selectedGroup)
        return jsend_response(True, {'messages': message_list})
    else:
        return jsend_response(False, auth_result)

# REST endpoint for creating group messages
@app.route('/groupmessage', methods=['POST'])
def message_group(): 
    authorized, auth_result = auth.authorize(request)
    if authorized:
        messageBody = request.json
        usersub = auth_result['sub']
        user_doc_ref = db.collection('users').document(usersub)
        groups.message_group(user_doc_ref, messageBody)
        return jsend_response(True, {})
    else:
        return jsend_response(False, auth_result)

# REST endpoint for deleting groups
@app.route('/groups/<group_id>', methods=['DELETE'])
def delete_group(group_id):
    authorized, auth_result = auth.authorize(request)
    if authorized:
        groups.delete_group(group_id)
        return jsend_response(True, {})
    else:
        return jsend_response(False, auth_result)

# utility method for sending responses in JSend format    
def jsend_response(success:bool, payload:dict):
    return {
        'status': 'success' if success else 'failure',
        'data': payload
    }    

# this code is needed to run locally
# (or follow the Flask Getting Started guide, but that requires setting an environment variable.)
if __name__ == '__main__':
    app.run(debug=True)