class Tooltip {
    static instance
    element
    x
    y
    title

    onPointerOver = (e) => {
        const {tooltip} = e.target.dataset;
        if (!tooltip) return;

        this.title = tooltip;
        this.render();

        document.addEventListener('pointermove', this.onPointerMove);
    }

    onPointerOut = () => {
        this.removeTooltip();
    }

    onPointerMove = (e) => {
        this.x = e.clientX + 10;
        this.y = e.clientY + 10;

        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
    }

    removeTooltip() {
        if (this.element) {
            this.element.remove();
        }
        
        document.removeEventListener('pointermove', this.onPointerMove);
    }
    
    constructor() {
        if (Tooltip.instance) {
            return Tooltip.instance;
        }

        Tooltip.instance = this;
    }

    initialize() {
        document.addEventListener('pointerover', this.onPointerOver);
        document.addEventListener('pointerout', this.onPointerOut);   
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'tooltip';
        this.element.innerHTML = this.title;

        document.body.append(this.element);
    }

    remove() {
        document.removeEventListener('pointerover', this.onPointerOver);
        document.removeEventListener('pointerout', this.onPointerOut);
        this.removeTooltip();
    }

    destroy() {
        this.remove();
    }
}

const tooltip = new Tooltip();

export default tooltip;
