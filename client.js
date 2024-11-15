// Prompt the user for their name when they open the chat
const username = prompt("Enter your username");

// Connect to the server using Socket.IO
const socket = io("http://localhost:3000");

// Add an event listener for form submission
document.getElementById("form").onsubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Get the input field value
    const input = document.getElementById("input");

    // Check if the input field has a message
    if (input.value) {
        // Emit the message to the server with the username and message content
        socket.emit("chat message", { username, message: input.value });

        // Clear the input field after sending the message
        input.value = "";
    }
};

// Listen for 'chat message' events from the server
socket.on("chat message", (msg) => {


    // Create a new list item element for each incoming message
    const item = document.createElement("li");

    const { username, message } = msg; // Extract the username and message
    item.textContent = `${username}: ${message}`; // Display the username and message

    // Append the new message to the messages list in the HTML
    document.getElementById("messages").appendChild(item);

    // Scroll to the bottom of the chat window to show the latest message
    window.scrollTo(0, document.body.scrollHeight);
});
