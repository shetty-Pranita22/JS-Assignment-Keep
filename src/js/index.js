const topRated = document.getElementById("top");
const url = "https://developers.zomato.com/api/v2.1/collections?city_id=280&count=5";

let myheaders = {
"user-key": "6735af4836826fc3fd3ac0aa8a760fdd "
}

var createButton = function (html) {
    var button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-indigo mt-auto";
    button.innerHTML =html;
    return button;
}

//TopPicks
fetch(url,{
  method: 'GET',
  headers: myheaders
})
  .then((resp) => resp.json())
  .then(function(data){
    let restos = data.collections; // Get the results
    return restos.map(function(collection) { // Map through the results and for each run the code below
      var div = document.createElement('div'), // Create the elements we need
      cardBody = document.createElement('div'),
      img = document.createElement('img'),
      h5 = document.createElement('h5'),
      p = document.createElement('p');
      const collectData = createHTMLElement(`
            <button type="button" class="btn btn-indigo btn-rounded mb-4 mt-auto" data-toggle="modal" data-target="#modalLoginForm">
            Add
            </button>
      `);
      var button = collectData;

      div.className = "collection card";
      cardBody.className = "card-body d-flex flex-column";
      img.className = "card-img-top";
      h5.className = "card-title";
      p.className = "card-text";

      img.src = collection.collection.image_url; // Add the source of the image to be the src of the img element
      h5.innerHTML = `${collection.collection.title}` ;
      p.innerHTML = `${collection.collection.description}`;
      button.id = collection.collection.collection_id;

      cardBody.appendChild(img);
      cardBody.appendChild(h5);
      cardBody.appendChild(p);
      cardBody.appendChild(button);
      div.appendChild(cardBody);
      topRated.appendChild(div);

      const id = button.id;
      button.onclick = function(){
        console.log('clicked add')
        list_collec(id);
      }
    })
  })

//Searchbar
window.search = function(){
  let searchHeaders = {
  "user-key": "291c16dfc1f62b9c11fee14ca67ad025"
  }

  const form = document.getElementById('searchForm');
  const searchItem = document.getElementById("search_item");
  const url1 = "https://developers.zomato.com/api/v2.1/search?q="+form.value;

  $( "#search_item" ).empty();

  fetch(url1,{
      method: 'GET',
      headers: searchHeaders
  })
  .then((resp) => resp.json())
  .then(function(data){
      let restos = data.restaurants; // Get the results
      return restos.map(function(restaurants) { // Map through the results and for each run the code below
        var div = document.createElement('div'),
        div1 = document.createElement('div'), // Create the elements we need
        img = document.createElement('img'),
        cardBody = document.createElement('div'),
        h5 = document.createElement('h5'),
        p = document.createElement('p');
        const collectData = createHTMLElement(`
              <button Type="button" class="btn btn-indigo btn-rounded mb-4 mt-auto" data-toggle="modal" data-target="#modalLoginForm">
              Add
              </button>
        `);
        var button = collectData;

        div.className = "col-lg-3 col-md-6 mb-5";
        div1.className = "card  h-100 restaurants";
        cardBody.className = "card-body d-flex flex-column";
        img.className = "card-img-top";
        h5.className = "card-title";
        p.className = "card-text";

        img.src = restaurants.restaurant.featured_image; // Add the source of the image to be the src of the img element
        h5.innerHTML = `${restaurants.restaurant.name}` ;
        p.innerHTML = `${restaurants.restaurant.cuisines}`;
        button.id = restaurants.restaurant.id;

        cardBody.appendChild(img);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(button);
        div1.appendChild(cardBody);
        div.appendChild(div1);
        searchItem.appendChild(div);

        const id = button.id;
        button.onclick = function(){
            console.log('clicked add from search')
            list_collec(id);
        }
      })
    })
  }

//List the collections to add into
window.list_collec = function(id){
  console.log(id);
  const dropdown = document.getElementById("dropdown");
  var get3Url = "http://localhost:3000/mycollections";
  dropdown.innerHTML = "";

  fetch(get3Url)
  .then((resp)=>resp.json())
  .then(function(data){
      let collections = data;
      //return collections.map(function (collection) {
          // const collectData = createHTMLElement(`
          //     <a class="dropdown-item" href="#">
          //
          //     </a>
          // `);
          // var a = collectData,
          // select = document.createElement("select");
          // console.log(a);
          // a.innerHTML = `${collection.name}`;
          // a.id = collection.id;
          // dropdown.appendChild(a);
      var form = document.createElement("form"),
      select = document.createElement("select"),
      option = document.createElement("option"),
      input = document.createElement("input");
      input.type = "hidden";
      input.id = id;
      form.id = "collectionForm";
      form.className = "form-group";
      select.id = "selectedCollection";
      option.value = "select";
      option.innerHTML = "COLLECTIONS";
      select.appendChild(option);

      collections.map(function (collection) {
          var opt = document.createElement("option");
          opt.value = collection.name;
          opt.innerHTML = collection.name;
          select.appendChild(opt);
      })
    form.appendChild(select);
    form.appendChild(input);
    dropdown.appendChild(form);
  })
}
//On click of Add to Collection
selectCollectionButton.onclick = function () {
  var selectedCollection = document.getElementById("selectedCollection");
  var value = selectedCollection.value;
  var id = selectedCollection.nextSibling.id;
  addToCollection(id, value);
}

