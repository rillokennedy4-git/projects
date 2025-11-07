function decreaseStock(item) {
    var stockInput = document.getElementById(item + '-stock');
    var currentStock = parseInt(stockInput.value);
    if (currentStock > 0) {
        stockInput.value = currentStock - 1;
    }
}

function increaseStock(item) {
    var stockInput = document.getElementById(item + '-stock');
    var currentStock = parseInt(stockInput.value);
    stockInput.value = currentStock + 1;
}

function updateStock() {
    // Get all stock values
    var cargoStock = document.getElementById('cargo-stock').value;
    var y2kStock = document.getElementById('y2k-stock').value;
    var evisuStock = document.getElementById('evisu-stock').value;
    var aopStock = document.getElementById('aop-stock').value;
    var evisuTStock = document.getElementById('evisu_T-stock').value;
    var stussyStock = document.getElementById('stussy-stock').value;
    var bravemanStock = document.getElementById('braveman-stock').value;
    var ck1Stock = document.getElementById('ck1-stock').value;
    var diorStock = document.getElementById('dior-stock').value;
    var fittedStock = document.getElementById('fitted-stock').value;
    var gymratsStock = document.getElementById('gymrats-stock').value;
    var gangstyleStock = document.getElementById('gangstyle-stock').value;
    var funcoPopStock = document.getElementById('funco_pop-stock').value;
    var legoStock = document.getElementById('lego-stock').value;
    var hotwheelsStock = document.getElementById('hotwheels-stock').value;

    // Save stock values to local storage
    localStorage.setItem('cargoStock', cargoStock);
    localStorage.setItem('y2kStock', y2kStock);
    localStorage.setItem('evisuStock', evisuStock);
    localStorage.setItem('aopStock', aopStock);
    localStorage.setItem('evisuTStock', evisuTStock);
    localStorage.setItem('stussyStock', stussyStock);
    localStorage.setItem('bravemanStock', bravemanStock);
    localStorage.setItem('ck1Stock', ck1Stock);
    localStorage.setItem('diorStock', diorStock);
    localStorage.setItem('fittedStock', fittedStock);
    localStorage.setItem('gymratsStock', gymratsStock);
    localStorage.setItem('gangstyleStock', gangstyleStock);
    localStorage.setItem('funcoPopStock', funcoPopStock);
    localStorage.setItem('legoStock', legoStock);
    localStorage.setItem('hotwheelsStock', hotwheelsStock);

    alert("Stock values updated!");
}