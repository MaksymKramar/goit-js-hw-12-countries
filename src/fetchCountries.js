const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/${searchQuery}`).then(response => response.json())
}

export default {fetchCountries};


// const BASE_URL = 'https://restcountries.eu/rest/v2/name';

// const fetchCounries = country => fetch(`${BASE_URL}/${country}`).then(response => response.json());

// export default { fetchCounries };