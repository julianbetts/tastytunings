var tuning = Array('E', 'B', 'G', 'D', 'A', 'E')
var fingering = [1, 3, 3, 3, 1, 0];


window.onload = function(){
    renderFretboard(tuning, fingering)
};

function renderFretboard(tuning, fingering) {
    var fretboard = document.createElement('table');    
    //loop throught 6 strings
    for(let stringNumber = 0; stringNumber < 6; stringNumber++){
        renderString(fretboard, stringNumber)
    }
    document.body.appendChild(fretboard);
}

function renderString(fretboard, stringNumber) {
    var string = fretboard.appendChild(document.createElement('tr'));
    string.appendChild(document.createElement('th')).innerHTML=tuning[stringNumber];
    //loop through 12 frets for the current string
    for(let fretNumber=0; fretNumber < 12; fretNumber++){
        var spot = string.appendChild(document.createElement('td'));

        if(fretNumber === 0) {
            renderNut(fretNumber, spot, stringNumber)
        } else {
            renderFret(fretNumber, spot, stringNumber)
        }
    }
}

function renderNut(fretNumber, spot, stringNumber) {
    if(fretNumber === fingering[stringNumber]) {
        spot.innerHTML = 'x';
    } else {
        spot.innerHTML = '|';
    }
}

function renderFret(fretNumber, spot, stringNumber) {
    //check if this fret is fingered in the current chord
    if(fretNumber === fingering[stringNumber]) {
        spot.innerHTML = 'X';
    } else {
       spot.innerHTML = '—';
    }
}

//github
//
