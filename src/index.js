import debounce from 'lodash.debounce';
// var debounce = require('lodash.debounce');



import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
defaults.width = '400px';
defaults.minHeight = '20px'
defaults.delay = '2000';


import countriesCardTpl from './templates/country-card.hbs';
import countriessListTpl from './templates/country-list.hbs';
import bodyFlag from './templates/body-flag.hbs';


import API from './fetchCountries.js';


const refs = {
    inputSearch: document.querySelector('.input-search'),
    cardContainer: document.querySelector('.js-card-container'),
    // clearBtn:document.querySelectorAll('.button'),
};
// refs.inputSearch.addEventListener('input', onSearch)
refs.inputSearch.addEventListener('input', debounce(onSearch, 500))



function onSearch(e) {
    // e.preventDefault();
    const inputValue = refs.inputSearch.value;
    console.log(API.fetchCountries(inputValue))

    API.fetchCountries(inputValue).then(checkNumLetters).catch(onFetchError);
}

// then(response => {
//       if (response.status === 404) {
//           clearMarkup();
//       }
//     })

function checkNumLetters(countries) {
    if (countries.length > 10) {
            clearMarkup()
        error('Слишком много совпадений, введите более точный запрос');
    };
    if (countries.length >= 2 && countries.length <= 10) {
            console.log(countries.length)
        rendercountriessListTpl(countries);
    };
    if (countries.length === 1) {
        rendercountriesCard(countries)
    }  
    
}

function rendercountriesCard(countries) {
    //console.log(countries[0]) //как сделать чтоб 0 само подставляло? 
    const markup = countriesCardTpl(countries[0]);
    // console.log(bodyFlag(countries))
            clearMarkup()
        
    // refs.cardContainer.innerHTML = markup;
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
    // document.body.style.backgroundImage = "url(`${srcFlag}`)";
// const srcFlag = document.querySelectorAll('img').getAttribute('alt');
    
}

function rendercountriessListTpl(countries) {
    const markup = countriessListTpl(countries);
    console.log(markup)
clearMarkup()
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
    
}

function onFetchError(error) {
    clearMarkup();

    console.log(error);
    
}


function clearMarkup() {
  refs.cardContainer.innerHTML = '';
}