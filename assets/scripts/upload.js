const header = document.getElementById('header');
const crearMisGuifosSection = document.getElementById('crearGuifosSectionID'); //class crearGuifosSection
const capturingSection = document.getElementById('capturing'); //class capturing
const subiendoGuifos = document.getElementById('subiendoGuifos');
const guifosSuccess = document.getElementById('guifosSuccess');
const misGuifosSection = document.getElementById('misGuifos'); //class misGuifos
const api = 'https://api.giphy.com/v1/gifs/';
const api_key = '?api_key=CGsGlZi1P2bkiZwKgxoL0ab1AThC7Tav';
const startCaptureButton = document.getElementById('startButton');
const camIcon = document.getElementById('camImage');
const counter = document.getElementById('counter');
const repetirButton = document.getElementById('repetirCaptura');
const subirGuifos = document.getElementById('subirGuifos');
const loadbar = document.getElementById('loadBarContainer');
const loadbarmember = document.getElementsByClassName('load_bar_member');
const guifosuccesspreview = document.getElementById('guifoSuccessImage');
let recordingFlag = false;
let recorder;
const record = document.getElementById('buttonCapturarStart')
const video = document.querySelector('video');
const stop = document.getElementById('stop'); //boton de detener
const preview = document.getElementById('preview');
const progressBar = document.getElementsByClassName('progres-bar-item');
const uploadMessage = document.getElementById('upload-msg');
const download = document.getElementById('guifoSuccessDownload');
const copy = document.getElementById('guifoSuccessCopy');
const nav = document.getElementById('nav');
function listenerIcono () {
    
  let clicklogo = document.getElementById("logoguifos");
  clicklogo.addEventListener("click", () => {
    location.href='./index.html';
  });
}
listenerIcono();
//Buscamos en sessionStorage onload para ver tema y bandera de link para acomodar el DOM.
const rightNacContainer = document.getElementById('rightNacContainer');
window.onload = () => {
  let actualtheme = sessionStorage.getItem('theme');
  if (actualtheme === "dark") {
    themeSelected('styles/darktheme.css');
  } else {
    themeSelected('styles/lighttheme.css');
  }
  let linkTarget = sessionStorage.getItem('linktarget');
  if (linkTarget.includes('misguifos')) {
    crearMisGuifosSection.setAttribute('class', 'displaynone');
    header.classList.remove('displaynone');
    misGuifosSection.setAttribute('class', 'misGuifos');
  } 
    if (linkTarget.includes('crearguifos')) {
    document.getElementById('nav').setAttribute('class', 'navgifos');
    rightNacContainer.setAttribute('class', 'hidden');
    header.classList.remove('displaynone');
    crearMisGuifosSection.setAttribute('class', 'crearGuifosSection');
    misGuifosSection.setAttribute('class', 'misGuifos');
  }
}

let themeSelected = (parametro) => {
  document.getElementById('theme').href = parametro;
  if (parametro.includes('darktheme') ){
    document.getElementById('logoguifos').setAttribute('src', './assets/media/gifOF_logo_dark.png');
    document.getElementById('cam').setAttribute('src', './assets/media/camera_light.svg');
    sessionStorage.removeItem('theme');
    sessionStorage.setItem("theme", 'dark');
  } else { 
      document.getElementById('logoguifos').setAttribute('src', './assets/media/gifOF_logo.png');
      document.getElementById('cam').setAttribute('src', './assets/media/camera.svg');
      sessionStorage.removeItem('theme');
      sessionStorage.setItem("theme", 'light');
    }
  }

  //Selector de themas
