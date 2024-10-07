type EducationItem = {
	title: string;
	description: string;
	date: string;
	url: string; 
};

const education: EducationItem[] = [
	{
		title: 'IT Academy ',
		description: 'Completed Software Fundamentals Course.',
		date: 'March 2022 - March 2023',
		url: 'https://itacademy.co.za/',
	},
	{
		title: 'Life Choices Academy ',
		description: 'Completed a Bootcamp FullStack Coding Course.',
		date: 'September 2022 - March 2023',
		url: 'https://lifechoicesacademy.com/',
	},
	{
		title: 'Life Choices Academy ',
		description: 'Assistant Lecturer',
		date: 'April 2023 - June 2023',
		url: 'https://lcstudio.co.za/',
	},
	{
		title: 'IMQS Software ',
		description: 'Intern Software Developer.',
		date: 'July 2023 - July 2024',
		url: 'https://www.imqs.co.za/',
	},
	// {
	// 	title: 'Silux Control ',
	// 	description: 'Junior Software Developer.',
	// 	date: 'August 2024 - Present',
	// 	url: 'https://www.siluxcontrol.co.uk/',
	// },
	{
		title: 'QTZ Concrete, Essentials Cpt ',
		description: 'Web Developer / IT team member',
		date: 'August 2024 - Present',
		url: ''
	}
];

const ul = document.querySelector('.my-journey');

if (ul) {
	education.forEach((item: EducationItem) => {
		const li = document.createElement('li');
		li.classList.add('education-item'); // Add a class to the <li> element

		const a = document.createElement('a');
		a.href = item.url;
		a.target = "_blank";
		a.textContent = item.title; // Set the text content directly
		a.classList.add('education-link');

		const icon = document.createElement('i');
		icon.classList.add('fas', 'fa-external-link-alt'); // Add classes for the arrow icon

		const pDescription = document.createElement('p');
		pDescription.textContent = item.description;
		pDescription.classList.add('education-text'); // Add a class to the <p> element

		const pDate = document.createElement('p');
		pDate.textContent = item.date;
		pDate.classList.add('education-date'); // Add a class to the <p> element

		a.appendChild(icon); // Append the icon to the <a> element

		li.appendChild(a);
		li.appendChild(pDescription);
		li.appendChild(pDate);

		ul.appendChild(li);
	});
}
