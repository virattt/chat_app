// SettingsModal.tsx

import React, { useRef, useState } from 'react';
import styled from 'styled-components';

type SettingsModalProps = {
  setShowSettingsModal: (showSettingsModal: boolean) => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({setShowSettingsModal}) => {
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setApiKey(value);
    setIsApiKeyValid(value.trim() !== '');
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('OPENAI_API_KEY', apiKey);
    setShowSettingsModal(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!modalContentRef.current?.contains(e.target as Node)) {
      setShowSettingsModal(false);
    }
  };

  return (
    <ModalContainer onClick={handleOutsideClick}>
      <ModalContent ref={modalContentRef}>
        <ModalHeader>Enter your OpenAI API Key</ModalHeader>
        <ModalBody>
          <ApiKeyInput
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your API key..."
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSaveApiKey} disabled={!isApiKeyValid}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
`;

const ModalHeader = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ApiKeyInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box; /* Add this line */
`;
const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 3px;
  background-color: #1c1c1c;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #3f3f3f;
  }
`;

export default SettingsModal;
