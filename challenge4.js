getAllCountries();
var AllCountries;

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

    var div = document.createElement('div');
    div.className = 'col-3';
    var div2 = document.createElement('div');
    div2.className = 'card';
    var div3 = document.createElement('div');
    div3.className = 'card-body';
    var p = document.createElement('p');
    var img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Flag_of_the_Gran_Colombia_%281819-1820%29.svg/1280px-Flag_of_the_Gran_Colombia_%281819-1820%29.svg.png';


    p.className = 'card-text';
    p.innerHTML = 'Información del país';



    div.appendChild(div2);
    div2.appendChild(img);
    div2.appendChild(div3);
    div3.appendChild(p);

    document.querySelector(".container").appendChild(div);



    /*
    for (var x = 0; x < AllCountries.length; x++) {
        var iDiv = document.createElement('div');
        iDiv.id = 'block' + x;
        iDiv.className = 'card view overlay zoom';
        document.getElementsByTagName('body')[0].appendChild(iDiv);
    }*/
}
