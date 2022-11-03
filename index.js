//Sidebar Handling
var sidebar = document.getElementById("sidebar");
var sidebarButton = sidebar.children[0];

sidebarButton.addEventListener("click", () => {
  resetClasses();
  sbButtonHandle();
  sideIcon.classList.toggle("displayed");
  sidebar.classList.toggle("open");
});

const sbButtonHandle = () => {
  sidebarButton.classList.toggle('opened');
  sidebarButton.setAttribute('aria-expanded', sidebarButton.classList.contains('opened'));
}

const resetClasses = () => {
  sbDropdownContent.classList.remove("open");
  sideIcon.classList.remove("open");
}

//Sidebar Intern Dropdown Menu Handling
const sidebarDropdownTrigger = document.getElementById("sbDropdownTrigger");
const sideIcon = document.getElementById("dropdownIcon");
const sbDropdownContent = document.getElementById("sbDropdownContent");

sidebarDropdownTrigger.addEventListener("click", () => {
  sbDropdownContent.classList.toggle("open");
  sideIcon.classList.toggle("open");
});

//Header Dropdown Handling
var header = document.getElementById("header");
var headerTrigger = document.getElementById("hdDropdownTrigger");
const hdDropdownContent = document.getElementById("hdDropdownContent");

headerTrigger.addEventListener("click", () => {
    setTimeout(() => {
      hdDropdownContent.classList.add("displayed");
    }, 10);
});

//Dropdown Closing System

const iframe = document.getElementById("iframe").contentWindow.document.body;

//DD sidebar closing
header.addEventListener("click", () => {
  if (sidebar.classList[1] == "open") {
    resetClasses();
    sideIcon.classList.remove("displayed");
    sbButtonHandle();
    sidebar.classList.remove("open");
  }
});

//DD Header closing
sidebar.addEventListener("click", () => {
  hdDropdownContent.classList.remove("displayed");
});

//Iframe both close event
iframe.addEventListener("click", () => {
  hdDropdownContent.classList.remove("displayed");
  if (sidebar.classList[1] == "open") {
    resetClasses();
    sideIcon.classList.remove("displayed");
    sbButtonHandle();
    sidebar.classList.remove("open");
  }
});