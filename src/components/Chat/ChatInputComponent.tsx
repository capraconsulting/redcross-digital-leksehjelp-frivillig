import React, { useContext, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  createTextMessage,
  uploadFileToAzureFileStorage,
} from '../../services';
import { ISocketFile, IFile } from '../../interfaces';
import { addMessageAction } from '../../reducers';
import { SocketContext } from '../../providers';
import { IconButton } from '../';
import '../../styles/chat-input-component.less';

interface IProps {
  uniqueID: string;
  roomID: string;
}

const ChatInputComponent = (props: IProps) => {
  const [message, setMessage] = useState<string>('');
  const [tempFiles, setTempFiles] = useState([] as any[]);
  const { dispatchChats, socketSend } = useContext(SocketContext);
  const { uniqueID, roomID } = props;

  const uploadPromises = tempFiles => {
    return tempFiles.map(async file => {
      return uploadFileToAzureFileStorage(
        'chatfiles',
        uniqueID,
        file,
        uniqueID,
      );
    });
  };

  const sendTextMessage = (event, results) => {
    event.preventDefault();
    if (message.length > 0 || results.length > 0) {
      console.log(message);
      console.log(results);
      let files = results;
      const { textMessage, socketMessage } = createTextMessage(
        message,
        uniqueID,
        roomID,
        files,
      );
      socketSend(socketMessage);
      dispatchChats(addMessageAction(textMessage));
      setMessage('');
      setTempFiles([] as any[]);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    return Promise.all<IFile>(uploadPromises(tempFiles)).then(results => {
      console.log(results);
      sendTextMessage(event, results);
    });
  };

  const DropzoneWithoutClick = () => {
    const onDrop = useCallback(
      acceptedFiles => {
        setTempFiles([...tempFiles, ...acceptedFiles]);
      },
      [tempFiles],
    );
    const { getRootProps, getInputProps, open } = useDropzone({
      noClick: true,
      noKeyboard: true,
      onDrop,
    });
    const FileList = () => {
      return (
        <ul className="filelist">
          {tempFiles.map((file, index) => {
            const { name } = file;
            return (
              <li key={index}>
                <span>
                  <a
                    className="filelist-ankertag"
                    href={URL.createObjectURL(file)}
                    title={name}
                    download={name}
                  >
                    {name}{' '}
                  </a>
                  <IconButton
                    onClick={() => {
                      setTempFiles(tempFiles.filter((_, i) => i !== index));
                    }}
                  ></IconButton>{' '}
                </span>
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className={'message-form-container'}>
          <form className={'message-form'}>
            <input
              onChange={event => {
                let { files } = event.target;
                let newFiles = [] as any;
                let steps = (files && files.length) || 0;
                for (var i = 0; i < steps; i++) {
                  let item = (files && files.item(i)) || 'null';
                  newFiles.push(item);
                }
                files && setTempFiles([...tempFiles, ...newFiles]);
              }}
              type="file"
              name="attachment"
              id="msg-file-input"
              accept="image/*|.pdf|.doc|.docx"
              className="file"
            />
            <button type="button" className="upload" onClick={open}>
              <span className="plus">+</span>
              <div className="tooltip">
                Hvis du sender et vedlegg, må du gjerne fjerne navnet ditt eller
                andre ting fra dokumentet som kan identifisere deg.
              </div>
            </button>
            <input
              className={'message-text'}
              type="textarea"
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
            <button
              onClick={event => handleSubmit(event)}
              className={'send-message'}
            >
              <svg width="30px" height="30px" viewBox="0 0 30 30">
                <polygon
                  className="arrow"
                  points="30 15 0 30 5.5 15 0 0"
                ></polygon>
              </svg>
            </button>
          </form>
          <FileList />
        </div>
      </div>
    );
  };
  return <DropzoneWithoutClick />;
};

export default ChatInputComponent;
