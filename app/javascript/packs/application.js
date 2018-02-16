/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

let closeFlash = document.getElementById('close-flash')

if (closeFlash !== null) {
  closeFlash.addEventListener('click', () => {
    let flashNotice = document.getElementsByClassName('flash')[0];
    flashNotice.parentNode.removeChild(flashNotice);
  });
}

let dropdownMenu = document.getElementsByClassName('dropbtn')[0]
let dropdownItemsDiv = document.getElementsByClassName('dropdown-content')[0]

if (!!dropdownMenu) {
  dropdownMenu.addEventListener('mouseover', () => {
    let width = dropdownMenu.offsetWidth;
    dropdownItemsDiv.style.width = `${width}px`;
  })
}

if (window.location.hash == '#_=_'){
    history.replaceState
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
