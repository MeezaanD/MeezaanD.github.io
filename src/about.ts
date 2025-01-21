type EducationItem = {
	title: string;
	description: string;
	additionalText?: string;
	date: string;
	url: string;
};

async function fetchEducation(): Promise<EducationItem[]> {
	const response = await fetch('./../data/education.json');
	const data = await response.json();
	return data;
}

fetchEducation().then(education => {
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
});
