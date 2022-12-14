// =========
// Variables
// =========

//  Dropdown Messages
//  -----------------
const bell = document.getElementById("bell");
const greenDot = document.getElementById('green-dot');
const notifications = document.getElementById('notifications');
const notificationsUl = document.querySelector('.notifications-messages');

//  Alert banner
//  ------------
const alertBanner = document.getElementById('alert');

//  Charts
//  ------
const trafficCanvas = document.getElementById('traffic-chart');
const trafficNav = document.getElementById('traffic-nav');
const dailyCanvas = document.getElementById('daily-chart');
const mobileCanvas = document.getElementById('doughnut-chart');

//  New Members
//  -----------
const membersContainer = document.getElementById('members');

//  Recent Activity
//  ---------------
const recentActContainer = document.getElementById('recent-activity');

//  Message User
//  ------------
const form = document.getElementById('widget-container');
const userSearch = document.getElementById('user-search');
const sendBtn = document.getElementById('send');
const datalist = document.getElementById('members-datalist');
let messageField = document.getElementById('message-field');

//  Settings
//  --------
const emailSwitch = document.getElementById('switch-email');
const profileSwitch = document.getElementById('switch-profile');
const timezoneForm = document.getElementById('timezone');
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');

//  ======
//  Alert
//  ======
//  Creates the notification dropdown banner
const notificationsMessages = (arr) => {

  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const close = document.createElement('p');

    li.className = 'dropdown-message';
    p.textContent = `${arr[i]}`;
    close.className = 'close';
    close.textContent = 'X';

    notificationsUl.appendChild(li);
    li.appendChild(p);
    li.appendChild(close);
  }
};
notificationsMessages(newMessages);

// Shows or hides notifications when bell is clicked
bell.addEventListener("click", (e) => {
  if (e.target.id === 'bell') {
    const bell = e.target;
    const action = bell.classList;

    const nameAction = {
      show: function () {
        notifications.style.display = 'flex';
        greenDot.style.display = 'none';
        bell.classList = 'hide';
      },
      hide: function () {
        notifications.style.display = 'none';
        greenDot.style.display = 'block';
        bell.classList = 'show';
      },
    };
    nameAction[action]();
  }
});

// Removes li elements form notifications when 'X' is clicked
notifications.addEventListener('click', (e) => {
  if (e.target.className === 'close') {
    const x = e.target;
    const li = x.parentElement;
    const viewAll = document.querySelector('.viewAll');

    li.remove();
    viewAll.style.display = 'none';
  }
});

//  Create the HTML for the alert banner
alertBanner.innerHTML = `
    <p class="alert-message"><strong>Alert: </strong>You have <strong>6</strong> overdue tasks to complete </p>
    <button class='alert-close'>X</button>`;

//  Removes alert banner
alertBanner.addEventListener('click', (e) => {
  const element = e.target;

  if (element.classList.contains('alert-close')) {
    alertBanner.style.display = "none";
  }
});

// ======
// Charts
// ======
//  Toggles classList to '.active'
const activeBtn = function (btnClicked) {
  btnClicked.className = 'active';
  const ulChildren = trafficNav.children;

  //every other button '.active' class is removed
  for (let i = 0; i < ulChildren.length; i++) {
    if (ulChildren[i] !== btnClicked) {
      ulChildren[i].classList.remove('active');
    }
  }
};

// Creates a set of random hours labels
const hourLabels = () => {
  let time = [];

  for (let i = 5; i < 24; i++) {
    if (i < 10) {
      time.push(`${i}am`);
    }
    else if (i >= 10 && i <= 11) {
      time.push(`${i}am`);
    }
    else if (i === 12) {
      time.push(`${i}pm`);
    }
    else if (i >= 12) {
      time.push(`${i - 12}pm`);
    }
  }
  return time;
};

// Creates a set of random hourly datasets
const hourDatasets = () => {
  let data = [];
  const min = 0;
  const max = 500;


  for (let i = 0; i <= 24; i++) {
    let number = Math.floor(Math.random() * (max - min) + min);
    data.push(`${number}`);
  }
  return data;
};

// Creates a set of random daily datasets
const dailyDatasets = () => {
  let data = [];
  const min = 0;
  const max = 1000;

  for (let i = 0; i <= 7; i++) {
    let number = Math.floor(Math.random() * (max - min) + min);
    data.push(`${number}`);
  }
  return data;
};

