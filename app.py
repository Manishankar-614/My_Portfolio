from flask import Flask, render_template, jsonify, redirect, url_for, send_from_directory
import os

app = Flask(__name__)

PROJECTS = [
    {
        "id": 1,
        "title": "PhishGuard AI — Multi-Modal Phishing Defense",
        "category": "ai",
        "category_label": "Cybersecurity & Transformers",
        "summary": "Next-gen zero-day phishing defense combining Fine-Tuned BERT, 1D Character CNN, and Isolation Forest behavioral telemetry with a React 19 dashboard & Chrome extension.",
        "image": "images/project_phishing.jpg",
        "stack": ["BERT Transformer", "1D Character CNN", "Isolation Forest", "React 19", "Flask", "Docker"],
        "github": "https://github.com/Manishankar-614/phishing_detection",
        "live": "#",
        "description": (
            "PhishGuard AI is an enterprise-grade multi-modal cybersecurity intelligence platform. Unlike conventional filters that rely solely "
            "on static blocklists, PhishGuard AI aggregates cross-domain threat signals: fine-tuned BERT transformer for deceptive email semantics, "
            "1D Character CNN inspecting raw URL character sequences & homoglyphs, and Isolation Forest anomaly detection analyzing client interaction "
            "telemetry (click velocity, dwell time, typing cadence). Features an explainable attribution engine with severity breakdowns (CRITICAL to LOW), "
            "a React 19 dashboard, and a Manifest V3 browser extension."
        ),
        "challenges": (
            "1. **Multi-Modal Feature Fusion**: Designing a dynamic weighted ensemble layer to synthesize heterogeneous outputs from natural language "
            "transformers, convolutional feature maps, and non-parametric anomaly trees without introducing latency.\n\n"
            "2. **Real-Time Telemetry Tracking**: Engineering a lightweight, privacy-preserving behavioral tracker capable of capturing sub-second client "
            "telemetry without disrupting user experience."
        )
    },
    {
        "id": 2,
        "title": "Plant Disease Multi-Task Vision Classifier",
        "category": "ai",
        "category_label": "Computer Vision / CNN",
        "summary": "Deep learning vision system leveraging MobileNetV2 architecture to simultaneously classify plant parts (fruit, leaf, stem) and diagnose agricultural pathogens.",
        "image": "images/project_plant.jpg",
        "stack": ["MobileNetV2", "TensorFlow", "Keras", "Python", "Computer Vision", "Flask"],
        "github": "https://github.com/Manishankar-614/Plant_Disease_Detection",
        "live": "#",
        "description": (
            "A multi-task deep learning model designed for automated crop health monitoring and early agricultural disease intervention. "
            "The neural network utilizes a fine-tuned MobileNetV2 backbone to simultaneously predict both the botanical organ (leaf, fruit, stem) "
            "and the specific disease class from real-world imagery, optimizing agricultural yield protection."
        ),
        "challenges": (
            "1. **Multi-Task Learning Head**: Building and balancing multi-loss functions (cross-entropy for organ classification and disease diagnosis) "
            "to ensure the shared convolutional representation generalized well across diverse crops.\n\n"
            "2. **Data Imbalance & Augmentation**: Mitigating dataset skew across rare plant pathologies using extensive affine transformations, "
            "color jittering, and synthetic oversampling."
        )
    },
    {
        "id": 3,
        "title": "IMDB Movie Review Sentiment Classifier",
        "category": "nlp",
        "category_label": "NLP & Machine Learning",
        "summary": "Full-stack NLP machine learning web application evaluating cinematic reviews using text vectorization and sentiment classification with Scikit-learn and Flask.",
        "image": "images/project_movie.jpg",
        "stack": ["Scikit-Learn", "NLP", "Flask", "Pandas", "Joblib", "Python"],
        "github": "https://github.com/Manishankar-614/movie-review",
        "live": "#",
        "description": (
            "An end-to-end Natural Language Processing system trained on 50,000 IMDB movie reviews to accurately gauge viewer sentiment. "
            "Features real-time text processing, tokenization, TF-IDF vectorization, and serialized inference models served via an interactive Flask web interface."
        ),
        "challenges": (
            "1. **Text Preprocessing & Noise Reduction**: Cleaning HTML tags, stop-words, and colloquial slang while preserving negations ('not good' vs 'good') "
            "that drastically influence sentiment polarity.\n\n"
            "2. **Low-Latency Model Serialization**: Optimizing memory footprint and inference speed using Joblib pipelines for instant response times in web deployments."
        )
    },
    {
        "id": 4,
        "title": "Personal Portfolio & Interactive SPA",
        "category": "web",
        "category_label": "Web App & Flask",
        "summary": "Single-page responsive portfolio inspired by Igloo.inc, featuring glassmorphism UI, 3D card tilt physics, cursor spotlight, floating dock navigation, and Flask backend.",
        "image": "images/project_portfolio.jpg",
        "stack": ["Flask", "JavaScript", "HTML5 & CSS3", "Tailwind CSS", "Python"],
        "github": "https://github.com/Manishankar-614/My_Portfolio",
        "live": "https://my-portfolio-zv2n.onrender.com",
        "description": (
            "A high-performance personal portfolio built from scratch with custom CSS tokens, single-page scrolling architecture, "
            "real-time ScrollSpy floating dock, ambient glowing particles, and interactive 3D modal drawers. Showcases AI/ML systems and engineering projects."
        ),
        "challenges": (
            "1. **60fps Animation Performance**: Balancing ambient particle canvas, continuous marquee ticker, and 3D card tilt calculations without UI stuttering.\n\n"
            "2. **Responsive Glassmorphic Layout**: Crafting fluid layouts that maintain visual hierarchy and tactile feedback across both desktop and mobile screens."
        )
    }
]

@app.route("/")
def index():
    return render_template("index.html", projects=PROJECTS, active_section="hero")

@app.route("/about")
def about():
    return render_template("index.html", projects=PROJECTS, active_section="about")

@app.route("/projects")
def projects():
    return render_template("index.html", projects=PROJECTS, active_section="projects")

@app.route("/contact")
def contact():
    return render_template("index.html", projects=PROJECTS, active_section="contact")

@app.route("/resume")
def resume():
    return send_from_directory(os.path.join(app.root_path, "static", "docs"), "My_Resume.pdf")

@app.route("/project/<int:id>")
def project_detail(id):
    project = next((p for p in PROJECTS if p['id'] == id), None)
    if project:
        return render_template("index.html", projects=PROJECTS, active_section="projects", open_project_id=id)
    return redirect(url_for("index"))

@app.route("/api/projects")
def api_projects():
    return jsonify(PROJECTS)

if __name__ == "__main__":
    app.run(debug=True, port=5000)