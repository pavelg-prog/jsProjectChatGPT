// This adds a ability to send the text message by pressing tyhe ENTER key on the keyboard
var messageId = document.getElementById("messageId");
messageId.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
       event.preventDefault();
       // Add user message to the userTxt input
       sendMessage();
       // Send the message to the ChatGpt API and get the response, then pass it to the ChatGpt textarea
       fetchStructuredMessage();
    }
 });

// This gets the message from the user input and passes it on to ChatGpt Api
// In return it recieves the answer from ChatGpt

async function getStructuredMessage(messageText) {
    // Adding a loader while waiting for the promise to return something from the API
    var loader = document.getElementById("loader");
    loader.classList.add("loader");

    // Sending the API request to the ChatGpt API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: messageText }],
        }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// This function is triggered after sendMessage() and passes userTxt to getStructuredMessage() function
// The response that's received from getStructuredMessage() is paseed to the chatGpt input 
async function fetchStructuredMessage() {
    var userTxt = document.getElementById("userText").value;
    var chatGPT = document.getElementById("chatGPT")
    const response = await getStructuredMessage(userTxt);
    chatGPT.value=response

    // After we have a response, we don't need the loader anymore, so we remove it
    var loader = document.getElementById("loader");
    loader.classList.remove('loader');
}

// This function gets the messageId input text and passes it to the userText input, then the fetchStructuredMessage()  
// function is triggered 
function sendMessage() {
    var messageId = document.getElementById("messageId");
    var userText = document.getElementById("userText");
    var sendMessage = messageId.value;
    userText.value = sendMessage;
    messageId.value = "";
}
