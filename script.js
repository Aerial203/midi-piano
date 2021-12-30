const audio_context = new AudioContext()

const NOTE_DETAILS = [
    {note: "C", key:"Z", frequency: 261.626, active: false},
    {note: "Db", key:"S", frequency: 277.183, active: false},
    {note: "D", key:"X", frequency: 293.665, active: false},
    {note: "Eb", key:"D", frequency: 311.127, active: false},
    {note: "E", key:"C", frequency: 328.628, active: false},
    {note: "F", key:"V", frequency: 349.228, active: false},
    {note: "Gb", key:"G", frequency: 369.994, active: false},
    {note: "G", key:"B", frequency: 391.995, active: false},
    {note: "Ab", key:"H", frequency: 415.305, active: false},
    {note: "A", key:"N", frequency: 440, active: false},
    {note: "Bb", key:"J", frequency: 466.164, active: false},
    {note: "B", key:"M", frequency: 493.883, active: false},
]

document.addEventListener("keydown", e => {
   if (e.repeat) return 
    const note_detail = get_node_detail(e.code)
    if (!note_detail) return
    note_detail.active = true
    play_note()
})

document.addEventListener("keyup", e => {
    const note_detail = get_node_detail(e.code)
    if (!note_detail) return
    note_detail.active = false
    play_note()
})

function get_node_detail(key_board_key) {
   return NOTE_DETAILS.find(e=>{ return `Key${e.key}` === key_board_key })
}

function play_note() {
    NOTE_DETAILS.forEach(n => {
       const key_element =  document.querySelector(`[data-note="${n.note}"]`)
       key_element.classList.toggle("active", n.active)
       if (n.oscillator != null) {
           n.oscillator.stop()
           n.oscillator.disconnect()
       }
    })

    const active_notes = NOTE_DETAILS.filter(n => n.active)
    const gain = 1 / active_notes.length
    active_notes.forEach(n => {
        start_note(n, gain)
    })
}

function start_note(note_detail, gain) {
    const gain_note = audio_context.createGain()
    gain_note.gain.value = gain
    const oscillator = audio_context.createOscillator()
    oscillator.frequency.value = note_detail.frequency
    oscillator.type = 'sine'
    oscillator.connect(gain_note).connect(audio_context.destination)
    oscillator.start()
    note_detail.oscillator = oscillator
}


