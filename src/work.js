var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://MeezaanD.github.io/config/config.json");
        const data = yield response.json();
        return data.projects;
    });
}
const projectContainer = document.querySelector(".project-container");
const filterSelect = document.getElementById("filter");
function renderProjects(projects, filter) {
    if (!projectContainer)
        return;
    projectContainer.innerHTML = ""; // Clear existing projects
    const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.type === filter);
    filteredProjects.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("data-aos", index % 2 === 0 ? "fade-left" : "fade-right");
        row.setAttribute("data-aos-duration", "1000");
        const colImg = document.createElement("div");
        colImg.classList.add("col-work");
        const imgLink = document.createElement("a");
        imgLink.href = item.liveLink || "#";
        imgLink.target = item.liveLink ? "_blank" : "_self";
        if (!item.liveLink)
            imgLink.classList.add("inactive-link");
        const projectImg = document.createElement("img");
        projectImg.src = item.img;
        projectImg.alt = "project-img";
        projectImg.classList.add("project-img");
        imgLink.appendChild(projectImg);
        colImg.appendChild(imgLink);
        const colText = document.createElement("div");
        colText.classList.add("col-work");
        const projectTitle = document.createElement("h3");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = item.title;
        const techStack = document.createElement("p");
        techStack.classList.add("tech-stack-text");
        techStack.textContent = item.techStack;
        const projectTopList = document.createElement("ul");
        projectTopList.classList.add("project-top-list");
        const codeLi = document.createElement("li");
        const codeLink = document.createElement("a");
        codeLink.href = item.code || "#";
        codeLink.target = item.code ? "_blank" : "_self";
        codeLink.textContent = "Code ";
        codeLink.classList.add("links");
        if (!item.code)
            codeLink.classList.add("inactive-link");
        const codeIcon = document.createElement("i");
        codeIcon.classList.add("fab", "fa-github");
        codeLink.appendChild(codeIcon);
        codeLi.appendChild(codeLink);
        const liveLinkLi = document.createElement("li");
        const liveLinkA = document.createElement("a");
        liveLinkA.href = item.liveLink || "#";
        liveLinkA.target = item.liveLink ? "_blank" : "_self";
        liveLinkA.textContent = "Visit Site ";
        liveLinkA.classList.add("links");
        if (!item.liveLink)
            liveLinkA.classList.add("inactive-link");
        const liveLinkIcon = document.createElement("i");
        liveLinkIcon.classList.add("fas", "fa-external-link-alt");
        liveLinkA.appendChild(liveLinkIcon);
        liveLinkLi.appendChild(liveLinkA);
        projectTopList.appendChild(codeLi);
        projectTopList.appendChild(liveLinkLi);
        const projectText = document.createElement("p");
        projectText.classList.add("project-text");
        projectText.textContent = item.description;
        colText.appendChild(projectTitle);
        colText.appendChild(techStack);
        colText.appendChild(projectTopList);
        colText.appendChild(projectText);
        // Alternate layout
        if (index % 2 === 0) {
            row.appendChild(colImg);
            row.appendChild(colText);
        }
        else {
            row.appendChild(colText);
            row.appendChild(colImg);
        }
        projectContainer.appendChild(row);
    });
}
// Fetch and render projects on load
fetchProjects().then((projects) => {
    renderProjects(projects, "all");
    if (filterSelect) {
        filterSelect.addEventListener("change", () => {
            renderProjects(projects, filterSelect.value);
        });
    }
});
