from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
from pathlib import Path

app = Flask(__name__)
app.secret_key = "Mani@614"

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
MESSAGES_FILE = DATA_DIR / "messages.json"

# Sample projects - edit these entries to match your projects and image filenames
PROJECTS = [
    {
        "id": 1,
        "title": "Personal Portfolio Website",
        "summary": "The portfolio website you're looking at now, built with Flask, Tailwind CSS, and Python.",
        "image": "images/project1.png",
        "stack": ["Flask", "Tailwind CSS", "Python"],
        "github": "https://github.com/mani-614/portfolio",
        "live": "#"
    },
    {
        "id": 2,
        "title": "Plant Disease Detection",
        "summary": "A deep learning model using Convolutional Neural Networks (CNN) to classify plant diseases from leaf images.",
        "image": "images/project2.jpg",
        "stack": ["keras", "Flask", "CNN"],
        "github": "https://github.com/mani-614/plant-disease-detection",
        "live": "#"
    },
    {
        "id": 3,
        "title": "Coming Soon...",
        "summary": "I'm currently working on an exciting new project. Check back soon for more details!",
        "image": "images/project3.jpg",
        "stack": ["TBD"],
        "github": "#",
        "live": "#"
    }
]

def _load_messages():
    if not MESSAGES_FILE.exists():
        MESSAGES_FILE.write_text("[]")
        return []
    try:
        return json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
    except Exception:
        return []

def _save_message(msg: dict):
    messages = _load_messages()
    messages.insert(0, msg)
    MESSAGES_FILE.write_text(json.dumps(messages, indent=2), encoding="utf-8")

@app.route("/")
def index():
    return render_template("index.html", projects=PROJECTS, active_page="home")

@app.route("/about")

def about():
    return render_template("about.html", active_page="about")

@app.route("/projects")
def projects():
    return render_template("projects.html", projects=PROJECTS, active_page="projects")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()
        if not name or not email or not message:
            flash("Please fill all fields.", "error")
            return redirect(url_for("contact"))
        msg = {"name": name, "email": email, "message": message}
        _save_message(msg)
        flash("Thanks — your message has been saved!", "success")
        return redirect(url_for("contact"))
    return render_template("contact.html")

@app.route("/api/projects")
def api_projects():
    return jsonify(PROJECTS)

if __name__ == "__main__":
    # Set debug=False when you deploy
    app.run(debug=True)
