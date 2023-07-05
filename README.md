# MERN Stack Web API

This is a web API built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides the backend functionality for a web application, serving as the server-side component.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)

## Introduction

The MERN stack web API is designed to handle various HTTP requests and provide data to the front-end application. It uses MongoDB as its database, Express.js as the server framework, React.js for the client-side views, and Node.js as the runtime environment.

## Features

- RESTful API endpoints for CRUD operations.
- JSON Web Token (JWT) authentication.
- Error handling and validation.
- MongoDB as the database for storing data.

## Prerequisites

Before running the MERN stack web API, ensure you have the following dependencies installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aaavramenk0/CSE-341-project2
cd CSE-341-project2
```

2. Install the dependencies:
```bash
npm install
```

## Configuration

Create a .env file in the root directory and set the following environment variables:
```env
PORT = 8080
MONGODB_URI = mongodb+srv://oleksandr:GYoqbqOY3alrNSdp@cluster0.a6ww3rn.mongodb.net/
JWT_SECRET = GKXj2ai@P7@IX2v6Bl9kRiPg13iExrZ7@!Mwb128dX$%X3x!20
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

The server will be running at http://localhost:8080/api-docs.