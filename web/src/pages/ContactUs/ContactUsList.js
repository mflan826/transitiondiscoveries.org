import React, { Component } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
} from 'react-admin';

import CustomTextFieldForContact from "./CustomTextFieldForContact";


import { Config } from '../../config';

class ContactUsList extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - ContactUs';
  }

  render() {
    return (
      <List {...this.props} title="Inquiries" sort={{ field: 'publish_date', order: 'DESC' }}>
        <Datagrid>
          <TextField source="name" />
          <TextField type="email" source="email" />
          <TextField source="phone" />
          <TextField source="subject" />
          <CustomTextFieldForContact source="iam" label="I am"/>
          <CustomTextFieldForContact source="interests" label="Interests"/>
          <TextField source="message" />
          <DeleteButton undoable={false} />
          {/* <EditButton />
          <ShowButton /> */}
        </Datagrid>
      </List>
    );
  }
}

export default ContactUsList;