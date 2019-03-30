getAllCountries();
getAllCurrency();
var AllCountries;
var allCurrency;
var countryForSearch = '';
var countriesSearched = new Array();
var allContent = "";
var allContentSearched = "";



// GET ALL CURRENCIES
function getAllCurrency() {
    getData("https://api.exchangeratesapi.io/latest")
        .then(function (data) {
            allCurrency = data;
            console.log('CURRENCY', allCurrency);
        }).catch(function (err) {
            console.log(err);
        });
}



// LIST OF COUNTRIES
function getAllCountries() {
    getData("https://restcountries.eu/rest/v2/all")
        .then(function (data) {
            AllCountries = data;
            createCards();
        }).catch(function (err) {
            console.log(err);
        });
}

function getOneCountry() {
    getData("https://restcountries.eu/rest/v2/name/eesti")
        .then(function (data) {
            console.log(data[0].name);
        }).catch(function () {
            console.error(error);
        });

}

// Function to do request
function getData(url) {
    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject("Error: " + this.status)
                }
            }
        };
        xhttp.open('GET', url);
        xhttp.send();
    });
}



function createCards() {
    console.log(AllCountries);
    var content = document.getElementById('rowC');
    content.innerHTML = '';
    allContent = '';

    for (var x = 0; x < AllCountries.length; x++) {
        allContent += `
        <div class="col-3" onclick="countrySelected('${AllCountries[x].name},${AllCountries[x].currencies[0].code}')">
            <div class="card">
                <img src="${AllCountries[x].flag}"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${AllCountries[x].name}</p>
                </div>
            </div>
        </div>`
    }
    document.getElementById('rowC').innerHTML = allContent;
}

function createCardsSearched() {
    var content = document.getElementById('rowC');
    content.innerHTML = '';
    allContentSearched = '';
    var col = 3;

    if (countriesSearched.length == 2) {
        col = 6;
    } else {
        col = 3
    }

    for (var x = 0; x < countriesSearched.length; x++) {
        allContentSearched += `
        <div class="col-${col}" onclick="countrySelected('${countriesSearched[x].alpha3Code}')">
            <div class="card">
                <img src="${countriesSearched[x].flag}"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${countriesSearched[x].name}</p>
                </div>
            </div>
        </div>`
    }
    document.getElementById('rowC').innerHTML = allContentSearched;
}

function countrySelected(codeCountrySelected) {
    var code = codeCountrySelected.split(',')[1]
    localStorage.setItem('codeCountryBootcamp', code)
    window.location.replace('http://127.0.0.1:5500/country.html');
}

function inputEvent() {
    countriesSearched = new Array();
    countryForSearch = '';
    countryForSearch = document.getElementById('countryForSearch').value;
    countriesSearched = getArraySearched(countryForSearch);
    createCardsSearched();

    console.log(countriesSearched);
}

function getArraySearched(args) {
    // console.log(args, AllCountries);
    return AllCountries.filter(function (item) {
        return JSON.stringify(item).toLowerCase().includes(args);
    })

}