//todo add color
//todo reset button
//todo toggle switch between chord and scale
//todo change updateSelectedChord to a class? so i can use it for the alternate tuning dropdown event listener?
//todo make rootNote bold
const numberOfFrets = 13
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
    { name: 'standard', tuning: [{ name: 'e', value: '8' }, { name: 'b', value: '3' }, { name: 'g', value: '11' }, { name: 'd', value: '6' }, { name: 'a', value: '1' }, { name: 'e', value: '8' }] },
    { name: 'open d', tuning: [{ name: 'd', value: '6' }, { name: 'a', value: '1' }, { name: 'f♯', value: '10' }, { name: 'd', value: '6' }, { name: 'a', value: '1' }, { name: 'd', value: '6' }] },
    { name: 'open g', tuning: [{ name: 'd', value: '6' }, { name: 'b', value: '3' }, { name: 'g', value: '11' }, { name: 'd', value: '6' }, { name: 'g', value: '11' }, { name: 'd', value: '6' }] },
    { name: 'DADGAD', tuning: [{ name: 'd', value: '6' }, { name: 'a', value: '1' }, { name: 'g', value: '11' }, { name: 'd', value: '6' }, { name: 'a', value: '1' }, { name: 'd', value: '6' }] }
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

const chordShapes = [
    { name: 'major', value: [0, 4, 7] },
    { name: 'minor', value: [0, 3, 7] },
    { name: 'major 6th', value: [0, 4, 7, 9] },
    { name: 'minor 6th', value: [0, 3, 7, 9] },
    { name: 'major 7th', value: [0, 4, 7, 11] },
    { name: 'minor 7th', value: [0, 3, 7, 10] },
    { name: 'dominant 7th', value: [0, 4, 7, 10] },
    // { name: 'major 9th', value: [0, 4, 7, 11, 2] },
    // { name: 'minor 9th', value: [0, 3, 7, 10, 2] },
    // { name: 'dominant 9th', value: [0, 4, 7, 10, 2] },
    // { name: 'major 11th', value: [0, 4, 7, 11, 2, 5] },
    // { name: 'minor 11th', value: [0, 3, 7, 10, 2, 5] },
    // { name: 'dominant 11th', value: [0, 4, 7, 10, 2, 5] },
    // { name: 'major 13th', value: [0, 4, 7, 11, 2, 5, 9] },
    // { name: 'minor 13th', value: [0, 3, 7, 10, 2, 5, 9] },
    // { name: 'dominant 13th', value: [0, 4, 7, 10, 2, 5, 9] },
    { name: 'suspended 2nd', value: [0, 2, 7] },
    { name: 'suspended 4th', value: [0, 5, 7] },
    { name: 'diminished', value: [0, 3, 6] },
    { name: 'augmented', value: [0, 4, 8] },
    { name: 'hendrix', value: [0, 4, 7, 10, 3] },
    { name: 'Pentatonic Minor', value: [0, 3, 5, 7, 10] },
    { name: 'Pentatonic Major', value: [0, 2, 4, 7, 9] },
    { name: 'Ionian (Major)', value: [0, 2, 4, 5, 7, 9, 11] },
    { name: 'Dorian', value: [0, 2, 3, 5, 7, 9, 10] },
    { name: 'Phrygian', value: [0, 1, 3, 5, 7, 8, 10] },
    { name: 'Lydian', value: [0, 2, 4, 6, 7, 9, 11] },
    { name: 'Mixolydian', value: [0, 2, 4, 5, 7, 9, 10] },
    { name: 'Aeolian (Minor)', value: [0, 2, 3, 5, 7, 8, 10] },
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
    let fretboard = new Fretboard(standardTuning, document.getElementById('fretboard'));
    let chordSelector = new ChordSelector(document.getElementById('chordSelector'));
    let tuningSelector = new TuningSelector(document.getElementById('tuningSelector'), fretboard);
    fretboard.chordSelector = chordSelector
    fretboard.tuningSelector = tuningSelector
    chordSelector.fretboard = fretboard

    function refreshPage() {
        window.location.reload();
    }
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', refreshPage);

    // Add smooth animations and modern interactions
    addModernInteractions();
};

function addModernInteractions() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
}

class Fretboard {
    constructor(tuning, containerEl) {
        this.fretboardEl = document.createElement('table');
        this.noteColors = []
        this.setTuning(tuning)
        this.setSelectedNotes([])
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
        // Enhanced guitar-like rendering
        if(this.isNoteInChord(currentNote)) {
            if (fretNumber == 0) {
                fretCellEl.innerHTML = '<div class="open">||</div>';
            } else {
                let noteNameEl = document.createElement('div')
                noteNameEl.innerHTML = currentNote.name
                noteNameEl.className = 'fret-note'
                fretCellEl.appendChild(noteNameEl)
            }
            
            // Set note color
            const noteColor = this.noteColors.find((noteColor) => 
               noteColor.noteValue === currentNote.value);
            if (noteColor) {
                fretCellEl.style.backgroundColor = noteColor.color;
            }
        } else {
            if (fretNumber == 0) {
                fretCellEl.innerHTML = '<div class="open-string">||</div>';
            } else {
                fretCellEl.innerHTML = '<div class="fret-space">———</div>';
            }
        }
    }

