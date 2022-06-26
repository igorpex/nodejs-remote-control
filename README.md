# NodeJS websocket backend for remote control using RobotJS
> Static http server connects to backend with WebSocket.

## Installation
1. Clone/download repo
2. `npm install`

## Usage
**Development**

`npm run start:dev`

* Backend served @ `http://localhost:8080` with nodemon
* Frontend served @ `http://localhost:3000` (static files)

**Production**

`npm run start:prod`

* Backend build and then served @ `http://localhost:8080` without nodemon
* Frontend served @ `http://localhost:3000`

`npm run build`

* App just build to 'dist' folder


---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | Backend served @ `http://localhost:8080` with nodemon
`npm run start:prod` | Backend served @ `http://localhost:8080` without nodemon
Frontend served @ `http://localhost:3000`

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.