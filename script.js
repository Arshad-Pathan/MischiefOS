/*
███╗   ███╗██╗███████╗ ██████╗██╗  ██╗██╗███████╗███████╗ ██████╗ ███████╗
████╗ ████║██║██╔════╝██╔════╝██║  ██║██║██╔════╝██╔════╝██╔═══██╗██╔════╝
██╔████╔██║██║███████╗██║     ███████║██║█████╗  █████╗  ██║   ██║███████╗
██║╚██╔╝██║██║╚════██║██║     ██╔══██║██║██╔══╝  ██╔══╝  ██║   ██║╚════██║
██║ ╚═╝ ██║██║███████║╚██████╗██║  ██║██║███████╗██║     ╚██████╔╝███████║
╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝      ╚═════╝ ╚══════╝
                                                                          
*/




// time function
function updateTime() {
    var currentTime = new Date()
    var time=currentTime.toLocaleTimeString();
    var date=currentTime.toLocaleDateString();

    var hours = String(currentTime.getHours()).padStart(2, '0');
    var minutes = String(currentTime.getMinutes()).padStart(2, '0');
    var seconds = String(currentTime.getSeconds()).padStart(2, '0');

    var timeText = document.querySelector("#timeElement");
    var gridTime = document.querySelector(".gridTime");
    timeText.innerHTML = `${time}<br>${date}`;
    gridTime.innerHTML = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateTime, 1000);
// time end

const visits_api = "https://script.google.com/macros/s/AKfycbxWQilmTjyUdmj3fhwZA6Fjtca09gkLOS1QTcfwhktfndMcigKP8nBZpVqf4sGmhB4R/exec";

// variables
var biggestIndex = 10;

var topBar = document.querySelector("#top")

var selectedIcon = undefined;
var editing = false;

// Music Player
var songs = [
  {
    name: "TVA First View",
    creator: "NATALIE HOLT",
    img: "assets/TVA_First_View.png",
    audio: "assets/TVA First View.mp3"
  },
  {
    name: "History Is Now",
    creator: "NATALIE HOLT",
    img: "assets/History_Is_Now.png",
    audio: "assets/History Is Now.mp3"
  },
  {
    name: "Purpose Is Glorious",
    creator: "NATALIE HOLT",
    img: "assets/Purpose_Is_Glorious.png",
    audio: "assets/Purpose Is Glorious.mp3"
  },
  {
    name: "DB COOPER",
    creator: "NATALIE HOLT",
    img: "assets/DB_COOPER.png",
    audio: "assets/DB Cooper.mp3"
  }
];

var currSong = 0;


function boot() {
  document.addEventListener("load",()=>{
    confirm("Welcome to Mischief OS.\n\nEnter fullscreen to begin?");
  })
}
boot();

function gridOp() {
  var lockScreen = document.querySelector(".grid_screen");
  var lSTrigger = document.querySelector(".lSTrigger");
  var nav = document.querySelector(".nav");
  var gsong = document.getElementById("gsong");
  // var tempinput = document.createElement("input");
  // document.querySelector(".container .gridTime").appendChild(tempinput);
  // tempinput.focus();
  var blockClick = false;
  document.querySelector(".gridMusic").addEventListener("mouseenter",()=>{
    blockClick = true;
  })
  document.querySelector(".gridMusic").addEventListener("mouseleave",()=>{
    blockClick = false;
  })
  function hideLock(e) {
    if(blockClick){
      return;
    } else {
      lockScreen.style.transform = "translateY(-100%)";
      nav.style.transform = "translateY(0)";
    }
  }
  lSTrigger.addEventListener("click",function(){
    lockScreen.style.transform = "translateY(0)";
    nav.style.transform = "translateY(-60px)";
  });
  document.querySelector(".container").addEventListener("click",hideLock);
  lockScreen.addEventListener("keydown",hideLock);
}
gridOp();
// grid music
function gridMusic(){
  function gloadSelectedSong(i){
    var sImg = document.querySelector(".gdisk .sI");
    var sName = document.querySelector(".gsong_name");
    var sCreator = document.querySelector(".gsong_creator");
    var aud = document.getElementById("gsong");
  
    // var sOptSelection=document.getElementById("song_selection");
    var song = songs[i];
  
    sImg.src = song.img;
    sName.innerText = song.name;
    sCreator.innerText = song.creator;
    aud.src = song.audio;
    document.getElementById("gsProg").value = 0;
    aud.load();
  }

  function gsongControllers(){
    var aud = document.getElementById("gsong");
    var sImg = document.querySelector(".gdisk .sI");
  
    var sProg = document.getElementById("gsProg");
    
    var playPause = document.querySelector(".gplayPause");
    var back = document.querySelector(".gback");
    var forw = document.querySelector(".gforward");
  
    sProg.addEventListener("input", () => {
      if (!aud.duration) return;
      aud.currentTime = (sProg.value / 100) * aud.duration;
    });
    
    //play pause
    playPause.addEventListener("click", ()=>{
      if(aud.paused){
        aud.play();
      } else {
        aud.pause();
      }
    });
    
    aud.addEventListener("play",()=>{
      playPause.textContent="◇"
      sImg.classList.add("r-disk");
    });
    aud.addEventListener("pause",()=>{
      playPause.textContent="■"
      sImg.classList.remove("r-disk");
    });
    // forward
    forw.addEventListener("click", forward);
    function forward(){
      currSong++;
      if(currSong >= songs.length){
        currSong=0;
      }
      gloadSelectedSong(currSong);
      aud.play();
    }
  
    // backward
    back.addEventListener("click",backward);
    function backward(){
      currSong--;
      if(currSong < 0){
        currSong=songs.length - 1;
      }
      gloadSelectedSong(currSong);
      aud.play();
    }
  
    // pause when app closes
    document.addEventListener("visibilitychange", function(){
      aud.pause()
    });  
  }
  gsongControllers();
  gloadSelectedSong(0);
}
gridMusic();


















