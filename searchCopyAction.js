// ==UserScript==
// @name         Search/Copy Action Name
// @namespace    http://www.monetate.com/
// @version      1.0
// @description  Inserts button to go right to search results for this action name. Also adds a button for copying the action name to clipboard.
// @author       Andrew Littlefield
// @match        https://marketer.monetate.net/control/*
// @match        https://dev-*-*.monetate.org/control/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const loc = location.href;
    if(loc.match(/\/experience\/[0-9]{6}/)) {
        const addBtns = () => {
            console.log('addBtns');
            window.setTimeout(() => {
                if(document.querySelector('div.js-search')) {
                    return;
                }
                let btn1, btn2;
                const btnGrps = document.querySelectorAll('div.button-group.float-r');
                for(let i=0; i<btnGrps.length; i++) {
                    btn1 = document.createElement('div');
                    btn2 = document.createElement('div');
                    btn1.className = 'icon-only button js-search';
                    btn2.className = 'icon-only button js-copy';
                    btn1.setAttribute('data-tooltip', 'Search for Action');
                    btn2.setAttribute('data-tooltip', 'Copy Name');
                    btn1.style.height = btn2.style.height = '33px';
                    btn1.innerHTML = '<span class="micon-search" style="pointer-events: none;"><svg><use xlink:href="/site_media/build/closure/mt/images/micons.svg#micon-search"></use></svg></span>';
                    btn2.innerHTML = '<span class="micon-html" style="pointer-events: none;"><svg><use xlink:href="/site_media/build/closure/mt/images/micons.svg#micon-html"></use></svg></span>';
                    btn1.addEventListener('click', (e) => {
                        window.open(loc.replace(/\/experience\/.*/, '/action/') + '?search=' + encodeURIComponent(e.target.parentNode.parentNode.querySelector('div.title-button > b').innerHTML));
                    });
                    btn2.addEventListener('click', (e) => {
                        const dummy = document.createElement('textarea');
                        dummy.value = e.target.parentNode.parentNode.querySelector('div.title-button > b').innerHTML;
                        document.body.appendChild(dummy);
                        dummy.select();
                        document.execCommand('copy');
                        document.body.removeChild(dummy);
                    });
                    btnGrps[i].insertBefore(btn2, btnGrps[i].firstChild);
                    btnGrps[i].insertBefore(btn1, btnGrps[i].firstChild);
                }
            }, 1000);
        }

        window.setTimeout(() => {
            const whatBtns = document.querySelectorAll('div.what-button');
            for(let j=0; j<whatBtns.length; j++) {
                console.log('what-button');
                whatBtns[j].addEventListener('click', addBtns);
            }
        }, 500);

        if(loc.match(/:what/)) {
            addBtns();
        }
    } else if(loc.match(/\/action\//)) {
        window.setTimeout(() => {
            const actionToSearch = decodeURIComponent(location.href.split('?search=')[1]);
            const rowHeaders = document.querySelectorAll('tr.actiontemplate-row');
            if(rowHeaders.length>1) {
                for(let i=0; i<rowHeaders.length; i++) {
                    if(rowHeaders[i].querySelector('td > strong > a').innerHTML == actionToSearch) {
                        const cells = rowHeaders[i].querySelectorAll('td');
                        for(let j=0; j<cells.length; j++) {
                            cells[j].style.border = '2px solid #0C0';
                            if(j!=0) {
                                cells[j].style.borderLeft = 'none';
                            }
                            if(j!=cells.length-1) {
                                cells[j].style.borderRight = 'none';
                            }
                        }
                    }
                }
            }
        }, 500);
    }
})();