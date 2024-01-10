const chordShapes = [
    { name: 'major', value: [0, 4, 7] },
    { name: 'minor', value: [0, 3, 7] },
    { name: '7th', value: [0, 4, 7, 10] },
    { name: 'major 7th', value: [0, 4, 7, 11] },
    { name: 'minor 7th', value: [0, 3, 7, 10] },
    { name: 'diminished', value: [0, 3, 6] },
    { name: 'augmented', value: [0, 4, 8] },
    { name: 'suspended 2nd', value: [0, 2, 7] },
    { name: 'suspended 4th', value: [0, 5, 7] },
    { name: '6th', value: [0, 4, 7, 9] }
]
const modes = [
    { name: 'Ionian', value: [0, 2, 4, 5, 7, 9, 11] },
    { name: 'Dorian', value: [0, 2, 3, 5, 7, 9, 10] },
    { name: 'Phrygian', value: [0, 1, 3, 5, 7, 8, 10] },
    { name: 'Lydian', value: [0, 2, 4, 6, 7, 9, 11] },
    { name: 'Mixolydian', value: [0, 2, 4, 5, 7, 9, 10] },
    { name: 'Aeolian', value: [0, 2, 3, 5, 7, 8, 10] },
    { name: 'Locrian', value: [0, 1, 3, 5, 6, 8, 10] }
]
const standardTuning = [ 
    { name: 'f', value: 9 },
    { name: 'c', value: 4 }, 
    { name: 'g', value: 11 }, 
    { name: 'd', value: 6 }, 
    { name: 'a', value: 1 }, 
    { name: 'e', value: 8 }
]
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
    let chordBank = new ChordSelector(document.getElementById('chordSelector'));
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

    renderFret(fretCellEl, currentNote, fretNumber) {
        //TODO: somehow differentiate different chord positions (e.g. the root vs. the minor third...or at least the first dropdown vs. the second)
        if(this.isNoteInChord(currentNote)) {
            fretCellEl.innerHTML = fretNumber == 0 ? '<span class="open">||</span>' : '&nbsp;X|';
        } else {
            fretCellEl.innerHTML = fretNumber == 0 ? '|&nbsp;' : '——|';
        }
    }

    renderString(stringNumber) {
        const string = this.fretboardEl.appendChild(document.createElement('tr'));
        // i changed from var
        let currentNote = this.findNoteByName(this.tuning[stringNumber].name)
        let tuningEl = document.createElement('th')
        tuningEl.appendChild(createChromaticDropdown(this.tuning[stringNumber]))
        tuningEl.addEventListener('change', () => {
            if (!this.chordBank.updateSelectedChord()) {
                this.chordBank.updateSelectedNotes()
            }
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
}

class ChordSelector {
    constructor(parentEl) {
        this.createChordSelector(parentEl)
        this.createCustomNoteSelector(parentEl)
    }

    createChordSelector(parentEl) {
        this.chordSelector = document.createElement('form')
        this.chordSelector.addEventListener('change', () => {
            this.updateSelectedChord()
        })
        const rootNoteSelector = createChromaticDropdown()
        this.chordSelector.appendChild(rootNoteSelector)
        const chordShapeSelector = createChordShapeDropdown()
        this.chordSelector.appendChild(chordShapeSelector)
        parentEl.appendChild(this.chordSelector)
    }

    createCustomNoteSelector(parentEl) {
        this.customNoteSelector = document.createElement('form')
        this.customNoteSelector.addEventListener('change', () => {
            this.updateSelectedNotes()
        })
        for (let i = 0; i < 12; i++) {
            const chordNote = createChromaticDropdown()
            this.customNoteSelector.appendChild(chordNote)
        }
        this.customNoteSelector.style.display = 'none'
        parentEl.appendChild(this.customNoteSelector)
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

    showCustomNoteSelector() {
        this.customNoteSelector.style.display = 'block'
    }

    updateSelectedChord() {
        var rootNote = this.chordSelector.children[0].value
        var chordShape = this.chordSelector.children[1].value
        if (chordShape === 'custom') {
            this.showCustomNoteSelector()
            return false
        } else if (chordShape !== '') {
            this.customNoteSelector.style.display = 'none'
        }
        if (rootNote === '' || chordShape === '') {
            return false
        } 
        var chord = chordShapes.find((chordObject) => {
            return chordObject.name === chordShape
        })
        var selectedNotes = []
        for (var i = 0; i < chord.value.length; i++) {
            const rootNoteObject = chromaticNotes.find((noteObject) => {
                return noteObject.name === rootNote
            })
            selectedNotes.push(chromaticNotes.find((noteObject) => {
                let noteOffset = ((rootNoteObject).value + chord.value[i]) % 12
                noteOffset = noteOffset === 0 ? 12 : noteOffset
                console.log(noteObject.value + ' ' + noteOffset)
                return noteObject.value === noteOffset
            }).name)
        }
        this.selectedNotes = selectedNotes
        var fretboard = new Fretboard(this.getTuning(), this.selectedNotes, document.getElementById('fretboard'));
        this.fretboard = fretboard
        fretboard.chordBank = this
        return true
    }
    updateSelectedNotes() {
        this.selectedNotes = []
        //loop through the children of chordbank and find any selected notes.
        for (var i = 0; i < this.customNoteSelector.children.length; i++){
            var selectEl = this.customNoteSelector.children[i]
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

// todo add to fretboard class
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

    
// todo place to chordselector class
function createChordShapeDropdown() {
    const chordShape = document.createElement('select');
    const emptyOptionEl = document.createElement('option');
    chordShape.appendChild(emptyOptionEl);
    for (let j = 0; j < chordShapes.length; j++) {
        const optionEl = document.createElement('option');
        optionEl.value = chordShapes[j].name;
        optionEl.innerText = chordShapes[j].name;
        chordShape.appendChild(optionEl);
    }
    const customOptionEl = document.createElement('option');
    customOptionEl.value = 'custom';
    customOptionEl.innerText = 'custom';
    chordShape.appendChild(customOptionEl);
    return chordShape;
}