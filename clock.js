const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const hr = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  clockTitle.innerText = `${hr >= 10 ? hr : `0${hr}`}:${
    min >= 10 ? min : `0${min}`
  }:${sec >= 10 ? sec : `0${sec}`}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
