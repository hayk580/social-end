import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";
import axios from 'axios';
import { BACKEND_SERVER_DOMAIN } from '../../../settings';
class Scheduler extends Component {



state =  {

    persons: []
}

    
componentDidMount() {
    const setToekn = localStorage.getItem('state')
    const jsonToken = JSON.parse(setToekn)
    const Token = jsonToken.user.access_token
    let config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' +  Token,   
        },
    };
    axios
        .get(BACKEND_SERVER_DOMAIN + "/getschedules/all/", config)
        .then((res) => {
            const persons = res.data
            this.setState({ persons })
        })
        .catch(function(error) {
            console.log(error)
        });
    
    }

    constructor(props) {
        super(props);
        
        
        this.state = {
            startDate: "2021-06-01",
            days: 31,
            scale: "Day",
            timeHeaders: [
                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}
            ],
            cellWidthSpec: "Auto",
            cellWidth: 50,
            resources: [
                {name: "երկուշաբթի", id: "A"},
                {name: "երեքշաբթի", id: "B"},
                {name: "չորեքշաբթի", id: "C"},
                {name: "հինգշաբթի", id: "D"},
                {name: "ուրբաթ", id: "E"},
                {name: "շաբաթ", id: "F"},
                {name: "կիրակի", id: "G"}
            ],

            // events: [
            //     {id: 1, text: "Դաս 1", start: "2021-11-07", end: "2021-11-07", resource: "A" },
            //     {id: 2, text: this.props.propss, start: "2021-11-04", end: "2021-11-04", resource: "A" },

            // ]

            events: this.props.scheduler
        };

    }

    zoomChange(args) {
        switch (args.level) {
            case "month":
                this.setState({
                    startDate: new DayPilot.Date("2021-06-01").firstDayOfMonth(),
                    days: new DayPilot.Date("2021-06-01").daysInMonth(),
                    scale: "Day"
                });
                break;
            case "week":
                this.setState({
                    startDate: new DayPilot.Date("2021-06-01").firstDayOfWeek(),
                    days: 7,
                    scale: "Day"
                });
                break;
            default:
                throw new Error("Invalid zoom level");
        }
    }

    cellWidthChange(ev) {
        const checked = ev.target.checked;
        this.setState({
            cellWidthSpec: checked ? "Auto" : "Fixed"
        });
    }

    render() {
        const {...config} = this.state;
        return (
            <div>

                <div className="toolbar">
                    <Zoom onChange={args => this.zoomChange(args)} />
                    <span className="toolbar-item"><label><input type="checkbox" checked={this.state.cellWidthSpec === "Auto"} onChange={ev => this.cellWidthChange(ev)} /> Auto width</label></span>
                </div>

                <DayPilotScheduler
                  {...config}
                  onEventMoved={args => {
                      console.log("Event moved: ", args.e.data.id, args.newStart, args.newEnd, args.newResource);
                      this.scheduler.message(args.e.data.text + " տեղափողծ է: ");
                  }}
                  onEventResized={args => {
                      console.log("Event resized: ", args.e.data.id, args.newStart, args.newEnd);
                      this.scheduler.message("Event resized: " + args.e.data.text);
                  }}
                  onTimeRangeSelected={args => {
                    DayPilot.Modal.prompt("New event name", "Event").then(modal => {
                      this.scheduler.clearSelection();
                      if (!modal.result) {
                        return;
                      }
                      this.scheduler.events.add({
                        id: DayPilot.guid(),
                        text: modal.result,
                        start: args.start,
                        end: args.end,
                        resource: args.resource
                      });
                    });
                  }}
                  ref={component => { this.scheduler = component && component.control; }}
                />
            </div>
        );
    }
}

export default Scheduler;
