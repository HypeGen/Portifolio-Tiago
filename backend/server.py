from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pydantic import BaseModel, Field, ConfigDict
from typing import List
from pathlib import Path
from datetime import datetime, timezone
import uuid
import os
import logging

# =====================
# LOAD ENV
# =====================
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# =====================
# DATABASE
# =====================
MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

if not MONGO_URL or not DB_NAME:
    raise RuntimeError("❌ Variáveis MONGO_URL ou DB_NAME não definidas no .env")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# =====================
# APP
# =====================
app = FastAPI(title="Portfolio API", version="1.0.0")

api_router = APIRouter(prefix="/api")

# =====================
# CORS (REACT)
# =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================
# MODELS
# =====================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# =====================
# ROUTES
# =====================
@api_router.get("/")
async def root():
    return {"message": "API rodando corretamente 🚀"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status = StatusCheck(client_name=input.client_name)

    doc = status.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()

    await db.status_checks.insert_one(doc)
    return status


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    data = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    for item in data:
        if isinstance(item.get("timestamp"), str):
            item["timestamp"] = datetime.fromisoformat(item["timestamp"])

    return data


# =====================
# REGISTER ROUTER
# =====================
app.include_router(api_router)

# =====================
# LOGGING
# =====================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# =====================
# SHUTDOWN
# =====================
@app.on_event("shutdown")
async def shutdown():
    client.close()
