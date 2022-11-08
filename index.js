//Sidebar - sb
const sidebar = document.getElementById("sidebar");
const sbButton = sidebar.children[0];
const sbLinks = Object.values(document.getElementById("sbLinks").getElementsByTagName("a"));

//SB Inner Dropdown
const sbDropdownTrigger = document.getElementById("sbDropdownTrigger");
const sbDropdownIcon = document.getElementById("dropdownIcon");
const sbDropdownContent = document.getElementById("sbDropdownContent");

//Header - hd
const header = document.getElementById("header");
const hdTrigger = document.getElementById("hdDropdownTrigger");
const hdDropdownContent = document.getElementById("hdDropdownContent");
const hdLinks = Object.values(hdDropdownContent.getElementsByTagName("a"));


const iframe = document.getElementById("iframe");

hdLinks.forEach(link => {
    link.addEventListener("click", () => {
    hdDropdownContent.classList.remove("displayed");
  });
});

sbLinks.forEach((link, i) => {
  if (i > 0)
    link.addEventListener("click", () => {
      closeSidebarDropdown();
      closeSidebar();
    });
});

//Global Event
window.addEventListener('click', function (e) {
  //Sidebar Pseudo Event
  if (sbButton.contains(e.target)) {
    toggleSidebar();
  } else if (!sidebar.contains(e.target)) {
    closeSidebar();
  }

  //Sidebar Inner Dropdown Pseudo Event
  if (sbDropdownTrigger.contains(e.target)) {
    toggleSidebarDropdown();
  } else {
    closeSidebarDropdown();
  }

  //Header Dropdown Pseudo Event
  if (hdTrigger.contains(e.target)) {
    hdDropdownContent.classList.toggle("displayed");
  } else if (!header.contains(e.target)) {
    hdDropdownContent.classList.remove("displayed");
  }
});

//The window Event can't capture the iframe onClick, the solution to close everything is creating a new Event.
//For each Iframe's Reload, a new contentWindow Event Must be created, because the iframe forgot it event.
iframe.addEventListener("load", () => {
  iframe.contentWindow.document.body.addEventListener("click", () => {
    hdDropdownContent.classList.remove("displayed");
    closeSidebar();
  });
});

const toggleSidebar = () => {
  sbDropdownIcon.classList.toggle("displayed");
  sbButton.classList.toggle('opened');
  sidebar.classList.toggle("open");
}

const closeSidebar = () => {
  closeSidebarDropdown();
  sbDropdownIcon.classList.remove("displayed");
  sbButton.classList.remove('opened');
  sidebar.classList.remove("open");
}

const toggleSidebarDropdown = () => {
  sbDropdownContent.classList.toggle("open");
  sbDropdownIcon.classList.toggle("open");
}

const closeSidebarDropdown = () => {
  sbDropdownContent.classList.remove("open");
  sbDropdownIcon.classList.remove("open");
}