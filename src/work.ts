type ProjectItem = {
	img: string;
	code: string;
	liveLink: string;
	description: string;
	title: string;
	techStack: string;
};

const projects: ProjectItem[] = [
	{
		img: "/assets/projects/ET-preview.png",
		code: "https://github.com/MeezaanD/MD-Tracker.git",
		liveLink: "https://my-etracker.netlify.app/",
		description: "E-Tracker is a versatile mobile web app designed to empower users with efficient and user-friendly budget management tools. With E-Tracker, you can effortlessly create custom budgets tailored to your specific financial goals...",
		title: "E-Tracker",
		techStack: "Vue · Typescript · Bootstrap",
	},
	{
		img: "/assets/projects/tm2.png",
		code: "https://github.com/MeezaanD/tenant-management",
		liveLink: "https://tenant-management.vercel.app/",
		description: "This project is a Tenant Management System designed to make it easy for landlords and tenants to manage payments and user information online.",
		title: "Tenant Management System",
		techStack: "Vue · Typescript · Golang · MySQL · Element UI",
	},
];


const projectContainer = document.querySelector('.project-container');

if (projectContainer) {
	projects.forEach((item: ProjectItem, index: number) => {
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

		const projectTitle = document.createElement('h3');  // Create title element
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

		// Alternate the layout based on the index
		if (index % 2 === 0) {
			row.appendChild(col1);
			row.appendChild(col2);
		} else {
			row.appendChild(col2);
			row.appendChild(col1);
		}

		projectContainer.appendChild(row);
	});
}
