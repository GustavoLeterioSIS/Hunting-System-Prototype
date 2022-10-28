//Sidebar Handling
var sidebarButton = document.getElementById("sidebar").children[0];
sidebarButton.addEventListener("click", () => {
  resetClasses();
  sideIcon.classList.toggle("displayed");
  sbButtonHandle();
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
var headerTrigger = document.getElementById("hdDropdownTrigger");
const hdDropdownContent = document.getElementById("hdDropdownContent");

headerTrigger.addEventListener("click", () => {
  hdDropdownContent.classList.toggle("displayed");
});