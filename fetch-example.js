// Replace the mock implementation in the HTML with this real API call
document.getElementById('analyze-btn').addEventListener('click', async function() {
    const text = document.getElementById('text-input').value;
    
    if (!text.trim()) {
        alert('Please enter some text for analysis');
        return;
    }
    
    // Show loading indicator or disable button
    const button = this;
    const originalText = button.textContent;
    button.textContent = 'Analyzing...';
    button.disabled = true;
    
    try {
        // Send the request to your Flask API
        const response = await fetch('http://localhost:5000/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const results = await response.json();
        
        // Update sentiment result
        document.getElementById('sentiment-result').innerHTML = `
            <p><strong>Polarity:</strong> ${results.sentiment.polarity.toFixed(2)} 
               (${results.sentiment.polarity > 0 ? 'Positive' : results.sentiment.polarity < 0 ? 'Negative' : 'Neutral'})
            </p>
            <p><strong>Subjectivity:</strong> ${results.sentiment.subjectivity.toFixed(2)} 
               (${results.sentiment.subjectivity > 0.5 ? 'Subjective' : 'Objective'})
            </p>
            <p>The text has a ${results.sentiment.polarity > 0.5 ? 'strongly positive' : 
                              results.sentiment.polarity > 0 ? 'mildly positive' : 
                              results.sentiment.polarity < -0.5 ? 'strongly negative' : 
                              results.sentiment.polarity < 0 ? 'mildly negative' : 'neutral'} sentiment.
            </p>
        `;
        
        // Update POS tagging result
        let posHTML = '<table style="width:100%; border-collapse: collapse;"><tr><th style="text-align:left; border-bottom:1px solid #ddd;">Word</th><th style="text-align:left; border-bottom:1px solid #ddd;">Part of Speech</th></tr>';
        results.pos_tags.forEach(tag => {
            posHTML += `<tr><td style="padding:5px; border-bottom:1px solid #eee;">${tag[0]}</td><td style="padding:5px; border-bottom:1px solid #eee;">${tag[1]}</td></tr>`;
        });
        posHTML += '</table>';
        document.getElementById('pos-result').innerHTML = posHTML;
        
        // Update language detection result
        const languageNames = {
            'en': 'English', 
            'es': 'Spanish', 
            'fr': 'French', 
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'nl': 'Dutch',
            'ru': 'Russian',
            'ja': 'Japanese',
            'zh': 'Chinese'
        };
        
        document.getElementById('language-result').innerHTML = `
            <p><strong>Detected language:</strong> ${languageNames[results.language] || results.language}</p>
        `;
        
        // Update spell check result
        document.getElementById('spellcheck-result').innerHTML = `
            <p><strong>Original text:</strong> ${text}</p>
            <p><strong>Corrected text:</strong> ${results.corrected}</p>
        `;
        
        // Update translation result
        document.getElementById('translate-result').innerHTML = `
            <p><strong>Original text:</strong> ${text}</p>
            <p><strong>Translated to Spanish:</strong> ${results.translated}</p>
        `;
        
        // Update noun phrases result
        if (results.noun_phrases.length > 0) {
            document.getElementById('nouns-result').innerHTML = `
                <p><strong>Extracted noun phrases:</strong></p>
                <ul style="margin-top: 5px;">
                    ${results.noun_phrases.map(np => `<li>${np}</li>`).join('')}
                </ul>
            `;
        } else {
            document.getElementById('nouns-result').innerHTML = `
                <p><strong>No noun phrases were extracted from the text.</strong></p>
            `;
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to analyze text. Please make sure the server is running.');
    } finally {
        // Restore button state
        button.textContent = originalText;
        button.disabled = false;
    }
});
