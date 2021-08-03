import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from './shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Course = lazy(()=> import('./course/Course'))
const LessonCalendar = lazy(()=> import('./lesson_calendar/LessonCalendar'))

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const TrelloTaskBoard = lazy(() => import('./TrelloTaskBoard/TrelloTaskBoard'))

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const Lesson_Schedule = lazy(() => import('./lesson_schedule/LessonSchedule'))

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

const CoursePage = lazy(() => import('./course_page/Course_page'));
 
const CourseModule = lazy(()=> import('./course_module_page/Course_module_page'));

const SingleCoursePage = lazy(() => import('./single_course_page /Single_course_page'))

const Group = lazy(() => import('./group/Group'))


const GroupPage = lazy(() => import('./group_page/GroupPage'))


const LessonPage = lazy(() => import('./lesson_page/LessonPage'))

const Payment = lazy(() => import('./payment-system/Payment'))

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/course" component={ Course } />
          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
            
          <Route path="/basic-ui/typography" component={ Typography } />
         
         <Route path="/lesson_calendar" component={LessonCalendar} />
         <Route path="/CoursePage" component={CoursePage} />
         <Route path="/lesson_schedule" component={Lesson_Schedule} />

         {/* <Route path="/SingleCoursePage" component={SingleCoursePage} /> */}
         <Route path="/CourseModule" component={CourseModule} />
      {/* <Route path="/task_board" component={TrelloTaskBoard} /> */}

          <Route path="/Group" component={Group} />
          <Route path="/GroupPage" component={GroupPage} />
          <Route path="/LessonPage" component={LessonPage} />
           
           <Route path="/Payment" CourseModule={Payment} />
 
          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/icons/mdi" component={ Mdi } />

          <Route path="/charts/chart-js" component={ ChartJs } />


          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Route path='/SingleCoursePage/:slug' render={(props) => <SingleCoursePage {...props} key={(Math.random() * 10)}/>} />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;