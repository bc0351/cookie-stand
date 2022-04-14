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

const storeLocations = Object.keys(stores);

const divElem = document.getElementById('stores');
const tbl = document.createElement('table');
const tblHead = document.createElement('thead');
const tblBody = document.createElement('tbody');
const tblFoot = document.createElement('tfoot');

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
    let arr = Array(openHours.length).fill(1);
    arr = arr.map(e => { return Math.floor(generateRandomInRange(this.minCust, this.maxCust) * this.avgSales) })
    arr.push(arr.reduce((e1, e2) => { return e1 + e2 }));
    return arr;
}

Store.prototype.render = function () {
    let arr = [this.location].concat(this.salesData);
    const tblRow = document.createElement('tr');

    tblRow.className = 'data-table';
    tblRow.id = 'data-table-row';

    arr.map(function (e, i) { const tblCell = document.createElement('td'); tblCell.className = 'data-table'; tblCell.id = 'data-table-cell'; tblCell.textContent = e; tblRow.appendChild(tblCell); });
    tblBody.appendChild(tblRow);
}

function createHeader() {

    const tblHeader = document.createElement('tr');

    tblHeader.className = 'data-table';
    tblHeader.id = 'data-table-header';

    let headers = openHours.map(e => `${e.match(/\d+(\.\d+)?/g)}:00 ${e.match(/\D+(\.\D+)?/g)}`);
    headers.push('Daily Location Total');
    headers.unshift('Location');

    headers.map(function (e, i) { const tblHeaderCell = document.createElement('th'); tblHeaderCell.className = 'data-table'; tblHeaderCell.id = 'data-header-cell'; tblHeaderCell.textContent = e; tblHeader.appendChild(tblHeaderCell); });
    // console.log(tblHeader)

    return tblHeader;
}

function createFooter() {
    const tblFooter = document.createElement('tr');
    tblFooter.className = 'data-table';

    let table = Array.prototype.map.call(document.querySelectorAll('table tr'), function(tr) {
        return Array.prototype.map.call(tr.querySelectorAll('td'), function(td) { return td.textContent;}
        );
    });
    
    table = table.slice(1,table.length).map(row => row.slice(1,row.length)).map(row => row.map(cell => Number(cell)));
    table = table[0].map((_, colIndex) => table.map(row => row[colIndex]));

    let footer = ['Hourly Totals'].concat(table.map(elm => elm.reduce((col1, col2) => {return col1 + col2})));
    
    footer.map(e => {const tblFooterCell = document.createElement('td'); tblFooterCell.className = 'data-table'; tblFooterCell.id = 'data-footer-cell'; tblFooterCell.textContent = e; tblFooter.appendChild(tblFooterCell); });

    return tblFooter;
    
}


function createBody() {
    storeLocations.forEach(store => { eval(`const ${store} = new Store('${store}', stores.${store}[0].minCust, stores.${store}[0].maxCust, stores.${store}[0].avgSales);`); });
}

function createTable() {

    tbl.className = 'data-table';
    tbl.id = 'data-table';

    tblHead.className = 'data-table';
    tblHead.id = 'data-table-head';

    tblBody.className = 'data-table';
    tblBody.id = 'data-table-body';

    tblFoot.classList = 'data-table';
    tblFoot.id = 'data-table-foot';

    divElem.appendChild(tbl);

    tblHead.appendChild(createHeader());
    tbl.appendChild(tblHead);

    createBody();
    tbl.appendChild(tblBody);

    tblFoot.appendChild(createFooter());
    tbl.appendChild(tblFoot);
    console.log(tbl);
}
