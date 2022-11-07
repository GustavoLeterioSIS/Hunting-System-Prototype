
//Sidebar - sb
const sidebar = document.getElementById("sidebar");
const sbButton = sidebar.children[0];

//SB Inner Dropdown
const sbDropdownTrigger = document.getElementById("sbDropdownTrigger");
const sbDropdownIcon = document.getElementById("dropdownIcon");
const sbDropdownContent = document.getElementById("sbDropdownContent");

//Header - hd
const header = document.getElementById("header");
const hdTrigger = document.getElementById("hdDropdownTrigger");
const hdDropdownContent = document.getElementById("hdDropdownContent");

const iframe = document.getElementById("iframe");


//Global Event
window.addEventListener('click', function (e) {
  //Sidebar Pseudo Event
  if (sbButton.contains(e.target)) {
    openSidebar();
  } else if (!sidebar.contains(e.target)) {
    closeSidebar();
  }

  //Sidebar Inner Dropdown Pseudo Event
  if (sbDropdownTrigger.contains(e.target)) {
    sbDropdownContent.classList.toggle("open");
    sbDropdownIcon.classList.toggle("open");
  }

  //Header Dropdown Pseudo Event
  if (hdTrigger.contains(e.target)) {
    setTimeout(() => {
      hdDropdownContent.classList.toggle("displayed");
    }, 10);
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

const openSidebar = () => {
  sbDropdownIcon.classList.toggle("displayed");
  sbButton.classList.add('opened');
  sidebar.classList.toggle("open");
}

const closeSidebar = () => {
  resetSidebarDropdown();
  sbDropdownIcon.classList.remove("displayed");
  sbButton.classList.remove('opened');
  sidebar.classList.remove("open");
}

const resetSidebarDropdown = () => {
  sbDropdownContent.classList.remove("open");
  sbDropdownIcon.classList.remove("open");
}