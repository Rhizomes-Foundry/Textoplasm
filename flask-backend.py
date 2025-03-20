from flask import Flask, request, jsonify, render_template
from textblob import TextBlob
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """
    Analyze text using TextBlob and return the results
    """
    data = request.get_json()
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
        
    # Create a TextBlob object
    blob = TextBlob(text)
    
    # Sentiment analysis
    sentiment = blob.sentiment
    
    # Parts of speech
    pos_tags = [(word, pos) for word, pos in blob.tags]
    
    # Language detection
    try:
        language = blob.detect_language()
    except Exception as e:
        language = "Unable to detect"
    
    # Spell check
    try:
        corrected = str(blob.correct())
    except Exception as e:
        corrected = "Spell check unavailable"
    
    # Translation (to Spanish as example)
    try:
        translated = str(blob.translate(to='es'))
    except Exception as e:
        translated = "Translation unavailable"
    
    # Noun phrases
    noun_phrases = list(blob.noun_phrases)
    
    # Prepare the result dictionary
    result = {
        'sentiment': {
            'polarity': sentiment.polarity,
            'subjectivity': sentiment.subjectivity
        },
        'pos_tags': pos_tags,
        'language': language,
        'corrected': corrected,
        'translated': translated,
        'noun_phrases': noun_phrases
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
