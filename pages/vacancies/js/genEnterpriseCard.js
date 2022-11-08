const enterpriseItems = document.getElementById("enterpriseItems");

const genEnterprise = (enterprise) => {
    //Generating Card
    const card = document.createElement("button")
    card.setAttribute("href", "#");
    card.classList.add("enterprise");

    //Generating Card Image
    const logoButton = document.createElement("a");
    logoButton.setAttribute("id", "imgBtn");
    card.appendChild(logoButton);

    //Generating Image
    const logoImg = document.createElement("img")
    logoImg.classList.add("enterprise__logo");
    logoImg.setAttribute("src", enterprise.logo);
    logoImg.setAttribute("alt", `${enterprise.nome} Logo`);
    logoButton.appendChild(logoImg);

    //Generating Vertical Line
    const verticalLine = document.createElement("div");
    verticalLine.classList.add("vertical-line");
    card.appendChild(verticalLine);

    //Generating Enterprise Info
    const entInfo = document.createElement("aside");
    entInfo.classList.add("enterprise__info");
    card.appendChild(entInfo);

    //Generating Enterprise Info - Name
    const entName = document.createElement("p");
    entName.classList.add("enterprise__name");
    entName.innerText = enterprise.name;
    entInfo.appendChild(entName);

    //Generating Enterprise Vacancies
    const entVacancies = document.createElement("div");
    entVacancies.classList.add("enterprise__vacancies");
    entInfo.appendChild(entVacancies);

    //Generating Enterprise Vacancies Text
    const vacText = document.createElement("span");
    vacText.classList.add("vacancies__text");
    vacText.innerText = "Vagas:";
    entVacancies.appendChild(vacText);

    //Generating Enterprise Vacancies Info
    const vacInfo = document.createElement("div");
    vacInfo.classList.add("vacancies__info");
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

    const vacInfoDone = document.createElement("a");
    vacInfoDone.setAttribute("id", type[status].id);
    vacInfoDone.classList.add(type[status].class);
    vacInfoDone.innerHTML = enterprise.vacancies.filter(vacancy => {
        if (vacancy.status == status) return vacancy;
    }).length;

    vacInfoDone.addEventListener("click", () => {
        resetCheckboxes();
        checkboxes[status].checked = true;
    });

    return vacInfoDone;
}

/* 
<button href="#" class="enterprise">
    <a id="imgBtn">
        <img class="enterprise__logo" src=`${enterprise.logo}`
            alt=`${enterprise.name} Logo`>
    </a>
    <div class="vertical-line"></div>
    <aside class="enterprise__info">
        <p class="enterprise__name">`${enterprise.name}`</p>
        <div class="enterprise__vacancies">
            <span class="vacancies__text">vagas:</span>
            <div class="vacancies__info">
                <a id="openBtn" class="done">`${enterprise.vacancies.filter(vacancy => {
        if (vacancy.status == "done") return vacancy;
    }).length;}`</a>
                <a id="progressBtn" class="yellow">`${enterprise.vacancies.filter(vacancy => {
        if (vacancy.status == "inprogress") return vacancy;
    }).length;}`</a>
                <a id="finishedBtn" class="red">`${enterprise.vacancies.filter(vacancy => {
        if (vacancy.status == "undone") return vacancy;
    }).length;}`</a>
            </div>
        </div>
    </aside>
</button> 
*/