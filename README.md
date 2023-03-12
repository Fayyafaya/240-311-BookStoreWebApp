# 240-311-BookStoreWebApp
## Features

Web Applicationนี้ใช้สำหรับAdminสำหรับการจัดการร้านหนังสือonlineหลังบ้านเพื่อจัดการ update add delete หนังสือโดยจะต้องทำการloginเพื่อเข้าสู่ระบบก่อน
Web Application นี้สร้างมาจากการใช้ MERN Stack (MongoDB, Express, React, NodeJS)
- login/logout


![image](https://user-images.githubusercontent.com/126864811/224557008-23a72121-0993-495c-9857-a71e1af4cdf6.png)

- add books 


![image](https://user-images.githubusercontent.com/126864811/224557102-dbcde7a0-d713-4139-8ce3-f0498ff2214a.png)


- delete book


![image](https://user-images.githubusercontent.com/126864811/224557052-e7922847-976a-44ea-9e7b-f04f4e4e4d07.png)


- edit book


![image](https://user-images.githubusercontent.com/126864811/224557178-e5d2e336-f348-4f28-b902-ee21e150286e.png)


## MEMBERS
- 6310110301 Pornchanok Srakaew (Front end)
- 6310110646 Pittayut Jitpakdee (Front end / Back end)
- 6310110703 Nifadia Lillahkul (Back end)

## Video
[Video](https://www.youtube.com/watch?v=JlXgwgXAwSc)

## Tech Stacks and Libraries
- ReactJS
- Tailwind CSS
- PeerJS
- React-Router-DOM V6
- React-Redux, Redux-Thunk, Redux
- React-icons
- Socket.io-client
- Axios
- Moment
- NodeJS
- Express
- Peer
- Bcrypt
- Compression
- Cookie-Parser
- Cors
- Socket.io
- Dotenv
- Mongoose
- Jsonwebtoken
- Material UI (MUI)

 ## Load Tesing
- k6 code Testing 

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  let loginRes2 = http.post("http://localhost:5000/auth/login", {
    username: "admin",
    password: "admin123",
  });
  check(loginRes2, {
    "login status is 200": (r) => r.status === 200,
    "auth token is not empty": (r) => r.json("accessToken") !== "",
  });

  sleep(1);
}
