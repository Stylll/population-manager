# Population-Manager
An API that saves locations and number of resident in it

## Features
* User can create a location with the number of residents
* User can update a location
* User can delete a location
* User can view the list of locations with the number residents

## Pivotal Tracker
Project is managed using pivotal tracker management tool. You can view the board with the link below:

https://www.pivotaltracker.com/n/projects/2346610

## Requirements

* Node.js v10.x or higher
* npm
* PostgreSQL


## API Endpoints
<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>BODY PARAMS</th></tr>
<tr><td>POST</td><td>/api/v1/location</td><td>Creates a location</td><td>location, no_of_males, no_of_females</td></tr>
<tr><td>PUT</td><td>/api/v1/location/:id</td><td>Updates a location</td><td>location, no_of_males, no_of_females</td></tr>
<tr><td>DELETE</td><td>/api/v1/location/:id</td><td>Deletes a location</td><td></td></tr>
<tr><td>GET</td><td>/api/v1/location</td><td>Retrieves the list of locations</td><td></td></tr>

</table>


# Getting Started
**Via Cloning The Repository**
```
# Clone the app
git clone https://github.com/Stylll/population-manager.git

# Switch to directory
cd population-manager

# Create .env file in the root directory
touch .env
update env file with required information
use the .env.example file as a guideline

# Install Package dependencies
npm install

#Start the application
npm run start:dev

You should now be able to access the API via http://localhost:port/api/v1/
```


## Built with
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
* [NPM](https://www.npmjs.com/) - A Node Package Dependency Manager
* [PGSQL](https://www.postgresql.org/) - Opened source relational database

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

## Contributing
Population-Manager is open source and contributions are highly welcomed.

If you are interested in contributing, follow the instructions below.

* Fork the repository

* Create a new branch

* Make your changes and commit them

* Provide a detailed commit description

* Raise a pull request against staging

`Ensure your codes follow the` [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)

`See project wiki for commit message, pull request and branch naming conventions.`

`All Pull requests must be made against Develop branch. PRs against master would be rejected.`

## FAQ

* Who can contribute ?
  - This is an open source project. Contributions are welcome from everyone.

* Was any management tool used ?
  - Yes. Pivotal tracker was used. Refer to the Pivotal Tracker section above to get the link.

* Who maintains Population-Manager ?
  - I currently maintain the application. Reach out to me via email on `stephen.aribaba@gmail.com` if 
  you will like to maintain the app.


## License and Copyright

&copy; Stephen Aribaba

Licensed under the [MIT License](https://opensource.org/licenses/MIT).

