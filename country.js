var codeCountry = '';
var countryInfo = new Array();

getCountryCode();

function returnMain() {
    window.location.replace('http://127.0.0.1:5500/challenge4.html');
}



function getCountryCode() {
    if (localStorage.getItem('codeCountryBootcamp')) {
        codeCountry = localStorage.getItem('codeCountryBootcamp').toUpperCase();
    } else {
        codeCountry = 'EUR';
    }
    console.log(codeCountry);
    getInfoCountry();
}


function getInfoCountry() {
    getData("https://restcountries.eu/rest/v2/currency/" + codeCountry)
        .then(function (data) {
            countryInfo = data[0];
            console.log(countryInfo);
            asignDataToRender();
        }).catch(function (err) {
            console.log(err);
        });

}

function asignDataToRender() {
    document.getElementById('countryName').innerHTML = countryInfo.name;
    document.getElementById('countryCapital').innerHTML = countryInfo.capital;
    var imageCountry = document.getElementById("imgCountry");
    imageCountry.src = countryInfo.flag;
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
