//Sidebar Class Handling

const sidebar = document.getElementById("sidebar");
var sidebarButton = {
  tag: document.getElementById("sidebar").children[0],
  toggle: false,
};

sidebarButton.tag.addEventListener("click", () => {
    sidebarButton.tag.classList.toggle('opened');
    sidebarButton.tag.setAttribute('aria-expanded', sidebarButton.tag.classList.contains('opened'))
  sidebar.classList.toggle("open")
    sidebarDropdownTrigger.sideIcon.classList.toggle("displayed");
});

//Sidebar Intern Dropdown Menu Class Handling
var sidebarDropdownTrigger = {
  tag: document.getElementById("sbDropdownTrigger"),
  sideIcon: document.getElementById("dropdownIcon"),
};
const sbDropdownContent = document.getElementById("sbDropdownContent");

sidebarDropdownTrigger.tag.addEventListener("click", () => {
    sbDropdownContent.classList.toggle("open");
    sidebarDropdownTrigger.sideIcon.classList.toggle("open");
});

//Header Dropdown Class Handling
var headerTrigger = document.getElementById("hdDropdownTrigger");
const hdDropdownContent = document.getElementById("hdDropdownContent");

headerTrigger.addEventListener("click", () => {
    hdDropdownContent.classList.toggle("displayed")
});
