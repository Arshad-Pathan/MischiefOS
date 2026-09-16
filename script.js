// time function
function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);
// time end

var biggestIndex = 1;

var topBar = document.querySelector("#top")

var selectedIcon = undefined





// //intro window
// var introScreen = document.querySelector("#intro")
// //open - close scripts
// var windowScreenClose = document.querySelector("#introclose")
// var windowScreenOpen = document.querySelector("#introopen")


// //journal window
// var journalScreen = document.querySelector("#journal")
// var journalScreenClose = document.querySelector("#journalclose")
// var journalScreenOpen = document.querySelector("#journalopen")


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



// // Make the DIV element draggable:
// dragElement(document.getElementById("intro"));

// dragElement(document.getElementById("journal"))



// //intro openclose fns
// windowScreenClose.addEventListener("click", function() {
//     closeWindow(introScreen);
// });
// windowScreenOpen.addEventListener("click", function() {
//     openWindow(introScreen);
// });


// //journal openclose fns
// journalScreenClose.addEventListener("click", function() {
//     closeWindow(journalScreen);
// });
// journalScreenOpen.addEventListener("click", function() {
//     openWindow(journalScreen);
// });





// open app
function selectIcon(element) {
  document.querySelectorAll(".selected").forEach(function(element){
    element.classList.remove("selected");
  });
  element.classList.add("selected");
  selectedIcon = element
} 
function deselectIcon(element) {
  element.classList.remove("selected");
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

// addWindowTapHandling(document.getElementById("intro"));
// addWindowTapHandling(document.getElementById("journal"));

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
initializeWindow("journal")

var journalData = [
  {
    leftpage: "hii",
    rightpage: "good morning"
  }
];
function enableEntry(b1,b2){
  
  
  var textAreas = document.querySelectorAll(".part");
  var saveBtn = document.getElementById(b1+"Btn");
  var editBtn = document.getElementById(b2+"Btn");
  var leftTA = document.getElementById("leftPage");
  var rightTA = document.getElementById("rightPage");

  var latestEntry = journalData[journalData.length - 1];
  
  editBtn.addEventListener('click', function(){
    textAreas.forEach(area => {
    area.innerHTML = 
      `
      <textarea name="journalmd" class="md_content" id="mdContent" rows=30 placeholder="#Enter Date - then Your Name and then start writing your thoughts"></textarea>
      `;
    }); 
    saveBtn.style.display = "flex";
    editBtn.classList.add("closeBtn");
  });
  saveBtn.addEventListener('click', function(){
    textAreas.forEach(area => {
      area.innerHTML = ``;
    });
    journalData.push({
      leftpage=leftTA.value,
      rightpage=rightTA.value
    });
    saveBtn.style.display = "none";
    leftTA.innerHTML = convertMarkdown(latestEntry.leftpage);
    rightTA.innerHTML = convertMarkdown(latestEntry.rightpage);
  });
}

enableEntry("save","edit")


/*
function enableEntry(){
  var saveBtn = document.getElementById("saveBtn");
  var editBtn = document.getElementById("editBtn");
  var parts = document.querySelectorAll(".part");
  
  parts.forEach(part => {
    part.innerHTML = 
      `
      <textarea name="journalmd" class="md_content" id="mdContent" fixed placeholder="#Enter Date - then Your Name and then start writing your thoughts"></textarea>
      `;
  });
  saveBtn.style.display = "flex";
  saveBtn.addEventListener("mousedown", function(){
    saveBtn.style.display = "none";
  });
}
enableEntry()*/

