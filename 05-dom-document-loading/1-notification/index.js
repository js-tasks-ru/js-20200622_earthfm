export default class NotificationMessage {
    static HELP_TIME = 10;

    timer = null;

    constructor(message, {duration = 2000, type} = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        this.element = document.createElement('div');
        this.element.className =`notification ${Boolean(this.type) ? `${this.type}` : ""}`;
        this.element.setAttribute('style', `--value:${this.duration / 1000}s`);
    }

    //<div class="notification ${Boolean(this.type) ? `${this.type}` : ""}" style="--value:${this.duration / 1000}s">
    get template() {
        return `
            <div class="timer"></div>
            <div class="inner-wrapper">
                ${Boolean(this.type) ? `<div class="notification-header">${this.type}</div>` : ''}
                <div class="notification-body">${this.message}</div>
            </div>
        `;
    }

    show() {
        this.render();
        this.timer = setTimeout(() => {
            this.destroy();
        }, this.duration - NotificationMessage.HELP_TIME);
    }

    render() {
        this.element.innerHTML = this.template;

        if (!document.querySelector('.notification')) {
            document.body.append(this.element);
        }
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        clearTimeout(this.timer);
    }

}
