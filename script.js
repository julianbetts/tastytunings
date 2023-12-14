// chordshapes major, minor, 7th, maj7th, min7th, dim, aug, sus2, sus4, 6th, custom
const standardTuning = Array( 
    { name: 'f', value: 9 },
    { name: 'c', value: 4 }, 
    { name: 'g', value: 11 }, 
    { name: 'd', value: 6 }, 
    { name: 'a', value: 1 }, 
    { name: 'e', value: 8 }
);
const numberOfFrets = 17
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

window.onload = () => {
    let fretboard = new Fretboard(standardTuning, [], document.getElementById('fretboard'));
    let chordBank = new ChordBank(document.getElementById('chordSelector'));
    fretboard.chordBank = chordBank
    chordBank.fretboard = fretboard
};

class Fretboard {
    constructor(tuning, selectedNotes, containerEl) {
        this.fretboardEl = document.createElement('table');
        this.tuning = tuning
        this.selectedNotes = selectedNotes
        this.fretboardEl.innerHTML = ''
        const fretNumbersRow = document.createElement('tr');
        fretNumbersRow.appendChild(document.createElement('th')); // Empty cell for the bottom 
        for (let stringNumber = 0; stringNumber < 6; stringNumber++) {
            this.renderString(stringNumber);
        }
        renderFretNumbers(fretNumbersRow, this.fretboardEl);
        containerEl.replaceChildren(this.fretboardEl);
    }

    findNoteByName(noteName) {
        return chromaticNotes.find((noteObject) => {
            return noteObject.name === noteName
        })
    }

    findNoteByValue(noteValue) {
        return chromaticNotes.find((noteObject) => {
            return noteObject.value === noteValue
        })
    }

    isNoteInChord(note) {
        for (let i = 0; i < this.selectedNotes.length; i++) {
            if (this.findNoteByName(this.selectedNotes[i]).value === note.value) {
                return true
            }
        }
        return false
    }

    renderString(stringNumber) {
        const string = this.fretboardEl.appendChild(document.createElement('tr'));
        // i changed from var
        let currentNote = this.findNoteByName(this.tuning[stringNumber].name)
        let tuningEl = document.createElement('th')
        tuningEl.appendChild(createChromaticDropdown(this.tuning[stringNumber]))
        tuningEl.addEventListener('change', () => {
            this.chordBank.updateSelectedNotes()
        })
        string.appendChild(tuningEl);
        // Loop through the frets for the current string
        for (let fretNumber = 0; fretNumber < numberOfFrets; fretNumber++) {
            const fretCellEl = string.appendChild(document.createElement('td'));
            this.renderFret(fretCellEl, currentNote, fretNumber);
            if(currentNote.value === 12) {
                currentNote = this.findNoteByValue(1)
            } else {
                currentNote = this.findNoteByValue(currentNote.value + 1)
            }
        }
    }

    renderFret(fretCellEl, currentNote, fretNumber) {
        //TODO: somehow differentiate different chord positions (e.g. the root vs. the minor third...or at least the first dropdown vs. the second)
        if(this.isNoteInChord(currentNote)) {
            fretCellEl.innerHTML = fretNumber == 0 ? '<span class="open">||</span>' : '&nbsp;X|';
        } else {
            fretCellEl.innerHTML = fretNumber == 0 ? '|&nbsp;' : '——|';
        }
    }
}

class ChordBank {
    constructor(parentEl) {
        this.formEl = document.createElement('form')
        this.formEl.addEventListener('change', () => {
            this.updateSelectedNotes()
        })
        for (let i = 0; i < 12; i++) {
            const chordNote = createChromaticDropdown();
            this.formEl.appendChild(chordNote);
        }
        parentEl.appendChild(this.formEl);
    }

    getTuning() {
        var tuning = []
        var tuningSelectEls = document.getElementById('fretboard').getElementsByTagName('select')
        for (var i = 0; i < tuningSelectEls.length; i++){
            tuning.push({ 
                name: tuningSelectEls[i].value, 
                value: chromaticNotes.find((noteObject) => {
                    return noteObject.name === tuningSelectEls[i].value
                })
            })
        }
        return tuning
    }

    updateSelectedNotes() {
        this.selectedNotes = []
        //loop through the children of chordbank and find any selected notes.
        for (var i = 0; i < this.formEl.children.length; i++){
            var selectEl = this.formEl.children[i]
            // checks whether the value of the selected option is not already in the array
            if (selectEl.selectedIndex > 0) {
                if (this.selectedNotes.indexOf(selectEl.selectedIndex) < 0) {
                    // if selected note is unique, it is added to 'selectedNotes' array
                    this.selectedNotes.push(selectEl.value)
                }
            }
        }
        var fretboard = new Fretboard(this.getTuning(), this.selectedNotes, document.getElementById('fretboard'));
        this.fretboard = fretboard
        fretboard.chordBank = this
    }
}

function renderFretNumbers(fretNumbersRow, fretboard) {
    for (let fretNumber = 0; fretNumber < numberOfFrets; fretNumber++) {
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
        const optionEl = document.createElement('option');
        optionEl.value = chromaticNotes[j].name;
        optionEl.innerText = chromaticNotes[j].name;
        if (tuning && chromaticNotes[j].name === tuning.name){
            optionEl.selected = true
        }
        chordNote.appendChild(optionEl);
    }
    return chordNote;
}