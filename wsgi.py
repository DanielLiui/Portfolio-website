
from app import app
from waitress import serve

if __name__ == "__main__":
  print("Visit: ")
  print("http://127.0.0.1:8000/")
  app.run(port=8000, debug=True)