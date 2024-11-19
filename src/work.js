const projects = [
    {
        img: "/assets/projects/ET-preview.png",
        code: "https://github.com/MeezaanD/MD-Tracker.git",
        liveLink: "https://my-etracker.netlify.app/",
        description: "E-Tracker is a versatile mobile web app designed to empower users with efficient and user-friendly budget management tools...",
        title: "E-Tracker",
        techStack: "Vue · Typescript · Bootstrap",
        type: "personal",
    },
    {
        img: "/assets/projects/tm2.png",
        code: "https://github.com/MeezaanD/tenant-management",
        liveLink: "https://tenant-management.vercel.app/",
        description: "This project is a Tenant Management System designed to make it easy for landlords and tenants to manage payments and user information online.",
        title: "Tenant Management System",
        techStack: "Vue · Typescript · Golang · MySQL · Element UI",
        type: "personal",
    },
    {
        img: "/assets/projects/product-management.png",
        code: "https://github.com/MeezaanD/laravel-product-management",
        liveLink: "",
        description: "A Laravel application for managing products, including features for creating, editing, and deleting products, as well as managing their details such as name, price, description, and stock quantity.",
        title: "Product Management System",
        techStack: "Laravel · React · Inertia · Tailwind Css · SQLite",
        type: "personal",
    },
    {
        img: "/assets/projects/az-comms.png",
        code: "https://github.com/MeezaanD/az-comms-services",
        liveLink: "https://az-comms-services.vercel.app/",
        description: "Freelance project web application developed for a client to manage their self employed business",
        title: "AZ Comms & Services",
        techStack: "React · Javascript · Tailwind Css",
        type: "freelance",
    },
    // Add some freelance projects
    // {
    // 	img: "/assets/projects/freelance1.png",
    // 	code: "https://github.com/MeezaanD/freelance-project1",
    // 	liveLink: "https://freelance-project1.vercel.app/",
    // 	description: "Freelance Project 1 is a custom web application developed for a client to manage their online store...",
    // 	title: "Freelance Project 1",
    // 	techStack: "React · Node.js · Bootstrap",
    // 	type: "freelance",
    // },
];
const projectContainer = document.querySelector('.project-container');
const filterSelect = document.getElementById('filter');
function renderProjects(filter) {
    if (projectContainer) {
        projectContainer.innerHTML = ''; // Clear existing projects
        const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.type === filter);
        filteredProjects.forEach((item, index) => {
            const row = document.createElement('div');
            row.classList.add('row');
            const col1 = document.createElement('div');
            col1.classList.add('col');
            const imgLink = document.createElement('a');
            imgLink.href = item.liveLink;
            imgLink.target = '_blank';
            const projectImg = document.createElement('img');
            projectImg.src = item.img;
            projectImg.alt = 'project-img';
            projectImg.classList.add('project-img');
            imgLink.appendChild(projectImg);
            col1.appendChild(imgLink);
            const col2 = document.createElement('div');
            col2.classList.add('col');
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
            codeLink.href = item.code;
            codeLink.target = '_blank';
            codeLink.textContent = 'Code ';
            codeLink.classList.add('links');
            const codeIcon = document.createElement('i');
            codeIcon.classList.add('fab', 'fa-github');
            codeLink.appendChild(codeIcon);
            codeLi.appendChild(codeLink);
            const liveLinkLi = document.createElement('li');
            const liveLinkA = document.createElement('a');
            liveLinkA.href = item.liveLink;
            liveLinkA.target = '_blank';
            liveLinkA.textContent = 'Visit Site ';
            liveLinkA.classList.add('links');
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
// Initial rendering with all projects
renderProjects('all');
// Event listener for filter selection
if (filterSelect) {
    filterSelect.addEventListener('change', () => {
        renderProjects(filterSelect.value);
    });
}
