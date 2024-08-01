import * as MessageTray from 'resource:///org/gnome/shell/ui/messageTray.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
// import MessageTray from 'ui://messageTray';

// const MessageTray = imports.ui.messageTray;
// const MessageTray = MessageTray.MessageTray;

let oldDestroy;
  
function _destroy(reason) {
  if (reason != 3) {
    oldDestroy.call(this);
  }
}

export default class GrownNotifications extends Extension {
  
  init() {
    oldDestroy = MessageTray.Notification.prototype.destroy;
  }
  
  enable() {
    MessageTray.Notification.prototype.destroy = _destroy;
  }
  
  disable() {
    MessageTray.Notification.prototype.destroy = oldDestroy;
  }
}
