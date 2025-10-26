from flask import Flask, render_template, jsonify, redirect, url_for
# Note: Removed imports for request, redirect, url_for, flash, json, and Path

app = Flask(__name__)

# Removed app.secret_key - no longer needed as flash() is removed.
# Removed BASE_DIR, DATA_DIR, and MESSAGES_FILE - no longer saving to JSON.

# Sample projects - edit these entries to match your projects and image filenames
# In app.py
# In app.py

# In app.py

PROJECTS = [
    {
        "id": 1,
        "title": "Personal Portfolio Website",
        "summary": "The portfolio website you're looking at now, built with Flask, Tailwind CSS, and Python.",
        "image": "images/project1.png",
        "stack": ["Flask", "Tailwind CSS", "Python"],
        "github": "https://github.com/Manishankar-614/My_Portfolio",
        "live": "https://my-portfolio-zv2n.onrender.com",
        "description": (
            "This portfolio is a dynamic Flask application designed to showcase my skills and projects. "
            "It's built from scratch using Tailwind CSS for responsive, utility-first design, and deployed... (add more here)"
        ),
        "challenges": (
            "One challenge was implementing the 'active' navigation state, which required passing variables from each "
            "Flask route to the base template. Another was ensuring the design was fully responsive on all devices, "
            "which I achieved using Tailwind's mobile-first breakpoints."
        )
    },
    {
        "id": 2,
        "title": "Plant Disease Detection",
        "summary": "A deep learning model (CNN) to detect and classify diseases across various plant parts, including leaves, fruits, and stems.",
        "image": "images/project2.png",
        "stack": ["Keras", "Flask", "CNN"],
        "github": "https://github.com/mani-614/plant-disease-detection",
        "live": "#",
        "description": (
            "This project is a comprehensive disease detection system for agriculture. It uses a Convolutional Neural Network (CNN) "
            "built with Keras to identify diseases across different parts of a plant, including leaves, fruits, and stems. "
            "The model was trained on a custom-built dataset. A simple Flask app provides a web interface where a user can "
            "upload an image and receive an immediate prediction, helping to identify potential crop issues early."
        ),
        "challenges": (
            "The primary challenge was **creating a robust database**. This involved sourcing, cleaning, and labeling thousands "
            "of images for multiple plant parts (leaves, fruits, stems) and various disease states. I used extensive "
            "data augmentation to build a larger, more resilient training set.\n\n"
            "The second major challenge was **selecting the right model**. I experimented with several CNN architectures "
            "(like VGG16 and ResNet) to find the best balance between accuracy and performance. The final model was "
            "chosen after comparing validation accuracy and loss, ensuring it could generalize well to new, unseen images."
        )
    },
    {
        "id": 3,
        "title": "Movie Recommender System (In Progress)",
        "summary": "Currently building a content-based recommender system that will suggest movies based on plot summaries.",
        "image": "images/project3.png",
        "stack": ["Scikit-learn", "Pandas", "Flask"],
        "github": "#", # Add your repo link as soon as you create it
        "live": "#",
        "description": (
            "This project is currently in development. I am building a content-based recommendation engine, "
            "similar to what you might find on Netflix. The system will work by analyzing the plot summaries and "
            "genres of movies from the TMDB 5000 dataset.\n\n"
            "The goal is to create a Flask app where a user can type in a movie title and get a list of "
            "the top 5 most similar recommendations."
        ),
        "challenges": (
            "The main challenge I'm currently working on is **feature engineering**: converting the raw text of plot "
            "summaries into a numerical format that a model can understand. I'm using **Scikit-learn's `TfidfVectorizer`** "
            "for this. The next step will be to implement **`cosine_similarity`** to find the 'closeness' between movies."
        )
    }
]

# Removed _load_messages() function - no longer needed.
# Removed _save_message() function - no longer needed.

@app.route("/")
def index():
    return render_template("index.html", projects=PROJECTS, active_page="home")

@app.route("/about")
def about():
    return render_template("about.html", active_page="about")

@app.route("/projects")
def projects():
    return render_template("projects.html", projects=PROJECTS, active_page="projects")

@app.route("/contact") # Removed methods=["GET", "POST"]
def contact():
    # Removed all the "if request.method == POST" logic.
    # Formspree is handling the form submission now.
    return render_template("contact.html", active_page="contact")

@app.route("/api/projects")
def api_projects():
    return jsonify(PROJECTS)

# In app.py, after your /api/projects route

@app.route("/project/<int:id>")
def project_detail(id):
    # Find the project with the matching id
    project = next((p for p in PROJECTS if p['id'] == id), None)
    
    if project:
        # Pass the active_page variable so your nav bar highlight still works
        return render_template("project_detail.html", project=project, active_page="projects")
    else:
        # If no project is found, redirect back to the main projects page
        return redirect(url_for("projects"))

if __name__ == "__main__":
    # Set debug=False when you deploy
    app.run(debug=False)