// visitor counter widget
function showVisitorCount(data) {
    const counter = document.querySelector(".counter");
    const gridcounter = document.querySelector(".gridcounter");

    if (counter && data.success) {
        counter.textContent = data.count;
    }
    if (gridcounter && data.success) {
        gridcounter.textContent = data.count;
    }
}
async function addVisitScript() {
  const script = document.createElement("script");
  
  script.src = visits_api +
  "?action=visit&callback=showVisitorCount";
  
  script.onerror = function () {
    console.log("Visitor counter could not load.");
  };
  
  document.body.appendChild(script);
}
addVisitScript();

document.addEventListener("contextmenu",()=>{
  addVisitScript();
})

// weather widget
const city = {
  name: "SURAT",
  latitude: 21.170240,
  longitude: 72.831062
};
async function updateWeather() {
  const url = `https://api.open-meteo.com/v1/forecast` + `?latitude=${city.latitude}` + `&longitude=${city.longitude}` +
    `&current=temperature_2m,is_day` + `&timezone=auto`;
    
  const response = await fetch(url);

  const data = await response.json();
  const current = data.current;

  const temp = document.getElementById("weatherTemp");
  const icon = document.getElementById("weatherIcon");
  // for grid
  const gtemp = document.getElementById("gweatherTemp");
  const gicon = document.getElementById("gweatherIcon");

  document.getElementById("weatherCity").textContent = city.name;
  temp.textContent = `${Math.round(current.temperature_2m)}°C`;
  icon.textContent = current.is_day === 1 ? "☀" : "☾";
  
  // for grid
  document.getElementById("gweatherCity").textContent = city.name;
  gtemp.textContent = `${Math.round(current.temperature_2m)}°C`;
  gicon.textContent = current.is_day === 1 ? "☀" : "☾";
}
updateWeather();
setInterval(updateWeather, 60 * 60 * 1000);

var interval;
var countdown = 0 || localStorage.getItem("timer");
function rnTimer() {
  clearInterval(interval);
  dpSelection();

  interval = setInterval(() => {
    if (countdown <= 0) {
      clearInterval(interval);
      alert("DONE");
      return;
    }
    countdown--;
    dpSelection();
  }, 1000);

}
function dpSelection(){
  var minutes = Math.floor(countdown/60);
  var seconds = countdown % 60;

  var dpMinutes = document.getElementById("dpMinutes");
  var dpSeconds = document.getElementById("dpSeconds");

  dpMinutes.innerText = String(minutes).padStart(2,"0");
  dpSeconds.innerText = String(seconds).padStart(2,"0");
}

function tkTime(){
  var csMin = document.getElementById("csMin");
  var csSec = document.getElementById("csSec");
  var dpTimer = document.querySelector(".displayTimer");
  var csTimer = document.querySelector(".csTimer");

  document.getElementById("stBtn").addEventListener("click", function(){
    countdown = Number(csMin.value) * 60 + Number(csSec.value);
    dpTimer.style.display="flex";
    csTimer.style.display="none";
    rnTimer();
  });
}
function cstTimer(){
  var csMin = document.getElementById("csMin");
  var csSec = document.getElementById("csSec");

  if(csMin.value === "" || csSec.value === ""){
    return;
    // alert("Enter Valid Input!");
  } else if (csMin.value.length>3 || csSec.value.length>60) {
    alert("only can track upto 99 hours and under 60 seconds");
  } else {
    countdown = Number(csMin.value) * 60 + Number(csSec.value);
    dpSelection();
  }
}

function tmSelection(){
  var csTimer = document.querySelector(".csTimer");
  var dpTimer = document.querySelector(".displayTimer");
  var timeDrpdown=document.getElementById("timeSelection");
  var tValue = Number(timeDrpdown.value) || localStorage.getItem("timer");
  countdown = tValue * 60;
  timeDrpdown.addEventListener("change", function(){
    tValue=this.value;
    if(tValue==="CUSTOM"){
      csTimer.style.display="flex";
      dpTimer.style.display="none";
      tkTime();
    } else {
      csTimer.style.display="none";
      dpTimer.style.display="flex";
      countdown = tValue * 60;
      dpSelection();
      rnTimer();
    }
  });
}
function stTimer(){
  var dpTimer = document.querySelector(".displayTimer");
  document.getElementById("stBtn").addEventListener("click",function(){
    this.style.display="none";
    document.getElementById("rsBtn").style.display="flex";
    tmSelection();
    dpTimer.style.display="flex";
    
    rnTimer();
  });
}
function rsTimer(){
  var dpTimer = document.querySelector(".displayTimer");
  document.getElementById("rsBtn").addEventListener("click",function(){
    this.style.display="none";
    document.getElementById("stBtn").style.display="flex";
    clearInterval(interval);
    dpTimer.style.display="none";
    
  });
}
tmSelection();
stTimer();
rsTimer();



