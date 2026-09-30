import firebase_admin
from firebase_admin import credentials, firestore
import os


# Check whether the app is already initialized
if not firebase_admin._apps:

    # Local development
    local_key = "serviceAccountKey.json"

    # Render deployment
    render_key = "/etc/secrets/serviceAccountKey.json"

    if os.path.exists(render_key):
        # Use Render secret file
        cred = credentials.Certificate(render_key)
    elif os.path.exists(local_key):
        # Use local Firebase service account
        cred = credentials.Certificate(local_key)
    else:
        raise FileNotFoundError(
            "Firebase service account key not found."
        )

    firebase_admin.initialize_app(cred)


db = firestore.client()