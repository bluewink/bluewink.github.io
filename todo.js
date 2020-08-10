const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoPendingList = document.querySelector(".js-pendingList"),
    toDoFinishedList = document.querySelector(".js-finishedList");

const TODO_LS = "toDos";

let toDos = [];

function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let opt, targetToDO;

  toDos.forEach(function (toDo) {
    if (toDo.id == li.id) {
      opt = toDo.opt;
      targetToDO = toDo;
    }
  });

  if (parseInt(opt) == 1) {
    toDoPendingList.removeChild(li);
    btn.innerText = "⏫";
    targetToDO.opt = 2;
    toDoFinishedList.appendChild(li);
  } else {
    toDoFinishedList.removeChild(li);
    targetToDO.opt = 1;
    toDoPendingList.appendChild(li);
    btn.innerText = "✔";
  }

  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let opt;
  toDos.forEach(function (toDo) {
    if (toDo.id == li.id) {
      opt = toDo.opt;
    }
  });
  if (parseInt(opt) == 1) toDoPendingList.removeChild(li);
  else {
    toDoFinishedList.removeChild(li);
  }
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  //localStorage는 기본적으로 string 밖에 담지 못함.
  //따라서 JSON.stringify() 로 object를 string으로 바꿈.
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text, opt) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const movBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  if (parseInt(opt) === 1) movBtn.innerText = "✔";
  else {
    movBtn.innerText = "⏫";
  }
  movBtn.addEventListener("click", moveToDo);

  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(movBtn);
  li.appendChild(span);
  li.id = newId;

  if (opt === 1) {
    toDoPendingList.appendChild(li);
  } else {
    toDoFinishedList.appendChild(li);
  }
  const toDoObj = {
    text: text,
    id: newId,
    opt: opt,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;

  paintToDo(currentValue, 1); //pending list에 넣기
  toDoInput.value = ""; //입력 후 지워짐
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.opt);
    });
  } else {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
