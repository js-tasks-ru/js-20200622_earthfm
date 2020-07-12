export default class ColumnChart {
	chartHeight = 50;
	element = null;

	constructor({data = [], label = '', value = 0, link = ''} = {}) {
		this.data = data;
		this.label = label;
		this.value = value;
		this.link = link;

		this.render();
	}

	update() {
		this.render();
	}

	render() {
		this.element = this.createElement(
			'div',
			`${this.data.length ? 'column-chart' : 'column-chart column-chart_loading'}`
		);

		this.element.innerHTML = `
			${this.renderTitle(this.label, this.link)}
			${this.renderContainer(this.data, this.value)}
		`;
	}

	remove() {
		this.element.remove();
	}

	destroy() {
		this.remove();
	}

	renderTitle(label, link) {
		return `
			<div class="column-chart__title">
				Total ${label}
				${Boolean(link) ? `<a href="${link}" class="column-chart__link">View all</a>` : ''}
			</div>
    	`;
	}

	renderContainer(data, value) {
		return `
			<div class="column-chart__container">
				<div class="column-chart__header">${value}</div>
				<div class="column-chart__chart">
					${this.renderListTooltip(data)}
				</div>
			</div>
    	`;
	}

	renderListTooltip(data) {
		const calculateData = this.getColumnProps(data);
		return calculateData.reduce((str, currentData) => {
			return str += this.renderTooltip(currentData);
		}, '');
	}

	renderTooltip({value, percent}) {
		return `
			<div style="--value:${value}" data-tooltip="${percent}"></div>
		`;
	}

	createElement(tag, className) {
		const elem = document.createElement(tag);
		elem.className = className;
		return elem;
	}

	getColumnProps(data) {
		const maxValue = Math.max(...data);
		const scale = 50 / maxValue;
	
		return data.map(item => {
			return {
				percent: (item / maxValue * 100).toFixed(0) + '%',
				value: String(Math.floor(item * scale))
			};
		});
	}
}
