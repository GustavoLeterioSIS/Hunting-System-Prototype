const vacMain = document.querySelectorAll(".main__info")

vacMain.forEach((vacancy) => {
    vacancy.addEventListener("click", () => {
        const vacExt = vacancy.parentNode.querySelector(".extended__info");
        const dropIcon = vacancy.querySelector(".dropdown__icon");
        vacExt.classList.toggle("open");
        dropIcon.classList.toggle("open");
    });
});