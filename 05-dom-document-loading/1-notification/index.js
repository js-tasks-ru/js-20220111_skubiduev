export default class NotificationMessage {
  constructor(message = '', {duration = 1000, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = document.createElement('div');
    this.element.className = `notification ${this.type}`;
    this.element.cssText = `--value:${this.duration / 100}s`;
    this.element.innerHTML = `<div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
${message}
      </div>
    </div>`;
    this.show();
  }

  show(element) {
    if (element) {
      element.append(this.element);
    }
    setTimeout(() => this.remove(), this.duration);
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }
}
