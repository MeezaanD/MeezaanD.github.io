const education = [
    {
        title: 'IT Academy ',
        description: 'Completed Software Development/ MTA Fundamentals Course.',
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
        description: 'Assistant Coding Lecturer',
        date: 'April 2023 - June 2023',
        url: 'https://lcstudio.co.za/',
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
        date: 'August 2024 - Present',
        url: ''
    },
    {
        title: 'Zaio ',
        description: 'Fullstack Web Development Bootcamp / NQF 5',
        date: 'October 2024 - Present',
        url: 'https://www.zaio.io/'
    }
];
const ul = document.querySelector('.my-journey');
if (ul) {
    education.forEach((item) => {
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
const courses = [
    {
        title: 'TypeScript: Developer\'s Guide',
        institution: 'Udemy',
        image: '/assets/content/typescript.jpg',
        url: 'https://www.udemy.com/certificate/UC-f6e95682-0010-4526-9199-07bcff8bcb45/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com',
    },
    {
        title: 'Master Go Programming',
        institution: 'Udemy',
        image: '/assets/content/master-go.jpg',
        url: 'https://www.udemy.com/certificate/UC-32e8a94a-28d1-43f6-a4e0-614b93e88400/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com',
    },
    {
        title: 'Building Modern Web Applications with Go (Golang)',
        institution: 'Udemy',
        image: '/assets/content/web-go.jpg',
        url: 'https://www.udemy.com/certificate/UC-c069902a-bda0-4269-ab6a-19bc996ab867/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com',
    },
    {
        title: 'Linux Tutorial',
        institution: 'Great Learning',
        image: '/assets/content/linux-tutorial.jpg',
        url: 'https://olympus.mygreatlearning.com/courses/52823/certificate',
    },
    {
        title: 'Machine Learning Algorithms',
        institution: 'Great Learning',
        image: '/assets/content/machine-learn.jpg',
        url: 'https://olympus.mygreatlearning.com/courses/57914/certificate',
    },
    {
        title: 'Data Science Foundation',
        institution: 'Great Learning',
        image: '/assets/content/data-science.jpg',
        url: 'https://olympus.mygreatlearning.com/courses/13680/certificate',
    },
];
const courseList = document.querySelector('.course-list');
if (courseList) {
    courses.forEach((course) => {
        const li = document.createElement('li');
        li.classList.add('course-item'); // Add a class to the <li> element
        const a = document.createElement('a');
        a.href = course.url;
        a.target = "_blank";
        a.classList.add('course-link');
        const img = document.createElement('img');
        img.src = course.image; // Set the image source
        img.alt = course.title; // Set alt text
        img.classList.add('course-image'); // Add a class to the <img> element
        const title = document.createElement('div');
        title.textContent = course.title;
        title.classList.add('course-title');
        const institution = document.createElement('div');
        institution.textContent = course.institution;
        institution.classList.add('course-institution');
        a.appendChild(img); // Append the image to the <a> element
        a.appendChild(title); // Append the title to the <a> element
        a.appendChild(institution); // Append the institution to the <a> element
        li.appendChild(a); // Append the <a> element to the <li> element
        courseList.appendChild(li); // Append the <li> element to the course list
    });
}
