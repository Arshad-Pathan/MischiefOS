// time function
function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);
// time end

// variables
var biggestIndex = 1;

var topBar = document.querySelector("#top")

var selectedIcon = undefined


// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
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

  closeBtn.addEventListener("click", function() {
      closeWindow(screen);
  });
  openBtn.addEventListener("click", function() {
      openWindow(screen);
  });

  openBtn.addEventListener("click", function () {
    handleIconTap(openBtn);
  });

  addWindowTapHandling(screen)
  dragElement(screen)
}

initializeWindow("intro")
initializeWindow("setting")
initializeWindow("journal")

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


var wallpaper = [
  {wall1: "url('images/wall1.jpg')", 
    wall2: "url('images/wall2.jpg')",
    wall3: "url('images/wall3.jpg')",
    wall4: "url('images/wall4.jpg')"
  },
  {l1: "url('images/l1.gif')",
    l2: "url('images/l2.gif')",
    l3: "url('images/l3.gif')",
    l4: "url('images/l4.gif')"
  },
  {},
  {Solid1: "url('images/S1.jpg')",
    Solid2: "url('images/S2.jpg')",
    Solid3: "url('images/S3.jpg')",
    Solid4: "url('images/S4.jpg')"
  }
];
function loadWallpapers(){
  var styles = document.querySelectorAll(".style");
  styles.forEach("style",function() {
    style.addEventListener("click", function() {
      style.classList.add("set_active");
    });
  });
}
loadWallpapers();
function wallPreview(){
  var wallP = document.getElementById("wallP");
  var set = document.getElementById("s"+idNo);
  // wallP.style.backgroundImage = wallpaper[0].wall1;
  if (set) {
    if (set.id === "s1") {
      wallP.style.backgroundImage = wallpaper[0].wall1;
    } else if (set.id === "s2") {
      wallP.style.backgroundImage = wallpaper[1].l1;
    } else if (set.id === "s3") {
      wallP.style.backgroundImage = wallpaper[2].custom;
    } else if (set.id === "s4") {
      wallP.style.backgroundImage = wallpaper[3].Solid1;
    }
}
function customWallPaper(){
  var customInput = document.getElementById("customImage");
  var wallpaperPre = document.getElementById("wallpaperPre");
  customInput.addEventListener("change", function() {
    const file = this.files[0];
    if (!file) return;

    wallpaperPre.src = URL.createObjectURL(file);
    wallpaperPre.style.display = "block";
  }); 
} 

function initWallpaper() {
  var styles = document.querySelectorAll(".style");
  styles.forEach(function(style) {
    style[0].addEventListener("click", function() {
      var idNo = this.id.slice(1); // Get the number from the id (e.g., "s1" -> "1")
      wallPreview(idNo);
    });
}

customWallPaper();