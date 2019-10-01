import React, { useContext } from 'react';
import { ITextMessage } from '../../interfaces';
import ChatMessageComponent from './ChatMessageComponent';
import { SocketContext } from '../../providers';

interface IProps {
  messages: ITextMessage[];
}

const ChatBodyComponent = ({ messages }: IProps) => {
  const { volunteerInfo } = useContext(SocketContext);

  const listMessages = () => {
    return messages.map((message, index) => (
      <ChatMessageComponent
        key={index}
        message={message}
        volunteerInfo={volunteerInfo}
      />
    ));
  };

  return (
    <div className="chat-body-container">
      <div className="display" id="message-display">
        <div className="welcome-container">
          <p className="welcome-header">Velkommen til chaten!</p>
          <p className="welcome-body">
            Hvis du sender et vedlegg må du gjerne fjerne navnet ditt eller
            andre ting fra dokumentet som kan identifisere deg.
          </p>
        </div>
        {listMessages()}
      </div>
    </div>
  );
};

export default ChatBodyComponent;
