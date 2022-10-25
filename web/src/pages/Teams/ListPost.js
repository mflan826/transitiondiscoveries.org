import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  EditButton,
  ShowButton,
  ImageField,
  CreateButton,
  DeleteButton
} from "react-admin";
import CustomImageField from "./CustomImageField";

import PublishButton from "./PublishButton";
import { Config } from "../../config";

const createButtonStyle ={
  margin:"0 1rem",
  paddingLeft:"1rem",
  paddingRight:"1rem",
  paddingTop: "0px"
}

const publishStyle = {
  margin:"0 1rem",
  border:"1px solid #303f9f",
  paddingLeft:"1rem",
  paddingRight:"1rem"
}
const   TeamMemberActions = (props) => (

  <TopToolbar>
    <CreateButton  style={createButtonStyle} {...props}></CreateButton>
    <PublishButton style={publishStyle} />
  </TopToolbar>
);
class ListPost extends Component {
  componentDidMount() {
    document.title = Config.app.name + " - Post";
  }

  render() {
    return (
      <List {...this.props} actions={<TeamMemberActions/>}  exporter={false} bulkActionButtons={false}>
         <Datagrid>
          <TextField source="TeamMemberName"  label="Name"/>
          <TextField source="TeamMemberJobTitle" label="Designation"/>
          <CustomImageField source="TeamMemberImage" label="Profile Picture" />
          {/* <ImageField source="TeamMemberImage.src" label="Image"></ImageField> */}
          <EditButton />
          <DeleteButton undoable={false} />
        </Datagrid>

      </List>


    );
  }
}
export default ListPost;
