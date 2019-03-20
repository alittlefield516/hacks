// ==UserScript==
// @name         Clean Up Dashboard
// @namespace    http://monetate.com/
// @version      0.1
// @description  Cleans up JIRA dashboard.
// @author       007
// @match        https://monetate.atlassian.net/secure/Dashboard.jspa
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.setTimeout(() => {
        const rowHeaders = document.querySelectorAll('tr.rowHeader');
        rowHeaders.forEach((r) => {
            r.style.display = 'none';
        });

        const titles = document.querySelectorAll('h3.dashboard-item-title');
        titles.forEach((t) => {
            t.innerHTML = t.innerHTML.replace('Filter Results: ', '');
        });

        const gadgets = document.querySelectorAll('div.gadget-inline');
        gadgets.forEach((g) => {
            g.style.height = 'auto';
        });

        const cells = document.querySelectorAll('td');
        cells.forEach((td) => {
            td.style.padding = '8px 16px 8px 0';
        });

        const summaries = document.querySelectorAll('td.summary');
        const normalStyle = 'color: #888 !important; font-size: 12px; line-height: 16px;';
        const boldStyle = 'color: #5e6c84; font-size: 13px'
        summaries.forEach((s) => {
            const p = s.querySelector('p');
            p.setAttribute('style', normalStyle);

            const a = s.querySelector('p > a.issue-link');
            a.style.color = '#888';

            const sum = a.innerHTML;
            const dash = sum.indexOf('-');
            const colon = sum.indexOf(':');
            let split;

            if(sum.match('CFC')) {
                a.innerHTML = '<b style="' + boldStyle + '">' + sum + '</b>';
                return;
            } else if(dash > -1 && colon > -1) {
                if(dash < colon) {
                    split = dash;
                } else {
                    split = colon;
                }
            } else if(dash > -1) {
                split = dash;
            } else if(colon > -1) {
                split = colon;
            } else {
                return;
            }

            a.innerHTML = '<b style="' + boldStyle + '">' + sum.substring(0, split) + '</b><br>' + sum.substring(split + 1);
        });


        const tbodies = document.querySelectorAll('tbody');
        tbodies.forEach((t) => {
            const rows = t.querySelectorAll('tr');
            for(let i=0; i<rows.length; i++) {
                if(i%2 == 0) {
                    rows[i].style.backgroundColor = '#F0F0F0';
                }
            }
        });

    }, 750);
})();