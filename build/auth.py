from google.cloud import firestore
import jwt
import datetime

# AuthToken for each user who logs in, keeps them logged in for 1 week

JWT_SECRET = 'ThisIsASecretThatShouldNotBeStoredInTheSourceCode-ItsLikeAPassword'

def login(username, password):
    db = firestore.Client()
    user_doc_ref = db.collection('users').document(username)
    user_doc = user_doc_ref.get()
    if user_doc.exists:
        user_dict = user_doc.to_dict()
        if password == user_dict['password']:
            claims = {
                'sub': username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=262800), #6 months
            }
            token = jwt.encode(claims, JWT_SECRET, algorithm="HS256")
            return True, token
        else:
            return False, "PASSWORD_MISMATCH"
    else:
            return False, "USERNAME_NOT_FOUND"

def authorize(request):
    """
    Returns a tuple with first value indicating success or failure.
    Second value is the claims if first value is True, or a string
    indicating the nature of the failure if first value is False.
    """
    if 'Authorization' not in request.headers:
        return False, 'MISSING_AUTHORIZATION_TOKEN'
    else:
        auth_headers = request.headers.get('Authorization', '').split()
        if len(auth_headers) != 2:
            return False, 'INVALID_HEADER'
        else:
            token = auth_headers[1] # auth_headers[0] is assumed "Bearer"
            try:
                claims = jwt.decode(token, JWT_SECRET, algorithms="HS256")
                return True, claims
            except jwt.DecodeError:
                return False, "DECODE_ERROR"
            except jwt.InvalidSignatureError:
                return False, "INVALID_SIGNATURE"
            except jwt.ExpiredSignatureError:
                return False, "EXPIRED_TOKEN"
            except jwt.InvalidTokenError:
                return False, "FAILED_VALIDATION"


