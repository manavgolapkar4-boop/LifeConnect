from fastapi import APIRouter
from pydantic import BaseModel
from config.firebase import db


router = APIRouter(
    prefix="/api/requests",
    tags=["Blood Requests"]
)


# ==========================================
# BLOOD REQUEST MODEL
# ==========================================

class BloodRequest(BaseModel):
    requesterId: str
    requesterName: str

    patientName: str
    bloodGroup: str
    units: int

    hospital: str
    location: str
    city: str

    requiredDate: str
    contact: str

    urgency: str
    message: str = ""

    donorId: str | None = None


# ==========================================
# CREATE BLOOD REQUEST
# ==========================================

@router.post("/")
def create_request(request: BloodRequest):

    request_data = request.model_dump()

    # Every new request starts as Pending
    request_data["status"] = "Pending"

    # Save to Firestore
    doc_ref = db.collection("blood_requests").add(request_data)

    return {
        "success": True,
        "message": "Blood request created successfully!",
        "request_id": doc_ref[1].id
    }


# ==========================================
# UPDATE REQUEST STATUS
# ==========================================

@router.patch("/{request_id}/status")
def update_request_status(
    request_id: str,
    status: str,
    donorId: str | None = None
):
    doc_ref = (
        db
        .collection("blood_requests")
        .document(request_id)
    )

    doc = doc_ref.get()

    if not doc.exists:
        return {
            "success": False,
            "message": "Request not found"
        }

    update_data = {
        "status": status
    }

    # Assign donor when a donor accepts the request
    if status == "Accepted" and donorId:
        update_data["donorId"] = donorId

    doc_ref.update(update_data)

    return {
        "success": True,
        "message": "Request status updated successfully!",
        "request_id": request_id,
        "status": status,
        "donorId": donorId
    }

    doc_ref = db.collection(
        "blood_requests"
    ).document(request_id)

    doc = doc_ref.get()

    if not doc.exists:
        return {
            "success": False,
            "message": "Request not found"
        }

    doc_ref.update({
        "status": status
    })

    return {
        "success": True,
        "message": "Request status updated successfully!",
        "request_id": request_id,
        "status": status
    }


# ==========================================
# GET ALL BLOOD REQUESTS
# ==========================================

@router.get("/")
def get_requests():

    requests = []

    docs = db.collection(
        "blood_requests"
    ).stream()

    for doc in docs:

        request = doc.to_dict()

        request["id"] = doc.id

        requests.append(request)

    return {
        "success": True,
        "requests": requests
    }