/*APAGAR ISSO */
{
    const vacancy = document.querySelector(".vacancy")
    vacancy.addEventListener("click", () => {
        const vacExt = vacancy.parentNode.querySelector(".extended__info");
        const dropIcon = vacancy.querySelector(".dropdown__icon");
        vacExt.classList.toggle("open");
        dropIcon.classList.toggle("open");
    });
}

const checkboxes = {
    done: document.getElementById("done"),
    inprogress: document.getElementById("inprogress"),
    undone: document.getElementById("undone")
}

const resetCheckboxes = () => {
    Object.values(checkboxes).forEach(checkbox => {
        checkbox.checked = false;
    });
}

Object.values(checkboxes).forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        reloadVacancies();
        if (checkboxes.done.checked &&
            checkboxes.inprogress.checked &&
            checkboxes.undone.checked)
            resetCheckboxes();
    })
});

const reloadEnterprises = () => {
    fetch("/data.json").then(res => res.json()).then(data => {
        const results = document.getElementById("enterpriseResults");
        var listLength = 0;
        data.enterprises.forEach(enterprise => {
            appendEntCard(enterprise);
        });
        results.innerHTML = `${listLength} Resultados`
    });
}
reloadEnterprises();

const reloadVacancies = () => {
    clearVacancyItems();
    fetch("/data.json").then(res => res.json()).then(data => {
        const enterprise = data.enterprises.filter(enterprise => enterprise.name == localStorage.getItem("enterprise"))[0];
        var listLength = 0;
        const results = document.getElementById("vacancyResults");

        enterprise.vacancies.forEach(vacancy => {
            //Filter and append by status
            if (localStorage.getItem('enterprise') == enterprise.name) {
                if (!checkboxes.done.checked && !checkboxes.inprogress.checked && !checkboxes.undone.checked) {
                    appendVacCard(enterprise.name, vacancy);
                    listLength++;
                } else {
                    if (checkboxes.done.checked && vacancy.status == "done") {
                        appendVacCard(enterprise.name, vacancy);
                        listLength++;
                    }
                    if (checkboxes.inprogress.checked && vacancy.status == "inprogress") {
                        appendVacCard(enterprise.name, vacancy);
                        listLength++;
                    }
                    if (checkboxes.undone.checked && vacancy.status == "undone") {
                        appendVacCard(enterprise.name, vacancy);
                        listLength++;
                    }
                }
            }
        });
        results.innerHTML = `${listLength} Resultados`
    });
}

const appendEntCard = (enterprise) => {
    const entCard = enterpriseItems.appendChild(genEnterprise(enterprise));
    entCard.addEventListener("click", e => {
        localStorage.setItem('enterprise', entCard.querySelector(".enterprise__name").innerText);
        reloadVacancies();
        if (e.target != entCard.querySelector(".green") &&
            e.target != entCard.querySelector(".yellow") &&
            e.target != entCard.querySelector(".red")) {
            resetCheckboxes();
        }
    });
}

const appendVacCard = (entName, vacancy) => {
    const vacCard = vacancyItems.appendChild(genVacancy(entName, vacancy));
    vacCard.addEventListener("click", () => {
        console.log(vacCard)
        const vacExt = vacCard.querySelector(".extended__info");
        const dropIcon = vacCard.querySelector(".dropdown__icon");
        vacExt.classList.toggle("open");
        dropIcon.classList.toggle("open");
    });
}

const clearVacancyItems = () => {
    Object.values(vacancyItems.children).forEach(node => {
        node.remove();
    });
}


if (localStorage.getItem('enterprise')) {
    reloadVacancies();
}