type EducationItem = {
	title: string;
	description: string;
	additionalText?: string;
	date: string;
	url: string;
};

const education: EducationItem[] = [
	{
		title: 'IT Academy ',
		description: 'Completed Software Development/ MTA Fundamentals Course.',
		date: 'March 2022 - March 2023',
		url: 'https://itacademy.co.za/',
	},
	{
		title: 'Life Choices Academy ',
		description: 'Completed a Bootcamp FullStack Coding Course.',
		additionalText: 'Assistant Coding Lecturer',
		date: 'September 2022 - March 2023',
		url: 'https://lifechoicesacademy.com/',
	},
	{
		title: 'IMQS Software ',
		description: 'Intern Software Developer.',
		date: 'July 2023 - July 2024',
		url: 'https://www.imqs.co.za/',
	},
	{
		title: 'QTZ Concrete ',
		description: 'Web Developer / IT team member',
		date: 'August 2024 - December 2024',
		url: ''
	},
	{
		title: 'Zaio ',
		description: 'Fullstack Web Development Bootcamp / NQF 5',
		date: 'October 2024 - Present',
		url: 'https://www.zaio.io/'
	},
	{
		title: 'Flash Components CC ',
		description: 'Web Developer',
		date: 'December 2024 - Present',
		url: 'https://flash.za.com/'
	}
];

const ul = document.querySelector('.my-journey');

if (ul) {
	education.forEach((item: EducationItem) => {
		const li = document.createElement('li');
		li.classList.add('education-item');

		const a = document.createElement('a');
		a.href = item.url;
		a.target = "_blank";
		a.textContent = item.title;
		a.classList.add('education-link');

		const icon = document.createElement('i');
		icon.classList.add('fas', 'fa-external-link-alt');

		const pDescription = document.createElement('p');
		pDescription.textContent = item.description;
		pDescription.classList.add('education-text');

		const additionalText = document.createElement('p');
		additionalText.textContent = item.additionalText;
		additionalText.classList.add('education-text');

		const pDate = document.createElement('p');
		pDate.textContent = item.date;
		pDate.classList.add('education-date');

		a.appendChild(icon);

		li.appendChild(a);
		li.appendChild(pDescription);
		li.appendChild(additionalText);
		li.appendChild(pDate);

		ul.appendChild(li);
	});
}

