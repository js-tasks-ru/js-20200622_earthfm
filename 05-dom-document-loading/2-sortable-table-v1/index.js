export default class SortableTable {
    subElements = {};

    constructor(header, { data = [] } = {}) {
        this.header = header;
        this.data = data;

        this.setRootElement();

        this.render();
    }

    setRootElement() {
        this.element = document.createElement('div');
        this.element.setAttribute('data-element', 'productsContainer');
        this.element.classList.add('products-list__container');
    }

    render() {
        this.element.innerHTML = `
            ${this.headerTemplate.outerHTML}
            ${this.bodyTemplate.outerHTML}
        `;

        this.subElements['header'] = this.headerTemplate;
        this.subElements['body'] = this.bodyTemplate;
    }

    get headerTemplate() {
        const header = document.createElement('div');
        header.setAttribute('data-element', 'header');
        header.className = 'sortable-table__header sortable-table__row';

        header.innerHTML = `
            ${
                this.header.reduce((result, { id, title }) => {
                    return result + `
                                <div class="sortable-table__cell" data-id="${id}" data-name="title" data-sortable="">
                                    <span>${title}</span>
                                </div>
                            `;
                }, '')
            }
        `;

        return header;
    }

    get bodyTemplate() {
        const body = document.createElement('div');
        body.setAttribute('data-element', 'body');
        body.className = 'sortable-table__body';

        body.innerHTML = `
            ${
                this.data.reduce((result, {
                    title,
                    price,
                    quantity,
                    sales,
                    images
                }) => {
                    return result + `
                        <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
                            ${
                                images
                                    ? `<div class="sortable-table__cell">
                                        <img class="sortable-table-image" alt="Image" src="${images[0].url}">
                                        </div>`
                                    : ''
                            }
                                <div class="sortable-table__cell">${title}</div>
                                ${
                                    quantity 
                                        ? `<div class="sortable-table__cell">${quantity}</div>`
                                        : '' 
                                }
                                <div class="sortable-table__cell">${price}</div>
                                <div class="sortable-table__cell">${sales}</div>
                        </a>
                        `;
                }, '')
            }`;

        return body;
    }

    sort(fieldValue, orderValue) {
        const currentCell = this.header.filter(item => item.id === fieldValue);

        switch (currentCell[0]['sortType']) {
            case 'string': {
                this.data = this.sortStrings(this.data, fieldValue, orderValue);
                break;
            }
            case 'number': {
                this.data = this.sortNumber(this.data, fieldValue, orderValue);
                break;
            }
            default:
                break;
        }

        this.render();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }

    sortStrings(arr, field, param = 'asc') {
        const words = [...arr];

        return words.sort((a, b) =>
            param === 'asc' ? this.compareString(a[field], b[field]) : this.compareString(b[field], a[field])
        );
    }

    sortNumber(arr, field, param = 'asc') {
        const numbers = [...arr];

        return numbers.sort((a, b) =>
            param === 'asc' ? a[field] - b[field] : b[field] - a[field]
        );
    }

    compareString(str1, str2) {
        return str1.localeCompare(str2, ['ru', 'us',], { caseFirst: 'upper' });
    }
}
