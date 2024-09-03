document.getElementById('aiForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const promptInput = document.getElementById('prompt').value;
    const responseDiv = document.getElementById('response');

    if (!promptInput) {
        responseDiv.textContent = 'Please provide a question or statement.';
        return;
    }

    if (promptInput.toLowerCase() === "who made you") {
        responseDiv.textContent = 'I was made by Chael';
    } else {
        try {
            const url = `https://ai1-qg0b.onrender.com/?p=${encodeURIComponent(promptInput)}`;
            const response = await fetch(url);
            const data = await response.json();
            responseDiv.textContent = data.result || 'No reply received from the server.';
        } catch (error) {
            responseDiv.textContent = 'An error occurred while processing your request.';
        }
    }
});
