
# calisthenics-tracker-api

This is the api for a fullstack MERN app. This
 webapp allows a user to track what calisthenics skills they
have been able to achieve or accomplish. The inspiration comes
from a map of "100 Places to go Before I DIe" in which you can
scratch off a gray layer of a certain place, revealing a cool
little design underneath. This is meant to be a virtual way
to do that but for calisthenics skills. I hope to eventually
expand it from calisthenics to all strength feats.

## Authors

- [@danielventura](https://github.com/Dvent1123)
- [@brentynhanna](https://github.com/Brehtyn)

  
## Demo

   - [Exercise Map Hub](exercisemaphub.com)

## Tech Stack

**Client:** React, SCSS, Axios

**Server:** Node, Express, MongoDB, JwT

  
## Function Reference

#### userSignupValidator()
Uses express-validator to validate the data received from
the client. It checks the name, email, and password parameters.

#### userSigninValidator()
Uses express-validator to validate data as above but only with
email and password. Both the functions are used as middleware.

#### runValidation(req,res, next)
Checks the results of validators using express-validator. 
If errors exist it returns 422 status if no errors exists
it continues execution.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`PORT`

`CLIENT_URL`

`DATABASE`

`JWT_SECRET`


  
## Deployment
Deployment was done on Digital Ocean through
and Ubuntu droplet. The server deployment is similar
to the Client

To deploy this project:

SSH into your Digital Ocean Droplet using
```bash
ssh admin@DropletIP
```
Use sudo to clone the respository
```bash
sudo git clone @RepositoryLink
```
```bash
sudo npm install
```

You must still configure NGINX and PM2 for this project to
work on your server.
  
## Run Locally

Make a directory for the project or cd into the project
directory that was made while cloning the client.

```bash
mkdir my-project
```

AND/OR

Go to the project directory

```bash
  cd my-project
```

Clone the project into the project directory

```bash
  git clone https://github.com/Dvent1123/calisthenics-tracker-api.git
```

Install dependencies

```bash
  npm install
```

Start the project

```bash
  npm start
```

  
