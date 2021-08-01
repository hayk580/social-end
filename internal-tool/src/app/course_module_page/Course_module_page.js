  import React, {useState, useEffect} from 'react';

import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"

import { Form } from 'react-bootstrap';

import Day from '../Day/Day';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import NewEventModal from '../NewEventModal/NewEvenetModal';
import DeleteEventModal from '../DeleteEventModal/DeleteEvenetModal';
import { useDate } from '../Hooks/useDate';
import '../../index.css';
import moment from 'react-moment';
import { func } from 'prop-types';

function CourseModule() {
  function sundaysInMonth( m, y ) {
    var days = new Date( y,m,0 ).getDate();
    var sundays = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
    for ( var i = sundays[0] + 7; i < days; i += 7 ) {
      sundays.push( i );
    }
    return sundays;
  }

  function mondaysInMonth( m, y ) {
    var days = new Date( y,m,0 ).getDate();
    var mondays = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
    for ( var i = mondays[0] + 1; i < days; i += 7 ) {
      mondays.push( i );
    }
    return mondays;
  }
 
  function tuesdayInMonth( m, y ) {
    var days = new Date( y,m,0 ).getDate();
    var tuesday = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
    for ( var i = tuesday[0] + 2; i < days; i += 7 ) {
      tuesday.push( i );
    }
    return tuesday;
  }


 
  function wednesdayInMonth( m, y ) {
    var days = new Date( y,m,0 ).getDate();
    var wednesday = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
    for ( var i = wednesday[0] + 3; i < days; i += 7 ) {
      wednesday.push( i );
    }
    return wednesday;
  }


  function thursdayInMonth( m, y ) {
    var days = new Date( y,m,0 ).getDate();
    var thursday = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
    for ( var i = thursday[0] + 4; i < days; i += 7 ) {
      thursday.push( i );
    }
    return thursday;
  }


  function fridayInMonth( m, y ) {
    var days = new Date( y,m,0 ).getDate();
    var friday = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
    for ( var i = friday[0] + 5; i < days; i += 7 ) {
      friday.push( i );
    }
    return friday;
  }




  function saturdayInMonth( m, y ) {
    var days = new Date( y,m,0 ).getDate();
    var saturday = [ 8 - (new Date( m +'/01/'+ y ).getDay()) ];
    for ( var i = saturday[0] + 6; i < days; i += 7 ) {
      saturday.push( i );
    }
    return saturday;
  }
  
  // alert( sundaysInMonth( 10,2012 ) ); //=> [ 7,14,21,28 ]
   
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const sundays = sundaysInMonth(7, 2021);
  const mondays = mondaysInMonth(7, 2021);
  const tuesday = tuesdayInMonth(7, 2021);
  const wednesday = wednesdayInMonth(7, 2021)
  const thursday = thursdayInMonth(7, 2021)
  const friday = fridayInMonth(7, 2021)
  const saturday = saturdayInMonth(7, 2021)
  

  const MondayInMonth = []

  sundays.map(day => {
    MondayInMonth.push({title: "դաս", date: `7/${day}/2021`})
  })

  mondays.map(day => {
     MondayInMonth.push({title: "դաս", date: `7/${day}/2021`})
  })

  tuesday.map(day => {
    MondayInMonth.push({title: "դաս", date: `7/${day}/2021`})
 })

 wednesday.map(day => {
  MondayInMonth.push({title: "դաս", date: `7/${day}/2021`})
})


thursday.map(day => {
  MondayInMonth.push({title: "դաս", date: `7/${day}/2021`})
})



friday.map(day => {
  MondayInMonth.push({title: "դաս", date: `7/${day}/2021`})
})

saturday.map(day => {
  MondayInMonth.push({title: "դաս", date: `7/${day}/2021`})
})


  const [events, setEvents] = useState(
  
    // localStorage.getItem('events') ? 
    //   JSON.parse(localStorage.getItem('events')) : 
    //     []
    MondayInMonth
      );

 //moment js 
 
//end moment js 







  const eventForDate = date => events.find(e => e.date === date);
 

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const {days, dateDisplay} = useDate(events, nav);


    return (
      <div>
      
             
  <div className="row ">
  <div className="col-12 grid-margin">
            <div className="card"></div>
      <>
    <div className="App" id="container">
    
      <div id="weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      <div id="calendar">
        {days.map((d, index) => (
          <Day 
          key={index} 
          day={d} 
          onClick={() => {
            if (d.value !== 'padding') {
              setClicked(d.date);
            }
          }}
        />
      ))}
      </div>
      <CalendarHeader
        dateDisplay={dateDisplay}
        onNext={() => setNav(nav + 1)}
        onBack={() => setNav(nav - 1)}
      />
    </div>


    {
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
    </>
    </div>

    </div>
        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Կուրսի մոդուլում գրանցված ուսանողներ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> ուսանողի անուն  </th>
                        <th> համարը </th>
                        <th> Ընդուվելու տարեթիվը </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face1.jpg')} alt="face" />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face2.jpg')} alt="face" />
                            <span className="pl-2">Estella Bryan</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                        <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face5.jpg')} alt="face" />
                            <span className="pl-2">Lucy Abbott</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                        <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face3.jpg')} alt="face" />
                            <span className="pl-2">Peter Gill</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face4.jpg')} alt="face" />
                            <span className="pl-2">Sallie Reyes</span>
                          </div>
                        </td>
                        <td> 02312 </td>
                        <td> 04 Dec 2019 </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Կուրսի մոդուլին  մասնակից աշխատակազմ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> ուսանողի անուն  </th>
                        <th> Մասնագիտությունը </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face1.jpg')} alt="face" />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td>
                        <td> դասախոս  </td>
                        <td>
                          <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face2.jpg')} alt="face" />
                            <span className="pl-2">Estella Bryan</span>
                          </div>
                        </td>
                        <td> դասախոս </td>
                        <td>
                        <div className="badge badge-outline-success">Հաստատված է</div>
                        </td>
                      </tr>
               
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>





        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Պարտադիր ռեսուրսների ցուցակ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                       
                        <th> Վերնագիր  </th>
                        <th> հեղինակ </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                       
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">Designing Data-Intensive Applications</span>
                          </div>
                        </td>
                        <td> Martin Kleppmann  </td>
                        <td>
                          <div className="badge badge-outline-success">Տեսնել</div>
                        </td>
                      </tr>
                      <tr>
                       
                       <td>
                         <div className="d-flex">
                           <span className="pl-2">Database Internals</span>
                         </div>
                       </td>
                       <td> Alex Petrov  </td>
                       <td>
                         <div className="badge badge-outline-success">Տեսնել</div>
                       </td>
                     </tr>
               
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Լրացուցիչ ռեսուրսների ցուցակ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                       
                        <th> Վերնագիր  </th>
                        <th> հեղինակ </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                       
                        <td>
                          <div className="d-flex">
                            <span className="pl-2">Designing Data-Intensive Applications</span>
                          </div>
                        </td>
                        <td> Martin Kleppmann  </td>
                        <td>
                          <div className="badge badge-outline-success">Տեսնել</div>
                        </td>
                      </tr>
                      <tr>
                       
                       <td>
                         <div className="d-flex">
                           <span className="pl-2">Database Internals</span>
                         </div>
                       </td>
                       <td> Alex Petrov  </td>
                       <td>
                         <div className="badge badge-outline-success">Տեսնել</div>
                       </td>
                     </tr>
               
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Պրոեկտներ</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> Վերնագիր </th>
                        <th> Ղեկավար </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                        Հայկական որոնողական համակարգ
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face1.jpg')} alt="face" />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td>                        <td>
                        <div className="badge badge-outline-warning">Ընթացքի մեջ</div>
                        </td>
                      </tr>
                      <tr>
                      <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                        Մերուժ և Լյութո
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face1.jpg')} alt="face" />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td> 
                        <td>
                        <div className="badge badge-outline-success">Ավարտված</div>
                        </td>
                      </tr>


                      <tr>
                      <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                        ԱԹՍ֊ի նախագծում
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/faces/face1.jpg')} alt="face" />
                            <span className="pl-2">Henry Klein</span>
                          </div>
                        </td> 
                        <td>
                        <div className="badge badge-outline-danger">դեռ սկսված չէ</div>
                        </td>
                      </tr>
               
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div> 
    );
  }


  export default CourseModule;