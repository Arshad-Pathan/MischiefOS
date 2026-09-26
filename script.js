// time function
function updateTime() {
    var currentTime = new Date()
    var time=currentTime.toLocaleTimeString();
    var date=currentTime.toLocaleDateString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = `${time}<br>${date}`;
}
setInterval(updateTime, 1000);
// time end

// variables
var biggestIndex = 1;

var topBar = document.querySelector("#top")

var selectedIcon = undefined


var interval;
var countdown = 0;

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

  timeDrpdown.addEventListener("change", function(){

    // var time = Number(this.value);
    if(this.value==="CUSTOM"){
      csTimer.style.display="flex";
      dpTimer.style.display="none";
      tkTime();
    } else {
      csTimer.style.display="none";
      dpTimer.style.display="flex";
      countdown = this.value * 60;
      dpSelection();
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
// function dpSelection(){
//   var options=document.querySelectorAll(".opTime");
//   options.forEach(fuwnction(option){
//     option.addEventListener("click", function(){
//       countdown = option.value * 60;
//     });
//   });

//   const minutes = Math.floor((countdown % 60));
//   const seconds = countdown % 60;

//   var dpMinutes = document.getElementById("dpMinutes");
//   var dpSeconds = document.getElementById("dpSeconds");

//   dpMinutes.innerText = String(minutes).padStart(2,"0");
//   dpSeconds.innerText = String(seconds).padStart(2,"0");
// }
// // dpSelection();
// setInterval(dpSelection,1000);

  

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

    newTop = Math.max(0, Math.min(newTop, maxTop));
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

//close window fn
function closeWindow(element) {
    element.style.display = "none"
}
//open window fn
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;

}
//max window fn
function maxWindow(element) {
  if(!element.classList.contains("maximized")){
    element.dataset.originalWidth = element.style.width;
    element.dataset.originalHeight = element.style.height;
    element.dataset.originalPosition = element.style.position;
    element.dataset.originalTop = element.style.top;
    element.dataset.originalLeft = element.style.left;

    element.style.position = "relative";
    element.style.top = "0%";
    element.style.left = "0%";
    element.style.transform = "translate(0,0)";
    element.style.width = "100%";
    element.style.height = "100%";
    element.classList.add("maximized");
    if(startDragging){
      element.style.width = "80%";
      element.style.height = "80%";
    }
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


  closeBtn.addEventListener("click", function() {
      closeWindow(screen);
  });
  openBtn.addEventListener("click", function() {
      openWindow(screen);
  });
  
  openBtn.addEventListener("click", function () {
    handleIconTap(openBtn);
  });
  
  maxBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    maxWindow(screen);
  });

  addWindowTapHandling(screen)
  dragElement(screen)
}

initializeWindow("intro")
initializeWindow("journal")
initializeWindow("setting")
initializeWindow("terminal")

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
    journalEditor();
    saveBtn.style.display = "flex";
  });
  saveBtn.addEventListener('click', function(){
    journalEntry();
    saveBtn.style.display = "none";
  });
  prev.addEventListener('click', function(){
    prevPage();
  });
  next.addEventListener('click', function(){
    nextPage();
  });
}
initJournal()


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
      } else if (style.id === "s4") {
        sets[3].classList.add("set_active");
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
      swBtn.addEventListener("click",function(){
        document.body.style.backgroundImage=`url("${preWall.src}")`;
        localStorage.setItem("myWallP",preWall.src);
      });
    });
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
  // terminalC.scrollTop = terminalC.scrollHeight;
}
function runCmd(str){
  var myTag = str.indexOf(" ");
  var command = myTag === -1 ? str : str.substring(0,myTag);
  var arg = myTag === -1 ? "" : str.substring(myTag + 1);

  if (command === "echo"){
    displayCmd(arg);
  } else {
    displayCmd(`"${command}"`+ " command not found as internal or external command.")
  }
}
terminalCmd();













