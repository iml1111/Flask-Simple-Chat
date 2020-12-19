// Create Socket Instance
const socket = io("http://localhost:5000/chat?username=Dochi");
 
// On Event, Wait for 'connect' emit.
socket.on("connect", ()=>{
  console.log("[connect]");
});
 
// On Event, Wait for 'disconnect' emit.
socket.on("disconnect", ()=>{
  console.log("[disconnect]");
});
 
// On Event, Wait for 'receive_message' emit.
socket.on("receive_message", ({ username, message })=>{
  const text = [username, message].join(":");
  
  const div_wrapper = document.querySelector(".chat-container > .scroll-wrapper");
  const ul_msg_list = div_wrapper.querySelector(".chat-msg-list");
  const li_msg_item = ul_msg_list.appendChild(document.createElement("li"));
  
  li_msg_item.appendChild(document.createTextNode(text));
  
  document.querySelector(".scroll-wrapper").scrollTop = div_wrapper.scrollHeight;
});
 
// Emit Event, Emit message data.
const send_message = ( data )=>{
  socket.emit("message", data);
}
 
// Find Message Form Element
const message_form = document.getElementById("message_form");
 
// Send Message Handler
const handle_send_message = ( event )=>{
  event.preventDefault();
    
  // Get Input Message
  const input_message = event.target.querySelector('input[name="message"]');
  const text_message = input_message.value;
 
  // Send Message Data
  send_message({
    username: "Dochi",
    message: text_message
  });
 
  // Initialize
  input_message.value = "";
}
message_form.addEventListener("submit", handle_send_message, false);