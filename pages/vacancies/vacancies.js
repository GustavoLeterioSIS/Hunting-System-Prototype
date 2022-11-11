const reloadEnterprises = () => {
    fetch("/data.json").then(res => res.json()).then(data => {
        const sortedEnterprises = data.enterprises.sort((a, b) => (a.name < b.name ? -1 : 1));
        sortedEnterprises.forEach(enterprise => {
            appendEntCard(enterprise);
        });
        showSearchResult("enterprise");
    });
}

const reloadVacancies = () => {
    fetch("/data.json").then(res => res.json()).then(data => {
        var enterprise = data.enterprises.filter(enterprise => enterprise.name == localStorage.getItem("enterprise"))[0];

        const sortVacancies = () => {
            const doneVacancies = [];
            const inprogressVacancies = [];
            const undoneVacancies = [];

            //Dividing by status
            enterprise.vacancies.forEach(vacancy => {
                if (vacancy.status == "done") doneVacancies.push(vacancy);
                if (vacancy.status == "inprogress") inprogressVacancies.push(vacancy);
                if (vacancy.status == "undone") undoneVacancies.push(vacancy);
            });


            //Sorting by Date            
            doneVacancies.sort((a, b) => {
                return new Date(a.updates[a.updates.length - 1].date) -new Date(b.updates[b.updates.length - 1].date);
            })

            inprogressVacancies.sort((a, b) => {
                return new Date(a.updates[a.updates.length - 1].date) - new Date(b.updates[b.updates.length - 1].date);
            });

            undoneVacancies.sort((a, b) => {
                return new Date(a.updates[0].date) - new Date(b.updates[0].date);
            });

            return [...undoneVacancies, ...inprogressVacancies, ...doneVacancies];
        }

        clearVacancyItems();

        sortVacancies().forEach(vacancy => {
            //Function to generate by checkbox
            const appendVacByFilter = (filter) => {
                if (checkboxes[filter].checked && vacancy.status == filter) {
                    appendVacCard(enterprise.name, vacancy);
                }
            }

            if (localStorage.getItem('enterprise') == enterprise.name) {
                if (!checkboxes.done.checked && !checkboxes.inprogress.checked && !checkboxes.undone.checked) {
                    appendVacCard(enterprise.name, vacancy);
                } else {
                    //Clause to generate by checkbox
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