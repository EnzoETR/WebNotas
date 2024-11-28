// Variables globales para manejar notas
const notesContainer = document.getElementById('notesContainer');
const addNoteButton = document.getElementById('addNoteButton');
const noteModal = document.getElementById('noteModal');
const noteForm = document.getElementById('noteForm');
const cancelButton = document.getElementById('cancelButton');

// Arreglo para almacenar las notas
let notes = [];

// Función para mostrar el modal
function showModal() {
    noteModal.classList.remove('hidden');
}

// Función para ocultar el modal
function hideModal() {
    noteModal.classList.add('hidden');
    noteForm.reset(); // Limpiar el formulario
}

// Función para agregar una nueva nota al contenedor
function addNoteToDOM(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <span class="note-category">${note.category}</span>
    `;

    notesContainer.appendChild(noteElement);
}

// Evento: Abrir el modal al hacer clic en "Añadir Nota"
addNoteButton.addEventListener('click', showModal);

// Evento: Cerrar el modal al hacer clic en "Cancelar"
cancelButton.addEventListener('click', hideModal);

// Evento: Guardar la nueva nota al enviar el formulario
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener valores del formulario
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const category = document.getElementById('noteCategory').value || "Sin Categoría";
    const date = document.getElementById('noteDate').value;
    const time = document.getElementById('noteTime').value;

    // Crear objeto de nota
    const newNote = { title, content, category, date, time };

    // Agregar la nota al arreglo
    notes.push(newNote);

    // Guardar las notas en Local Storage
    saveNotes();

    // Renderizar las notas actualizadas
    renderNotes();

    // Ocultar el modal
    hideModal();
});

// Función para guardar las notas en Local Storage
function saveNotes() {
    localStorage.setItem('studentNotes', JSON.stringify(notes));
}

// Función para cargar las notas desde Local Storage
function loadNotes() {
    const savedNotes = localStorage.getItem('studentNotes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        notes.forEach(note => addNoteToDOM(note));
    }
}

// Cargar las notas al iniciar
loadNotes();
// Función para eliminar una nota del DOM y del arreglo
function deleteNote(index) {
    // Eliminar del arreglo
    notes.splice(index, 1);

    // Actualizar Local Storage
    saveNotes();

    // Recargar las notas en el DOM
    renderNotes();
}

// Función para renderizar todas las notas en el DOM
function renderNotes() {
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <span class="note-category">${note.category}</span>
            <div class="note-datetime">
                <span>📅 ${note.date}</span>
                <span>⏰ ${note.time}</span>
            </div>
            <button class="delete-button" data-index="${index}">Eliminar</button>
        `;

        notesContainer.appendChild(noteElement);
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            deleteNote(index);
        });
    });
}


// Llamar a renderNotes en lugar de addNoteToDOM después de guardar una nota
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener valores del formulario
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const category = document.getElementById('noteCategory').value || "Sin Categoría";
    const date = document.getElementById('noteDate').value;
    const time = document.getElementById('noteTime').value;

    // Crear objeto de nota
    const newNote = { title, content, category, date, time };

    // Agregar la nota al arreglo
    notes.push(newNote);

    // Guardar las notas en Local Storage
    saveNotes();

    // Renderizar las notas actualizadas
    renderNotes();

    // Ocultar el modal
    hideModal();
});

// Renderizar las notas al cargar
loadNotes();
renderNotes();
function checkReminders() {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    const currentTime = now.toTimeString().slice(0, 5); // Hora en formato HH:MM

    notes.forEach(note => {
        if (note.date === currentDate && note.time === currentTime) {
            alert(`¡Recordatorio! Tienes una nota programada: "${note.title}"`);
        }
    });
}

setInterval(checkReminders, 60000);
