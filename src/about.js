var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchEducation() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://meezaand.github.io/config/config.json');
        const data = yield response.json();
        return data.experience;
    });
}
fetchEducation().then(education => {
    const ul = document.querySelector('.my-journey');
    if (ul) {
        education.reverse();
        education.forEach((item) => {
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
