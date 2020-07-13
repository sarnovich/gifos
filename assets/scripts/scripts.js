// Selector de tema
window.onload = () => {
  let actualtheme = sessionStorage.getItem('theme');
  if (actualtheme === "dark") {
    themeSelected('styles/darktheme.css');
  } else {
     themeSelected('styles/lighttheme.css');
    }
}

//refresh htmlstyles
const hideSection = document.getElementById('crearGuidosSectionID')
const refresh = () => { window.location.reload(false); }
function listenerRefresh () {
    
  let clicklogo = document.getElementById("logo");
  clicklogo.addEventListener("click", refresh);
}
listenerRefresh();


const linkCrearGifos = () => {
  let button = document.getElementById("button-href");
  button.setAttribute('href', './misguifos.html');
  button.setAttribute('target', '_self')
  sessionStorage.removeItem('linktarget')
  sessionStorage.setItem('linktarget', 'crearguifos')
}

let linkMisGifos = async () => {
  try { 
    let button = document.getElementById("button-href-crear");
    button.setAttribute('href', './misguifos.html');
    button.setAttribute('target', '_self')
    sessionStorage.removeItem('linktarget')
    sessionStorage.setItem('linktarget', 'misguifos')
  }
 catch(error) {
  alert("Error ", error);
  }
}

//LLamada API para random
const api = 'https://api.giphy.com/v1/gifs/';
const api_key = '?api_key=CGsGlZi1P2bkiZwKgxoL0ab1AThC7Tav';
const endpointrandom = 'random';
const endpointsearch = 'search';
const endpointags = 'tags/related/term='


//Creamos los elementos para mostrar los primeros gif. un for que genera cada uno un nodo con sus atributos pegando a la api.
for (let i = 0; i <=3; i++) {
const callRandom = async () => {
  try {
    const link = api + endpointrandom + api_key + '&tag=&rating=G';
    const randomFetch = await fetch (link);
    const randomFetchJSON = await randomFetch.json();
  
  return randomFetchJSON;
} catch (error) {
  console.error (error);
}
}
callRandom().then (
  (res) => {
    
      let container = document.createElement('div');
     
      container.setAttribute('class', 'gifContainer')
      
      let bar = document.createElement('div');
      
      bar.setAttribute('class', 'gifBar');

      let gifImage = document.createElement('div');
      gifImage.setAttribute('class', 'gifImage');
     

      let gifButton = document.createElement('div');
      gifButton.setAttribute('class', 'gifButton');
      

      let title = res.data.title;
      title.length == "" ? title = "Sin titulo": title = title;
      title.length >=20? title = title.substring(0,20): title = title;
      

      let gifTitleText = document.createTextNode('#' + title);
      let gifTitle = document.createElement('div');
      
      gifTitle.setAttribute('class', 'gifTitle');
      gifTitle.appendChild(gifTitleText);
      bar.appendChild(gifTitle);

      const botonx = document.createElement('img');
      botonx.setAttribute('src','./assets/media/button3.svg');
      botonx.setAttribute('class', 'botonx');
      bar.appendChild(botonx);

      let urlgif = res.data.images.original.url;
      let gifVideo = document.createElement('img');
      gifVideo.setAttribute('class', 'gifVideo');
      gifVideo.setAttribute('src', urlgif);
      gifImage.appendChild(gifVideo);
      let buttonVerMasLink = document.createElement('a')
      buttonVerMasLink.setAttribute('href', 'https://giphy.com/'); //CARGAR MAS RESULTADOS EN BUSCADOR
      buttonVerMasLink.setAttribute('target', '_blank');
      buttonVerMasLink.setAttribute('class', 'buttonVerMasLink');
      
      let buttonVerMas = document.createElement('div');
      buttonVerMas.setAttribute('class', 'button-ver-mas-container')

      let ptext = document.createElement('p');
      ptext.setAttribute('class', 'ptext');
      ptext.innerHTML = 'Ver más...'
      buttonVerMas.appendChild(ptext);
      buttonVerMasLink.appendChild(buttonVerMas);
      
      container.appendChild(bar);
      container.appendChild(gifImage);
      container.appendChild(buttonVerMasLink);

      let sumamos = document.querySelector(".sugeridos-main-container");
      sumamos.appendChild(container);
    
    }
)
  }

