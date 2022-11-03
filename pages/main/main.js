//Schedule Unstick Table Header
const schedule = document.getElementById("schedule");
const head = document.getElementById("head");

schedule.addEventListener("scroll", () => {
  if (schedule.scrollTop > 0)
    head.classList.add("unstick");
  else
    head.classList.remove("unstick");
});


//Info Button Handling
const infoButton = document.getElementById("info");
const infoCard = document.getElementById("infoCard");

infoButton.addEventListener("click", () => {
  if (infoCard.classList[1] != "open") {
    setTimeout(() => {
      infoCard.classList.add("open");
    }, 10);
  }
});

document.body.addEventListener("click", () => {
  infoCard.classList.remove("open");
});