
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Config } from "../../config";
import './Events.css';
import moment from "moment";
import { Route, Redirect } from 'react-router';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";

import dayGridPlugin from "@fullcalendar/daygrid";
 
import EventsDataObject from '../../util/eventsData';
const EventCalendar = (props) => {
    const [events, setEvents] = useState([]);

    const fetchMyAPI = useCallback(async () => {
        EventsDataObject.resetEventParamOption();
        let eventList = await fetch(Config.api() + "/events")
        eventList = await eventList.json();

        eventList.map((val, index) => {
            val.start = val.start_date;
            val.end = val.end;
        });
        let m = moment().format('YYYY-MM-DD');

        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let getMonth = new Date(year, month, 0).getDate();
        let allMonthEventRender = new Array(getMonth).fill(0);
        let monthEvent = [];
        allMonthEventRender.forEach((element, ind) => {
            let index = ind == '0' ? '01' : ++ind;
            let days = year + '-' + month + '-' + index;
            let daysFormate = moment(days).format('YYYY-MM-DD');
            let newEvents = {
                start: daysFormate,
                title: 'Add New Event',
            }
            monthEvent.push(newEvents);

        });

        debugger
        eventList.map((val, index) => {
            monthEvent.map((element, ind) => {
                if (element.start === val.start_date) {
                    monthEvent.splice(ind, 1)
                }
            })

        }); 
        setEvents(monthEvent)
        let mergedEvents = eventList.concat(monthEvent)
        setEvents(mergedEvents);
    }, [])

    useEffect(() => {
        fetchMyAPI();
    }, []);

    const handleEventClick = (event) => { 
        if (event.event._def.title == "Add New Event") {
            EventsDataObject.setEventParamOption(event.event._instance.range);
            let linkEvent = "/events/create";
            props.history.push({
                pathname: linkEvent
            })
        }
        if (event.event._def.publicId) {
            let link = event.event._def.publicId;
            let linkEvent = "/events/" + link;
            props.history.push({
                pathname: linkEvent
            })
        }

    };

    const handleDateClick = (arg) => { // bind with an arrow function
        
        let linkEvent = "/events/create";
        props.history.push({
            pathname: linkEvent
        })

    }
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(e) => { handleEventClick(e) }} 
            eventRender={function (calEvent, $event) {
                console.log('calEvent', calEvent)  //this is my new field

            }}
            eventColor='#378006'
            editable={true} 
            contentHeight = 'auto'
            
        />

    )
};


export default EventCalendar;