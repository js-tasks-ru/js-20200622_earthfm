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
		this.element = this._createElement(
			'div',
			`${Boolean(this.data.length) ? 'column-chart' : 'column-chart column-chart_loading'}`
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
		const title = this._createElement('div', 'column-chart__title');
		title.innerHTML = `
			Total ${label}
			${Boolean(link) ? `<a href="${link}" class="column-chart__link">View all</a>` : ''}
    `;

		return title;
	}

	_renderContainer(data, value) {
		const container = this._createElement('div', 'column-chart__container');
		container.innerHTML = `
			<div class="column-chart__header">${value}</div>
			<div class="column-chart__chart">
				${this._renderListTooltip(data)}
			</div>
    `;

		return container;
	}

	_renderListTooltip(data) {
		const calculateData = this._getColumnProps(data);
		return calculateData.reduce((str, currentData) => {
			return str += this._renderTooltip(currentData).outerHTML;
		}, '');
	}

	_renderTooltip(data) {
		const tooltip = document.createElement('div');
		tooltip.setAttribute('style', `--value:${data.value}`);
		tooltip.setAttribute('data-tooltip', data.percent);
		return tooltip;
	}

	// Utils
	_createElement(tag, className) {
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
