import { message } from 'antd';

function success(mess : string) {
  setTimeout(() => {
    message.success(mess);
  }, 500);
}

function error(mess : string) {
  setTimeout(() => {
    message.error(mess);
  }, 500);
}

function warning(mess : string) {
  setTimeout(() => {
    message.warning(mess);
  }, 500);
}

function info(mess : string) {
  setTimeout(() => {
    message.info(mess);
  }, 500);
}

export default {
  success,
  error,
  warning,
  info,
};