//LLamada API para tendencias
let TradingArray = [];
let TradingUrlImg = [];
const CallTrending = async() => {
  try {
    const link = 'https://api.giphy.com/v1/gifs/trending?api_key=CGsGlZi1P2bkiZwKgxoL0ab1AThC7Tav&limit=24&rating=PG'
    const TradingFetch = await fetch(link);
    const TradingFetchJSON = await TradingFetch.json();
    
return TradingFetchJSON;
  } 
  catch (error) {
    alert ("error ", error);
  }
}
CallTrending().then(
 
    (res) => {
      
      let contador = 0;
        for (let urlimgtrading of res.data) {
          contador = contador +1;
           
          let resto = contador % 5;   
          let container = document.createElement('div');
          
          container.setAttribute('class', 'gifContainerTendencias')
          let gifVideo = document.createElement('img');
          let bar = document.createElement('div');
          
          bar.setAttribute('class', 'gifBarTendencia');
          let par = document.createElement('p');
          par.setAttribute('class', 'tags');
          par.innerHTML="#fixed tag"
          bar.appendChild(par);
    
          let gifImage = document.createElement('div');
          
          let urlgif = res.data[contador -1 ].images.original.url;
          
          
            if ( resto == 0 ){
              
              gifImage.setAttribute('class', 'gifImageTendenciasLarge');
              
              gifVideo.setAttribute('class', 'gifVideoTendenciasLarge');
              gifVideo.setAttribute('src', urlgif);
     
              } else { 
                
                  gifImage.setAttribute('class', 'gifImageTendencias'); 
                  gifVideo.setAttribute('class', 'gifVideoTendencias');
                  gifVideo.setAttribute('src', urlgif);
                }
          container.appendChild(gifVideo);
          container.appendChild(bar);
          
          let sumar = document.getElementById('tendencias-main-container')
          sumar.appendChild(container);

        }
    }
    )


CallTrending();

//Selector de themas
let themeSelector = () => {
  
    document.querySelector ('.dropdown-theme').classList.toggle("displayflex");
}

let themeSelected = (parametro) => {
  
  document.getElementById('theme').href = parametro;
  if (parametro.includes('darktheme')) {
    document.getElementById('lupa').setAttribute('src', './assets/media/CombinedShape.svg');
    document.getElementById('logo').setAttribute('src', './assets/media/gifOF_logo_dark.png');
    sessionStorage.removeItem('theme');
    sessionStorage.setItem("theme", 'dark');
  } else { 
      document.getElementById('lupa').setAttribute('src', './assets/media/lupa_inactive.svg');
      document.getElementById('logo').setAttribute('src', './assets/media/gifOF_logo.png');
      sessionStorage.removeItem('theme');
      sessionStorage.setItem("theme", 'light');
    }
  }

  //Llamada a la API para busquedas

  function pushsearch () {
    
    let click = document.getElementById("search-button");
    click.addEventListener("click", getdata);
    }
  let inputSearch;
  
   
const getdata = async () => { 
  const inputWords = document.getElementById('search-input');
    if (inputWords.value.trim().length >1 ) {
    document.getElementById("sub-search-container").setAttribute ('class', 'displaynone')
    inputSearch = inputWords.value.trim();
    document.getElementById("searched-result").innerHTML="Resultados de: " + inputSearch
    let click = document.getElementById("search-button")
    click.setAttribute('class', 'search-button-active');  
    const link = api + endpointsearch + api_key + '&q=' + inputSearch + '&limit=17&offset=0&rating=G&lang=es'
    const searchFetch = await fetch (link);
    const searchFetchJSON = await searchFetch.json();
    let contador = 0;
    document.getElementById("searched-section").className='';
    let cleaner1 =  document.querySelector("#searched-main-container-id");
    cleaner1.innerHTML="";
  
    cleanering();
     
        for (let urlimgsearch of searchFetchJSON.data) {
          contador = contador +1;
           
          let resto = contador % 5;   
          let container = document.createElement('div');
          
          container.setAttribute('class', 'gifContainerTendencias')
          let gifVideo = document.createElement('img');
          let bar = document.createElement('div');
          
          bar.setAttribute('class', 'gifBarTendencia');
          let par = document.createElement('p');
          par.setAttribute('class', 'tags');
          par.innerHTML="#fixed tag"
          bar.appendChild(par);
          let gifImage = document.createElement('div');
          let urlgif = searchFetchJSON.data[contador -1 ].images.original.url;          
            if ( resto == 0 ){
              gifImage.setAttribute('class', 'gifImageTendenciasLarge');
              gifVideo.setAttribute('class', 'gifVideoTendenciasLarge');
              gifVideo.setAttribute('src', urlgif);
     
              } else { 
                  gifImage.setAttribute('class', 'gifImageTendencias');              
                  gifVideo.setAttribute('class', 'gifVideoTendencias');
                  gifVideo.setAttribute('src', urlgif);
                }  
          container.appendChild(gifVideo);
          container.appendChild(bar);
        
          let sumar1 = document.querySelector("#searched-main-container-id");
          sumar1.appendChild(container);

        }
    } 
  }

