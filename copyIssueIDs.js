// ==UserScript==
// @name         Copy ID and PR
// @namespace    https://www.monetate.com/
// @version      1.1
// @description  Adds a context menu item to copy the issue and pull request IDs from a JIRA ticket.
// @author       Andrew Littlefield
// @match        https://monetate.atlassian.net/browse/*
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';

    const prLink = document.querySelector('#customfield_10700-val > a');
    const issueLink = document.querySelector('#key-val');
    let toCopy = '';
    if(prLink) {
        toCopy += 'PR' + prLink.href.match(/[0-9]{5}/) + ' - ';
    }
    toCopy += issueLink.getAttribute('data-issue-key');

    let dummyText = document.createElement('textarea');
    dummyText.value = toCopy;
    document.body.appendChild(dummyText);
    dummyText.select();
    document.execCommand('copy');
    document.body.removeChild(dummyText);
})();
