import React, { useContext, useEffect, useState } from 'react';
import { ActiveChats, ChatBody, ChatHeader, ChatInput } from '../components';
import { readMessagesAction } from '../reducers';
import { SocketContext } from '../providers';

// main component
const ChatContainer = () => {
  const {
    chats,
    dispatchChats,
    activeChatIndex,
    setActiveChatIndex,
  } = useContext(SocketContext);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Auto scroll down in chat
    const display = document.querySelector('.display');
    if (display) {
      display.scrollTo(0, display.scrollHeight);
    }
  }, [chats]);

  const showMessages = (index: number) => {
    setActiveChatIndex(index);
    dispatchChats(readMessagesAction(chats[activeChatIndex].roomID));
  };

  const modalFlag = (flag: boolean) => {
    setModalOpen(flag);
  };

  if (chats.length >= 1) {
    return (
      <div className="chat-container">
        <div className="chat-list">
          <ActiveChats showMessages={showMessages} availableChats={chats} />
        </div>
        <div className="chat">
          {chats && chats[activeChatIndex] && (
            <ChatHeader activeChat={chats[activeChatIndex]} />
          )}
          {chats && chats[activeChatIndex] && (
            <ChatBody
              messages={chats[activeChatIndex].messages}
              openModal={modalOpen}
              setModal={modalFlag}
            />
          )}
          {chats && chats[activeChatIndex] && (
            <ChatInput
              roomID={chats[activeChatIndex].roomID}
              uniqueID={chats[activeChatIndex].student.uniqueID}
              setModal={modalFlag}
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="chat-container">
      <div />
      <div className="no-chat">Ingen chats</div>
    </div>
  );
};

export default ChatContainer;