// Clock widget
function UpdClock1(){
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  var localDate = new Date(date);

  // var seconds = date.getSeconds();
  // var minutes = date.getMinutes();
  // var hours = date.getHours();

  var secHand = document.getElementById("second");
  var minHand = document.getElementById("minute1");
  var hourHand = document.getElementById("hour1");

  var secPos = localDate.getSeconds() * 6;
  var minPos = localDate.getMinutes() * 6;
  var hourPos = localDate.getHours() * 30;

  if(secPos === 0){
    secHand.style.transition = "none";
  } else {
    secHand.style.transition = "0.25s linear"
  }
  if(minPos === 0){
    minHand.style.transition = "none";
  } else {
    minHand.style.transition = "0.25s linear"
  }
  if(hourPos === 0){
    hourHand.style.transition = "none";
  } else {
    hourHand.style.transition = "0.25s linear"
  }

  secHand.style.transform = `rotate(${secPos -180}deg)`;
  minHand.style.transform = `rotate(${minPos - 180}deg)`;
  hourHand.style.transform = `rotate(${hourPos - 180}deg)`;
}
function UpdClock2(){
  const date = new Date().toLocaleString('en-US', { timeZone: 'Pacific/Chatham' });
  var localDate = new Date(date);

  // var seconds = date.getSeconds();
  // var minutes = date.getMinutes();
  // var hours = date.getHours();

  var minHand = document.getElementById("minute2");
  var hourHand = document.getElementById("hour2");

  var secPos = localDate.getSeconds() * 6;
  var minPos = localDate.getMinutes() * 6;
  var hourPos = localDate.getHours() * 30;

  if(minPos === 0){
    minHand.style.transition = "none";
  } else {
    minHand.style.transition = "0.25s linear"
  }
  if(hourPos === 0){
    hourHand.style.transition = "none";
  } else {
    hourHand.style.transition = "0.25s linear"
  }

  minHand.style.transform = `rotate(${minPos - 180}deg)`;
  hourHand.style.transform = `rotate(${hourPos - 180}deg)`;
}
function UpdClock3(){
  const date = new Date().toLocaleString('en-US', { timeZone: 'Pacific/Apia' });
  var localDate = new Date(date);

  // var seconds = date.getSeconds();
  // var minutes = date.getMinutes();
  // var hours = date.getHours();

  var minHand = document.getElementById("minute3");
  var hourHand = document.getElementById("hour3");

  var minPos = localDate.getMinutes() * 6;
  var hourPos = localDate.getHours() * 30;

  if(minPos === 0){
    minHand.style.transition = "none";
  } else {
    minHand.style.transition = "0.25s linear"
  }
  if(hourPos === 0){
    hourHand.style.transition = "none";
  } else {
    hourHand.style.transition = "0.25s linear"
  }

  minHand.style.transform = `rotate(${minPos - 180}deg)`;
  hourHand.style.transform = `rotate(${hourPos - 180}deg)`;
}
setInterval(()=>{
  UpdClock1();
  UpdClock2();
  UpdClock3();
},1000);



function icons(){
  var app_trigger = document.querySelector(".apps");
  var app_container = document.querySelector(".icons_bar");
  app_trigger.addEventListener("click",()=>{
    if(app_container.classList.contains("fit-content")){
      app_container.classList.remove("fit-content")
    } else {
      app_container.classList.add("fit-content")
    }
    // if(app_container.style.width === "fit-content"){
    //   app_container.style.width = "0";
    // } else {
    //   app_container.style.width = "fit-content";
    // }
  })
}
icons();


















  

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  document.getElementById(element.id + "header").onmousedown = startDragging;

  function startDragging(e) {

    if(element.classList.contains("maximized")){  
      element.style.width = "80%";
      element.style.height = "80%";
    }
    e.preventDefault();
    
    initialX = e.clientX;
    initialY = e.clientY;
    
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;

    initialX = e.clientX;
    initialY = e.clientY;

    var newTop = element.offsetTop - currentY;
    var newLeft = element.offsetLeft - currentX;

    // Keep the window inside the viewport
    var maxTop = window.innerHeight - element.offsetHeight;
    var maxLeft = window.innerWidth - element.offsetWidth;

    newTop = Math.max(60, Math.min(newTop, maxTop));
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));

    element.style.top = newTop + "px";
    element.style.left = newLeft + "px";

    // Remove centering transform after dragging starts
    element.style.transform = "none";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var windowOpened=true;
//close window fn
function closeWindow(element) {
    element.style.display = "none"
    windowOpened = false;
}

