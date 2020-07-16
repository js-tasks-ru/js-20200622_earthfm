export default class NotificationMessage {
    static isElement = false;
    static rootElement = null;

    constructor(message, { duration = 2000, type = "success" } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        if (NotificationMessage.isElement) {
            NotificationMessage.rootElement.remove();
        }

        this.setRootElement();
    }

    setRootElement() {
        this.render();

        NotificationMessage.rootElement = this.element;
        NotificationMessage.isElement = true;
    }

    get template() {
        return `
            <div class="notification ${this.type}" style="--value:${this.duration}ms">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">${this.message}</div>
                </div>
            </div>
        `;
    }

    show(root = document.body) {
        root.append(this.element)

        setTimeout(() => {
            this.destroy();
        }, this.duration);
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.template;

        this.element = element.firstElementChild;
    }

    remove() {
        this.element.remove(); // ? в чём разница NotificationMessage.rootElement.remove();
    }

    destroy() {
        this.remove();
    }

}