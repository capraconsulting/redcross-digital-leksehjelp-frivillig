import React from 'react';
import { ITextMessage } from '../../interfaces';
import { timeStringFromDate } from '../../services';

interface IProps {
  message: ITextMessage;
}

const ChatMessageComponent = (props: IProps) => {
  console.log(props.message);
  const { message, author, uniqueID, files } = props.message;
  // Placeholder for when we get users
  // TODO: change when we have users, to use the username instead
  const authorType = author === 'frivillig' ? 'self' : 'other';

  const downloadFile = file => {
    const a = document.createElement('a');
    a.href = String(file.fileUrl);
    a['download'] = file.fileName;
    a.click();
  };

  const RenderFiles = () => {
    return (
      typeof message === 'string' &&
      files &&
      files.length > 0 &&
      files.map((file, index) => {
        return (
          <div className={'chat-message'} key={index}>
            <div
              className={`chat-message--download chat-message--${authorType} chat-message--${authorType}--file`}
            >
              <p className={`chat-message--message`}>
                <span className="chat-message--file-name">
                  {file.fileName}{' '}
                </span>
                <span className="chat-message--file-size">
                  {(1000000 / 1000000).toPrecision(3)} MB
                </span>
              </p>
              <img
                onClick={() => downloadFile(file)}
                className="svg-download"
                src={require('../../assets/images/download.svg')}
                alt=""
              />
            </div>
          </div>
        );
      })
    );
  };

  const renderMessage = () => {
    return (
      message &&
      message.length > 0 && (
        <p
          className={`chat-message--message chat-message--${authorType} chat-message--${authorType}--message`}
        >
          {message}
        </p>
      )
    );
  };
  if (uniqueID === 'NOTIFICATION') {
    return (
      <div className="chat-message">
        <p className="chat-message--notification">
          {author} {message}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="chat-message">
          <p className={`chat-message--author-${authorType}`}>
            <span>{authorType === 'self' ? 'Deg' : props.message.author}</span>,
            kl.{' '}
            <span>
              {props.message.datetime &&
                timeStringFromDate(props.message.datetime)}
            </span>
          </p>
          {renderMessage()}
        </div>
        {RenderFiles()}
      </div>
    );
  }
};

export default ChatMessageComponent;
