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
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/login.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/edit_profile.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/profile.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/followers.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/create_post.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/share_post.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/post_page.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/notifs.png)

### Sample images of project (on small devices like phone)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/small/login.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/small/home.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/small/profile.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/small/followings.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/small/chat.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/small/share.png)
![Chat](https://raw.githubusercontent.com/pacifier121/chatocean/master/samples/images/small/notifs.png)

<br>

*I hope you like my project*

### How to run it locally?
- Have docker installed on your system
- Edit the compose.yml file and change the environment variable under api service as (Should run locally if not changed as well):
  - <code>MONGO_URL="Connection string of some MongoDB DB present locally or remotely"</code>
- Run <code>docker compose up</code>
- Access the webapp at http://localhost:3000/ 