//open window fn
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  windowOpened = true;
}
//max window fn
function maxWindow(element) {
  if(!element.classList.contains("maximized")){
    element.dataset.originalWidth = element.style.width;
    element.dataset.originalHeight = element.style.height;
    element.dataset.originalPosition = element.style.position;
    element.dataset.originalTop = element.style.top;
    element.dataset.originalLeft = element.style.left;

    element.style.position = "fixed";
    element.style.top = "46px";
    element.style.left = "0%";
    element.style.transform = "translate(0,0)";
    element.style.width = "100%";
    element.style.height = "calc(100vh - 46px)";
    element.classList.add("maximized");
    
  } else {
    element.style.width = element.dataset.originalWidth;
    element.style.height = element.dataset.originalHeight;
    element.style.position = element.dataset.originalPosition;
    element.style.top = element.dataset.originalTop;
    element.style.left = element.dataset.originalLeft;
    
    // element.style.width = "600px";
    // element.style.height = "400px";
    // element.style.position = "absolute";
    element.classList.remove("maximized");
  }
    // element.style.cssText = "height: 100%; width: 100%; position: fixed;";

}
// open app
function selectIcon(element) {
  document.querySelectorAll(".selected").forEach(function(element){
    element.classList.remove("selected");
  });
  element.classList.add("selected");
  selectedIcon = element
} 
function deselectIcon(element) {
  if(element){
    element.classList.remove("selected");
  }
  selectedIcon = undefined
}
function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(element)
  } else {
    selectIcon(element)
  }
}
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  var closeBtn = document.querySelector("#" + elementName + "close")
  var openBtn = document.querySelector("#" + elementName + "open")
  var maxBtn = document.querySelector("#" + elementName + "max")  
  
  document.querySelector(".nav h4").addEventListener("click",() => {
    closeWindow(screen);
  })
  closeBtn.addEventListener("click", function() {
    closeWindow(screen);
  });
  openBtn.addEventListener("click", function() {
    openWindow(screen);
  });
  openBtn.addEventListener("dblclick", function() {
    closeWindow(screen);
  });
  openBtn.addEventListener("click", function () {
    handleIconTap(openBtn);
  });
  
  maxBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    maxWindow(screen);
  });

  // ================ this is not ai written but an attention grabber ==========================
  // this is for to acknowledge the below code enables you to maximize window
  // when you double click on app name header, it is inspiride from windows functionality

  // windowheaders.forEach((each)=>{
  //   each.addEventListener("dblclick",()=>{
  //     maxWindow(screen)
  //   })
  // });

  addWindowTapHandling(screen)
  dragElement(screen)
}

initializeWindow("intro")
initializeWindow("journal")
initializeWindow("setting")
initializeWindow("terminal")
initializeWindow("music")
initializeWindow("wiki")
initializeWindow("library")
initializeWindow("gallery")
initializeWindow("mygame")
initializeWindow("guide")





// intro
var intro_pages = [
  {
    url: "insbook/1.jpg"
  },
  {
    url: "insbook/2.jpg"
  },
  {
    url: "insbook/3.jpg"
  },
  {
    url: "insbook/4.jpg"
  },
  {
    url: "insbook/5.jpg"
  },
  {
    url: "insbook/6.jpg"
  },
  {
    url: "insbook/7.jpg"
  },
  {
    url: "insbook/8.jpg"
  },
  {
    url: "insbook/9.jpg"
  },
  {
    url: "insbook/10.jpg"
  },
  {
    url: "insbook/11.jpg"
  },
  {
    url: "insbook/12.jpg"
  },
  {
    url: "insbook/13.jpg"
  }
  
];
var currIPage = 0;

function introapp(){
  var iPage = document.getElementById("iPage");
  var iPrev = document.getElementById("iprev");
  var iNext = document.getElementById("inext");
  var ipNumber = document.getElementById("ipNumber");

  function loadIPage(g) {
    var iUrl = intro_pages[g];
    iPage.src=iUrl.url;
    ipNumber.textContent = `${currIPage}/${intro_pages.length}`;
  }
  iPrev.addEventListener("click",iDecre);
  iNext.addEventListener("click",iIncre);
  function iIncre(){
    currIPage++;
    if(currIPage>=intro_pages.length){
      currIPage = 0;
    }
    loadIPage(currIPage);
  }
  function iDecre(){
    currIPage--;
    if(currIPage < 0){
      currIPage = intro_pages.length - 1;
    }
    loadIPage(currIPage);
  }
  loadIPage(0);
}
introapp();





















var journalData = JSON.parse(localStorage.getItem("journalData")) || [];;
var currentPage = 0;

function journalEditor(){
  var leftTADiv = document.getElementById("leftTADiv");
  var rightTADiv = document.getElementById("rightTADiv");
  leftTADiv.innerHTML =
    `
    <textarea name="journalmd" class="md_content" id="leftTA" rows=30 placeholder="#Enter Date - then Your Name and then start writing your thoughts"></textarea>
    `;
  rightTADiv.innerHTML =
    `
    <textarea name="journalmd" class="md_content" id="rightTA" rows=30 placeholder="#Enter Date - then Your Name and then start writing your thoughts"></textarea>
    `;
}

function journalEntry(){

  var leftTA = document.getElementById("leftTA");
  var rightTA = document.getElementById("rightTA");

  if (!leftTA || !rightTA) {
    return;
  }
  // if (leftTA.value === "" && rightTA.value === "") {
  //   alert("Please enter Something");
  //   return;
  // }
  var newEntry = {
    leftpage: leftTA.value,
    rightpage: rightTA.value
  };
  
  journalData.push(newEntry);

  localStorage.setItem("journalData",JSON.stringify(journalData));

  currentPage = journalData.length - 1;

  loadJEntry();
}

function loadJEntry() {
  var leftTADiv = document.getElementById("leftTADiv");
  var rightTADiv = document.getElementById("rightTADiv"); 
  var pageNumber = document.getElementById("pNumber");

  if(journalData.length === 0){
    leftTADiv.textContent = "";
    rightTADiv.textContent = "";
    if (pageNumber) {
      pageNumber.textContent = "0/0";
      
    }
     return;
  }
  var entry = journalData[currentPage];
  leftTADiv.textContent = entry.leftpage;
  rightTADiv.textContent = entry.rightpage;
  if (pageNumber) {
    pageNumber.textContent = (currentPage+1)+"/"+journalData.length;
  }


  // var saveBtn = document.getElementById("saveBtn");

  // leftTADiv.textContent = lT;
  // rightTADiv.textContent = rT;
  // saveBtn.style.display = "none";
}

