var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
function fetchEducation() {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(
      "https://meezaand.github.io/config/config.json"
    );
    const data = yield response.json();
    return data.experience;
  });
}
fetchEducation().then((education) => {
  const ul = document.querySelector(".my-journey");
  if (ul) {
    education.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("education-item");

      // Date on the left
      const dateDiv = document.createElement("div");
      dateDiv.classList.add("education-date");
      dateDiv.textContent = item.date;

      // Content on the right
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("education-content");

      // Title as inline span link
      const titleSpan = document.createElement("span");
      const titleLink = document.createElement("a");
      titleLink.href = item.url;
      titleLink.target = "_blank";
      titleLink.classList.add("education-link");
      titleLink.textContent = item.title;

      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-external-link-alt");
      titleLink.appendChild(icon);
      titleSpan.appendChild(titleLink);

      // Description
      const descriptionP = document.createElement("p");
      descriptionP.textContent = item.description;
      descriptionP.classList.add("education-text");

      // Additional text
      const additionalP = document.createElement("p");
      additionalP.textContent = item.additionalText;
      additionalP.classList.add("education-additional");

      // Assemble the content
      contentDiv.appendChild(titleSpan);
      contentDiv.appendChild(descriptionP);
      contentDiv.appendChild(additionalP);

      // Assemble the item
      li.appendChild(dateDiv);
      li.appendChild(contentDiv);

      ul.appendChild(li);
    });
  }
});
