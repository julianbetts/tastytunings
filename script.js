//todo add color
//todo reset button
//todo toggle switch between chord and scale
//todo change updateSelectedChord to a class? so i can use it for the alternate tuning dropdown event listener?
//todo make rootNote bold
const numberOfFrets = 17
const gradientStartColor = [0x58, 0x0C, 0x30]
const gradientEndColor = [0xDB, 0xEB, 0xFA]
const getColorFromHexArray = (hexArray) => {
    hexString = '#'
    hexArray.forEach((hexValue) => {
        let colorValueString = hexValue.toString(16)
        if (colorValueString.length == 1) colorValueString = '0' + colorValueString
        hexString += colorValueString
    })
    return hexString
}
const getGradient = (startColor, endColor, numberOfIncrements) => {
    //create an array of colors with the startColor as the first element
    let gradient = [getColorFromHexArray(startColor)]
    //start at the next increment
    for (let i = 1; i < numberOfIncrements; i++) {
        //if we're at the last increment, use the end color
        if (i == (numberOfIncrements - 1)) {
            gradient[i] = getColorFromHexArray(endColor)
        } else {
            //lets build an rgb color
            let rgb = []
            startColor.forEach((hexValue, j) => {
                let colorValueDifference = hexValue - endColor[j]
                let colorIncrement = Math.floor(colorValueDifference / (numberOfIncrements - 1))
                rgb[j] = hexValue - (colorIncrement * i)
            })
            gradient[i] = getColorFromHexArray(rgb)
        }
    }
    return gradient
}
const availableTunings = [
    { name: 'standard', value: [8, 3, 11, 6, 1, 8] },
    { name: 'open d', value: [8, 3, 11, 6, 1, 4] },
    { name: 'open g', value: [8, 3, 11, 5, 1, 8] },
    { name: 'open c', value: [8, 3, 10, 5, 1, 8] },
    { name: 'open e', value: [8, 3, 11, 6, 1, 4] },
    { name: 'open a', value: [8, 3, 11, 6, 1, 4] },
    { name: 'open a minor', value: [8, 3, 10, 5, 1, 4] },
    { name: 'dadgad', value: [8, 3, 11, 6, 1, 8] },
    { name: 'all fourths', value: [8, 4, 0, 8, 4, 0] }
]

const chordShapes = [
    { name: 'major', value: [0, 4, 7] },
    { name: 'minor', value: [0, 3, 7] },
    { name: 'major 6th', value: [0, 4, 7, 9] },
    { name: 'minor 6th', value: [0, 3, 7, 9] },
    { name: 'major 7th', value: [0, 4, 7, 11] },
    { name: 'minor 7th', value: [0, 3, 7, 10] },
    { name: 'dominant 7th', value: [0, 4, 7, 10] },
    { name: 'major 9th', value: [0, 4, 7, 11, 2] },
    { name: 'minor 9th', value: [0, 3, 7, 10, 2] },
    { name: 'dominant 9th', value: [0, 4, 7, 10, 2] },
    { name: 'major 11th', value: [0, 4, 7, 11, 2, 5] },
    { name: 'minor 11th', value: [0, 3, 7, 10, 2, 5] },
    { name: 'dominant 11th', value: [0, 4, 7, 10, 2, 5] },
    { name: 'major 13th', value: [0, 4, 7, 11, 2, 5, 9] },
    { name: 'minor 13th', value: [0, 3, 7, 10, 2, 5, 9] },
    { name: 'dominant 13th', value: [0, 4, 7, 10, 2, 5, 9] },
    { name: 'suspended 2nd', value: [0, 2, 7] },
    { name: 'suspended 4th', value: [0, 5, 7] },
    { name: 'diminished', value: [0, 3, 6] },
    { name: 'augmented', value: [0, 4, 8] },
    { name: 'hendrix', value: [0, 4, 7, 10, 3] }
]

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
    { name: 'e', value: 8 },
    { name: 'b', value: 3 }, 
    { name: 'g', value: 11 }, 
    { name: 'd', value: 6 }, 
    { name: 'a', value: 1 }, 
    { name: 'e', value: 8 }
]