function prevPage() {
  if (currentPage>0) {
    currentPage--;
    loadJEntry();
  }
}
function nextPage() {
  if (currentPage<journalData.length-1) {
    currentPage++;
    loadJEntry();
  }
}


function initJournal() {
  var saveBtn = document.getElementById("saveBtn");
  var editBtn = document.getElementById("editBtn");
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");

  editBtn.addEventListener('click', function(){
    editing = true;
    journalEditor();
    saveBtn.style.display = "flex";
  });
  saveBtn.addEventListener('click', function(){
    editing = false;
    journalEntry();
    saveBtn.style.display = "none";
  });
  prev.addEventListener('click', function(){
    prevPage();
  });
  next.addEventListener('click', function(){
    nextPage();
  });
  // document.querySelector(".journal_content").addEventListener("keydown",(e)=>{
  //   document.addEventListener("keydown",()=>{
  //     return;
  //   })
  // })
}
initJournal()



var tOnOff = localStorage.getItem("cToggle");
var nOnOff = localStorage.getItem("nToggle");

// settings functions here
function otherSettings(){
  var clock = document.getElementById("clock");
  var clockTog = document.getElementById("clockTog");
  clockTog.value=tOnOff;

  var nav = document.getElementById("top");
  var navToggle = document.getElementById("navtoggle");
  navToggle.value = nOnOff;

  // clockc setting
  if(tOnOff==="0"){
    clock.style.display="none";
    clockTog.style.background="#d5d0c8";
  } else {
    clock.style.display="flex";
    clockTog.style.background="#ff803cff";
  }
  clockTog.addEventListener("change",function (){
    if (this.value==="0"){
      clock.style.display="none";
      clockTog.style.background="#d5d0c8";
      localStorage.setItem("cToggle",0);
    } else {
      clock.style.display="flex";
      clockTog.style.background="#ff803cff";
      localStorage.setItem("cToggle",1);
    }
  });

  // nav setting
  if(nOnOff==="0"){
    nav.style.backdropFilter="none";
    nav.style.background="url('assets/s.png') center / cover no-repeat";
    navToggle.style.background="#d5d0c8";
  } else {
    nav.style.backdropFilter="blur(10px)";
    nav.style.background="none";
    navToggle.style.background="#ff803cff";
  }
  navToggle.addEventListener("change",function (){
    if (this.value==="0"){
      nav.style.backdropFilter="none";
      nav.style.background="url('assets/s.png') center / cover no-repeat";
      navToggle.style.background="#d5d0c8";
      localStorage.setItem("nToggle",0);
    } else {
      nav.style.backdropFilter="blur(10px)";
      nav.style.background="none";
      navToggle.style.background="#ff803cff";
      localStorage.setItem("nToggle",1);
    }
  });
}
otherSettings();

function activeSetTab() {
  var tabS = document.querySelectorAll(".set_tab");
  var sett = document.querySelectorAll(".sett");
  
  tabS.forEach(function (tab) {      
    tab.addEventListener("click", function () {
      tabS.forEach(function(t){
        t.classList.remove("tab_active");
      });
      sett.forEach(function (s) {
        s.classList.remove("sett_active");
      });
        

      if (tab.id === "generalS") {
        sett[0].classList.add("sett_active");
        tab.classList.add("tab_active");
      } else if (tab.id === "accS") {
        sett[1].classList.add("sett_active");
        tab.classList.add("tab_active");
      } else if (tab.id === "perS") {
        sett[2].classList.add("sett_active");
        tab.classList.add("tab_active");
      } 
    });
  });
}
activeSetTab();

function activeSet() {
  var styles = document.querySelectorAll(".style");
  var sets = document.querySelectorAll(".sets");
  
  styles.forEach(function (style) {      
    style.addEventListener("click", function () {
      sets.forEach(function (set) {
        set.classList.remove("set_active");
      });
        

      if (style.id === "s1") {
        sets[0].classList.add("set_active");
      } else if (style.id === "s2") {
        sets[1].classList.add("set_active");
      } else if (style.id === "s3") {
        sets[2].classList.add("set_active");
      }
    });
  });
}


function customImage(){
  var preWall = document.getElementById("wallpaperPre");
  var imgInput = document.getElementById("customImage");
  var swBtn = document.getElementById("swBtn");

  imgInput.addEventListener('change', function(){
    let file = this.files[0];

    if(!file){
      return;
    }

    var reader = new FileReader();
    reader.onload = function(){
      preWall.src = reader.result;
    }

    swBtn.addEventListener("click",function(){
      document.body.style.backgroundImage=`url("${preWall.src}")`;
      localStorage.setItem("myWallP",preWall.src);
    });
    // reader.onload = function(){
    //   customWall = reader.result;
    //   preWall.src = customWall; //preview custom image
    // }
    reader.readAsDataURL(file);
  });
}

function wallPreview(){
  var preWall = document.getElementById("wallpaperPre");
  var loadedWalls = document.querySelectorAll(".sets img");
  var swBtn = document.getElementById("swBtn");
  
  loadedWalls.forEach(function(img){
    img.addEventListener("click",function(){
      preWall.src=img.src;
      
    });
  });
  swBtn.addEventListener("click", function () {
    document.body.style.backgroundImage = `url("${preWall.src}")`;
    localStorage.setItem("myWallP", preWall.src);
  });
}


