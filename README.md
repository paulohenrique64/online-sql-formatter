Simple online and free SQL formatter 

Running backend
```
python3 -m venv ./.venv
source .venv/bin/activate
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 3000 --reload
```

Running frontend
```
cd frontend
firefox index.html
```