//Adding to collection
function addToCollection(id, collectionName){
    var div = document.getElementById(id).parentElement.parentElement;
    var cardBody = div.firstChild;
    var img = cardBody.firstChild;
    var name = img.nextSibling;
    var text = name.nextSibling;
    var jsonString = {
            "id" : id,
            "collection": collectionName,
            "img" : img.src,
            "name" : name.innerHTML,
            "text" : text.innerHTML
    }
    let fetchData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",  // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(jsonString) // body data type must match "Content-Type" header
    }
    let addUrl = "http://localhost:3000/collect";

    fetch(addUrl, fetchData)
    .then(reload(collectionName));
    alert('Added to collection');     //Adding to json-server and calling reload function
}

//display the restaurants in collection
function reload(collectionName){
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerHTML=collectionName;
    const modalBody = document.getElementById("modal_body");
    var getUrl = "http://localhost:3000/collect/?collection=" + collectionName;
    console.log(getUrl);
    modalBody.innerHTML = "";

    fetch(getUrl)
    .then((resp)=>resp.json())
    .then(function(data){
        let collections = data; // Get the results
        return collections.map(function (collection) { // Map through the results and for each run the code below
            var div1 = document.createElement('div');
            var div = document.createElement('div'), //  Create the elements we need
            cardBody = document.createElement('div'),
            img = document.createElement('img'),
            h5 = document.createElement('h5'),
            p = document.createElement('p');
            var button = createButton("Remove");

            div1.className = "col-lg-3 col-md-6 mb-5";
            div.className = "collection card h-100";
            cardBody.className = "card-body d-flex flex-column";
            img.className = "card-img-top";
            h5.className = "card-title";
            p.className = "card-text text-muted";

            img.src = collection.img;  // Add the source of the image to be the src of the img element
            h5.innerHTML = `${collection.name}`;
            p.innerHTML = `${collection.text}`; // Make the HTML of our span to be the first and last name of our author
            button.id = collection.id;

            cardBody.appendChild(img);
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(button);
            div.appendChild(cardBody);
            div1.appendChild(div);
            modalBody.appendChild(div1);

            const id = button.id;
            button.onclick = function(){
                deleteRestaurant(id);
            }
        })
    })
}

//deleting the restaurant in the collection
function deleteRestaurant(id){
    let fetchData = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://localhost:3000/collect/"+id;

    fetch(deleteUrl, fetchData)
    .then(reshow());
}

//creating element
function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

//deleting the collection
function deleteCollec(id, collectionName){
    let fetchData = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://localhost:3000/mycollections/" + id;
    let getUrl = "http://localhost:3000/collect?collection=" + collectionName;
    fetch(deleteUrl, fetchData)
    .then(function(data){
      reshow();
    });
    fetch(getUrl).
    then((resp)=>resp.json())
    .then(function(data){
      return data.map(function(collection){
        let dlt = "http://localhost:3000/collect/" + collection.id;
        fetch(dlt,fetchData);
      })
    });
}

//creating new mycollection
const new_collection = document.getElementById('cc_button');
new_collection.onclick = function(){
  addCollec();
}
reshow();

//adding mycollection
function addCollec(){
    var div = document.createElement('div');
    var cardBody = document.createElement('div');
    var name = document.getElementById('new_coll_name');
    var text = document.getElementById('new_coll_desc');
    console.log(name.value);
    var jsonString = {
            "name" : name.value,
            "text" : text.value
    }
    let fetchData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",  // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(jsonString) // body data type must match "Content-Type" header
    }
    let add2Url = "http://localhost:3000/mycollections";

    fetch(add2Url, fetchData)
    .then(reshow());        //Adding to json-server and calling reshow function
    alert('Collection created');
}

//displaying mycollection
function reshow(){
    const demoCollection = document.getElementById("demoCollection");
    var get2Url = "http://localhost:3000/mycollections";
    demoCollection.innerHTML = "";

    fetch(get2Url)
    .then((resp)=>resp.json())
    .then(function(data){
        let collections = data; // Get the results
        return collections.map(function (collection) { // Map through the results and for each run the code below
            var div1 = document.createElement('div');
            var div = document.createElement('div'), //  Create the elements we need
            cardBody = document.createElement('div'),
            //img = document.createElement('img'),
            h5 = document.createElement('h5'),
            p = document.createElement('p');
            //var button1 = createButton("View All");
            const collectData = createHTMLElement(`
                  <button type="button" class="btn btn-indigo mt-auto" data-toggle="modal" data-target="#centralModalFluid" id="viewButton">
                      View All
                  </button>
            `);
          //  var button1 = document.getElementById('topCollection').appendChild(collectData);
            var button1 = collectData;
            console.log(button1);
            var button2 = createButton("Remove");

            div1.className = "col-lg-3 col-md-6 mb-5";
            div.className = "collection card h-100";
            cardBody.className = "card-body d-flex flex-column";
            //img.className = "card-img-top";
            h5.className = "card-title";
            p.className = "card-text text-muted";

            //img.src = collection.img;  // Add the source of the image to be the src of the img element
            h5.innerHTML = `${collection.name}`;
            p.innerHTML = `${collection.text}`; // Make the HTML of our span to be the first and last name of our author
            //button2.id = collection.id;
            button1.id = collection.id;
            button2.id = collection.id;
            //cardBody.appendChild(img);
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(button1);
            cardBody.appendChild(button2);
            div.appendChild(cardBody);
            div1.appendChild(div);
            demoCollection.appendChild(div1);

            const id = button2.id;
            const collectionName = collection.name;
            button2.onclick = function(){
              deleteCollec(id,collectionName);
             }
            button1.onclick = function() {
              reload(collectionName);
            }
        })
    })
}
