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
        const response = yield fetch('./../data/journey.json');
        const data = yield response.json();
        return data;
    });
}
fetchEducation().then(education => {
    const ul = document.querySelector('.my-journey');
    if (ul) {
        education.forEach((item) => {
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
