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
        const response = yield fetch('https://MeezaanD.github.io/config/config.json');
        const data = yield response.json();
        return data.projects;
    });
}
const projectContainer = document.querySelector('.project-container');
const filterSelect = document.getElementById('filter');
function renderProjects(projects, filter) {
    if (projectContainer) {
        projectContainer.innerHTML = ''; // Clear existing projects
        const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.type === filter);
        filteredProjects.forEach((item) => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.setAttribute('data-aos', 'fade-up');
            projectCard.setAttribute('data-aos-duration', '800');
            // Image container
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('project-img-container');
            const imgLink = document.createElement('a');
            imgLink.href = item.liveLink || '#';
            imgLink.target = item.liveLink ? '_blank' : '_self';
            if (!item.liveLink)
                imgLink.classList.add('inactive-link');
            const projectImg = document.createElement('img');
            projectImg.src = item.img;
            projectImg.alt = item.title;
            projectImg.classList.add('project-img');
            imgLink.appendChild(projectImg);
            imgContainer.appendChild(imgLink);
            // Content container
            const contentContainer = document.createElement('div');
            contentContainer.classList.add('project-content');
            const projectTitle = document.createElement('h3');
            projectTitle.classList.add('project-title');
            projectTitle.textContent = item.title;
            const techStack = document.createElement('p');
            techStack.classList.add('tech-stack-text');
            techStack.textContent = item.techStack;
            const projectText = document.createElement('p');
            projectText.classList.add('project-text');
            projectText.textContent = item.description;
            const linksContainer = document.createElement('div');
            linksContainer.classList.add('project-links');
            // Code link
            const codeLink = document.createElement('a');
            codeLink.href = item.code || '#';
            codeLink.target = item.code ? '_blank' : '_self';
            codeLink.classList.add('project-link', 'code');
            if (!item.code)
                codeLink.classList.add('inactive-link');
            codeLink.innerHTML = '<i class="fab fa-github"></i> Code';
            // Live link
            const liveLink = document.createElement('a');
            liveLink.href = item.liveLink || '#';
            liveLink.target = item.liveLink ? '_blank' : '_self';
            liveLink.classList.add('project-link', 'live');
            if (!item.liveLink)
                liveLink.classList.add('inactive-link');
            liveLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
            linksContainer.appendChild(codeLink);
            linksContainer.appendChild(liveLink);
            contentContainer.appendChild(projectTitle);
            contentContainer.appendChild(techStack);
            contentContainer.appendChild(projectText);
            contentContainer.appendChild(linksContainer);
            projectCard.appendChild(imgContainer);
            projectCard.appendChild(contentContainer);
            projectContainer.appendChild(projectCard);
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
