// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Fetches color data and uses it to create a chart. */
function drawChart() {
  fetch('/vote-data').then(response => response.json())
  .then((titleVotes) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Title');
    data.addColumn('number', 'Votes');
    Object.keys(titleVotes).forEach((title) => {
      data.addRow([title, titleVotes[title]]);
    });

    const options = {
      'title': 'Favorite Title',
      'width':600,
      'height':500
    };

    const chart = new google.visualization.PieChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}

/**
 * Fetches stats from the servers and adds them to the DOM.
 */
function getData() {
  fetch('/data').then(response => response.json()).then((comments) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content

    const commentsListElement = document.getElementById('data-container');
    commentsListElement.innerHTML = '';
    // for(var i = 0; i < data.comments.length; i++) {
    //     commentsListElement.appendChild(createListElement(data.comments[i]));
    // };
    comments.forEach((comment) => {
      commentsListElement.appendChild(createListElement(comment.text));
    })
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/**
 * Fetches a random greeting from the server and adds it to the DOM.
 */
function getRandomGreeting() {
  console.log('Fetching a random greeting.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/random-greeting');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addQuoteToDom().
 */
function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addQuoteToDom() function.
  textPromise.then(addGreetingToDom);
}

/** Adds a random quote to the DOM. */
function addGreetingToDom(greeting) {
  console.log('Adding greeting to dom: ' + greeting);

  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}
