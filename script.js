document.getElementById('aiForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const promptInput = document.getElementById('prompt').value;
    const responseText = document.getElementById('responseText');
    const copyButton = document.getElementById('copyButton');

    if (!promptInput) {
        responseText.innerHTML = 'Please provide a question or statement.';
        copyButton.style.display = 'none';
        $('#responseModal').modal('show');
        return;
    }

    const ask = ["who made you", "who created you", "who developed you", "who are you"];

    if (ask.includes(promptInput)) {
        responseText.innerHTML = "I'm Siyatbot and I was made by chael/arthur";
        copyButton.style.display = 'inline-block';

        $('#responseModal').modal('show');
    } else {
        try {
            const url = `https://deku-rest-api.gleeze.com/gpt4?prompt=${encodeURIComponent(promptInput)}&uid=100`;
            const response = await fetch(url);
            const data = await response.json();
            let reply = data.gpt4 || 'No reply received from the server.';

            // Replace \n with <br>
            reply = reply.replace(/\n/g, '<br>');

            responseText.innerHTML = reply; // Use innerHTML to preserve formatting
            copyButton.style.display = 'inline-block';

            $('#responseModal').modal('show');

            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(reply).then(() => {
                    alert('Copied to clipboard!');
                }).catch(err => {
                    alert('Failed to copy text.');
                });
            });
        } catch (error) {
            responseText.innerHTML = 'An error occurred while processing your request.';
            copyButton.style.display = 'none';
            $('#responseModal').modal('show');
        }
    }
});

function handleRightClick(event) {
    // Prevent the default context menu
    event.preventDefault();
    
    // Show an alert message
    alert('You are not allowed to view source.');
}

// Attach the event listener to the document
document.addEventListener('contextmenu', handleRightClick);
