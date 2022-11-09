const enterpriseItems = document.getElementById("enterpriseItems");

const appendEntCard = (enterprise) => {
    const entCard = enterpriseItems.appendChild(genEnterprise(enterprise));
    entCard.addEventListener("click", e => {
        e.stopPropagation();
        localStorage.setItem('enterprise', entCard.querySelector(".enterprise__name").innerText);
        reloadVacancies();
        resetCheckboxes();
    });
}

const genEnterprise = (enterprise) => {
    //Generating Card
    const card = genTag("button", "enterprise", {
        name: "href",
        content: "#"
    });

    //Generating Card Image
    const logoButton = genTag("a", null, {
        name: "id",
        content: "imgBtn"
    });
    card.appendChild(logoButton);

    //Generating Image
    const logoImg = genTag("img", "enterprise__logo", [{
        name: "src",
        content: enterprise.logo
    }, {
        name: "alt",
        content: `${enterprise.nome} Logo`
    }]);
    logoButton.appendChild(logoImg);

    //Generating Vertical Line
    const verticalLine = genTag("div", "vertical-line");
    card.appendChild(verticalLine);

    //Generating Enterprise Info
    const entInfo = genTag("aside", "enterprise__info");
    card.appendChild(entInfo);

    //Generating Enterprise Info - Name
    const entName = genTag("p", "enterprise__name", null, enterprise.name);
    entInfo.appendChild(entName);

    //Generating Enterprise Vacancies
    const entVacancies = genTag("div", "enterprise__vacancies");
    entInfo.appendChild(entVacancies);

    //Generating Enterprise Vacancies Text
    const vacText = genTag("span", "vacancies__text", null, "Vagas:");
    entVacancies.appendChild(vacText);

    //Generating Enterprise Vacancies Info
    const vacInfo = genTag("div", "vacancies__info");
    entVacancies.appendChild(vacInfo);

    vacInfo.appendChild(genVacInfo("done", enterprise));
    vacInfo.appendChild(genVacInfo("inprogress", enterprise));
    vacInfo.appendChild(genVacInfo("undone", enterprise));

    return card;
};


//Generate Vacancy Amount by Status
const genVacInfo = (status, enterprise) => {
    const type = {
        done: {
            id: "openBtn",
            class: "green"
        },
        inprogress: {
            id: "progressBtn",
            class: "yellow"
        },
        undone: {
            id: "finishedBtn",
            class: "red"
        }
    }

    const vacInfoButton = genTag("a", type[status].class, {
            name: "id", content: type[status].id
        },
        enterprise.vacancies.filter(vacancy => {
            if (vacancy.status == status) return vacancy;
        }).length);
    vacInfoButton.addEventListener("click", e => {
        e.stopPropagation();
        reloadVacancies();
        resetCheckboxes();
        checkboxes[status].checked = true;
    });

    return vacInfoButton;
}