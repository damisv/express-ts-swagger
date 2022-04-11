# Senior Software Engineer Assignment – Node Express Project

Hello !

## Main Project Requirements:

- [ ] Basic JWT Authentication: ability to log in as administrator
- [x] Use Node, Express Sequelize, JWT
- [x] Create Express routing to demonstrate CRUD functionality (Create / Read / Update / Delete) for two API items: Companies and Employees 
- [ ] Use Express validation middleware to demonstrate basic payload validation
- [x] Use Express middleware to enforce authorization
- [x] Demonstrate the use of DB transactions where applicable  
- [x] Companies DB table consists of these fields: Name (required), email, phone, website
- [x] Employees DB table consists of these fields: First name (required), last name (required), Company (foreign key to Companies), email, phone
- [ ] Create Integration tests for all API’s, all tests should pass. Use Jest or Mocha.
- [x] Create a professional README with instructions on how to install and test
- [x] Project to be uploaded to GitHub so the source code can be reviewed when finished.

## Developed features

The project has been developed minimally due to time constraints.
I've chosen to pay more attention to automated Swagger documentation, since this is something that I haven't been exposed yet and never tried before this project.


## Missing features
- Basic payload validation: This is easily done through various solutions ( middlewares, directly on controller etc ), but I've wanted to approach it through the `tsoa` package which helps with automated swagger documentation. However, I've yet to see how it enforces strict type validation..
- Create integration tests
- Basic JWT Authentication
- Errors Handling

## Usage
In order to run it as it is, you need `Docker` installed.

Afterwards you can just run the following command while being in the project folder:
```bash
docker-compose up
```

This will spin up a PostgreSQL database instance, swagger-ui and the express-server.

- swagger: http://localhost:8080/
- express-server: http://localhost:3000/

## API

I've attached a POSTMAN collection along here, for easier usage.
</br>
You need a valid JWT token, with `admin` scopes in order to have access to methods. For this, I've already included a pre-request script to each method on postman collection, which adds a `x-access-token` header with a valid JWT.