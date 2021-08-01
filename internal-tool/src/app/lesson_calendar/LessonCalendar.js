import React, {useState, useEffect} from 'react';
import Day from '../Day/Day';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import NewEventModal from '../NewEventModal/NewEvenetModal';
import DeleteEventModal from '../DeleteEventModal/DeleteEvenetModal';
import { useDate } from '../Hooks/useDate';
import '../../index.css';
import moment from 'react-moment';

function LessonCalendar() {
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
    <>
    <div className="App" id="container">
      <CalendarHeader
        dateDisplay={dateDisplay}
        onNext={() => setNav(nav + 1)}
        onBack={() => setNav(nav - 1)}
      />
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
  );
};



export default LessonCalendar;