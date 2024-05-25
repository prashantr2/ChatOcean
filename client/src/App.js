import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./components/Feed/Feed";
import Layout from "./pages/Layout";
import Profile, { FollowersContent, FollowingsContent, PostsContent, StoriesContent, VideosContent, FavoritesContent } from "./pages/Profile";
import Stories from "./pages/Stories";
import ChatPage from "./pages/ChatPage";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import PostPage from "./pages/PostPage";
import StoryPage from "./pages/StoryPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { tryLogin } from "./store/auth";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import EditProfile from './components/Profile/EditProfile';
import { connectSocket } from "./store/chat";
import PageNotFound from "./pages/PageNotFound";


function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const { user } = useSelector(state => state.auth); 
  const dispatch = useDispatch();
  
  useEffect(() => {
      if (user) dispatch(connectSocket(user));
  }, [user])

  return (
    <Routes>
      <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> :  <Login />} />
      <Route path="/register" element={ isLoggedIn ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={ !isLoggedIn ? <Navigate to="/login" /> : <ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
                <Route index element={<Feed type="user-home" /> } />
                <Route path="stories" element={ <Stories /> } />
                <Route path="chat/:chatName" element={ <ChatPage /> } />
                <Route path="profile/:username" element={ <Profile /> } >
                    <Route index element={<Navigate to="posts" replace />} /> 
                    <Route path="posts" element={<PostsContent />} /> 
                    <Route path="videos" element={<VideosContent />} /> 
                    <Route path="stories" element={<StoriesContent />} /> 
                    <Route path="followers" element={<FollowersContent />} /> 
                    <Route path="followings" element={<FollowingsContent />} /> 
                    <Route path="edit" element={<EditProfile />} /> 
                    <Route path="favorites" element={<FavoritesContent />} /> 
                </Route>
                <Route path="post/:postId" element={ <PostPage /> } />
                <Route path="notifications" element={ <Notifications /> } /> 
            </Route>
            <Route path="/story/:storyId" element={ <Layout storyMode={true} />} >
                <Route index element={<StoryPage />} />
            </Route>
      </Route>
      <Route path="/*" element={ <PageNotFound /> } />
    </Routes>

  );
}

export default App;
