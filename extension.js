import * as MessageTray from 'resource:///org/gnome/shell/ui/messageTray.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

let oldDestroy;

function _destroy(reason) {
    if (reason != MessageTray.NotificationDestroyedReason.SOURCE_CLOSED) {
        console.log("Destroying notification for reason: " + reason);
        oldDestroy.call(this);
    }
}

export default class GrownNotifications extends Extension {
    init() {
        oldDestroy = MessageTray.Notification.prototype.destroy;
    }

    enable() {
        if (!oldDestroy) {
            this.init(); // Ensure oldDestroy is initialized
        }
        MessageTray.Notification.prototype.destroy = _destroy;
    }

    disable() {
        if (oldDestroy) {
            MessageTray.Notification.prototype.destroy = oldDestroy;
        }
    }
}