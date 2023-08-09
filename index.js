const input = document.querySelector("#searchBar");
const button = document.querySelector("#add");
const dictionaryTab = document.querySelector(".dictionaryTab");
const clearButton = document.querySelector(".clearButton");
const translateKey = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sh'",
  ъ: "",
  ы: "y",
  ь: "'",
  э: "e",
  ю: "yu",
  я: "ya",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "I",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "H",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Sh'",
  Ъ: "",
  Ы: "Y",
  Ь: "'",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (input.value !== ""){addNewWord();}
    
  }
});
button.addEventListener("click",() =>  {
    if (input.value !== ""){addNewWord()};
    
});

function letTranslate(word) {
  let newWord = "";
  for (i = 0; i < word.length; i++) {
    if (!translateKey[word[i]]) {
      newWord = newWord + word[i];
    } else newWord = newWord + translateKey[word[i]];
  }
  return newWord;
}

function addNewWord() {
  // сторона русского текста
  const indexes = document.querySelectorAll(".index");
  let index = document.createElement("p");
  index.className = "index";
  index.innerText = indexes.length + 1;

  const newTab = document.createElement("div");
  newTab.className = "dictionaryLine";
  dictionaryTab.append(newTab);
  const newWord = document.createElement("div");
  let text = input.value;
  if (text.length > 7) {
    newWord.innerText = text.slice(0, 7) + "...";
  } else newWord.innerText = text;
  newWord.prepend(index);
  newTab.append(newWord);
  newWord.className = "cellLeft";
  if (text.length > 7) {
    const longWord = document.createElement("div");
    longWord.className = "longWord";
    newTab.append(longWord);
    longWord.style.cssText = `

position: absolute;
border-style: none;
border-width: 2px;
border-radius: 10px;
background-color: white;
left: 20px;
top: 7px;
padding: 8px 16px 10px 16px;
max-width: 200px;
overflow-wrap: break-word;
display: none;
`;
    newTab.style.cssText = `

position: relative;`;

    longWord.innerText = text;
    newWord.addEventListener("mouseenter", () => {
      longWord.style.display = "block";
    });
    newWord.addEventListener("mouseleave", () => {
      longWord.style.display = "none";
    });
  }

  //сторона перевода
  const newWordTranslate = document.createElement("div");
  const englishText = letTranslate(text);
  if (englishText.length > 7) {
    newWordTranslate.innerText = englishText.slice(0, 7) + "...";
  } else {
    newWordTranslate.innerText = englishText;
  }

  newTab.append(newWordTranslate);
  newWordTranslate.className = "cellRight";
  if (englishText.length > 7) {
    const longWordEng = document.createElement("div");
    longWordEng.className = "longWordEng";
    newTab.append(longWordEng);
    longWordEng.innerText = englishText;

    longWordEng.style.cssText = `
position: absolute;
border-style: none;
border-width: 2px;
border-radius: 10px;
background-color: white;
top: 7px;
left: 260px;
padding: 8px 16px 10px 16px;
max-width: 200px;
overflow-wrap: break-word;
display: none;
`;

    newWordTranslate.addEventListener("mouseenter", () => {
      longWordEng.style.display = "block";
    });
    newWordTranslate.addEventListener("mouseleave", () => {
      longWordEng.style.display = "none";
    });
  }

  const newButton = document.createElement("button");
  newButton.className = "close";
  newWordTranslate.append(newButton);
  const newImage = document.createElement("img");
  newImage.src = "./icons/Group1.png";
  newImage.alt = "Close icon";
  newImage.className = "closeIcon";
  newButton.append(newImage);
  input.value = "";
  let allElements = document.querySelectorAll(".dictionaryLine");

  newButton.addEventListener("click", () => {
    newTab.remove();
    const indexesNew = document.querySelectorAll(".index");
    indexesNew.forEach((index, i) => {
      index.innerText = i + 1;
    });
  });
  clearButton.addEventListener("click", () => {
    for (let i = 1; i < allElements.length; i++) {
      allElements[i].remove();
    }
  });
}