window.onload = () => {
    let fretboard = new Fretboard(standardTuning, [], document.getElementById('fretboard'));
    let chordSelector = new ChordSelector(document.getElementById('chordSelector'));
    let tuningSelector = new TuningSelector(document.getElementById('tuningSelector'), fretboard);
    fretboard.chordSelector = chordSelector
    chordSelector.fretboard = fretboard
};

class Fretboard {
    constructor(tuning, selectedNotes, containerEl) {
        this.fretboardEl = document.createElement('table');
        this.noteColors = []
        this.setTuning(tuning)
        this.setSelectedNotes(selectedNotes)
        this.render()
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

    findTuningByName(noteName) {
        return this.tuning.find((noteObject) => {
            return noteObject.name === noteName
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

    render() {
        this.fretboardEl.innerHTML = ''
        const fretNumbersRow = document.createElement('tr')
        fretNumbersRow.appendChild(document.createElement('th')) // Empty cell for the bottom 
        for (let stringNumber = 0; stringNumber < 6; stringNumber++) {
            this.renderString(stringNumber)
        }
        this.renderFretNumbers(fretNumbersRow, this.fretboardEl)
    }

    renderFret(fretCellEl, currentNote, fretNumber) {
        //TODO: somehow differentiate different chord positions (e.g. the root vs. the minor third...or at least the first dropdown vs. the second)
        if(this.isNoteInChord(currentNote)) {
            fretCellEl.innerHTML = fretNumber == 0 ? '<span class="open">||</span>' : '&nbsp;&nbsp;&nbsp;';
            fretCellEl.style.backgroundColor = this.noteColors.find((noteColor) => 
               noteColor.name === currentNote.name).color
            fretCellEl.style.borderColor = fretNumber == 0 ? 'none' : this.noteColors[0].color
        } else {
            fretCellEl.innerHTML = fretNumber == 0 ? '||' : '———';
        }
    }
    
    // todo add to fretboard class
    // numberOfFrets is not defined wiithin the scope of the Fretboard class.
    renderFretNumbers(fretNumbersRow, fretboard) {
        for (let fretNumber = 0; fretNumber < numberOfFrets; fretNumber++) {
            const fretNumberCell = document.createElement('th');
            fretNumberCell.innerText = (fretNumber).toString();
            fretNumbersRow.appendChild(fretNumberCell);
            fretNumbersRow[fretNumber];
        }
        fretboard.appendChild(fretNumbersRow);
    }

    renderString(stringNumber) {
        const string = this.fretboardEl.appendChild(document.createElement('tr'));
        let currentNote = this.findNoteByName(this.tuning[stringNumber].name)
        let tuningEl = document.createElement('th')
        tuningEl.appendChild(createChromaticDropdown(this.tuning[stringNumber]))
        tuningEl.addEventListener('change', () => {
            if (!this.chordSelector.updateSelectedChord()) {
                this.chordSelector.updateSelectedNotes()
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

    setSelectedNotes(selectedNotes) {
        this.selectedNotes = selectedNotes
    }

    setTuning(tuning) {
        this.tuning = tuning
    }
}

class ChordSelector {
    constructor(parentEl) {
        this.createChordSelector(parentEl)
        this.createCustomNoteSelector(parentEl)
    }

    createChordSelector(parentEl) {
        this.chordSelectorEl = parentEl.getElementsByTagName('form')[0]
        this.chordSelectorEl.addEventListener('change', () => {
            this.updateSelectedChord()
        })
        this.rootNoteSelectorEl = createChromaticDropdown()
        this.chordSelectorEl.querySelector('.rootNoteSelector').appendChild(this.rootNoteSelectorEl)
        this.chordShapeSelector = this.createChordShapeDropdown()
        this.chordSelectorEl.querySelector('.chordShapeSelector').appendChild(this.chordShapeSelector)
        this.notesInChordEl = document.getElementById('notesInChord')
    }

    createChordShapeDropdown() {
        const chordShapeEl = document.createElement('select');
        chordShapeEl.id = 'chordShapeId'
        const emptyOptionEl = document.createElement('option');
        chordShapeEl.appendChild(emptyOptionEl);
        for (let j = 0; j < chordShapes.length; j++) {
            const optionEl = document.createElement('option');
            optionEl.value = chordShapes[j].name;
            optionEl.innerText = chordShapes[j].name;
            chordShapeEl.appendChild(optionEl);
        }
        const customOptionEl = document.createElement('option');
        customOptionEl.value = 'custom';
        customOptionEl.innerText = 'custom';
        chordShapeEl.appendChild(customOptionEl);
        const rootNoteSelectorEl = this.rootNoteSelectorEl
        //hides rootNote element when custom is selected
        chordShapeEl.addEventListener('change', function() {
            if (chordShapeEl.value === 'custom') {
                rootNoteSelectorEl.parentElement.style.display = 'none';
            } else {
                rootNoteSelectorEl.parentElement.style.display = 'block';
            }
        });
        return chordShapeEl;
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

    updateNotesInChordEl() {
        this.notesInChordEl.innerHTML = ''
        this.fretboard.noteColors = []
        let gradient = getGradient(gradientStartColor, gradientEndColor, this.selectedNotes.length)
        for (var i = 0; i < this.selectedNotes.length; i++){
            let note = document.createElement('li')
            note.innerHTML = this.selectedNotes[i]
            note.style.borderColor = gradient[i]
            this.fretboard.noteColors.push({name: this.selectedNotes[i], color: gradient[i]})
            this.notesInChordEl.appendChild(note)
        }
    }

    updateSelectedChord() {
        var rootNote = this.rootNoteSelectorEl.value
        var chordShape = this.chordShapeSelector.value
        if (chordShape === 'custom') {
            this.showCustomNoteSelector()
            this.updateSelectedNotes()
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
                return noteObject.value === noteOffset
            }).name)
        }
        this.selectedNotes = selectedNotes
        this.updateNotesInChordEl()
        this.fretboard.setTuning(this.getTuning())
        this.fretboard.setSelectedNotes(this.selectedNotes)
        this.fretboard.render()
        return true
    }

    updateSelectedNotes() {
        this.selectedNotes = []
        //loop through the children of chordSelector and find any selected notes.
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
        // var fretboard = new Fretboard(this.getTuning(), this.selectedNotes, document.getElementById('fretboard'));
        // this.fretboard = fretboard
        // fretboard.chordSelector = this
        this.fretboard.setTuning(this.getTuning())
        this.fretboard.setSelectedNotes(this.selectedNotes)
        this.fretboard.render()
    }

}

class TuningSelector {
    constructor(parentEl, fretboard) {
        this.fretboard = fretboard
        this.createTuningSelector(parentEl)
    }

    // createTuningDropdown() {
    //     const tuningEl = document.createElement('select');
    //     tuningEl.id = 'tuningId'
    //     const emptyOptionEl = document.createElement('option');
    //     tuningEl.appendChild(emptyOptionEl);
    //     for (let j = 0; j < alternatteTunings.length; j++) {
    //         const optionEl = document.createElement('option');
    //         optionEl.value = alternatteTunings[j].name;
    //         optionEl.innerText = alternatteTunings[j].name;
    //         tuningEl.appendChild(optionEl);
    //     }
    //     return tuningEl;
    // }

    createTuningDropdown(tuning) {
        const tuningDropdownEl = document.createElement('select');
        tuningDropdownEl.id = 'alternateTunings'; 
        for (let j = 0; j < availableTunings.length; j++) {
            const optionEl = document.createElement('option');
            optionEl.value = availableTunings[j].name;
            optionEl.innerText = availableTunings[j].name;

            if (tuning && availableTunings[j].name === tuning.name){
                optionEl.selected = true;
            } else if (availableTunings[j].name === 'standard') {
                optionEl.selected = true;
            }

            tuningDropdownEl.appendChild(optionEl);
        }
        tuningDropdownEl.addEventListener('change', () => {
        });
        return tuningDropdownEl;
    }

    createTuningSelector(parentEl) {
        // const tuningSelector = fretboard.createTuningSelector();
        // document.getElementById('tuningSelector').getElementsByTagName('form')[0].appendChild(tuningSelector);

        this.tuningSelectorEl = parentEl.getElementsByTagName('form')[0]
        this.tuningSelectorEl.addEventListener('change', () => {
            this.updateSelectedTuning()
        })
        this.tuningSelectorDropdown = this.createTuningDropdown(this.fretboard.tuning)
        this.tuningSelectorEl.querySelector('.tuningSelector').appendChild(this.tuningSelectorDropdown)
        parentEl.appendChild(this.tuningSelectorEl)
    }
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