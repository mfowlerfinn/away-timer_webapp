let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function pad(number) {
  const padNumber = `${number < 10 ? '0' : ''}${number}`;
  return padNumber;
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const displaySeconds = pad(seconds % 60);
  const display = `${minutes}:${displaySeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Back At ${hour}:${pad(minutes)}`;
}

function clearTimer() {
  endTime.textContent = "";
  timerDisplay.textContent = "";
  document.title = "Timer";
}

function startTimer() {
  let seconds = this.dataset.time;
  console.log(seconds);
  timer(seconds);
  if (seconds < 1) clearTimer();
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();

})