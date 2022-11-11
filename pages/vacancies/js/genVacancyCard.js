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
        content: "/src/dropdownIcon.svg"
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
    const extendedInfo = genTag("div", "extended__info");
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
        dates.appendChild(createEventDescription("Data de Finalização", vacancy.updates[vacancy.updates.length - 1]));

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