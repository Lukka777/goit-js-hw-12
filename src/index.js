import { createElemWithClasses } from './js/countryRender';
import { error } from '@pnotify/core';
import { debounce } from 'lodash';

const searcher = document.querySelector('#searcher');

const countryList = document.querySelector('#countryList');

const countryWrapper = document.querySelector('#countryWrapper');
const countryInfo = document.querySelector('#countryInfo');
const countryName = document.querySelector('#countryName');
const countryCapital = document.querySelector('#countryCapital');
const countryPopulation = document.querySelector('#countryPopulation');
const countryFlag = document.querySelector('#countryFlag');
const nativeLanguages = document.querySelector('#nativeLanguages');

async function fetchCountries(countryNameInput) {
  const response = await fetch(`https://restcountries.com/v2/name/${countryNameInput}`);

  const array = await response.json();

  return array;
}

const inputHadler = async event => {
  const countryNameInput = event.target.value;
  if (!countryNameInput) return;
  const data = await fetchCountries(countryNameInput);

  if (data.length > 10) {
    countryWrapper.style = ' display: none';
    countryList.innerHTML = '';
    error({
      title: false,
      text: 'Too many matches found. Please enter a more spesific query!',
      closer: false,
      sticker: false,
      hide: true,
      delay: 500,
      remove: true,
    });
  } else if (data.length >= 2 && data.length < 10) {
    countryWrapper.style = ' display: none';
    countryList.innerHTML = '';
    data.forEach(country => {
      const liElemList = createElemWithClasses('li', []);
      liElemList.innerText = country.name;
      countryList.append(liElemList);
    });
  } else if (data.length === 1) {
    nativeLanguages.innerHTML = '';
    countryList.innerHTML = '';
    countryWrapper.style = ' display: block';

    countryName.innerHTML = data[0].name;
    countryCapital.innerHTML = `Capital: ${data[0].capital}`;
    countryPopulation.innerHTML = `Population: ${data[0].population}`;
    countryFlag.src = data[0].flag;

    data[0].languages.forEach(lang => {
      const liElemLang = createElemWithClasses('li', []);
      liElemLang.innerText = lang.name;
      nativeLanguages.append(liElemLang);
    });
  }
};

searcher.addEventListener('input', debounce(inputHadler, 500));
