

from flask import Flask, render_template, url_for, request, jsonify
app = Flask(__name__)


#functs



#routes
@app.route("/")
def home():
  return render_template("index.html")


@app.route("/2")
def home2():
  return render_template("index2.html")


@app.route("/test", methods=["POST"])
def test():
  data = request.get_json()  #dict
  print("Rec " + str(data))

  resp = {"message": "Thanks"}
  return jsonify(resp)


if __name__ == "__main__":
  print("Visit: ")
  print("http://127.0.0.1:8000/")
  app.run(port=8000, debug=True)