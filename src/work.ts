type ProjectItem = {
	img: string;
	code: string;
	liveLink: string;
	description: string;
};

const projects: ProjectItem[] = [
	{
		img: "/assets/ET-preview.png",
		code: "https://github.com/MeezaanD/MD-Tracker.git",
		liveLink: "https://my-etracker.netlify.app/",
		description: "E-Tracker is a versatile mobile web app designed to empower users with efficient and user-friendly budget management tools. With E-Tracker, you can effortlessly create custom budgets tailored to your specific financial goals. The app offers a comprehensive suite of features, including the ability to add, edit, and delete expenses with ease.E-Tracker's intuitive interface ensures that you maintain a clear overview of your finances, as it automatically calculates both the percentage spent and the remaining budget. Whether you're managing personal finances or tracking expenses for a special project, E-Tracker simplifies the budgeting process and helps you stay in control of your money.",
	},
	{
		img: "/assets/tm2.png",
		code: "https://github.com/MeezaanD/tenant-management",
		liveLink: "https://tenant-management.vercel.app/",
		description: "This project is a Tenant Management System designed to make it easy for landlords and tenants to manage payments and user information online.",
	},
];

const projectContainer = document.querySelector('.project-container');

if (projectContainer) {
	projects.forEach((item: ProjectItem) => {
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

		const projectTopList = document.createElement('ul');
		projectTopList.classList.add('project-top-list');

		const yearLi = document.createElement('li');
		// yearLi.textContent = '2023';

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

		projectTopList.appendChild(yearLi);
		projectTopList.appendChild(codeLi);
		projectTopList.appendChild(liveLinkLi);

		const projectText = document.createElement('p');
		projectText.classList.add('project-text');
		projectText.textContent = item.description;

		col2.appendChild(projectTopList);
		col2.appendChild(projectText);

		row.appendChild(col1);
		row.appendChild(col2);

		projectContainer.appendChild(row);
	});
}
