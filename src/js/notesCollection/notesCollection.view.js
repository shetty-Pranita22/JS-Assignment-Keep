export function createHTMLElement(html){
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

export function addListItem(){
  let text_input = createHTMLElement(`<span id = "listTask">
   <input type="text" class="form-control" placeholder="List Task" aria-label="Recipient's username" aria-describedby="basic-addon2" id="listElement">
   </span>`);
  return text_input;
}
