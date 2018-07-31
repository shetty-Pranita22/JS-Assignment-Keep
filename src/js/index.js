import "./notesCollection/notesCollection.controller";

// function createHTMLElement(html){
//   const template = document.createElement('template');
//   template.innerHTML = html;
//   return template.content.firstElementChild;
// }
//
// const at = document.getElementById('atButton');
// at.onclick = () => {
//   clearNote();
// }
//
// const createNote = document.getElementById('create_note');
// createNote.onclick = () => {
//   console.log('Clicked Add');
//   addNote();
//   console.log('Clicked delete');
//   clearNote();
// }
//
// display();
//
// function addNote() {
//   let noteTitle = document.getElementById('form34');
//   let tlist = document.getElementById("list_entry");
//   let itemList = tlist.children;
//   let start = 0;
//   var myArray = new Array();
//   for (var i = 0; i<itemList.length; i++){
//     let dt = itemList[i].children;
//      myArray[start] = {
//        "value" :dt[0].value,
//        "checked" : false
//      }
//      start++;
//   }
//   console.log(myArray);
//   let jsonString = {
//     "title" : noteTitle.value,
//     "text"  : myArray
//   }
//
//   let sendData = {
//     method: "POST",
//     headers: {
//              "Content-Type": "application/json; charset=utf-8"
//          },
//     body: JSON.stringify(jsonString)
//   }
//   let postUrl = "http://localhost:3000/notes";
//
//   fetch(postUrl, sendData)
//   .then((data) => {
//     console.log('data sent');
//     display();
//   });
// }
//
// function display() {
//   console.log('inside display');
//   let getUrl = "http://localhost:3000/notes";
//   document.getElementById('notesCollection').innerHTML = "";
//
//   fetch(getUrl)
//   .then((resp) => resp.json())
//   .then((data) => {
//     let notes = data;
//     return notes.map((notes) => {
//       let task = "";
//       for(let i=0; i< notes.text.length; i++){
//         task += `<li class = "list-group-item" id="cBox">
//                   <div class="form-check">
//                     <input type="checkbox" class="form-check-input" id="materialChecked2" name="checkbox" onclick="clearTask(${notes.id},${notes.text[i].value})">
//                     <label class="strikethrough" for="materialChecked2">${notes.text[i].value}</label>
//                   </div>
//                 </li>`;
//       }
//       $( function() {
//         $( ".sortable" ).sortable();
//         $( ".sortable" ).disableSelection();
//       });
//       let tasks = createHTMLElement(`
//         <div class="col-lg-3 col-md-6 mb-5">
//           <div class="card  h-100">
//             <div class="card-body d-flex flex-column">
//               <h5> ${notes.title}</h5>
//               <ul class="sortable">
//                 ${task}
//               </ul>
//               <button type="button" class="btn btn-default btn-rounded mt-auto" id="${notes.id}" onclick="deleteTask(${notes.id})">Delete</button>
//             </div>
//           </div>
//         </div>
//       `);
//       document.getElementById('notesCollection').appendChild(tasks);
//     })
//   })
// }
//
// document.getElementById("newTaskEntry").onclick = () => {
//     addListEntry();
// }
//
// window.addListEntry = () => {
//   const listEntry = document.getElementById('list_entry');
//   let text_input = createHTMLElement(`<span id = "listTask">
//    <input type="text" class="form-control" placeholder="List Task" aria-label="Recipient's username" aria-describedby="basic-addon2" id="listElement">
//    </span>`);
//   listEntry.appendChild(text_input);
// }
//
// function clearNote() {
//   console.log('inside clear note');
//   let title = document.getElementById('form34');
//   title.value = "";
//   $("#list_entry").empty();
// }
//
// window.deleteTask = (id) => {
//   let deleteData = {
//     method : "DELETE"
//   }
//   let delUrl = `http://localhost:3000/notes/${id}`;
//   fetch(delUrl, deleteData)
//   .then((data) =>{
//     display();
//   });
// }
//
// window.clearTask = (id,value) => {
//   console.log('inside clear task');
//   console.log(value);
//   let get1Url = `http://localhost:3000/notes/${id}`;
//   fetch(get1Url)
//   .then((resp) => resp.json())
//   .then((data) => {
//     let tasks = data;
//     console.log(tasks);
//       for(let i=0; i< tasks.text.length; i++){
//           if (tasks.text[i].value==value) {
//             alert("checked");
//             tasks.text[i].checked = "true";
//         }
//       }
//   })
// }
