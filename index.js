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

header.addEventListener("click", e => {
  e.stopPropagation();
  closeSidebar();
  hdDropdownContent.classList.remove("displayed");
})

sidebar.addEventListener("click", e => {
  hdDropdownContent.classList.remove("displayed");
});

//For each Iframe's Reload, a new contentWindow Event Must be created, because the iframe forgot it event.
iframe.addEventListener("load", () => {
  iframe.contentWindow.document.body.addEventListener("click", () => {
    hdDropdownContent.classList.remove("displayed");
    closeSidebar();
  });
});

sbButton.addEventListener("click", () => {
  closeSidebarDropdown();
  toggleSidebar();
});

sbDropdownTrigger.addEventListener("click", () => {
  toggleSidebarDropdown();
});

sbLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeSidebar();
  });
});

hdTrigger.addEventListener("click", e => {
  e.stopPropagation();
  closeSidebar();
  hdDropdownContent.classList.toggle("displayed");
});


hdLinks.forEach(link => {
  link.addEventListener("click", () => {
    hdDropdownContent.classList.remove("displayed");
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