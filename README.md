
# calisthenics-tracker-client

This is the client or front-end for a fullstack MERN app. This
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

Insert gif or link to demo

   - [Exercise Map Hub](exercisemaphub.com)

## Tech Stack

**Client:** React, SCSS, Axios

**Server:** Node, Express, MongoDB

  
## API Reference

#### Get user information

```http
  GET /api/user/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of user |

#### Signup new user

```http
  POST /api/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `data`      | `object` | **Required**. Object with a name, email, and password as strings |

#### Signin active user

```http
  POST /api/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `object` | **Required**. Object with email and password as strings |

#### Update User

```http
  PUT /api/user/update
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `object` | **Required**. Object with name and password |

#### Update skills that are unlocked

```http
  PUT /api/user/unlock
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `array` | **Required**. Array of new skills which are unlocked |

#### Update Admin

```http
  PUT /api/admin/update
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `object` | **Required**. Object with name and password |

#### Update skills that are unlocked for admin

```http
  PUT /api/admin/unlock
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `array` | **Required**. Array of new skills which are unlocked |


#### updatedSkillArray(currentArray,skillID, unlockedSkill)

Takes in the array of currently unlocked skills, the skill Id
of the skill to be unlocked, and the unlocked skill. It returns
a new array with the skill unlocked.

#### isActive(path)

Takes in a path and returns a color for link styling.

#### setCookie(key, value)

Sets cookie from js-cookie given a key and value pair.

#### removieCookie(key)

Removes the set cookie using the key.

#### getCookie(key)

Gets the value of the cookie based on the key given.

#### setLocalStorage(key, value)

Sets local storage using a key value pair given

#### removeLocalStorage(key)

Removes local storage using the key given.

#### authenticate(res, next)

Authenticates the user on the client side using a response
then invoking the next function from express.

#### isAuth

Checks user authentication and returns the user information
if true and returns false if the user is not authenticated.

#### signout(next)
Removes cookie and local storage

#### updateUser(res, next)
Sets local storage to data from res
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API`


  
## Deployment
Deployment was done on Digital Ocean through
and Ubuntu droplet. The server.js file in here 
uses the build folder to serve static files.

To deploy this project:

SSH into your Digital Ocean Droplet using
```bash
ssh admin@DropletIP
```
Use sudo to clone the respository
```bash
sudo git clone @RepositoryLink
```
Make the build folder
```bash
sudo npm run build
```

  
## Run Locally

Make a directory for the project

```bash
mkdir my-roject
```

Go to the project directory

```bash
  cd my-project
```

Clone the project into the project directory

```bash
  git clone https://github.com/Dvent1123/calisthenics-tracker-client.git
```

Install dependencies

```bash
  npm install
```

Start the project

```bash
  npm start
```

  
## Future Features

- Chat feature so you can talk to your
  the people in your group

- Way to quickly change the status of a task

- Archive function for when admin approves a task
  and a task history/summary for the week

- Document page where teams can work on the same
  document at the same time

- Summary of Tasks left to do and where you are in
  the process of completing them.


  