// Creates a set of random weekly datasets
const weeklyDatasets = () => {
  let data = [];
  const min = 0;
  const max = 4000;

  for (let i = 0; i <= 14; i++) {
    let number = Math.floor(Math.random() * (max - min) + min);
    data.push(`${number}`);
  }
  return data;
};

// Creates a set of random weekly labels
const weeklyLabels = () => {
  let data = [];
  let number = 0;

  for (let i = 0; i < 14; i++) {
    if (number >= 52) {
      number = number + 2;
      data.push(`${number}`);
    }
    else {
      number += 4;
      data.push(`${number}`);
    }
  }
  return data;
};

// Creates a set of random monthly datasets
const monthlyDatasets = () => {
  let data = [];
  const min = 0;
  const max = 1000;

  for (let i = 0; i <= 12; i++) {
    let number = Math.floor(Math.random() * (max - min) + min);
    data.push(`${number}`);
  }
  return data;
};

// Traffic Chart
// -------------
// Creates random datasets and labels for all traffic times
trafficNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const button = e.target;
    const time = button.textContent.toLowerCase();

    const updateBtn = () => {
      trafficChart.update();
      activeBtn(button);
    };

    const timeData = {
      hourly: function () {
        trafficChart.data.datasets[0].data = hourDatasets();
        trafficChart.data.labels = hourLabels();
        updateBtn();
      },
      daily: function () {
        trafficChart.data.datasets[0].data = dailyDatasets();
        trafficChart.data.labels = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        updateBtn();
      },
      weekly: function () {
        trafficChart.data.datasets[0].data = weeklyDatasets();
        trafficChart.data.labels = weeklyLabels();
        updateBtn();
      },
      monthly: function () {
        trafficChart.data.datasets[0].data = monthlyDatasets();
        trafficChart.data.labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        updateBtn();
      },
    };
    timeData[time]();
  }
});

// Creates Traffic chart datasets and labels
let trafficData = {
  labels: weeklyLabels(),
  datasets: [
    {
      data: weeklyDatasets(),
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 15,
    },
  ],
};

// Creates Traffic chart options
let trafficOptions = {
  layout: {padding: 10},
  backgroundColor: 'rgba(112, 104, 201, .5)',
  fill: true,
  aspectRatio: 2.5,
  animation: {duration: 0},
  hoverRadius: 12,
  hoverBackgroundColor: 'rgba(77, 76, 114, 45%)',
  scales: {
    y: {beginAtZero: true},
  },
  plugins: {
    legend: {display: false},
  },
};

// Creates Traffic chart
let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions,
});

//  Daily traffic bar chart
//  -----------------------

// Creates daily traffic bar chart datasets and labels
const dailyData = {
  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  datasets: [
    {
      label: '# of Hits',
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: '#7477BF',
      borderWidth: 1,
    },
  ],
};

// Creates daily traffic bar chart options
const dailyOptions = {
  layout: {
    padding: 10,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

// Creates daily traffic bar chart
let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions,
});

// Mobile Users Doughnut Chart
// ---------------------------

// Creates mobile chart datasets and labels
const mobileData = {
  labels: ['Desktop', 'Tablet', 'Phones'],
  datasets: [
    {
      label: '# of users',
      data: [2000, 550, 500],
      borderWith: 0,
      backgroundColor: [
        '#7477BF',
        '#78CF82',
        '#51B6C8',
      ],
    },
  ],
};

// Creates mobile chart options
const mobileOptions = {
  layout: {
    padding: 10,
  },
  aspectRatio: 1.9,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWith: 20,
        fontStyle: 'bold',
      },
    },
  },
};

// Creates mobil chart
let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions,
});

//  ===========
//  New Members
//  ===========
//  Random date generator
const getRandomDate = () => {
  let date;

//set a range of years
  const min = 2020;
  const max = 2022;

// Math.ceil prevents the value from being 0;
  let month = Math.ceil(Math.random() * 12);
  let day = Math.ceil(Math.random() * 28);
  let year = Math.floor(Math.random() * (max - min) + min);

//this ensures that the format will stay mm/dd/yyyy;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
//concatenates random date in mm/dd/yyyy format;
  date = month + "/" + day + "/" + year;

  return date;
};

