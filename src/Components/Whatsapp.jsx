import { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-router-dom";
import { X, Send } from "lucide-react";

const Whatsapp = () => {
  const [visible, setvisible] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState(""); // Added missing state
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false }
  ]);

  const GoToTopButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    const hiddenOnHeight = 20;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > hiddenOnHeight) {
      setvisible(true);
    } else {
      setvisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, isUser: true }]);
      setMessage("");
      // Simulate response after 1 second
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Thanks for your message! Our team will get back to you soon.", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <Wrapper>
        {visible && (
          <>
            <div className="topButton" onClick={GoToTopButton}>
              <ArrowUpwardIcon className="topButtonIcon" />
            </div>
            <Link
              to="https://wa.me/8105662234?text=Hello%2C%20I%20would%20like%20to%20chat%20about%20your%20services!"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsAppButton"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="whatsAppIcon"
              />
            </Link>
            <div className="chatButton" onClick={() => setChatOpen(!isChatOpen)}>
              {isChatOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <svg viewBox="0 0 24 24" className="chatIcon">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
              )}
            </div>
          </>
        )}
        
        {isChatOpen && (
          <div className="chatBox">
            <div className="chatHeader">
              <h3>Chat with us</h3>
              <button onClick={() => setChatOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="chatContent">
              <div className="messagesArea">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.isUser ? "userMessage" : "botMessage"}`}
                  >
                    <div className="messageContent">
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="inputArea">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .topButton {
    font-size: 1.2rem;
    width: 2.5rem;
    height: 2.5rem;
    color: #00215e;
    background-color: #ffc55a;
    border-radius: 50%;
    position: fixed;
    bottom: 4rem;
    right: 2.3rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .topButtonIcon {
      animation: gototop 1.2s linear infinite alternate-reverse;
    }

    @keyframes gototop {
      0% {
        transform: translateY(-0.2rem);
      }
      100% {
        transform: translateY(0.5rem);
      }
    }
  }

  .whatsAppButton {
    font-size: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    color: #fff;
    background-color: #25d366;
    border-radius: 50%;
    position: fixed;
    bottom: 7.2rem;
    right: 2.3rem;
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-decoration: none;

    .whatsAppIcon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
    
  .chatButton {
    font-size: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    color: #fff;
    background-color: #1d4ed8;
    border-radius: 50%;
    position: fixed;
    bottom: 10.4rem;
    right: 2.3rem;
    z-index: 997;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #1e40af;
    }

    .chatIcon {
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
    }
  }

  .chatBox {
    position: fixed;
    bottom: 14rem;
    right: 2.3rem;
    width: 20rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 996;
    overflow: hidden;
  }

  .chatHeader {
    background-color: #1d4ed8;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-weight: 600;
      margin: 0;
    }

    button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0;

      &:hover {
        color: #e5e7eb;
      }
    }
  }

  .chatContent {
    height: 24rem;
    display: flex;
    flex-direction: column;
  }

  .messagesArea {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;

    .message {
      margin-bottom: 1rem;
      display: flex;
      
      &.userMessage {
        justify-content: flex-end;
        
        .messageContent {
          background-color: #1d4ed8;
          color: white;
        }
      }

      &.botMessage {
        justify-content: flex-start;
        
        .messageContent {
          background-color: #f3f4f6;
          color: black;
        }
      }

      .messageContent {
        max-width: 80%;
        padding: 0.75rem;
        border-radius: 0.5rem;
      }
    }
  }

  .inputArea {
    border-top: 1px solid #e5e7eb;
    padding: 1rem;
    display: flex;
    gap: 0.5rem;

    input {
      flex: 1;
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      outline: none;

      &:focus {
        border-color: #1d4ed8;
      }
    }

    button {
      background-color: #1d4ed8;
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #1e40af;
      }
    }
  }
`;

export default Whatsapp;