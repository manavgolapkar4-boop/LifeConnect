from config.firebase import db

demo_donors = [
    {
        "id": "DEMO-001",
        "name": "Rohan Mehta",
        "bloodGroup": "O+",
        "phone": "98XXXXXX10",
        "city": "Mumbai",
        "area": "Andheri West",
        "latitude": 19.1367,
        "longitude": 72.8296,
        "available": True,
        "emergencyAvailable": True,
        "verified": True,
        "demo": True
    },
    {
        "id": "DEMO-002",
        "name": "Ananya Kulkarni",
        "bloodGroup": "A+",
        "phone": "98XXXXXX21",
        "city": "Pune",
        "area": "Kothrud",
        "latitude": 18.5074,
        "longitude": 73.8077,
        "available": True,
        "emergencyAvailable": False,
        "verified": True,
        "demo": True
    },
    {
        "id": "DEMO-003",
        "name": "Priya Nair",
        "bloodGroup": "O-",
        "phone": "98XXXXXX43",
        "city": "Bengaluru",
        "area": "Indiranagar",
        "latitude": 12.9716,
        "longitude": 77.6412,
        "available": True,
        "emergencyAvailable": True,
        "verified": True,
        "demo": True
    },
    {
        "id": "DEMO-004",
        "name": "Sneha Iyer",
        "bloodGroup": "A-",
        "phone": "98XXXXXX65",
        "city": "Chennai",
        "area": "Adyar",
        "latitude": 13.0067,
        "longitude": 80.2570,
        "available": True,
        "emergencyAvailable": True,
        "verified": True,
        "demo": True
    },
    {
        "id": "DEMO-005",
        "name": "Kavya Menon",
        "bloodGroup": "B+",
        "phone": "98XXXXXX22",
        "city": "Mumbai",
        "area": "Marine Lines",
        "latitude": 18.9440,
        "longitude": 72.8238,
        "available": True,
        "emergencyAvailable": True,
        "verified": True,
        "demo": True
    },
    {
        "id": "DEMO-006",
        "name": "Aarav Sharma",
        "bloodGroup": "O+",
        "phone": "9000000001",
        "city": "Virar",
        "area": "Virar West",
        "emergencyAvailable": True,
        "available": True,
        "verified": True,
        "demo": True,
        "latitude": 19.4559,
        "longitude": 72.8114
    },
    {
        "id": "DEMO-007",
        "name": "Neha Patil",
        "bloodGroup": "A+",
        "phone": "9000000002",
        "city": "Nalasopara",
        "area": "Nalasopara West",
        "emergencyAvailable": False,
        "available": True,
        "verified": True,
        "demo": True,
        "latitude": 19.4170,
        "longitude": 72.7950
    }
]

for donor in demo_donors:
    donor_id = donor["id"]
    donor_data = {key: value for key, value in donor.items() if key != "id"}

    db.collection("donors").document(donor_id).set(donor_data)

    print(f"Added/updated: {donor['name']}")

print(f"\n✅ {len(demo_donors)} demo donors added/updated successfully!")