import { func } from 'prop-types'
import Scheduler from './Schedul'
import axios from 'axios';
import React from "react";
import { BACKEND_SERVER_DOMAIN } from '../../../settings';


export default function(){

    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    const [isLoading, setIsLoading] = React.useState(false)
    const [datas, setData] = React.useState()
    const [scheduler, setScheduler] = React.useState([])
    // React.useEffect(() => {
    // let config = {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: 'Bearer ' +  Token,   
    //     },
    // };
    // axios
    //     .get(BACKEND_SERVER_DOMAIN + "/getschedules/all/", config)
    //     .then((res) => {
    //         setData(res.data)
    //         setIsLoading(true)
    //     })
    //     .catch(function(error) {
    //         console.log(error)
    //         setIsLoading(true)

    //     });

    // },[])
    function mondaysInMonth( m, y, d, data ) {
        var days = new Date( y,m,0 ).getDate();
        var moundays = [ 8 - (new Date( m +'/'+d+'/' + y ).getDay()) ];
        var a = [];
        var i = 0;
        var schedulers = new Set();
        for ( var i = moundays[0]; i < days; i += 7 ) {

            if(i < 10){
                a.push( "0" + i );
                // scheduler.push({id: data._id, text: data.title, start: "2021-06-" + "0" + i, end: "2021-06-" + "0" + i, resource: data.resource }) 
                schedulers.add({id: data._id, text: data.title, start: "2021-06-" + "0" + i, end: "2021-06-" + "0" + i, resource: data.resource }) 
                 
                 
            }
            else
            {
                a.push( "" + i );
            }
        }
        return a;
      }

//     if(isLoading)  
//    {

//      datas.map(data =>{

   
      
//       mondaysInMonth(6,2021, data.week_day, data)
          
       
// //   scheduler.push({id: data._id, text: data.title, start: "2021-06-" + a[number], end: "2021-06-" + a[number], resource: data.resource }) 

  

//  })


// }
    
  return(

 <div>

     <Scheduler scheduler={scheduler} />
 </div>

    )


}