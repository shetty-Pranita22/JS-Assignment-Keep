// require('../../node_modules/mdbootstrap/css/bootstrap.min.css');
// require('../../node_modules/mdbootstrap/css/mdb.min.css')
// require("./style.css");

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
      var button = createButton( "Add");

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
        addCollection(id);
      }
    })
  })
   .then(reload());



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
        var button = createButton( "Add");

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
            addCollection(id);
        }
      })
    }).then(reload());
  }

function addCollection(id){
    var div = document.getElementById(id).parentElement.parentElement;
    var cardBody = div.firstChild;
    var img = cardBody.firstChild;
    var name = img.nextSibling;
    var text = name.nextSibling;
    var jsonString = {
            "id" : id,
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
    .then(reload());        //Adding to json-server and calling reload function
}

function reload(){
    const topCollection = document.getElementById("topCollection");
    var getUrl = "http://localhost:3000/collect";
    topCollection.innerHTML = "";

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
            topCollection.appendChild(div1);

            const id = button.id;
            button.onclick = function(){
                deleteCollection(id);
            }
        })
    })
}

function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

function deleteCollection(id){
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
    .then(reload());
}
