const schedule = document.getElementById("schedule");
const head = document.getElementById("head");

schedule.addEventListener("scroll", () => {
    console.log(schedule.scrollTop)
  if (schedule.scrollTop > 0) {
    head.classList.add("unstick");
}else{
    head.classList.remove("unstick");
}
});


const infoButton = document.getElementById("info");
const infoCard = document.getElementById("infoCard");

infoButton.addEventListener("click", () => {
  infoCard.classList.toggle("open");
});

infoCard.addEventListener("selectionchange", () => {
  infoCard.classList.remove("open");
});

