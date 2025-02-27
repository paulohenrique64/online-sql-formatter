from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlfluff import fix

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SQLRequest(BaseModel):
    sql: str
    dialect: str

@app.get("/api/hello-world")
async def hello_world():
    return {"message": "hello world"}

@app.post("/api/format-sql")
async def format_sql(request: SQLRequest):
    try:
        formatted_sql = fix(request.sql, dialect=request.dialect, config_path='./backend/.sqlfluff')
        return {"message": "SQL formatted successfully.", "sql": formatted_sql}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
