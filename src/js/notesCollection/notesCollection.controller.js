import {clearNote , addNote, display, addListEntry} from "./notesCollection.service";


const at = document.getElementById('atButton');
at.onclick = () => {
  clearNote();
}

const createNote = document.getElementById('create_note');
createNote.onclick = () => {
  console.log('Clicked Add');
  addNote();
  console.log('Clicked delete');
  clearNote();
}

display();

document.getElementById("newTaskEntry").onclick = () => {
    addListEntry();
}
