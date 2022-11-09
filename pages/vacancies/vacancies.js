const reloadEnterprises = () => {
    fetch("/data.json").then(res => res.json()).then(data => {
        data.enterprises.forEach(enterprise => {
            appendEntCard(enterprise);
        });
        showSearchResult("enterprise");
    });
}

const reloadVacancies = () => {
    fetch("/data.json").then(res => res.json()).then(data => {
        const enterprise = data.enterprises.filter(enterprise => enterprise.name == localStorage.getItem("enterprise"))[0];

        //Sort Vacancies
        enterprise.vacancies.sort((a, b) => (a.status > b.status ? -1 : 1))

        clearVacancyItems();

        enterprise.vacancies.forEach(vacancy => {
            const appendVacByFilter = (filter) => {
                if (checkboxes[filter].checked && vacancy.status == filter) {
                    appendVacCard(enterprise.name, vacancy);
                }
            }

            if (localStorage.getItem('enterprise') == enterprise.name) {
                if (!checkboxes.done.checked && !checkboxes.inprogress.checked && !checkboxes.undone.checked) {
                    appendVacCard(enterprise.name, vacancy);
                } else {
                    appendVacByFilter("done");
                    appendVacByFilter("inprogress");
                    appendVacByFilter("undone");
                }
            }
            inputFilter(vacInput, "vacancy");
            showSearchResult("vacancy");
        });
    });
}



const clearVacancyItems = () => {
    Object.values(vacancyItems.children).forEach(node => {
        node.remove();
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

const setAmbient = () => {
    reloadEnterprises();
    if (localStorage.getItem('enterprise')) {
        reloadVacancies();
        vacInput.setAttribute("placeholder", `Vagas ${localStorage.getItem("enterprise")}`);
    }
    if (localStorage.getItem("checkbox")) {
        switch (localStorage.getItem("checkbox")) {
            case "done": {
                checkboxes.done.checked = true;
                break;
            }
            case "inprogress": {
                checkboxes.inprogress.checked = true;
                break;
            }
            case "undone": {
                checkboxes.undone.checked = true;
                break;
            }
        }
        localStorage.removeItem("checkbox");
    }
}
setAmbient();

const genTag = (tagName, classNames, attributes, innerText) => {
    const tag = document.createElement(tagName);
    if (classNames) {
        if (!Array.isArray(classNames))
            tag.classList.add(classNames);
        else
            classNames.forEach(className => {
                tag.classList.add(className);
            });
    }
    if (attributes) {
        if (!Array.isArray(attributes))
            tag.setAttribute(attributes.name, attributes.content);
        else
            attributes.forEach(attribute => {
                tag.setAttribute(attribute.name, attribute.content);
            });
    }
    if (innerText) tag.innerText = innerText;
    return tag;
}