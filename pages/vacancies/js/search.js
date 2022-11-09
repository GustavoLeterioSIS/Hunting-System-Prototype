const entInput = document.getElementById("searchEnterprise");
entInput.addEventListener("input", () => {
    inputFilter(entInput, "enterprise");
});


const vacInput = document.getElementById("searchVacancy");
vacInput.addEventListener("input", () => {
    inputFilter(vacInput, "vacancy");
});

const inputFilter = (input, tableType) => {
    const items = document.querySelectorAll(`.${tableType}`);
    if (input.value.length != 0) {
        items.forEach(item => {
            const name = item.querySelector(`.${tableType}__info`).querySelector(`.${tableType}__name`).textContent;
            const reg = new RegExp(input.value, "i");
            if (!reg.test(name)) {
                item.classList.add("hidden");
            } else {
                item.classList.remove("hidden");
            }
            showSearchResult("vacancy");
        });
    } else {
        items.forEach(item => {
            item.classList.remove("hidden");
        });
    }
}