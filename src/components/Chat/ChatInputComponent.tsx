import React, { useContext, useState } from 'react';
import { sendTextMessage } from '../../services';
import { ISocketFile, ISocketMessage, ITextMessage } from '../../interfaces';
import { addMessage } from '../../reducers';
import { SocketContext } from '../../providers';

interface IProps {
  uniqueID: string;
  roomID: string;
}

const ChatInputComponent = (props: IProps) => {
  const [message, setMessage] = useState<string>('');
  const { dispatchChats } = useContext(SocketContext);
  const { uniqueID, roomID } = props;

  const onSendTextMessage = event => {
    event.preventDefault();
    if (message.length > 0) {
      const textMessage = sendTextMessage(message, uniqueID, roomID);
      setMessage('');
      dispatchChats(addMessage(textMessage));
    }
  };

  const onFileUploadClick = () => {
    const fileInput = document.getElementById('msg-file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const onSendFileMessage = (file: File) => {
    const fr = new FileReader();
    fr.onload = () => {
      const socketFile: ISocketFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        dataURL: String(fr.result),
      };
      const textMessage: ITextMessage = sendTextMessage(
        socketFile,
        uniqueID,
        roomID,
      );
      dispatchChats(addMessage(textMessage));
    };
    fr.readAsDataURL(file);
  };

  return (
    <div className="message-form-container">
      <form className="message-form">
        <input
          onChange={event =>
            event.target.files && onSendFileMessage(event.target.files[0])
          }
          type="file"
          name="attachment"
          id="msg-file-input"
          accept="image/*|.pdf|.doc|.docx"
          className="file"
        />
        <button type="button" className="upload" onClick={onFileUploadClick}>
          <img
            className="add-file-icon"
            src={require('../../assets/images/add-file.svg')}
            alt="Legg til fil"
          />
          <div className="tooltip">
            Hvis du sender et vedlegg, må du gjerne fjerne navnet ditt eller
            andre ting fra dokumentet som kan identifisere deg.
          </div>
        </button>
        <input
          className="message-text"
          type="textarea"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button onClick={onSendTextMessage} className="send-message">
          <img
            className="send-icon"
            src={require('../../assets/images/send.svg')}
            alt="Send"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatInputComponent;
