const vacancyItems = document.getElementById("vacancyItems");

const genVacancy = (entName, vacancy) => {
    //Generating Card
    const card = document.createElement("div")
    card.classList.add("vacancy");

    const mainInfo = document.createElement("div")
    mainInfo.classList.add("main__info");
    card.appendChild(mainInfo);

    const primaryInfo = document.createElement("div")
    primaryInfo.classList.add("primary__info");
    mainInfo.appendChild(primaryInfo);

    const infoLine = document.createElement("div")
    infoLine.classList.add("info__line");
    primaryInfo.appendChild(infoLine);


    const vacInfo = document.createElement("div")
    vacInfo.classList.add("vacancy__info");
    primaryInfo.appendChild(vacInfo);

    const vacName = document.createElement("p")
    vacName.classList.add("vacancy__name");
    vacName.innerText = vacancy.name;
    vacInfo.appendChild(vacName);

    const vacEnterprise = document.createElement("p")
    vacEnterprise.classList.add("vacancy__enterprise");
    vacEnterprise.innerText = entName;
    vacInfo.appendChild(vacEnterprise);

    const vacStatus = document.createElement("p")
    vacStatus.classList.add("vacancy__status");
    vacStatus.innerText = vacancy.statusDescription;
    mainInfo.appendChild(vacStatus);

    const dropdownIcon = document.createElement("img");
    dropdownIcon.classList.add("dropdown__icon");
    dropdownIcon.setAttribute("src", "/src/images/dropdownIcon.svg");
    dropdownIcon.setAttribute("alt", "Dropdown SVG Icon");
    mainInfo.appendChild(dropdownIcon);




    handleStatus([vacStatus, infoLine], vacancy.status);

    return card;
};

const handleStatus = (elements, status) => {
    switch (status) {
        case "done": {
            elements.forEach(element => element.classList.add("green"));
            break;
        }
        case "inprogress": {
            elements.forEach(element => element.classList.add("yellow"));
            break;
        }
        case "undone": {
            elements.forEach(element => element.classList.add("red"));
            break;
        }
        default: {
            console.log("ERROR: Vacancy Status Missing!")
            break;
        }
    }
}

/* 
<div class="vacancy">
    <div class="main__info">
        <div class="primary__info">
            <div class="info__line red"></div>
            <div class="vacancy__info">
                <p class="vacancy__name">Desenvolvedor Java</p>
                <p class="vacancy__enterprise">Lojas Riachuelo</p>
            </div>
        </div>
        <p class="vacancy__status red">Período de Entrevistas</p>
        <svg class="dropdown__icon" id="dropdownIcon" width="16" height="16" viewBox="0 0 32 21"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L15.5 18L28 3" stroke="black" stroke-width="5" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </div>
    <div class="extended__info hidden">
        <div class="links">
            <a href="" class="link">↗ Lista de Candidatos</a>
            <a href="" class="link">↗ Histórico de Atualizações</a>
        </div>
        <ul class="dates">
            <li>
                <div class="date-wrapper">
                    <span class="title">Data de Início</span>
                    <span class="date">09/09/2022</span>
                </div>
                <div class="description">
                    <span>Iniciado por Gustavo Letério</span>
                </div>
            </li>
            <li>
                <div class="date-wrapper">
                    <span class="title">Última Atualização</span>
                    <span class="date">09/09/2022</span>
                </div>
                <div class="description">
                    <span>Fechamento da Vaga</span>
                </div>
            </li>
            <li>
                <div class="date-wrapper">
                    <span class="title">Data de Término</span>
                    <span class="date">09/09/2022</span>
                </div>
                <div class="description">
                    <span>"Inicío Incorreto" - Gustavo Letério</span>
                </div>
            </li>
        </ul>
        </table>
    </div>
</div>
*/