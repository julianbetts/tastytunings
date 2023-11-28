// reseach change event event listener for dropdown of notes in chord 
// Initial setup
const fretboard = document.createElement('table');
var standardTuning = Array( 8, 3, 11, 6, 1, 8);

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
    renderChordBank();
    renderFretboard(standardTuning, []);
};

const renderFretboard = (tuning, selectedNotes) => {
    fretboard.innerHTML = ''
    // Add fret numbers row
    const fretNumbersRow = document.createElement('tr');
    fretNumbersRow.appendChild(document.createElement('th')); // Empty cell for the bottom 
    // Loop through 6 strings
    for (let stringNumber = 0; stringNumber < 6; stringNumber++) {
        renderString(fretboard, tuning, stringNumber, selectedNotes);
    }
    renderFretNumbers(fretNumbersRow, fretboard);
    document.body.appendChild(fretboard);
};

const renderString = (fretboard, tuning, stringNumber, selectedNotes) => {
    const string = fretboard.appendChild(document.createElement('tr'));
    var currentNote = tuning[stringNumber]
    string.appendChild(document.createElement('th')).appendChild(createChromaticDropdown(standardTuning[stringNumber]));
    // Loop through 12 frets for the current string
    for (let fretNumber = 0; fretNumber < 12; fretNumber++) {
        const fret = string.appendChild(document.createElement('td'));
        if (fretNumber === 0) {
            renderNut(fretNumber, fret, stringNumber);
        } else {
            renderFret(fret, currentNote, selectedNotes);
            if(currentNote === 12) {
                currentNote = 1
            } else {
                currentNote++
            }
        }
    }
};

// Render nut function
const renderNut = (fretNumber, fret, stringNumber) =>  {
    //TODO: highlight nut if the current string is in the chord when open
    fret.innerHTML = '|';
};

// Render fret function
const renderFret = (fret, currentNote, selectedNotes) => {
    //TODO: somehow differentiate different chord positions (e.g. the root vs. the minor third...or at least the first dropdown vs. the second)
    // Check if this fret is fingered in the current chord
    if(selectedNotes.indexOf(currentNote.toString()) > -1) {
        fret.innerHTML = 'X';
    } else {
       fret.innerHTML = '—';
    }
};

const renderChordBank = () => {
    const chordBankFormEl = document.createElement('form')
    chordBankFormEl.id = 'chordBank'
    chordBankFormEl.addEventListener('change', (e) => {
        updateSelectedNotes()
    })
    for (let i = 0; i < 12; i++) {

        const chordNote = createChromaticDropdown();

        chordBankFormEl.appendChild(chordNote);
    }
    document.body.appendChild(chordBankFormEl);
};

function renderFretNumbers(fretNumbersRow, fretboard) {
    for (let fretNumber = 0; fretNumber < 12; fretNumber++) {
        const fretNumberCell = document.createElement('th');
        fretNumberCell.innerText = (fretNumber).toString();
        fretNumbersRow.appendChild(fretNumberCell);
        fretNumbersRow[fretNumber];
    }
    fretboard.appendChild(fretNumbersRow);
}

function createChromaticDropdown(tuning) {
    const chordNote = document.createElement('select');
    const emptyOptionEl = document.createElement('option');
    chordNote.appendChild(emptyOptionEl);
    for (let j = 0; j < chromaticNotes.length; j++) {
        // console.log(chromaticNotes[j]);
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

function updateSelectedNotes() {
    var chordBank = document.getElementById('chordBank')
    selectedNotes = []
 //loop through the children of chordbank and find any selected notes.
    for (i = 0; i < chordBank.children.length; i++){
        var selectEl = chordBank.children[i]
        if (selectEl.selectedIndex > 0) {
            if ( selectedNotes.indexOf(selectEl.selectedIndex) < 0) {
                selectedNotes.push(selectEl.value)
            }
        }
    }            
    renderFretboard(standardTuning, selectedNotes)
}