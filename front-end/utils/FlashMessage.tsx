import { hideMessage, showMessage } from "react-native-flash-message";

export function showMsg(message, type){
    showMessage({
      message,
      type,
    })
  }