function svBg(){
  var preWall = document.getElementById("wallpaperPre");
  var myWallP = localStorage.getItem("myWallP");

  if(myWallP){
    preWall.src=myWallP;
    document.body.style.backgroundImage=`url("${preWall.src}")`;

  }
}
function initBgSettings(){
  activeSet();
  customImage();
  wallPreview();
  svBg();
}
initBgSettings();


// Terminal app
function terminalCmd(){
  var terminalC = document.getElementById("terminalC");
  var cmd = document.getElementById("cmd");
  var output = document.getElementById("output");
  var tag = "WEBOS2/MischiefOS >  ";

  terminalC.addEventListener("click", function(){
    cmd.focus()
  });
  
  cmd.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
      var c = cmd.value;
      displayCmd(tag+c);
      cmd.value="";
      runCmd(c.trim());
    }
  });
}
function displayCmd(line){
  var cmdLine= document.createElement("div");
  cmdLine.textContent = line;
  output.appendChild(cmdLine);
}
function runCmd(str){
  var myTag = str.indexOf(" ");
  var command = myTag === -1 ? str : str.substring(0,myTag);
  var arg = myTag === -1 ? "" : str.substring(myTag + 1);

  if (command === "echo"){
    displayCmd(arg);
  } else if(command === "help"){
    displayCmd(`echo "text" ___or___ open "appname" ___or___ close "appname" ___or___ status ___or___ time ___or___ date ___or___ about ___or___ exit ___or___ clear`)
  } else if (command === "open") {
    if(arg==="intro"){
      openWindow(intro)
    } else if(arg === "journal"){
      openWindow(journal)
    } else if(arg === "setting"){
      openWindow(setting)
    }else if(arg === "terminal"){
      openWindow(terminal)
    }
  } else if (command === "close") {
    if(arg==="intro"){
      closeWindow(intro)
    } else if(arg === "journal"){
      closeWindow(journal)
    } else if(arg === "setting"){
      closeWindow(setting)
    }else if(arg === "terminal"){
      closeWindow(terminal)
    } 
  } else if(command === "status"){
    displayCmd("Connected to Internet")
  } else if(command === "time"){
    displayCmd(new Date().toLocaleTimeString())
  } else if(command === "date"){
    displayCmd(new Date().toLocaleDateString())
  } else if(command === "about"){
    displayCmd("MischiefOS - Inspired by Loki Series Retro-Futurism.")
  } else if(command === "exit"){
    displayCmd("Login Page Functionality is on way")
  } else if(command === "clear"){
    output.innerHTML="";
  } else {
    displayCmd(`"${command}"`+ " command not found as internal or external command.")
  }
}
terminalCmd();



function loadSelectedSong(i){
  var sImg = document.querySelector(".disk .sI");
  var sName = document.querySelector(".song_name");
  var sCreator = document.querySelector(".song_creator");
  var aud = document.getElementById("song");

  // var sOptSelection=document.getElementById("song_selection");
  var song = songs[i];

  sImg.src = song.img;
  sName.innerText = song.name;
  sCreator.innerText = song.creator;
  aud.src = song.audio;
  document.getElementById("song_selection").value=currSong;
  document.getElementById("sProg").value = 0;
  document.getElementById("currTime").textContent = "00:00";
  document.getElementById("duration").textContent = "00:00";
  aud.load();


}

function songControllers(){
  var aud = document.getElementById("song");
  var sImg = document.querySelector(".disk .sI");

  var sProg = document.getElementById("sProg");
  // var currTime = document.getElementById("currTime");
  // var duration = document.getElementById("duration");
  
  var playPause = document.querySelector(".playPause");
  var back = document.querySelector(".back");
  var forw = document.querySelector(".forward");

  // song range
  // aud.addEventListener("loadedmetadata", ()=>{
  //   duration.textContent = sTimeFormate(aud.duration);
  // });

  // aud.addEventListener("timeupdate", ()=>{
  //   if (!aud.duration) return;
  //   const p = (aud.currentTime / aud.duration) * 100;
  //   sProg.value = p;
  //   currTime.textContent = sTimeFormate(aud.currentTime);
  // });
  sProg.addEventListener("input", () => {
    if (!aud.duration) return;
    aud.currentTime = (sProg.value / 100) * aud.duration;
  });
  
  
  //play pause
  playPause.addEventListener("click", ()=>{
    if(aud.paused){
      aud.play();
    } else {
      aud.pause();
    }
  });
  
  aud.addEventListener("play",()=>{
    playPause.textContent="◇"
    sImg.classList.add("r-disk");
  });
  aud.addEventListener("pause",()=>{
    playPause.textContent="■"
    sImg.classList.remove("r-disk");
  });
  // forward
  forw.addEventListener("click", forward);
  function forward(){
    currSong++;
    if(currSong >= songs.length){
      currSong=0;
    }
    loadSelectedSong(currSong);
    aud.play();
  }

  // backward
  back.addEventListener("click",backward);
  function backward(){
    currSong--;
    if(currSong < 0){
      currSong=songs.length - 1;
    }
    loadSelectedSong(currSong);
    aud.play();
  }

  // pause when app closes
  document.addEventListener("visibilitychange", ()=>{
    aud.pause()
  });
  document.querySelector(".music #musicclose").addEventListener("click",()=>{
    aud.pause()
  });

  // pause or keep playing when closes the music player, is the way
}
// i used ai just for this
// function sTimeFormate(seconds){
//   if ( isNaN(seconds) || !isFinite(seconds) ) {
//     return "00:00";
//   }
  