// dynamically creates new members avatars
const createNewMembers = (array) => {
  let html = '';

  for (let i = 0; i < array.length; i++) {
    html +=
      `<div id="members-container" class="members-container">
        <img class="members-profile-img"
          src="images/members/member-${i}.jpg"
          alt="student profile image">
        <div class="members-text-wrapper">
          <p>${array[i].name} ${array[i].lastName}</p>
          <p>
            <a href="mailto:diego_ggv@pm.me">
            <strong>Email: </strong>${array[i].name.toLowerCase()}${array[i].lastName.toLowerCase()}@example.com</a>
          </p>
        </div>
        <p>${getRandomDate()}</p>
      </div>
      <div class = "div"></div>`;
  }
  return html;
};
membersContainer.insertAdjacentHTML('beforeend', createNewMembers(membersInfo));

//  ===============
//  Recent Activity
//  ===============
//  Random object Property Selector
const getRandomProperty = function (obj) {
  // Generates a random value taking the length of the given number
  const ranNum = Math.floor(Math.random() * 3);
  // Stores property value in a constant taking random number as the array index value
  const activity = obj.activity[ranNum];
  const platform = obj.platform[ranNum];

  return `${activity} <strong>${platform}</strong>`;
};

//  Random time generator
const getRandomTime = () => {
  let time;

// Math.ceil prevents the value from being 0;
  let hour = Math.ceil(Math.random() * 72);

  if (hour > 24) {
    hour = Math.floor(hour / 24);

    if (hour === 1) {
      time = hour + ' day ago';
    }
    else {
      time = hour + ' days ago';
    }
    return time;
  }
  time = hour + ' hours ago';
  return time;
};

//   Randomly generates Recent Activity
const recentActivity = (user) => {
  let html = '';

  for (let i = 0; i < user.length; i++) {
    html +=
      `
      <div id="resent-activity-container" class="members-container">
        <img class="members-profile-img"
        src="images/members/member-${i}.jpg"
        alt="student profile image">
        <div class=members-text-wrapper>
          <p>${user[i].name} ${user[i].lastName} ${getRandomProperty(recentActivityInfo)}</p>
          <p>${getRandomTime()}</p>
        </div>
        <p class="recent-activity-arrow"> > </p>
      </div>
      <div class = "div"></div>
      `;
  }
  return html;
};
recentActContainer.insertAdjacentHTML('beforeend', recentActivity(membersInfo, recentActivityInfo));

//  ============
//  Message User
//  ============
// creates an array of names taken from the new members list
const membersList = (array) => {
  const list = [];
  for (let i = 0; i < array.length; i++) {
    const fullName = `${array[i].name} ${array[i].lastName}`;
    list.push(fullName);
  }
  return list;
};

// creates and adds options to the datalist
const createOptions = (array) => {
  for (let i = 0; i < array.length; i++) {
    const option = document.createElement('option');

    option.innerHTML = array[i];
    datalist.appendChild(option);
  }
};
const usersList = membersList(membersInfo);
createOptions(usersList);

// sends an alert to user depending how user and message fields are filled
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Ensure user and message fields aer filled out
  if (userSearch.value === '' && messageField.value === '') {
    alert('Please fill out user and message fields before sending');
  }
  else if (userSearch.value === '') {
    alert("Please fill out user field before sending");
  }
  else if (messageField.value === '') {
    alert("Please fill out message field before sending");
  }
  else if (!usersList.includes(userSearch.value)) {
    alert('Sorry, we could not find that user');
  }
  else {
    alert(`Message successfully sent to: ${userSearch.value}`);
  }
});

//  ========
//  Settings
//  ========
// Sets Local Storage
saveBtn.addEventListener('click', () => {
  const emailOnOff = emailSwitch.checked;
  const profileOnOff = profileSwitch.checked;
  const timezoneValue = timezoneForm.selectedIndex;

  localStorage.setItem('email', emailOnOff);
  localStorage.setItem('profile', profileOnOff);
  localStorage.setItem('timezones', timezoneValue);
});

// Gets local storage. When page is reloaded the settings are remembered
const getLocalStorage = () => {
  if (localStorage.getItem('email') === "false") {
    emailSwitch.checked = false;
  }
  if (localStorage.getItem('profile') === 'false') {
    profileSwitch.checked = false;
  }
  if (localStorage.getItem('timezones')) {
    timezoneForm.selectedIndex = localStorage.getItem('timezones');
  }
};
getLocalStorage();

// Clears local storage
const clearLocalStorage = () => {
  localStorage.clear();
  emailSwitch.checked = true
  profileSwitch.checked = true
  timezoneForm.value = "Select a Timezone";
};

// Clears local storage when the cancel button is clicked
cancelBtn.addEventListener('click', (e) => {
  if (e.target.id === 'cancel')
    clearLocalStorage();
});
