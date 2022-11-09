const reloadEnterprises = () => {
    fetch("/data.json").then(res => res.json()).then(data => {
        const results = document.getElementById("enterpriseResults");
        var listLength = 0;
        data.enterprises.forEach(enterprise => {
            appendEntCard(enterprise);
            listLength++;
        });
        results.innerHTML = `${listLength} Resultados`
    });
}

const reloadVacancies = () => {
    fetch("/data.json").then(res => res.json()).then(data => {
        const enterprise = data.enterprises.filter(enterprise => enterprise.name == localStorage.getItem("enterprise"))[0];
        var listLength = 0;

        clearVacancyItems();

        enterprise.vacancies.forEach(vacancy => {
            const appendVacByFilter = (filter) => {
                if (checkboxes[filter].checked && vacancy.status == filter) {
                    appendVacCard(enterprise.name, vacancy);
                    listLength++;
                }
            }

            if (localStorage.getItem('enterprise') == enterprise.name) {
                if (!checkboxes.done.checked && !checkboxes.inprogress.checked && !checkboxes.undone.checked) {
                    appendVacCard(enterprise.name, vacancy);
                    listLength++;
                } else {
                    appendVacByFilter("done");
                    appendVacByFilter("inprogress");
                    appendVacByFilter("undone");
                }
            }
        });
        //Show Search Result
        const results = document.getElementById("vacancyResults");
        results.innerHTML = `${listLength} Resultados`
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

if (localStorage.getItem('enterprise')) {
    reloadVacancies();
}
reloadEnterprises();

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



