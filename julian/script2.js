
// Initial setup
var tuning = Array('E', 'B', 'G', 'D', 'A', 'E');
var fingering = [1, 3, 3, 3, 1, 0];
// var chromaticNotes = [a, a#, b, c, c#, d, d#, e, f, f#, g, g#]

// Window onload event
window.onload = () => {
    renderFretboard(tuning, fingering);
    setupChordBank();
};

// Render fretboard function
const renderFretboard = (tuning, fingering) => {
    const fretboard = document.createElement('table');
    // Loop through 6 strings
    for (let stringNumber = 0; stringNumber < 6; stringNumber++) {
        renderString(fretboard, stringNumber);
    }
    document.body.appendChild(fretboard);
};

// Render string function
const renderString = (fretboard, stringNumber) => {
    const string = fretboard.appendChild(document.createElement('tr'));
    string.appendChild(document.createElement('th')).innerHTML = tuning[stringNumber];
    // Loop through 12 frets for the current string
    for (let fretNumber = 0; fretNumber < 12; fretNumber++) {
        const fret = string.appendChild(document.createElement('td'));

        if (fretNumber === 0) {
            renderNut(fretNumber, fret, stringNumber);
        } else {
            renderFret(fretNumber, fret, stringNumber);
        }
    }
};

// Render nut function
const renderNut = (fretNumber, fret, stringNumber) =>  {
    if(fretNumber === fingering[stringNumber]) {
        fret.innerHTML = 'x';
    } else {
        fret.innerHTML = '|';
    }
};

// Render fret function
const renderFret = (fretNumber, fret, stringNumber) => {
    // Check if this fret is fingered in the current chord
    if(fretNumber === fingering[stringNumber]) {
        fret.innerHTML = 'X';
    } else {
       fret.innerHTML = '—';
    }
};

// Setup chordbank
const setupChordBank = () => {
    for (let i = 0; i < 12; i++) {
        const chordBank = document.createElement('input');
        chordBank.type = 'text';
        chordBank.maxLength = 2; 
        document.body.appendChild(chordBank);
    }

    const submitBtn = document.createElement('button')
    document.body.appendChild(submitBtn)
};

