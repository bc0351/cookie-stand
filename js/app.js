'use strict';

const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const stores = {
    Seattle: [{
        minCust: 23,
        maxCust: 65,
        avgSales: 6.3
    }],
    Tokyo: [{
        minCust: 3,
        maxCust: 24,
        avgSales: 1.2
    }],
    Dubai: [{
        minCust: 11,
        maxCust: 38,
        avgSales: 3.7
    }],
    Paris: [{
        minCust: 20,
        maxCust: 38,
        avgSales: 2.3
    }],
    Lima: [{
        minCust: 2,
        maxCust: 16,
        avgSales: 4.6
    }]
};

const storeLocations = stores.keys;
console.log(storeLocations);

function generateRandomInRange(lower, upper) {
    let range = upper - lower;
    return Math.floor(Math.random() * range) + lower;
};

function Store(location, minCust, maxCust, avgSales) {
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgSales = avgSales;
    this.salesData = this.generateSalesData();
    this.render();
}

Store.prototype.generateSalesData = function () {
    let arr = [];
    for (let i = 0; i < openHours.length; i++) {
        arr.push(this.avgSales * generateRandomInRange(this.minCust, this.maxCust));
    }
    return arr;
}

Store.prototype.render = function () {

    createHeader();

    const tableRow = document.createElement('tr');
    tableRow.className = 'data-row';
    tableRow.id = storeLocations.indexOf(this.location);

    const tableCell = document.createElement('td');

    tableRow.appendChild(tableCell);
    tableCell.textContent = this.location;

    this.salesData.map(function (elm, index) { tableRow.appendChild(tableCell); tableCell.textContent = Number(elm); tableCell.className = 'data-cell'; tableCell.id = index });

}

function createHeader() {
    const divElem = document.getElementById('stores');
    const table = document.createElement('table');
    divElem.appendChild(table);
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    const tableHeader = document.createElement('tr');
    tableHeader.className = 'header-row';
    table.appendChild(tableHeader);

    openHours.map(elm => elm.replace(`${/[APap][mM]$/}`, `:00${/[APap][mM]$/}`)).push('Daily Location Total').map(function (elm) { const headerCell = document.createElement('th'); tableHeader.appendChild(headerCell); headerCell.textContent = elm; headerCell.className = 'header-cell' });
}

function createFooter() {
    const tableFooter = document.createElement('tr');
    tableFooter.className = 'footer-row';
    table.appendChild(tableFooter);
    const footerCell = documents.createElement('td');
    let tableData = [];

    document.getElementsByClassName('data-row').map(tableData.push(document.getElementsByClassName('data-row').forEach(element => { isNaN(element) ? '' : Number(element) })));
    console.log(tableData);

    let rowTotals = tableData.forEach(row => row.reduce(elm, elm1 => isNaN(elm) && isNaN(elm1) ? '' : elm + elm1));
    rowTotals.forEach(elm, index => tableRow.getElementById(index).appendChild(tableCell).textContent = elm);

    let colTotals = tabledata[0].length.forEach(i => tabledata[i].reduce(function (val1, val2) { return val1 + val2 }));
    colTotals.forEach(function (elm, index) { tableFooter.appendChild(footerCell); footerCell.textContent = elm; footerCell.id = index; });
}

const seattle = new Store('Seattle', 23, 65, 6.3);
const tokyo = new Store('Tokyo', 3, 24, 1.2);
const dubai = new Store('Dubai', 11, 38, 3.7);
const paris = new Store('Paris', 20, 38, 2.3);
const lima = new Store('Lima', 2, 2.3, 4.6);

seattle.prototype.render();
tokyo.prototype.render();
dubai.prototype.render();
paris.prototype.render();
lima.prototype.render();