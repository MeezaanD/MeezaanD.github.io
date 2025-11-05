type EducationItem = {
	company: string;
	title: string;
	description: string;
	additionalText?: string;
	date: string;
	url: string;
};

async function fetchEducation(): Promise<EducationItem[]> {
	const response = await fetch('https://meezaand.github.io/config/config.json');
	const data = await response.json();
	return data.experience;
}

fetchEducation().then(education => {
	const ul = document.querySelector('.my-journey');
	if (ul) {
		education.reverse();
		education.forEach((item: EducationItem) => {
			const li = document.createElement('li');
			li.classList.add('education-item');

			// Company Link
			const a = document.createElement('a');
			a.href = item.url;
			a.target = "_blank";
			a.textContent = item.company;
			a.classList.add('education-link');

			const icon = document.createElement('i');
			icon.classList.add('fas', 'fa-external-link-alt');
			a.appendChild(icon);

			// Meta row: Title | Date
			const metaDiv = document.createElement('div');
			metaDiv.classList.add('education-meta');

			const pTitle = document.createElement('p');
			pTitle.textContent = item.title;
			pTitle.classList.add('education-title');

			const pDate = document.createElement('p');
			pDate.textContent = item.date;
			pDate.classList.add('education-date');

			metaDiv.appendChild(pTitle);
			metaDiv.appendChild(pDate);

			// Description below meta row
			const pDescription = document.createElement('p');
			pDescription.textContent = item.description;
			pDescription.classList.add('education-text');

			// Build card
			li.appendChild(a);
			li.appendChild(metaDiv);
			li.appendChild(pDescription);

			// Additional Text (below meta row)
			if (item.additionalText) {
				const additionalText = document.createElement('p');
				additionalText.textContent = item.additionalText;
				additionalText.classList.add('education-additional');
				li.appendChild(additionalText);
			}

			ul.appendChild(li);
		});
	}
});
