from Backend.routers import bonds
from fastapi import FastAPI  # type: ignore

app = FastAPI()

app.include_router(bonds.router)


@app.get("/health")
def health():
    return {"status": "ok"}
