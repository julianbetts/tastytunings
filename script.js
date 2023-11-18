
// Initial setup
var standardTuning = Array( 8, 3, 11, 6, 1, 8);
var fingering = [1, 3, 3, 3, 1, 0];

const chromaticNotes = [
    {name: 'a♭', value: 12},
    {name: 'a', value: 1},
    {name: 'a♯', value: 2}, 
    {name: 'b♭', value: 2}, 
    {name: 'b', value: 3}, 
    {name: 'c', value: 4}, 
    {name: 'c♯', value: 5}, 
    {name: 'd♭', value: 5}, 
    {name: 'd', value: 6}, 
    {name: 'd♯', value: 7}, 
    {name: 'e♭', value: 7}, 
    {name: 'e', value: 8}, 
    {name: 'f', value: 9}, 
    {name: 'f♯', value: 10},
    {name: 'g♭', value: 10}, 
    {name: 'g', value: 11}, 
    {name: 'g♯', value: 12}
]

// Window onload event
window.onload = () => {
    setupChordBank();
    renderFretboard(standardTuning, fingering);
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
    //TODO The default selected option is chosen from standard tuning.
    string.appendChild(document.createElement('th')).appendChild(createChromaticDropdown(standardTuning[stringNumber]));


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

const setupChordBank = () => {
    const chordBankFormEl = document.createElement('form')

    for (let i = 0; i < 12; i++) {

        const chordNote = createChromaticDropdown();

        chordBankFormEl.appendChild(chordNote);
    }

    const submitBtn = document.createElement('button')
    chordBankFormEl.appendChild(submitBtn)
    document.body.appendChild(chordBankFormEl);

};


function createChromaticDropdown(tuning) {
    const chordNote = document.createElement('select');
    const emptyOptionEl = document.createElement('option');
    chordNote.appendChild(emptyOptionEl);
    for (let j = 0; j < chromaticNotes.length; j++) {
        console.log(chromaticNotes[j]);
        const optionEl = document.createElement('option');
        optionEl.value = chromaticNotes[j].value;
        optionEl.innerText = chromaticNotes[j].name;
        if (chromaticNotes[j].value === tuning){
            optionEl.selected = true
        }
        chordNote.appendChild(optionEl);
    }
    return chordNote;
}
//assign numbers to every fret