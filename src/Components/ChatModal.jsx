// ChatModal.js
import React from 'react';
import styled from 'styled-components';

const ChatModal = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <button onClick={onClose} className="closeButton">X</button>
        <h2>Chat with Us!</h2>
        {/* Chat interface or input fields go here */}
        <textarea placeholder="Type your message here..." />
        <button>Send</button>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;

  .closeButton {
    background: transparent;
    border: none;
    cursor: pointer;
    float: right;
    font-size: 1.5rem;
  }
`;

export default ChatModal;
