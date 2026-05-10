async function getNewQuote() {
    const quoteEl = document.getElementById('quote');
    const authorEl = document.getElementById('author');
    
    quoteEl.textContent = "Loading...";
    authorEl.textContent = "";

    try {
        const response = await fetch('https://api.zenquotes.io/api/random');
        const data = await response.json();
        
        quoteEl.textContent = `"${data[0].q}"`;
        authorEl.textContent = `- ${data[0].a}`;
    } catch (error) {
        quoteEl.textContent = "Failed to load quote. Please try again.";
        console.error(error);
    }
}

function copyQuote() {
    const quote = document.getElementById('quote').textContent;
    const author = document.getElementById('author').textContent;
    const fullQuote = `${quote} ${author}`;
    
    navigator.clipboard.writeText(fullQuote).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = "✅ Copied!";
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

function shareOnTwitter() {
    const quote = document.getElementById('quote').textContent;
    const author = document.getElementById('author').textContent;
    const text = encodeURIComponent(`${quote} ${author}\n\nVia @farxanyusuf's Quotes Site`);
    
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

// Load first quote when page loads
window.onload = getNewQuote;