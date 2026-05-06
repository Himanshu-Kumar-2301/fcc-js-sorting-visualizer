const arrayContainer = document.getElementById("array-container");
const startingArray = document.getElementById("starting-array");
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");

const reset = () =>
  (arrayContainer.innerHTML = `<div id="starting-array"></div>`);

const generateElement = () => {
  return Math.floor(Math.random() * 100 + 1);
};

const getLastArray = () => arrayContainer.lastChild;

const generateArray = () => {
  const array = [];
  for (let i = 0; i < 5; i++) {
    array.push(generateElement());
  }
  return array;
  //  return Array.from({length: 5}, generateElement);
};

const generateContainer = () => {
  const div = document.createElement("div");
  arrayContainer.appendChild(div);
  return div;
};

const fillArrContainer = (htmlEl, array) => {
  htmlEl.innerHTML = "";
  array.forEach((item) => {
    const span = document.createElement("span");
    span.innerText = item;
    htmlEl.appendChild(span);
  });
};

const isOrdered = (a, b) => a <= b;

const swapElements = (arr, i) => {
  if (i < arr.length && !isOrdered(arr[i], arr[i + 1])) {
    const temp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = temp;
  }
};

const highlightCurrentEls = (htmlEls, i) => {
  htmlEls.children[i].style.border = "1px dashed red";
  htmlEls.children[i + 1].style.border = "1px dashed red";
};

const bubbleSort = () => {
  let swap = true;
  const arr = Array.from(getLastArray().children).map((el) =>
    Number(el.innerText),
  );

  for (let i = 0; i < arr.length; i++) {
    swap = true;
    for (let j = 0; j < arr.length - 1; j++) {
      if (i === 0 && j === 0) {
        highlightCurrentEls(getLastArray(), 0);
      } else {
        const div = generateContainer();
        fillArrContainer(div, arr);
        highlightCurrentEls(div, j);
      }
      if (arr[j] > arr[j + 1]) {
        swap = false;
      }
      swapElements(arr, j);
    }
    if (swap) {
      break;
    }
  }
  fillArrContainer(generateContainer(), arr);
};

generateBtn.addEventListener("click", () => {
  reset();
  fillArrContainer(getLastArray(), generateArray());
  sortBtn.removeAttribute("hidden");
});

sortBtn.addEventListener("click", () => {
  bubbleSort();
  getLastArray().style.border = "4px solid green";
  sortBtn.hidden = true;
});
