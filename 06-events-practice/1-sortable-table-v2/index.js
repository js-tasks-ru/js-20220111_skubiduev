export default class SortableTable {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}, isSortLocally = true) {
    this.headerConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;

    this.render(this.headerConfig, this.data);
    this.sort(this.sorted.id || this.headerConfig.find(item => item.sortable).id, this.sorted.order || 'asc');
  }

  render(headerConfig, data) {
    this.element = document.createElement('div');
    this.element.className = 'sortable-table';

    let htmlDataArray = [];
    let elementInnerHtml = '<div data-element="header" class="sortable-table__header sortable-table__row">';

    for (const column of headerConfig) {
      headerConfig.find(item => item.sortable).id === column.id ? htmlDataArray.push(`<div class="sortable-table__cell" data-id="${column.id}" data-sortable="${column.sortable}" data-order="asc"><span>${column.title}</span><span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span></div>`) : htmlDataArray.push(`<div class="sortable-table__cell" data-id="${column.id}" data-sortable="${column.sortable}"><span>${column.title}</span></div>`);
    }

    elementInnerHtml += `${htmlDataArray.join('')}</div><div data-element="body" class="sortable-table__body">`;

    htmlDataArray = [];

    for (const column of data) {
      let row = `<a href="/products/${column.id}" class="sortable-table__row">`;

      for (const header of headerConfig) {
        header.id === 'image' ? htmlDataArray.push(header.template()) : htmlDataArray.push(`<div class="sortable-table__cell">${column[header.id]}</div>`);
      }

      row += `${htmlDataArray.join('')}</a>`;
      htmlDataArray = [];
      elementInnerHtml += row;
    }

    elementInnerHtml += '</div>';
    this.element.innerHTML = elementInnerHtml;
    this.subElements = this.getSubElements();

    this.subElements.header.addEventListener('pointerdown', event => {
      const closestSortableTableCell = event.target.closest('.sortable-table__cell');
      closestSortableTableCell.dataset.order = !closestSortableTableCell.dataset.order || closestSortableTableCell.dataset.order === 'asc' ? 'desc' : 'asc';

      this.sort(closestSortableTableCell.dataset.id, closestSortableTableCell.dataset.order);
      closestSortableTableCell.append(this.element.querySelector('[data-element="arrow"]'));
    });
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      result[subElement.dataset.element] = subElement;
    }

    return result;
  }

  sort(field, direction) {
    const rows = Array.from(this.subElements.body.children);
    const cellIndex = this.headerConfig.findIndex(obj => obj.id === field);

    rows.sort((row1, row2) => {
      let row1TextContent = row1.querySelectorAll('.sortable-table__cell')[cellIndex].textContent;
      let row2TextContent = row2.querySelectorAll('.sortable-table__cell')[cellIndex].textContent;

      if (!isNaN(+row1TextContent)) {
        row1TextContent = +row1TextContent;
        row2TextContent = +row2TextContent;
        return direction === 'asc' ? row1TextContent - row2TextContent : row2TextContent - row1TextContent;
      }

      const sortNumber = row1TextContent.localeCompare(row2TextContent, ['ru', 'en']);

      return direction === 'asc' ? sortNumber : -sortNumber;
    });

    for (const row of rows) {
      this.subElements.body.append(row);
    }
  }

  destroy() {
    this.element.remove();
  }
}
