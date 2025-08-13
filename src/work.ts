type Project = {
  title: string;
  description: string;
  img: string;
  techStack: string;
  code?: string;
  liveLink?: string;
  type: string;
};

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch("https://MeezaanD.github.io/config/config.json");
  const data = await response.json();
  return data.projects as Project[];
}

const projectContainer =
  document.querySelector<HTMLDivElement>(".project-container");
const filterSelect = document.getElementById(
  "filter"
) as HTMLSelectElement | null;

function renderProjects(projects: Project[], filter: string): void {
  if (!projectContainer) return;

  projectContainer.innerHTML = ""; // Clear existing projects
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  filteredProjects.forEach((item, index) => {
    const row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute("data-aos", index % 2 === 0 ? "fade-left" : "fade-right");
    row.setAttribute("data-aos-duration", "1000");

    // Left column (image)
    const col1 = document.createElement("div");
    col1.classList.add("col-work");

    const imgLink = document.createElement("a");
    imgLink.href = item.liveLink || "#";
    imgLink.target = item.liveLink ? "_blank" : "_self";
    if (!item.liveLink) imgLink.classList.add("inactive-link");

    const projectImg = document.createElement("img");
    projectImg.src = item.img;
    projectImg.alt = "project-img";
    projectImg.classList.add("project-img");

    imgLink.appendChild(projectImg);
    col1.appendChild(imgLink);

    // Right column (text)
    const col2 = document.createElement("div");
    col2.classList.add("col-work");

    const projectTitle = document.createElement("h3");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = item.title;

    const techStack = document.createElement("p");
    techStack.classList.add("tech-stack-text");
    techStack.textContent = item.techStack;

    const projectTopList = document.createElement("ul");
    projectTopList.classList.add("project-top-list");

    // Code link
    const codeLi = document.createElement("li");
    const codeLink = document.createElement("a");
    codeLink.href = item.code || "#";
    codeLink.target = item.code ? "_blank" : "_self";
    codeLink.textContent = "Code ";
    codeLink.classList.add("links");
    if (!item.code) codeLink.classList.add("inactive-link");

    const codeIcon = document.createElement("i");
    codeIcon.classList.add("fab", "fa-github");
    codeLink.appendChild(codeIcon);
    codeLi.appendChild(codeLink);

    // Live link
    const liveLinkLi = document.createElement("li");
    const liveLinkA = document.createElement("a");
    liveLinkA.href = item.liveLink || "#";
    liveLinkA.target = item.liveLink ? "_blank" : "_self";
    liveLinkA.textContent = "Visit Site ";
    liveLinkA.classList.add("links");
    if (!item.liveLink) liveLinkA.classList.add("inactive-link");

    const liveLinkIcon = document.createElement("i");
    liveLinkIcon.classList.add("fas", "fa-external-link-alt");
    liveLinkA.appendChild(liveLinkIcon);
    liveLinkLi.appendChild(liveLinkA);

    projectTopList.appendChild(codeLi);
    projectTopList.appendChild(liveLinkLi);

    const projectText = document.createElement("p");
    projectText.classList.add("project-text");
    projectText.textContent = item.description;

    // Append elements to col2
    col2.appendChild(projectTitle);
    col2.appendChild(techStack);
    col2.appendChild(projectTopList);
    col2.appendChild(projectText);

    // Add columns to row
    row.appendChild(col2);
    row.appendChild(col1);

    // Append row to container
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
