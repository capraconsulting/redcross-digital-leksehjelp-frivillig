export const API_URL = 'http://localhost:8080/';
export const CHAT_URL = 'ws://localhost:3002/events';

const token = sessionStorage ? sessionStorage.getItem('msal.idtoken') : '';
export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const MESSAGE_TYPES = {
  CONNECTION: 'CONNECTION',
  ENTER_QUEUE: 'ENTER_QUEUE',
  DISTRIBUTE_ROOM: 'DISTRIBUTE_ROOM',
  GENERATE_ROOM: 'GENERATE_ROOM',
  QUEUE_LIST: 'QUEUE_LIST',
  TEXT: 'TEXT',
  JOIN_CHAT: 'JOIN_CHAT',
  LEAVE_CHAT: 'LEAVE_CHAT',
  ERROR_LEAVING_CHAT: 'ERROR_LEAVING_CHAT',
};

export const AZURE_TOKENS = {
  PUBLIC_SAS_TOKEN:
    '?sv=2018-03-28&ss=bf&srt=sco&sp=rwac&se=2019-11-30T23:40:43Z&st=2019-07-28T14:40:43Z&spr=https&sig=AUX0rslHKTcTfS7bsUf7UoYRY6gGiHdcdveXFccR9kA%3D',
  CONNECTION_STRING:
    'BlobEndpoint=https://redcrossstudent.blob.core.windows.net/;QueueEndpoint=https://redcrossstudent.queue.core.windows.net/;FileEndpoint=https://redcrossstudent.file.core.windows.net/;TableEndpoint=https://redcrossstudent.table.core.windows.net/;SharedAccessSignature=sv=2018-03-28&ss=bf&srt=sco&sp=rwac&se=2019-11-30T23:40:43Z&st=2019-07-28T14:40:43Z&spr=https&sig=AUX0rslHKTcTfS7bsUf7UoYRY6gGiHdcdveXFccR9kA%3D',
};
