window.addEventListener('load', loadListFromLocalStorage);

const START_BUTTON = document.getElementById('start_time_id');
const STOP_BUTTON = document.getElementById('stop_time_id');
const NEW_BUTTON = document.getElementById('new_time_id');
const CURRENT_TIME = document.getElementById('current_time_id');
const LIST_RECORD = document.getElementById('list_record_id')
let new_time = true;
const date_record = new Date();


let hour = 0;
let minute = 0;
let second = 0;
let timerInterval;

hour = ('0' + hour).slice(-2);
minute = ('0' + minute).slice(-2);
second = ('0' + second).slice(-2);

START_BUTTON.addEventListener('click', () => {
		startTime();
		new_time = false;
});

STOP_BUTTON.addEventListener('click', () => {
	clearInterval(timerInterval);
});

NEW_BUTTON.addEventListener('click', () => {
	clearInterval(timerInterval);
	generateRecord();
	hour = 0;
	minute = 0;
	second = 0;
	generateTime(true);
		startTime();
		new_time = false;
});

function generateRecord() {
	function pad(number) {
		return number < 10 ? '0' + number : number;
	}
	let year = date_record.getFullYear();
	let day = pad(date_record.getDate());
	let hours = pad(date_record.getHours());
	let minutes = pad(date_record.getMinutes());

	const formattedDate = `${year}-${day} ${hours}:${minutes} -> ${CURRENT_TIME.textContent.trim()}`;
	let listItem = document.createElement('li');
	listItem.textContent = formattedDate;
	LIST_RECORD.appendChild(listItem);
	saveListToLocalStorage();
}

function generateTime(isNew) {
	isNew ? CURRENT_TIME.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}` : null;
	return;
}

function updateTime() {
	if (second >= 60) {
		minute++;
		second = 0;
	}
	if (minute >= 60) {
		hour++;
		minute = 0;
	}
	generateTime(true);
	second++
}

function startTime() {
	generateTime(new_time);
	updateTime();
	timerInterval = setInterval(updateTime, 1000);
}

function saveListToLocalStorage() {
  const items = [];
  
  LIST_RECORD.querySelectorAll('li').forEach((li) => {
    items.push(li.textContent);
  });

  localStorage.setItem('recordList', JSON.stringify(items));
}

function loadListFromLocalStorage() {
  const storedItems = localStorage.getItem('recordList');
  
  if (storedItems) {
    const items = JSON.parse(storedItems);
    
    items.forEach((text) => {
      let listItem = document.createElement('li');
      listItem.textContent = text;
      LIST_RECORD.appendChild(listItem);
    });
  }
}