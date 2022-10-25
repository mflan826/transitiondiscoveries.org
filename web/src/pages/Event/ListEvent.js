import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton,
  DateField,
  SelectField, 
  useListContext,
  DeleteButton 
} from "react-admin";
import EventCalendar from './CustomeEventData';
import { Config } from "../../config";
class ListEvent extends Component {

  componentDidMount() {
    document.title = Config.app.name + " - Event";
  }
  

  render() {
    return ( 
      <>
        <EventCalendar  {...this.props}/>
        <List {...this.props} exporter={false} bulkActionButtons={false}>
          <Datagrid>
            <TextField source="title" />
            <TextField label="Event Location" source="event_place" />
            <DateField source="start_date" />
            <TextField source="start_time" />
            <DateField source="end_date" />
            <TextField source="end_time" />
            <DateField source="publish_date" />
            <EditButton />      
            <DeleteButton undoable={false} />
          </Datagrid>
        </List>
      </>     
    );
  }
}
 
export default ListEvent;
