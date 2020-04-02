const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const http = require('http');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

const hostname = '127.0.0.1';
const port = 3000;

const axios = require("axios");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  // console.log(`Server running at http://${hostname}:${port}/`);
});

const questions =  [
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub Username"
  },
  {
    type: "input",
    name: "email",
    message: "Enter your e-mail address"
  }
];

// My GitHub Username: MG-cpu90
    inquirer.prompt(questions).then(answers => {
      // call getGitHubProfileInfo function
        console.log(JSON.stringify(answers, null, '  '));
        getGitHubProfileInfo(answers.github, answers.email);

      });

async function getGitHubProfileInfo(user, email) {

    const { data } = await axios.get(
      `https://api.github.com/users/${user}`
    );

    data.email = email;
    
    console.log(data);

    const stringData = JSON.stringify(data, null, '  ');
  
    const result = md.render(`
    # Title 
    ## Description 
    ## Table of Contents
    ## Installationl
    ## Usage
    ## License
    ## Contributing
    ## Tests
    ## Questions
    * User GitHub profile picture: ![alt text](${data.avatar_url})
    * User GitHub profile username: ${data.login}
    * User GitHub email: ${data.email}
    `);

    console.log(result);

    fs.writeFile("readme3.md", result, function (err) {
      if (err) return console.log(err);    
    });

    console.log(data.avatar_url);
  
}

function init() {

}

init();
