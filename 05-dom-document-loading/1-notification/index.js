export default class NotificationMessage {
  static activeNotification;

  constructor(message = '', {duration = 1000, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = document.createElement('div');
    this.element.innerHTML = this.template;
    this.element = this.element.firstElementChild;
    this.show();
  }

  get template() {
    return `<div class="notification ${this.type}" style="--value:${this.duration / 100}s"><div class="timer"></div><div class="inner-wrapper"><div class="notification-header">${this.type}</div><div class="notification-body">${this.message}</div></div>`;
  }

  show(element = document.body) {
    element.append(this.element);
    setTimeout(() => this.remove(), this.duration);
    NotificationMessage.activeNotification = this;
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }
}
