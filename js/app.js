'use strict';

const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const stores = {
    seattle: {
        estimates: {
            minCust: 23,
            maxCust: 65,
            avgSales: 6.3
        }
    },
    tokyo: {
        estimates: {
            minCust: 3,
            maxCust: 24,
            avgSales: 1.2
        }
    },
    dubai: {
        estimates: {
            minCust: 11,
            maxCust: 38,
            avgSales: 3.7
        }
    },
    paris: {
        estimates: {
            minCust: 20,
            maxCust: 38,
            avgSales: 2.3
        }
    },
    lima: {
        estimates: {
            minCust: 2,
            maxCust: 16,
            avgSales: 4.6
        }
    }
};

function generateRandomInRange(lower, upper) {
    let range = upper - lower;
    return Math.floor(Math.random() * range) + lower;
};

const seattle = {
    minCust: 23,
    maxCust: 65,
    avgSales: 6.3,
    salesData: [],
    getSales: function (timeArr) {
        let arr = [];
        for (let i = 0; i < timeArr.length; i++) {
            arr.push(`${timeArr[i]}: ${Math.floor(this.avgSales * generateRandomInRange(this.minCust, this.maxCust))} cookies`);
        }
        this.salesData = arr;
    }
};

seattle.getSales(openHours(6, 19));

const parentElement = document.getElementById('stores');

const article = document.createElement('article');
parentElement.appendChild(article);

const h2 = document.createElement('h2');
h2.textContent = seattle.location;
article.appendChild(h2);

const p = document.createElement('p');
p.textContent = '',
    article.appendChild(p);

const ul = document.createElement('ul');
article.appendChild(ul);

for (let i = 0; i < seattle.salesData.length; i++) {
    const li = document.createElement('li');
    li.textContent = seattle.salesData[i];
    ul.appendChild(li);
}