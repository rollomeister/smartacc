/*eslint-env browser */
/*eslint-env es6 */
/*eslint no-console: 0 */
/*eslint no-unused-vars: 0 */
/*global console */

var checked;

function clearValues() {
    "use strict";
    document.getElementById("andja-kulu").innerHTML = "0.00";
    document.getElementById("sotsiaalmaks").innerHTML = "0.00";
    document.getElementById("andja-kindlustusmakse").innerHTML = "0.00";
    document.getElementById("brutopalk").innerHTML = "0.00";
    document.getElementById("kogumispension").innerHTML = "0.00";
    document.getElementById("tegija-kindlustusmakse").innerHTML = "0.00";
    document.getElementById("tulumaks").innerHTML = "0.00";
    document.getElementById("netopalk").innerHTML = "0.00";
    document.getElementById("maksuvaba-tulu").innerHTML = "Arvesta maksuvaba tulu (0 € kuus)";
    document.getElementById("aastatulu").innerHTML = "0.00";
}

function calculate() {
    "use strict";
    if ((checked !== "neto" && checked !== "bruto" && checked !== "andja") || document.getElementById("sum").value.length === 0) {
        clearValues();
        return;
    }
    clearValues();
    document.getElementById("maksuvaba-div").style.display = "block";
    
    var sum = document.getElementById("sum").value,
        andjaKulu = 0,
        sotsiaalmaks = 0,
        andjaKindlustusMakse = 0,
        brutopalk = 0,
        kogumisPension = 0,
        tegijaKindlustusMakse = 0,
        tulumaks = 0,
        netopalk = 0,
        aastatulu = 0,
        maksuvabaTulu = 0;
    
    
    if (checked === "neto") {
        netopalk = sum;
        brutopalk = netopalk / 0.964;
        if (netopalk > 500 && netopalk < 1025.44) { brutopalk = (netopalk - 100) / 0.7712; }
        if (netopalk >= 1025.44 && netopalk < 1619.52) { brutopalk = ((netopalk * 108) - 25200) / 71.2896; }
        if (netopalk >= 1619.52) { brutopalk = netopalk / 0.7712; }
        document.getElementById("maksuvaba-div").style.display = "none";
        
    }
    
    if (checked === "bruto") { brutopalk = sum; }
    
    if (checked === "andja") {
        andjaKulu = sum;
        sotsiaalmaks = andjaKulu * 0.2466;
        andjaKindlustusMakse = andjaKulu * 0.006;
        brutopalk = andjaKulu - sotsiaalmaks - andjaKindlustusMakse;
    } else {
        if (document.getElementById("andjakindlustus-check").checked) { andjaKindlustusMakse = brutopalk * 0.008; } else { andjaKindlustusMakse = 0; }
        sotsiaalmaks = brutopalk * 0.33;
        if (document.getElementById("sotsiaalmaks-check").checked) { if (sotsiaalmaks < 178.2) { sotsiaalmaks = 178.2; } }
        andjaKulu = Number(brutopalk) + Number(sotsiaalmaks) + Number(andjaKindlustusMakse);
    }
    
    
    if (document.getElementById("kogumispension-check").checked) { kogumisPension = brutopalk * 0.02; } else { kogumisPension = 0; }
    if (document.getElementById("tegijakindlustus-check").checked) { tegijaKindlustusMakse = brutopalk * 0.016; } else { tegijaKindlustusMakse = 0; }
    maksuvabaTulu = (6000 - (6000 / 10800 * (12 * brutopalk - 14400))) / 12;
    if (maksuvabaTulu > 500) { maksuvabaTulu = 500; }
    if (maksuvabaTulu < 0) { maksuvabaTulu = 0; }
    if (!document.getElementById("maksuvaba-check").checked) { maksuvabaTulu = 0; }
    tulumaks = (brutopalk - kogumisPension - tegijaKindlustusMakse - maksuvabaTulu) * 0.2;
    if (tulumaks < 0) { tulumaks = 0; }
    if (checked !== "neto") { netopalk = brutopalk - kogumisPension - tegijaKindlustusMakse - tulumaks; }
    aastatulu = brutopalk * 12;
    
    
    document.getElementById("andja-kulu").innerHTML = Number(andjaKulu).toFixed(2);
    document.getElementById("sotsiaalmaks").innerHTML = Number(sotsiaalmaks).toFixed(2);
    document.getElementById("andja-kindlustusmakse").innerHTML = Number(andjaKindlustusMakse).toFixed(2);
    document.getElementById("brutopalk").innerHTML = Number(brutopalk).toFixed(2);
    document.getElementById("kogumispension").innerHTML = Number(kogumisPension).toFixed(2);
    document.getElementById("tegija-kindlustusmakse").innerHTML = Number(tegijaKindlustusMakse).toFixed(2);
    document.getElementById("tulumaks").innerHTML = Number(tulumaks).toFixed(2);
    document.getElementById("netopalk").innerHTML = Number(netopalk).toFixed(2);
    document.getElementById("maksuvaba-tulu").innerHTML = "Arvesta maksuvaba tulu (" + Number(maksuvabaTulu).toFixed(2) + " € kuus)";
    document.getElementById("aastatulu").innerHTML = Number(aastatulu).toFixed(2);
}

function getInputType(checkbox) {
    "use strict";
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
        else { checked = item.id; } 
    })
    if (document.getElementById("sum").value !== "") calculate();
}

