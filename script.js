async function callGemini() {
  const inputBox = document.getElementById("userInput");
  const chatContainer = document.getElementById("chatContainer");
  const messageText = inputBox.value.trim();

  if (!messageText) return;

  // Add user's message to chat
  const userMsg = document.createElement("div");
  userMsg.className = "message user-message";
  userMsg.textContent = messageText;
  chatContainer.appendChild(userMsg);

  // Clear input
  inputBox.value = "";
  inputBox.focus();

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Call Gemini API
  const API_KEY = "AIzaSyAMcBdCdc9jgum8zUcLV8rqpspF6K89IC8";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: messageText }]
          }
        ]
      })
    });

    const data = await response.json();

    const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    const botMsg = document.createElement("div");
    botMsg.className = "message bot-message";
    botMsg.textContent = botText;
    chatContainer.appendChild(botMsg);

    // Scroll again
    chatContainer.scrollTop = chatContainer.scrollHeight;

  } catch (error) {
    const errorMsg = document.createElement("div");
    errorMsg.className = "message bot-message";
    errorMsg.textContent = `Error: ${error.message}`;
    chatContainer.appendChild(errorMsg);
  }
}

// Optional: Press Enter to send
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    callGemini();
  }
});