    renderFretNumbers(fretNumbersRow, fretboard) {
        for (let fretNumber = 0; fretNumber < numberOfFrets; fretNumber++) {
            const fretNumberCell = document.createElement('th');
            fretNumberCell.innerText = (fretNumber).toString();
            fretNumberCell.className = 'fret-number';
            fretNumbersRow.appendChild(fretNumberCell);
            fretNumbersRow[fretNumber];
        }
        fretboard.appendChild(fretNumbersRow);
    }
    
    renderString(stringNumber) {
        const string = this.fretboardEl.appendChild(document.createElement('tr'));
        string.className = `guitar-string string-${stringNumber + 1}`;
        
        let currentNote = this.findNoteByName(this.tuning[stringNumber].name)
        let tuningEl = document.createElement('th')
        tuningEl.className = 'tuning-nut';
        tuningEl.appendChild(createChromaticDropdown(this.tuning[stringNumber]))
        tuningEl.addEventListener('change', () => {
            this.tuningSelector.selectCustom()
            if (!this.chordSelector.updateSelectedChord()) {
                this.chordSelector.updateSelectedNotes()
            }
        })
        string.appendChild(tuningEl);
        
        for (let fretNumber = 0; fretNumber < numberOfFrets; fretNumber++) {
            const fretCellEl = string.appendChild(document.createElement('td'));
            fretCellEl.className = `fret-cell fret-${fretNumber}`;
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
        // this.createCustomNoteSelector(parentEl)
    }

    createChordSelector(parentEl) {
        // Updated to work with new HTML structure
        this.rootNoteSelectorEl = document.getElementById('root-note');
        this.chordShapeSelector = document.getElementById('chord-shape');
        
        // Populate the dropdowns
        this.populateDropdowns();
        
        // Add event listeners
        this.rootNoteSelectorEl.addEventListener('change', () => {
            this.updateSelectedChord()
        });
        this.chordShapeSelector.addEventListener('change', () => {
            this.updateSelectedChord()
        });
        
        this.notesInChordEl = document.getElementById('notesInChord');
    }

    populateDropdowns() {
        // Populate root note dropdown
        this.rootNoteSelectorEl.innerHTML = '<option value="">Select note...</option>';
        chromaticNotes.forEach(note => {
            const option = document.createElement('option');
            option.value = note.name;
            option.textContent = note.name;
            this.rootNoteSelectorEl.appendChild(option);
        });

        // Populate chord shape dropdown
        this.chordShapeSelector.innerHTML = '<option value="">Select chord/scale...</option>';
        chordShapes.forEach(chord => {
            const option = document.createElement('option');
            option.value = chord.name;
            option.textContent = chord.name;
            this.chordShapeSelector.appendChild(option);
        });
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
        return chordShapeEl;
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

    updateNotesInChordEl() {
        this.notesInChordEl.innerHTML = ''
        this.fretboard.noteColors = []
        let gradient = getGradient(gradientStartColor, gradientEndColor, this.selectedNotes.length)
        for (var i = 0; i < this.selectedNotes.length; i++){
            let noteContainer = document.createElement('li')
            noteContainer.style.borderColor = gradient[0]
            noteContainer.style.backgroundColor = gradient[i]
            let note = document.createElement('div')
            note.innerHTML = this.selectedNotes[i]
            noteContainer.appendChild(note)
            this.fretboard.noteColors.push({name: this.selectedNotes[i], noteValue: chromaticNotes.find((note) => {
                return note.name === this.selectedNotes[i]
            }).value, color: gradient[i]})
            this.notesInChordEl.appendChild(noteContainer)
        }
    }

    updateSelectedChord() {
        var rootNote = this.rootNoteSelectorEl.value
        var chordShape = this.chordShapeSelector.value
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

    createTuningDropdown(tuning) {
        const tuningDropdownEl = document.getElementById('tuning-select');
        tuningDropdownEl.innerHTML = '<option value="">Select tuning...</option>';
        
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
        
        const customOptionEl = document.createElement('option')
        customOptionEl.value = 'custom'
        customOptionEl.innerText = 'custom'
        tuningDropdownEl.appendChild(customOptionEl)
        
        tuningDropdownEl.addEventListener('change', () => {
            this.updateSelectedTuning()
        });
        
        return tuningDropdownEl;
    }

    createTuningSelector(parentEl) {
        this.tuningSelectorDropdown = this.createTuningDropdown(this.fretboard.tuning)
        this.tuningSelectorDropdown.addEventListener('change', () => {
            this.updateSelectedTuning()
        })
    }

    selectCustom() {
        this.tuningSelectorDropdown.value = 'custom'
    }

    updateSelectedTuning() {
        if (this.tuningSelectorDropdown.value !== 'custom') {
            var selectedTuning = availableTunings.find((tuningObject) => {
                return tuningObject.name === this.tuningSelectorDropdown.value
            })
            this.fretboard.setTuning(selectedTuning.tuning)
            this.fretboard.render()
        }
    }
}

function createChromaticDropdown(tuning) {
    const chordNote = document.createElement('select');
    chordNote.className = 'tuning-select';
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


