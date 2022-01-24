export default class ColumnChart {
  constructor(options) {
    this.chartHeight = 50;
    this.options = {
      data: [],
      label: 'orders',
      value: 0,
      link: '#',
    };
    Object.assign(this.options, options);
    this.update(this.options, arguments.length === 0);
  }

  update(options, isLoading) {
    if (Array.isArray(options)) {
      this.options.data = options;
      options = this.options;
    }

    this.element = document.createElement('div');
    this.element.classList.add('column-chart');

    if (isLoading) {
      this.element.classList.add('column-chart_loading');
      this.element.innerHTML = '<img src="charts-skeleton.svg">';
      return;
    }

    this.element.cssText = `--chart-height: ${this.chartHeight}`;
    const newData = this.getColumnProps(options.data);
    let elementInnerHtml = `<div class="column-chart__title">Total ${options.label}`;

    if (options.label === 'orders') {
      elementInnerHtml += '<a href="/sales" class="column-chart__link">View all</a>';
    }

    elementInnerHtml += `</div><div class="column-chart__container"><div data-element="header" class="column-chart__header">`;
    elementInnerHtml += options.formatHeading ? options.formatHeading(options.value) : options.value;
    elementInnerHtml += `</div><div data-element="body" class="column-chart__chart">`;

    for (const item of newData) {
      elementInnerHtml += `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`;
    }

    elementInnerHtml += '</div></div></div>';
    this.element.innerHTML = elementInnerHtml;
  }

  destroy() {
  }

  remove() {
    this.element.remove();
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