pushsearch ();

//Ponemos el boton de busqueda en activo al escribir 
let stringBusqueda=[];
function keyup () {
    let key = document.getElementById('search-input');
    key.addEventListener('keyup', changebutton) ;   
  }
  let searchSuggestions;
  let changebutton = () => {
    let click = document.getElementById("search-button")
    let subSearchContainer = document.getElementById("sub-search-container");
    const inputWords = document.getElementById('search-input');
    stringBusqueda.push(inputWords.value)
    searchSuggestions = stringBusqueda[stringBusqueda.length -1];
    inputSearch = inputWords.value.trim();
    inputSearch.length >= 2? click.setAttribute('class', 'search-button-ready'): click.setAttribute('class', 'search-button');
    inputSearch.length >= 2? subSearchContainer.setAttribute('class', 'search-bottom-container' ): subSearchContainer.setAttribute ('class', 'displaynone');
    inputSearch.length >= 2? pushSugestion(): null;
    let input = event.keyCode;
    input == '13'? getdata(): null;
    input == '13'? subSearchContainer.setAttribute ('class', 'displaynone'): null;

  }
  keyup ();

// Sugeridos en input. pegamos a la api, onclick ponemos valor y llamamos a getdata para iniciar busqueda.
let sug1;
let sug2;
let sug3;

  const pushSugestion = async () => { 
    
      const link = 'https://api.giphy.com/v1/tags/related/term=' + searchSuggestions + api_key;
      const searchFetch = await fetch (link);
      const searchFetchJSON = await searchFetch.json();
      document.getElementById('sugeContainer').setAttribute('class', 'suge-container');
      document.getElementById("sug1").setAttribute('value', searchFetchJSON.data[0].name);
      sug1 = document.getElementById("sug1").value;
      document.getElementById('suge1').innerHTML= "#" + searchFetchJSON.data[0].name;
      document.getElementById("sug2").setAttribute('value', searchFetchJSON.data[1].name);
      sug2 = document.getElementById("sug2").value;
      document.getElementById('suge2').innerHTML= "#" + searchFetchJSON.data[1].name;
      document.getElementById("sug3").setAttribute('value', searchFetchJSON.data[2].name);
      sug3 = document.getElementById("sug3").value;
      document.getElementById('suge3').innerHTML= "#" + searchFetchJSON.data[2].name;
   
  }
    let takeclick = async () => {
            
        let campo =  document.querySelector("#sug1").addEventListener('click', setvalues)
        let campo2 =  document.querySelector("#sug2").addEventListener('click', setvalues2)
        let campo3 =  document.querySelector("#sug3").addEventListener('click', setvalues3)
        document.getElementById("searched-result").innerHTML="Resultados de: " + inputSearch
     
    }
  
    function setvalues() {
      document.getElementById('search-input').value = sug1;
      getdata();
      document.getElementById("searched-result").innerHTML="Resultados de: " + inputSearch
    }
    function setvalues2() {  
      document.getElementById('search-input').value = sug2;
      getdata();
      document.getElementById("searched-result").innerHTML="Resultados de: " + inputSearch
    }
    function setvalues3() {
      document.getElementById('search-input').value = sug3;
      getdata();
      document.getElementById("searched-result").innerHTML="Resultados de: " + inputSearch
    }
    takeclick();
    
  const cleanering = () => {
    
    let cleaner = document.querySelector("#sugerencias");
    cleaner.innerHTML="";
    cleaner = document.querySelector("#tendencias");
    cleaner.innerHTML="";
  }