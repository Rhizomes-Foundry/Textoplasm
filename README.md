# TextBlob Minimalist Demo Deployment Guide

This guide outlines the steps to deploy a simple web application that uses TextBlob for text analysis. The application consists of a frontend HTML file, a Flask backend, and a JavaScript file for API interaction.

## Files

* `textblob-demo.html`: The HTML file providing the user interface.
* `flask-backend.py`: The Flask application that processes text using TextBlob.
* `fetch-example.js`: JavaScript code to handle the API calls from the frontend to the backend.

## Prerequisites

* **Python 3.x:** Ensure you have Python 3.x installed.
* **pip:** Python's package installer.
* **Flask:** A Python web framework.
* **TextBlob:** A Python library for processing textual data.

## Installation

1.  **Install Python Dependencies:**
    
    ```bash
    pip install flask flask_cors textblob
    python -m textblob.download_corpora
    ```
    
    * `flask`: Installs the Flask web framework.
    * `flask_cors`: Installs Flask-CORS to handle Cross-Origin Resource Sharing (CORS), allowing your frontend to communicate with your backend.
    * `textblob`: Installs the TextBlob library.
    * `python -m textblob.download_corpora`: Downloads the necessary NLTK corpora for TextBlob to function correctly.
2.  **Replace Mock Implementation:**
    
    * In `textblob-demo.html`, there's a section with mock analysis results.  You need to replace this entire `<script>` block with the code provided in `fetch-example.js`.  This will connect the frontend to the Flask backend.

## Deployment

1.  **Backend (Flask):**
    
    * Save `flask-backend.py` to a directory.
    * Open a terminal in that directory.
    * Run the Flask application:
        
        ```bash
        python flask-backend.py
        ```
        
    * The server should start, and you'll typically see output indicating it's running on `http://127.0.0.1:5000` (or `http://localhost:5000`).
2.  **Frontend (HTML):**
    
    * Ensure `textblob-demo.html` and the modified JavaScript (originally `fetch-example.js` which replaced the `<script>` section) are in a location where they can be served.
    * For local testing, you can simply open `textblob-demo.html` in your web browser.  If deploying to a web server, place the file in the appropriate directory.
3.  **Access the Application:**
    
    * Open your web browser and navigate to `textblob-demo.html`.  If running locally by opening the file, the URL will be a `file://` URL. If running on a server it will be a `http://` or `https://` URL.
    * Enter text in the textarea and click the "Analyze Text" button.
    * The results from the TextBlob analysis, processed by your Flask backend, will be displayed on the page.

## Important Considerations

* **CORS:** The `flask_cors` library is used to enable Cross-Origin Resource Sharing. This is crucial because your frontend (HTML/JavaScript) is likely served from a different origin (e.g., a `file://` URL or a different port) than your backend (Flask server running on port 5000). CORS allows these two parts to communicate.
* **Frontend/Backend URLs:** The `fetch-example.js` file contains the URL of your Flask backend: `http://localhost:5000/api/analyze`.  If you deploy your backend to a different server or port, you **must** update this URL in the JavaScript file to match your server's address.
* **Error Handling:** The JavaScript code includes basic error handling for network requests.  You may want to expand this for a production environment to provide more informative error messages to the user.
* **Production Deployment:** For production, consider using a more robust web server (like Apache or Nginx) to serve your static files (HTML, JavaScript) and a production-ready WSGI server (like Gunicorn or uWSGI) to run your Flask application.
* **Security:** This is a basic example. In a production environment, you should implement security best practices, such as input sanitization, protection against Cross-Site Scripting (XSS), and HTTPS.
* **Dependencies:** Ensure that the server environment where you deploy your application has all the necessary Python dependencies installed. You can use a `requirements.txt` file to manage these dependencies.  Create it using `pip freeze > requirements.txt`.
* **Testing:** Thoroughly test your application after deployment to ensure all features are working as expected.

This README provides a solid foundation for deploying your TextBlob demo. Remember to adapt it based on your specific deployment environment and requirements.
