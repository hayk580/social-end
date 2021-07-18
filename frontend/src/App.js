import Index from './components/home/Index';
import homework from './components/dashboard/homework'
import LogIn from './components/home/LogIn';
import Dashboard from './components/dashboard/Index';
import Friends from './components/dashboard/friends/Friends';
import Groups from './components/dashboard/group/Groups';
import Course from './components/dashboard/course/Cours'
import Category from './components/dashboard/category/Category';
import Course_modules from './components/dashboard/course_module/Cours_module';
import Schedules from './components/dashboard/schedules/Schedules'
import CreateHomework from './components/dashboard/group/Creategroup'
import FindFriends from './components/dashboard/friends/FindFriends';
import Profile from './components/dashboard/profile/Profile'
import PostPage from './components/dashboard/post/PostPage'
import SchedulePage from './components/dashboard/schedules/SchedulePage'
import CoursePage from './components/dashboard/course/CoursePage'
import Course_modulePage from "./components/dashboard/course_module/Course_modulePage";
import GroupPage from './components/dashboard/group/GroupPage'
import Questions from './components/dashboard/question/Question';
import Scheduler from "./components/dashboard/scheduler/Scheduler";
import HomeworkPage from './components/dashboard/homework/Singl'
import { AuthProvider } from './auth/AuthContext';
import { ChatProvider } from './context/chat/ChatContext';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './router/AppRouter';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

function App() {

  return (
    
    <Router>
        <ChatProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChatProvider>
      <Switch>
        <Route path='/findfriends' exact component={FindFriends} />
        <Route path='/homework' exact component={homework} />
        <Route path='/friends' exact component={Friends} />
        <Route path='/scheduler' exact component={Scheduler} />
        <Route path='/group' exact component={Groups} />
        <Route path='/course' exact component={Course} />
        <Route path='/category' exact component={Category} />
        <Route path='/qestions' exact component={Questions} />
        <Route path='/course_module' exact component={Course_modules} />
 
        <Route path='/schedules' exact component={Schedules} />
        <Route path="/create-group" exact component={CreateHomework} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/login' exact component={LogIn} />
        <Route path='/' exact component={Index} />
        <Route path='/u/:slug' render={(props) => <Profile {...props} key={(Math.random() * 10)}/>} />
        <Route path='/post/:post_id' render={(props) => <PostPage {...props} key={(Math.random() * 10)}/>} />
        <Route path='/schedule/:schedule_id' render={(props) => <SchedulePage {...props} key={(Math.random() * 10)}/>} />
        <Route path='/course/:course_id' render={(props) => <CoursePage {...props} key={(Math.random() * 10)}/>} />
        <Route path='/homework/:slug' render={(props) => <HomeworkPage {...props} key={(Math.random() * 10)}/>} />
s        {/* <Route path='/course_module/:course_module_id' render={(props) => <Course_modulePage {...props} key={(Math.random() * 10)}/>} /> */}

        <Route path='/group/:group_id' render={(props) => <GroupPage {...props} key={(Math.random() * 10)}/>} />

        <Redirect from='*' to='/' />
      </Switch>
    </Router>
  );
}

export default App;
