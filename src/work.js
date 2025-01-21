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
        const response = yield fetch('./../data/projects.json');
        const data = yield response.json();
        return data;
    });
}
const projectContainer = document.querySelector('.project-container');
const filterSelect = document.getElementById('filter');
function renderProjects(projects, filter) {
    if (projectContainer) {
        projectContainer.innerHTML = ''; // Clear existing projects
        const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.type === filter);
        filteredProjects.forEach((item, index) => {
            const row = document.createElement('div');
            row.classList.add('row');
            const col1 = document.createElement('div');
            col1.classList.add('col-work');
            const imgLink = document.createElement('a');
            imgLink.href = item.liveLink || '#'; // Fallback if no liveLink
            imgLink.target = item.liveLink ? '_blank' : '_self'; // Open in a new tab only if liveLink exists
            if (!item.liveLink)
                imgLink.classList.add('inactive-link'); // Add inactive style if no liveLink
            const projectImg = document.createElement('img');
            projectImg.src = item.img;
            projectImg.alt = 'project-img';
            projectImg.classList.add('project-img');
            imgLink.appendChild(projectImg);
            col1.appendChild(imgLink);
            const col2 = document.createElement('div');
            col2.classList.add('col-work');
            const projectTitle = document.createElement('h3');
            projectTitle.classList.add('project-title');
            projectTitle.textContent = item.title;
            const techStack = document.createElement('p');
            techStack.classList.add('tech-stack');
            techStack.textContent = item.techStack;
            const projectTopList = document.createElement('ul');
            projectTopList.classList.add('project-top-list');
            const codeLi = document.createElement('li');
            const codeLink = document.createElement('a');
            codeLink.href = item.code || '#'; // Fallback if no code link
            codeLink.target = item.code ? '_blank' : '_self'; // Open in a new tab only if code exists
            codeLink.textContent = 'Code ';
            codeLink.classList.add('links');
            if (!item.code)
                codeLink.classList.add('inactive-link'); // Add inactive style if no code link
            const codeIcon = document.createElement('i');
            codeIcon.classList.add('fab', 'fa-github');
            codeLink.appendChild(codeIcon);
            codeLi.appendChild(codeLink);
            const liveLinkLi = document.createElement('li');
            const liveLinkA = document.createElement('a');
            liveLinkA.href = item.liveLink || '#'; // Fallback if no liveLink
            liveLinkA.target = item.liveLink ? '_blank' : '_self'; // Open in a new tab only if liveLink exists
            liveLinkA.textContent = 'Visit Site ';
            liveLinkA.classList.add('links');
            if (!item.liveLink)
                liveLinkA.classList.add('inactive-link'); // Add inactive style if no liveLink
            const liveLinkIcon = document.createElement('i');
            liveLinkIcon.classList.add('fas', 'fa-external-link-alt');
            liveLinkA.appendChild(liveLinkIcon);
            liveLinkLi.appendChild(liveLinkA);
            projectTopList.appendChild(codeLi);
            projectTopList.appendChild(liveLinkLi);
            const projectText = document.createElement('p');
            projectText.classList.add('project-text');
            projectText.textContent = item.description;
            col2.appendChild(projectTitle);
            col2.appendChild(techStack);
            col2.appendChild(projectTopList);
            col2.appendChild(projectText);
            // Alternate layout based on index
            if (index % 2 === 0) {
                row.appendChild(col1);
                row.appendChild(col2);
            }
            else {
                row.appendChild(col2);
                row.appendChild(col1);
            }
            projectContainer.appendChild(row);
        });
    }
}
// Fetch and render projects on load
fetchProjects().then(projects => {
    renderProjects(projects, 'all');
    // Event listener for filter selection
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            renderProjects(projects, filterSelect.value);
        });
    }
});
