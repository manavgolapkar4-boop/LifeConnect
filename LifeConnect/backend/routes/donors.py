from fastapi import APIRouter
from pydantic import BaseModel
from config.firebase import db


router = APIRouter(
    prefix="/api/donors",
    tags=["Donors"]
)


# =========================================================
# DONOR MODEL
# =========================================================

class Donor(BaseModel):

    firebaseUid: str | None = None

    role: str | None = None

    name: str

    bloodGroup: str

    phone: str

    city: str

    area: str

    emergencyAvailable: bool = False


# =========================================================
# PROFILE UPDATE MODEL
# =========================================================

class DonorProfileUpdate(BaseModel):

    name: str

    bloodGroup: str

    phone: str

    city: str

    area: str

    email: str | None = None

    lastDonation: str | None = None


# =========================================================
# CREATE DONOR
# =========================================================

@router.post("/")
def create_donor(donor: Donor):

    donor_data = donor.model_dump()

    donor_data["available"] = True

    donor_data["verified"] = False

    doc_ref = db.collection("donors").add(
        donor_data
    )

    return {

        "success": True,

        "message": "Donor registered successfully!",

        "donor_id": doc_ref[1].id

    }


# =========================================================
# GET ALL DONORS
# =========================================================

@router.get("/")
def get_donors():
    donors = []

    docs = db.collection("donors").stream()

    for doc in docs:
        donor = doc.to_dict()

        # Skip any old demo donors if they exist in Firestore
        if donor.get("demo") is True:
            continue

        donor["id"] = doc.id
        donors.append(donor)

    return {
        "success": True,
        "donors": donors
    }


# =========================================================
# UPDATE DONOR PROFILE
# =========================================================

@router.patch("/{donor_id}")
def update_donor_profile(
    donor_id: str,
    profile: DonorProfileUpdate
):

    doc_ref = (
        db
        .collection("donors")
        .document(donor_id)
    )

    doc = doc_ref.get()


    if not doc.exists:

        return {

            "success": False,

            "message": "Donor not found"

        }


    update_data = {

        "name": profile.name,

        "bloodGroup": profile.bloodGroup,

        "phone": profile.phone,

        "city": profile.city,

        "area": profile.area,

        "email": profile.email,

        "lastDonation": profile.lastDonation

    }


    doc_ref.update(update_data)


    return {

        "success": True,

        "message": "Donor profile updated successfully!",

        "donor_id": donor_id

    }


# =========================================================
# UPDATE DONOR AVAILABILITY
# =========================================================

class AvailabilityUpdate(BaseModel):

    available: bool

    emergencyAvailable: bool


@router.patch("/{donor_id}/availability")
def update_availability(
    donor_id: str,
    availability: AvailabilityUpdate
):

    doc_ref = (
        db
        .collection("donors")
        .document(donor_id)
    )

    doc = doc_ref.get()


    if not doc.exists:

        return {

            "success": False,

            "message": "Donor not found"

        }


    doc_ref.update({

        "available":
            availability.available,

        "emergencyAvailable":
            availability.emergencyAvailable

    })


    return {

        "success": True,

        "message":
            "Donor availability updated successfully!",

        "donor_id":
            donor_id

    }