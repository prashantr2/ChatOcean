# ChatOcean
### A complete Social Media Web Application
**Features:**
> You can upload a post with multiple photos, videos and description<br>
> You can like a post, give it a heart to put in favorites or share with their friends in chat<br>
> You can edit your profile to change profile picture, cover picture or name, email, password etc. or make your profile public/private<br>
> Can see your friends's posts in home feed <br>
> Chat with your online and offline friends in realtime <br>
> Search for a user and follow them / send follow request, cofirm follow requests<br>
> Fully responsive on most of the devices<br>

**Features(to be implemented):**
> OAuth using passport.js<br>
> Upload story, like and share<br>
> Dark theme<br>

### Tech Stack used
> Frontend: React, MaterialUI icons<br>
> Backend: Node.js, express.js, socket.io<br>
> Database: MongoDB<br>

### Sample video of project
[Click here to watch demo video](https://youtu.be/nsAT9Fd6M2M)

### Sample images of project
![Chat](/container/images/login.png)
![Chat](/container/images/edit_profile.png)
![Chat](/container/images/profile.png)
![Chat](/container/images/followers.png)
![Chat](/container/images/create_post.png)
![Chat](/container/images/share_post.png)
![Chat](/container/images/post_page.png)
![Chat](/container/images/notifs.png)

### Sample images of project (on small devices like phone)
![Chat](/container/images/small/login.png)
![Chat](/container/images/small/home.png)
![Chat](/container/images/small/profile.png)
![Chat](/container/images/small/followings.png)
![Chat](/container/images/small/chat.png)
![Chat](/container/images/small/share.png)
![Chat](/container/images/small/notifs.png)

<br>

*I hope you like my project*

### How to run it locally?
- Have docker installed on your system
- Edit the compose.yml file and change the environment variable under api service as:
  - <code>MONGO_URL=<Connection string of some MongoDB DB present locally or remotely></code>
- Run <code>docker compose up</code>
- Access the webapp at http://localhost:3000/ 