//   const minutes = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
  
//   return (
//         String(minutes).padStart(2, "0")
//         + ":" +
//         String(secs).padStart(2, "0")
//     );
// }
loadSelectedSong(0);

function sOptSelection(){
  var sOptSelection=document.getElementById("song_selection");
  var aud = document.getElementById("song");

  sOptSelection.addEventListener("change",function(){
    currSong = this.value;
    if(currSong === "0"){
      loadSelectedSong(currSong);
      aud.play();
    }
    else if(currSong === "1"){
      loadSelectedSong(currSong);
      aud.play();
    }
    else if(currSong === "2"){
      loadSelectedSong(currSong);
      aud.play();
    }
    else if(currSong === "3"){
      loadSelectedSong(currSong);
      aud.play();
    }
  })
  
} 

// function songControllers(){
//    var playPause = document.querySelector(".playPause");
//    var back = document.querySelector(".back");
//    var forw = document.querySelector(".forward");

//   playPause.addEventListener("click", () =>{
//     if(aud)
//   })
// }

function songInit(){  
  songControllers();
  sOptSelection();
}
songInit();




// Wikipedia here
function activeArt() {
  var lables = document.querySelectorAll(".art_lable");
  var articles = document.querySelectorAll(".article");
  
  lables.forEach(function (lab) {      
    lab.addEventListener("click", function () {
      lables.forEach(function(l){
        l.classList.remove("active_lable");
      });
      articles.forEach(function (art) {
        art.classList.remove("read_art");
      });
        

      if (lab.id === "1st") {
        articles[0].classList.add("read_art");
        lab.classList.add("active_lable");
      } else if (lab.id === "2nd") {
        articles[1].classList.add("read_art");
        lab.classList.add("active_lable");
      } else if (lab.id === "3rd") {
        articles[2].classList.add("read_art");
        lab.classList.add("active_lable");
      } else if (lab.id === "4th") {
        articles[3].classList.add("read_art");
        lab.classList.add("active_lable");
      }
    });
  });
}
activeArt();





// Library
function libManagement(){
  var files = document.querySelectorAll(".files");
  var indFiles = document.querySelectorAll(".indFiles");

  files.forEach(function(file,i){
    file.addEventListener("click", function(){
      indFiles.forEach(function(ind){
        ind.style.display="none";
        if (files[i]) {
          indFiles[i].style.display="flex";
          document.querySelectorAll(".cls_file").forEach((cls)=>{
            cls.addEventListener("click",()=>{
              indFiles[i].style.display="none";
            })
          });
            
        }
      });


    });
  });
}
libManagement();


var galleryImgs = [
  { src: "wallpapers/e1.jpg", cat: "wallpapers" },
  { src: "wallpapers/m1.jpg", cat: "memes" },
  { src: "wallpapers/a1.jpg", cat: "Archives" },
  { src: "wallpapers/e2.jpg", cat: "wallpapers" },
  { src: "wallpapers/e3.jpg", cat: "wallpapers" },
  { src: "wallpapers/e4.jpg", cat: "wallpapers" },
  { src: "wallpapers/e5.jpg", cat: "wallpapers" },
  { src: "wallpapers/e6.jpg", cat: "wallpapers" },
  { src: "wallpapers/m2.jpg", cat: "memes" },
  { src: "wallpapers/m3.jpg", cat: "memes" },
  { src: "wallpapers/m4.jpg", cat: "memes" },
  { src: "wallpapers/a2.jpg", cat: "Archives" },
  { src: "wallpapers/a3.jpg", cat: "Archives" },
  { src: "wallpapers/a4.jpg", cat: "Archives" }
];

function galManagement(){
  var recent = document.getElementById("recents");
  var albums = document.getElementById("albums");
  var recCon = document.getElementById("rec_con");
  var albCon = document.getElementById("alb_con");

  // if (albums.classList.contains("active")){
  //   loadAlbums();
  // } else {
  //   loadRecents();
  // }

  loadRecents();
  recent.classList.add("active");
  albCon.style.display = "none";
  recent.addEventListener("click",()=>{
    loadRecents();
    albCon.style.display = "none";
    if(recent.classList.contains("active")){
      return;
    } else {
      recent.classList.add("active");
      albums.classList.remove("active");
    }
  });
  albums.addEventListener("click",()=>{
    loadAlbums();
    recCon.style.display = "none";
    recent.classList.remove("active");
    albums.classList.add("active");
  });
}
galManagement();



function loadRecents() {
  var recCon = document.getElementById("rec_con");
  recCon.style.display = "grid"; 
  recCon.innerHTML = ""; 
  var recImgs = galleryImgs;
  recImgs.forEach(function(img) {
    var recImg = document.createElement("img");
    recImg.src = img.src;
    recCon.appendChild(recImg);
    recImg.addEventListener("mouseover",()=>{
      recImg.title = `${img.cat}`;
    })
  });
}

