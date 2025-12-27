import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import OpenAI from "openai";
import { ClipLoader } from "react-spinners";


const ChatBox = () => {
  const [messages, setMessages] = useState([
  ]);
  const [input, setInput] = useState("");
  const [loading,setLoading]=useState(false)
  const client = new OpenAI({
  apiKey:process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

  const sendMessage = async() => {
     setInput("");
     setLoading(true)
     
    if (input.trim() === "") return;
    setMessages((prev)=>[...prev,{text:input}])
  
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: input }
    ],
  });
  const newMessage = { text: response?.choices[0]?.message?.content, sender: "user"};
  setLoading(false)
  setMessages(prev => [...prev, newMessage]);

  console.log(response.choices[0]);

    
   


   
  };
  console.log('messss',messages)

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-lg" style={{ width: "548px", height: "500px" }}>
        <div className="card-header bg-primary text-white fw-bold">
          StratBot 💬
        </div>

        <div
          className="card-body overflow-auto"
          style={{ height: "380px", background: "#f8f9fa" }}
        >
          
          {messages.length>0?messages.map((msg, index) => (
            <>
            <div
              key={index}
              className={`d-flex mb-2 ${
                msg.sender === "user" ? "justify-content-center" : "justify-content-start"
              }`}
            >
             
              <div
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-dark text-white"
                    : "bg-light border"
                }`}
                style={{ maxWidth: "70%" }}
              >
                {msg.text}
              </div>
            </div>
            
            </>

          )):''}
          <ClipLoader size={40} color="#2563eb" loading={loading}/>
        </div>
          
        <div className="card-footer d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary ms-2" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
