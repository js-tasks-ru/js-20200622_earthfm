export default class NotificationMessage {
    static timer = null;
    static isElement = false;
    static rootElement = null;

    constructor(message, { duration = 2000, type = "success" } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        if (NotificationMessage.isElement) {
            this.remove();
        }

        this.setRootElement();
    }

    setRootElement() {
        this.element = document.createElement('div');
        this.element.className = `notification ${this.type}`;
        this.element.setAttribute('style', `--value:${this.duration / 1000}s`);

        NotificationMessage.rootElement = this.element;
        NotificationMessage.isElement = true;

        this.render();
    }

    get template() {
        return `
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">${this.message}</div>
            </div>
        `;
    }

    show(root = document.body) {
        root.append(this.element)

        NotificationMessage.timer = setTimeout(() => {
            this.destroy();
        }, this.duration - 10);
    }

    render() {
        this.element.innerHTML = this.template;
    }

    remove() {
        NotificationMessage.rootElement.remove();
    }

    destroy() {
        this.remove();
        clearTimeout(NotificationMessage.timer);
    }

}