'use strict';

const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let stores = {
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

let storesArray = [];

const storeLocations = Object.keys(stores);

const sectionElemForm = document.getElementById('section-data-form');

const sectionElem = document.getElementById('data-table');
const tbl = document.createElement('table');
const tblHead = document.createElement('thead');
const tblBody = document.createElement('tbody');

function generateRandomInRange(lower, upper) {
    let range = upper - lower;
    return Math.floor(Math.random() * range) + lower;
};

function Store(location, minCust, maxCust, avgSales) {
    this.location = location,
    this.minCust = minCust,
    this.maxCust = maxCust,
    this.avgSales = avgSales,
    this.salesData = [],
    this.generateSalesData(),
    this.render()
}

Store.prototype.generateSalesData = function () {
    let arr = Array(openHours.length).fill(1);
    arr = arr.map(e => { return Math.floor(generateRandomInRange(this.minCust, this.maxCust) * this.avgSales) })
    arr.push(arr.reduce((e1, e2) => { return e1 + e2 }));
    this.salesData = arr;
    storesArray.push(this)
}

Store.prototype.render = function () {
    let arr = [this.location].concat(this.salesData);
    const tblRow = document.createElement('tr');

    tblRow.className = 'data-table';
    tblRow.id = 'row-body';

    arr.map(function (e, i) { const tblCell = document.createElement('td'); tblCell.className = 'data-table'; (i === 0) ? tblCell.id = 'cell-body-loc' : (i === arr.length - 1) ? tblCell.id = 'cell-body-total' : tblCell.id = 'cell-body-time'; tblCell.textContent = e; tblRow.appendChild(tblCell); });
    tblBody.appendChild(tblRow);
}

function createHeader() {

    const tblHeader = document.createElement('tr');

    tblHeader.className = 'data-table';
    tblHeader.id = 'row-header';

    let headers = openHours.map(e => `${e.match(/\d+(\.\d+)?/g)}:00 ${e.match(/\D+(\.\D+)?/g)}`);
    headers.push('Daily Location Total');
    headers.unshift('Location');

    headers.map(function (e, i) { const tblHeaderCell = document.createElement('th'); tblHeaderCell.className = 'data-table'; (i === 0) ? tblHeaderCell.id = 'cell-header-loc' : (i === headers.length - 1) ? tblHeaderCell.id = 'cell-header-total' : tblHeaderCell.id = 'cell-header-time'; tblHeaderCell.textContent = e; tblHeader.appendChild(tblHeaderCell); });

    return tblHeader;
}

function createFooter() {
    const tblFooter = document.createElement('tr');
    tblFooter.className = 'data-table';
    tblFooter.id ="row-footer";

    let table = Array.prototype.map.call(document.querySelectorAll('table tr'), function(tr) {
        return Array.prototype.map.call(tr.querySelectorAll('td'), function(td) { return td.textContent;}
        );
    });
    
    table = table.slice(1,table.length).map(row => row.slice(1,row.length)).map(row => row.map(cell => Number(cell)));
    table = table[0].map((_, colIndex) => table.map(row => row[colIndex]));

    let footer = ['Hourly Totals'].concat(table.map(elm => elm.reduce((col1, col2) => {return col1 + col2})));
    
    footer.map(function(e,i) {const tblFooterCell = document.createElement('td'); tblFooterCell.className = 'data-table'; (i === 0) ? tblFooterCell.id = 'cell-footer-loc' : (i === footer.length - 1) ? tblFooterCell.id = 'cell-footer-total' : tblFooterCell.id = 'cell-footer-time'; tblFooterCell.textContent = e; tblFooter.appendChild(tblFooterCell); });

    return tblFooter;
    
}

function createBody() {
    storeLocations.forEach(store => { eval(`const ${store} = new Store('${store}', stores.${store}[0].minCust, stores.${store}[0].maxCust, stores.${store}[0].avgSales).generateSalesData();`);});
}

function createTable() {
    console.log(storesArray);
    tbl.className = 'data-table';
    tbl.id = 'table';

    tblHead.className = 'data-table';
    tblHead.id = 'head-table';

    tblBody.className = 'data-table';
    tblBody.id = 'body-table';

    sectionElem.appendChild(tbl);

    tblHead.appendChild(createHeader());
    tbl.appendChild(tblHead);

    createBody();
    tbl.appendChild(tblBody);

    tblBody.appendChild(createFooter());
    console.log(tbl);
}

const storeForm = document.getElementById('addStoreForm');

storeForm.addEventListener('submit', 
    function(event) {
        event.preventDefault();
        let location = event.target.location.value;
        let minCust = event.target.minCust.value;
        let maxCust = event.target.maxCust.value;
        let avgSales = event.target.avgSales.value;

        window[`${location}`] = new Store(location, minCust, maxCust, avgSales);
        window[`${location}`].generateSalesData();
        window[`${location}`].render();
});
