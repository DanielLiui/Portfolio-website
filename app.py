
import os, random
from collections import deque
from flask import Flask, render_template, url_for, request, jsonify
from flask_assets import Environment, Bundle

app = Flask(__name__)
assets = Environment(app)
scss = Bundle('scss/styles.scss', filters='libsass', output='css/styles.css')
#scss = Bundle('scss/testStyles.scss', filters='libsass', output='css/testStyles.css')
assets.register('scss_all', scss)
scss.build()

prev_gifs = deque([], maxlen=5)


# FUNCTIONS



# ROUTES
@app.route("/")
def home():
  return render_template("index.html")


@app.route("/techstack")
def tech_stack():
  return render_template("/test/techStack.html")


@app.route("/randomGif", methods=['GET'])
def show_random_gif():
  gifs_folder = './static/assets/gifs'  #can also contain images
  gif_file_names = [f for f in os.listdir(gifs_folder)]
  #print(f'gif files: {gif_file_names}')
  print(f'previous gifs: {prev_gifs}')

  # don't return gif that was shown in the previous 5 times
  # previous 5 gifs can be from diff users
  random_i = random.randint(0, len(gif_file_names) - 1)
  gif_file_name = gif_file_names[random_i]

  while gif_file_name in prev_gifs:
    random_i = random.randint(0, len(gif_file_names) - 1)
    gif_file_name = gif_file_names[random_i]

  prev_gifs.appendleft(gif_file_name)
  gif_path = f'/static/assets/gifs/{gif_file_name}'
  resp = {'gifPath': gif_path, 'gifFileName': gif_file_name}
  return jsonify(resp)


@app.route("/youtubeTest")
def youtube_test():
  return render_template("/test/youtubeTest.html")


@app.route("/test", methods=["POST"])
def test():
  data = request.get_json()  #dict
  print("Rec " + str(data))

  resp = {"message": "Thanks"}
  return jsonify(resp)


if __name__ == "__main__":
  app.run(port=8000, debug=True)