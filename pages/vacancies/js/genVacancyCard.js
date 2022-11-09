const vacancyItems = document.getElementById("vacancyItems");

const appendVacCard = (entName, vacancy) => {
    const vacCard = vacancyItems.appendChild(genVacancy(entName, vacancy));
    vacCard.addEventListener("click", () => {
        const vacExt = vacCard.querySelector(".extended__info");
        const dropIcon = vacCard.querySelector(".dropdown__icon");
        vacExt.classList.toggle("open");
        dropIcon.classList.toggle("open");
    });
}

const genVacancy = (entName, vacancy) => {
    const card = genClosedCard(entName, vacancy);
    return genExtendedCard(card, vacancy);
};


const genClosedCard = (entName, vacancy) => {
    //Generating Card
    const card = genTag("div", "vacancy");

    const mainInfo = genTag("div", "main__info");
    card.appendChild(mainInfo);

    const primaryInfo = genTag("div", "primary__info");
    mainInfo.appendChild(primaryInfo);

    const infoLine = genTag("div", "info__line");
    primaryInfo.appendChild(infoLine);

    const vacInfo = genTag("div", "vacancy__info");
    primaryInfo.appendChild(vacInfo);

    const vacName = genTag("p", "vacancy__name", null, vacancy.name);
    vacInfo.appendChild(vacName);

    const vacEnterprise = genTag("p", "vacancy__enterprise", null, entName);
    vacInfo.appendChild(vacEnterprise);

    const vacStatus = genTag("p", "vacancy__status", null, vacancy.statusDescription);
    mainInfo.appendChild(vacStatus);

    const dropdownIcon = genTag("img", "dropdown__icon", [{
        name: "src",
        content: "/src/images/dropdownIcon.svg"
    }, {
        name: "alt",
        content: "Dropdown SVG Icon"
    }]);
    mainInfo.appendChild(dropdownIcon);

    handleStatus([vacStatus, infoLine], vacancy.status);

    return card;
}

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

const genExtendedCard = (card, vacancy) => {
    const extendedInfo = genTag("div", ["extended__info", "hidden"]);
    card.appendChild(extendedInfo);

    const links = genTag("div", "links");
    extendedInfo.appendChild(links);

    links.appendChild(genLink("↗ Lista de Candidatos", ""));
    links.appendChild(genLink("↗ Histórico de Atualizações", ""));

    const dates = genTag("ul", "dates");
    extendedInfo.appendChild(dates);

    dates.appendChild(createEventDescription("Data de Início", vacancy.updates[0]));
    dates.appendChild(createEventDescription("Última Atualização", vacancy.updates[vacancy.updates.length - 1]));
    if (vacancy.status == "done")
        dates.appendChild(createEventDescription("Data de Início", vacancy.updates[vacancy.updates.length - 1]));

    return card;
}

const createEventDescription = (titleText, update) => {
    const li = genTag("li");

    const dateWrapper = genTag("div", "date-wrapper");
    li.appendChild(dateWrapper);

    const title = genTag("span", "title", null, titleText);
    dateWrapper.appendChild(title);

    const date = genTag("span", "date", null, getDate(update.date));
    dateWrapper.appendChild(date);

    const descriptionWrapper = genTag("div", "description");
    li.appendChild(descriptionWrapper);

    const description = genTag("span", null, null, `"${update.description}" - ${update.user}`);
    descriptionWrapper.appendChild(description);

    return li;
}

const getDate = (string) => {
    const date = {
        day: string.split("T")[0].split("-")[2],
        month: string.split("T")[0].split("-")[1],
        year: string.split("T")[0].split("-")[0]
    }
    return `${date.day}/${date.month}/${date.year}`;
}

const genLink = (text, href) => {
    const link = genTag("a", "link", {
        name: "href",
        content: href
    }, text);
    return link;
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