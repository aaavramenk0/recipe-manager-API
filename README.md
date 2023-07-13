# MERN Stack Web API
# Recipe manager API

This is a web API built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides the backend functionality for a web application, serving as the server-side component.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Google Authentication](#google-authentication)
8. [Twitter Authentication](#twitter-authentication)
9. [Testing](#testing)
10. [Contributing](#contributing)
11. [License](#license)

## Introduction

The MERN stack web API is designed to handle various HTTP requests and provide data to the front-end application. It uses MongoDB as its database, Express.js as the server framework, React.js for the client-side views, and Node.js as the runtime environment.

## Features

- RESTful API endpoints for CRUD operations.
- JSON Web Token (JWT) authentication.
- Google OAuth 2.0 authentication integration.
- Twitter authentication integration.
- Error handling and validation.
- MongoDB as the database for storing data.
- .ejs templating for the frontend views.

## Prerequisites

Before running the MERN stack web API, ensure you have the following dependencies installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aaavramenk0/recipe-manager-API
cd recipe-manager-API
```

2. Install the dependencies:
```bash
npm install
```

## Configuration
```env
PORT = 8080
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret

GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
GOOGLE_CALLBACK_URL = http://localhost:8080/auth/google/callback

consumerKey = your_twitter_consumer_key
consumerSecret = your_twitter_consumer_secret

token = your_token
tokenSecret = your_token_secret

SECRET_KEY = your_secret_key
```


## Usage

1. Create a swagger documentation to see all routes
```bash
npm run swagger
```

2. Start the server:
```bash
npm run start
```

The server will be running at http://localhost:8080/

## Google Authentication 

To enable Google authentication, follow these steps:    
1. Create a Google Cloud Platform project and obtain client credentials.
2. Set up the authorized redirect URIs in the Google Cloud Platform project.
3. Set the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables with the obtained client credentials.

## Twitter Authentication

To enable Twitter authentication, follow these steps:
1. Create a Twitter Developer Account and create a Twitter App.
2. Obtain the consumer key, consumer secret, and callback URL for your Twitter App.
3. Set the TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, and TWITTER_CALLBACK_URL environment variables with the obtained values.

## Testing
The project utilizes the Jest framework for writing and executing tests, providing a robust and efficient testing experience.

- Running the Tests /br
To run the test suite, follow these steps:
1. Ensure that all dependencies are installed by running ```bash npm install ```.
2. Execute the command ```bash npm test ``` in the terminal.
3. Jest will run the test suite and display the results in the console.

- Test Coverage /br
The project aims to achieve comprehensive test coverage to ensure that critical components and functionalities are thoroughly tested. Jest provides built-in code coverage reports, allowing you to assess the extent of test coverage.

To generate a code coverage report, run the following command:
``` bash
npm test -- --coverage
```

Jest will generate a detailed coverage report and store it in the coverage directory. Open the HTML report in a browser to view the specific coverage details, including which lines of code are covered by tests and which are not.

## Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

## License
Please make sure to customize the README file according to your project's specific details, such as the project name, repository URL, API endpoints, and other relevant information. Also, update the installation and configuration steps to match your specific project setup.