function loadAlbums() {
  var albCon = document.getElementById("alb_con");
  albCon.style.display = "grid";
  albCon.innerHTML = "";
  // ====================  Not completed yet, have to write full logic ==========================
  var albImgs = galleryImgs;
  albImgs.slice(0,3).forEach(function(img) {
    var alb = document.createElement("div");
    var albImg = document.createElement("img");
    var albName = document.createElement("p");
    albImg.src = img.src;
    albName.textContent = img.cat;
    albCon.appendChild(alb);
    alb.appendChild(albImg);
    alb.appendChild(albName);
    alb.addEventListener("click", function() {
      indAlbImg(img.cat);
    });
    
  });
}
function indAlbImg(category) {
  var albCon = document.getElementById("alb_con");
  albCon.innerHTML = "";
  var filteredImgs = galleryImgs.filter(item => item.cat === category);
  var backBtn = document.createElement("button");
  backBtn.textContent = "BACK";
  backBtn.addEventListener("click",()=>{
    loadAlbums()
  })
  albCon.appendChild(backBtn);
  filteredImgs.forEach(function (filImg) {
    var indImg = document.createElement("img");
    indImg.src = filImg.src;
    albCon.appendChild(indImg);
  });
}


// game app
function game(){
  var game = document.getElementById("mygame");
  var gmStBtn = document.getElementById("gmStBtn");
  var gmEndBtn = document.getElementById("gmEndBtn");
  var insBox = document.querySelector(".instruction_Box");
  var winBox = document.querySelector(".winning_Box");
  var objs = document.querySelectorAll(".obj");
  var lokiC = document.querySelector(".lokiC");
  // var loki = document.querySelectorAll(".obj img");
  // var portals = document.querySelectorAll(".portal");

  var gameState = false;
  var lokiCounter = 0;
  function selCount() {
    lokiCounter = lokiCounter + 1;
  }
  function gmStart(){
    gameState=true;
    objs.forEach(function(obj) {
      obj.classList.remove("selected");
      obj.classList.add("showObj");
      obj.classList.remove("hideObj");
      obj.addEventListener("click", ()=>{
        if(obj.classList.contains("selected")){
          return;
        } else {
          obj.classList.add("selected");
          selCount()
          lokiC.textContent = `${lokiCounter}/8`;
          if(lokiCounter === 7){
            winBox.style.display="flex";
            document.querySelector(".winning_Box h1").textContent="You always loose, One more there";
          } 
          if (lokiCounter === 8) {
            document.querySelector(".winning_Box h1").textContent="You win";
          }
          // else if(lokiCounter === 7) {
          //   winBox.style.display="flex";
          //   document.querySelector(".winning_Box h1").textContent="You always loose";
          // } 
          
        }
        
      })
    })
    // portals.forEach((p) => p.style.animation = "timePortal 6s forwards");
  }
  function gmEnd() {
    lokiCounter = 0;
    gameState=false;
    objs.forEach(function(obj) {
      obj.classList.remove("selected");
      obj.classList.remove("showObj");
      obj.classList.add("hideObj");
    })
  }
  gmStBtn.addEventListener("click", ()=>{
    gmStart();
    insBox.style.display="none";
  });
  gmEndBtn.addEventListener("click", ()=>{
    gmEnd();
    winBox.style.display="none";
    insBox.style.display="flex";
  });
}
game();


var guide_pages = [
  {
    url: "guidebook/1.jpg"
  },
  {
    url: "guidebook/2.jpg"
  },
  {
    url: "guidebook/3.jpg"
  },
  {
    url: "guidebook/4.jpg"
  },
  {
    url: "guidebook/5.jpg"
  },
  {
    url: "guidebook/6.jpg"
  },
  {
    url: "guidebook/7.jpg"
  }
  
];
var currGPage = 0;

function guideapp(){
  var gPage = document.getElementById("gPage");
  var gPrev = document.getElementById("gprev");
  var gNext = document.getElementById("gnext");
  var gpNumber = document.getElementById("gpNumber");

  function loadGPage(g) {
    var gUrl = guide_pages[g];
    gPage.src=gUrl.url;
    gpNumber.textContent = `${currGPage}/${guide_pages.length}`;
  }
  gPrev.addEventListener("click",gDecre);
  gNext.addEventListener("click",gIncre);
  function gIncre(){
    currGPage++;
    if(currGPage>=guide_pages.length){
      currGPage = 0;
    }
    loadGPage(currGPage);
  }
  function gDecre(){
    currGPage--;
    if(currGPage < 0){
      currGPage = guide_pages.length - 1;
    }
    loadGPage(currGPage);
  }
  loadGPage(0);
}
guideapp();







function tempad(){
  document.addEventListener("contextmenu",()=>{
    alert("sdfghjh hyysd")
  })
}















function keyPresses(){
  var play = document.querySelector(".playPause");
  var apps = document.querySelector(".icons_bar");
  var edit = document.querySelector(".part textarea");

  document.addEventListener("keypress", function(e){
    if (editing) {

    } else if (e.key === " ") {
      play.focus();
    } else if (e.key === "T" || e.key === "t") {
      document.getElementById("rsBtn").focus();
      document.getElementById("stBtn").focus();
    } else if (e.key === "s" || e.key === "S") {
      document.getElementById("timeSelection").focus();
    } else if (e.key === "a" || e.key === "A"){
      if (apps.classList.contains("fit-content")) {
        apps.classList.remove("fit-content");
      } else {
        apps.classList.add("fit-content");
      }
    } 
  });
}
keyPresses();

/* gvebe;ldlsdcfsfsfsfm dsgs gsgsf sjfndfksvxfv  g gsg sdggsg sgsdfad sdasd  ac a ndfjsdfjsdfjmf kf's
v dv'd a dsasvgg 
uyy h 
ug 6d dfrsd
f   dfg ddgffg */
