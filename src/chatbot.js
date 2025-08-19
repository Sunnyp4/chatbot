import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ChatBox = () => {
  const [messages, setMessages] = useState([
  ]);
  const [input, setInput] = useState("");
  

  const sendMessage = async() => {
     setInput("");
     
    if (input.trim() === "") return;
    setMessages((prev)=>[...prev,{text:input}])
    const url=`https://dev.centiloquy.com/runtime/webhook/068c0308-28bf-452e-a077-29864c50c53c/webhookTrigger/f17db958-9cae-43e2-bd07-b70295335365`
    try{
        const res= await  axios.get(url,{
            params: { query: input }
        })
         const newMessage = { text: res.data.output, sender: "user"};
    setMessages(prev => [...prev, newMessage]);
    }
    catch(error){
        console.log('errot',error)
    }
   


   
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-lg" style={{ width: "400px", height: "500px" }}>
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
