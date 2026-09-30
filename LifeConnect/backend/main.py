from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.firebase import db
from routes.donors import router as donor_router
from routes.requests import router as request_router

app = FastAPI(
    title="LifeConnect API",
    description="Blood Donor and Emergency Blood Management System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(donor_router)
app.include_router(request_router)


@app.get("/")
def root():
    return {"message": "LifeConnect Backend is running!"}