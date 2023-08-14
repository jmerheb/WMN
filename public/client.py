from google.cloud import firestore

# function that lists all the clients
def list_clients():
    db = firestore.Client()
    clients = db.collection('clients').stream()
    return [{'id':clizz.id, 'name':clizz.get('name'), 'number':clizz.get('number') } for clizz in clients] 

# function that creates a client
def create_client(client_dict:dict):
    db = firestore.Client()
    client_name = client_dict['name']
    client_number = client_dict['number']
    created, doc_ref = db.collection('clients').add({'name':client_name, 'number': client_number})
    return doc_ref.id

def update_client(client_dict:dict):
    pass

# function that deletes a client
def delete_client(client_id:str):
    db = firestore.Client()
    db.collection('clients').document(client_id).delete()