let themeSelector = () => {
  document.querySelector ('.dropdown-theme').classList.toggle("displayflex");
}
  //
  
  function getvideo () {
    crearMisGuifosSection.classList.add('displaynone');
    misGuifosSection.classList.add('displaynone')
    capturingSection.setAttribute('class', 'displayblock');
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { 
        height: { max : 435 },
        width: 838 
      }
    }
  )
  .then(function(stream) { 
    video.srcObject = stream;
    video.play()
    record.addEventListener('click', () => {
      recordingFlag = !recordingFlag
      document.getElementById('cam').src='./assets/media/recording.svg';
      record.classList.add('button_capturar_capturing');
      camIcon.classList.add('button_capturar_capturing');
      record.innerHTML='Listo';      
      if (recordingFlag === true) {
        this.disabled = true;
        recorder = RecordRTC(stream,
          {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
              onGifRecordingStarted: function() 
                {
          },
        }
      );
      recorder.startRecording();
      getDuration()
      counter.classList.remove('hidden');
      recorder.camara = stream;
      } else {
        this.disabled = true;
        recorder.stopRecording(stopRecordingCallback);
        recordingFlag = false;
      }
    });
  });
}
//Funsion timer
  function getDuration() {
    let seconds = 0;
    let minutes = 0;
    let timer = setInterval(() => { 
      if (recordingFlag) {
        if (seconds < 60) {
          if (seconds <= 9) {
            seconds = '0' + seconds;
          }
          document.getElementById('counter').innerHTML=`00:00:0${minutes}:${seconds}`;
          seconds++;
        } else {
          minutes++;
          seconds = 0;
        }
      } else {
        clearInterval(timer)
      }
    }, 1000);
  }

  function stopRecordingCallback() {
    camIcon.setAttribute('class', 'displaynone');
    record.setAttribute('class', 'displaynone');
    repetirButton.classList.add('cancelButton');
    subirGuifos.classList.add('start-capture');
    misGuifosSection.classList.remove('displaynone');
    recorder.camara.stop();
    let form = new FormData();
    form.append("file", recorder.getBlob(), 'un.gif');
    subirGuifos.addEventListener('click', () => {
      preview.classList.add('hidden');
      capturingSection.setAttribute('class', 'displaynone');
      subiendoGuifos.classList.remove('displaynone');
      bar();
      uploadGif(form)
  })
    video.classList.add('displaynone')
    objectURL = URL.createObjectURL(recorder.getBlob());
    preview.setAttribute('class',"preview")
    preview.src = objectURL;
    recorder.destroy();
    recorder = null;
  }

  //progress bar
  let counterbar = 0;
  function animatedProgressBar (bar) {
    setInterval (() => {
      if (counterbar < bar.length) {
        bar.item(counterbar).classList.toggle('prograss-bar-item-active')
        counterbar++;
      } else {
        counterbar = 0;
      }
    }, 100)
  }

  //subir gif

  function uploadGif(gif) {
    fetch('https://upload.giphy.com/v1/gifs' + api_key, {
      method: 'POST',
      body: gif,
    }).then(res => {
      if (res.status !=200) {
        uploadMessage.innerHTML= `<h2>Se produjo un error con el gif</h2>`
      }
    return res.json();
    }).then(data => {
      uploadMessage.classList.add('hidden');
      guifosuccesspreview.setAttribute('src', objectURL)
      const gifId = data.data.id
      subiendoGuifos.setAttribute('class', 'displaynone');
      guifosSuccess.setAttribute('class', 'guifo_success');

      getGifDetails(gifId)
    })
    .catch(error => {
      uploadMessage.innerHTML = `<h2>Se clavo el gif</h2>`
      console.error("el error es", error);
    });
  }

  //funciones de botones post gif
  
  function getGifDetails (id) {
    fetch(api + id + api_key) //revisar esto
    .then((response) => {
      return response.json()
    }).then(data => {
      const gifUrl = data.data.url
      let giffinal = data.data.images.downsized.url
      localStorage.setItem('gif' + data.data.id, JSON.stringify(data));

    download.setAttribute('href', 'data:image/gif;' + giffinal);
   
    
      copy.addEventListener('click', async () => {
        await navigator.clipboard.writeText(gifUrl);

      alert("URL Copiada con exito", gifUrl);
    }
    )
  }
  )
}

  startCaptureButton.addEventListener('click', () => {
  
    getvideo(); 
  });

  repetirButton.addEventListener('click', () => {
    location.reload()
  });
  
  document.getElementById('cancel_button').addEventListener('click', () => {
      location.reload()
  });

  let inn = 0;

 
  let bar = () => {
    
      for (let inn = 0; inn < loadbarmember.length; inn++ ) {

        (function(inn) { 
          setTimeout(function() {loadbarmember[inn].classList.add('load_bar_member_selected'); }, 700 * inn);
        })(inn);
       
        
      }
    
    }
     
    
 function getMyGifs () {
  let items = [];
  for ( var itt = 0; itt < localStorage.length; itt++) {
    let item = localStorage.getItem(localStorage.key(itt));
   
    if (item.includes('data')) {
      itemJSON = JSON.parse(item)
      items.push(itemJSON.data.images.downsized.url)
   
    }

  }
  return items
 }

window.addEventListener('load', () => {
  const localGifs = getMyGifs ()
  localGifs.forEach(item => { 
    const img = document.createElement('img')
    img.src = item;
    img.setAttribute('class', 'gifVideo');
    document.getElementById('misGuifos-main-container').appendChild(img);
  });
})
getMyGifs ();

document.querySelector("#guifoSuccessListo").addEventListener('click', () => {
  location.reload();
  sessionStorage.removeItem('linktarget');
  sessionStorage.setItem('linktarget', 'crearguifos');

})

const linkCrearGifos = ()  => {
  location.reload();
sessionStorage.removeItem('linktarget');
sessionStorage.setItem('linktarget', 'crearguifos');
location.reload();
}