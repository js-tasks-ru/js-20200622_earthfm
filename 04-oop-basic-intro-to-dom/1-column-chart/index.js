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

		this.element.append(this._renderTitle(this.label, this.link));
		this.element.append(this._renderContainer(this.data, this.value));
	}

	remove() {
		this.element.remove();
	}

	destroy() {
		this.remove();
	}

	_renderTitle(label, link) {
		const title = document.createElement('div');
		title.innerHTML = `
			<div class="column-chart__title">
				Total ${label}
				${Boolean(link) ? `<a href="${link}" class="column-chart__link">View all</a>` : ''}
			</div>
    	`;

		return title;
	}

	_renderContainer(data, value) {
		const container = document.createElement('div');
		container.innerHTML = `
			<div class="column-chart__container">
				<div class="column-chart__header">${value}</div>
				<div class="column-chart__chart">
					${this._renderListTooltip(data)}
				</div>
			</div>
    	`;

		return container;
	}

	_renderListTooltip(data) {
		const calculateData = this._getColumnProps(data);
		return calculateData.reduce((str, currentData) => {
			return str += this._renderTooltip(currentData).innerHTML;
		}, '');
	}

	_renderTooltip({value, percent}) {
		const tooltip = document.createElement('div');
		tooltip.innerHTML = `
			<div style="--value:${value}" data-tooltip="${percent}"></div>
		`;
		return tooltip;
	}

	createElement(tag, className) {
		const elem = document.createElement(tag);
		elem.className = className;
		return elem;
	}

	_getColumnProps(data) {
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
