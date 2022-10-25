import React, { Component, useCallback } from "react";
import axios from "axios"
import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  ImageField,
  ImageInput,
  useCreate,
  useRedirect,
  useNotify,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

import { Config } from "../../config";

const CreatePost = (props) => {



  const [create] = useCreate("teams");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;

  const handleSave = useCallback(
    (values, redirect) => {
      // debugger;
      console.log(values);
      
      axios.post(Config.api() + "/managepages",
         values
      ).then((resp) => {
        console.log(resp);
        notify("ra.notification.created", "info", {
          smart_count: 1,
        });
        redirectTo(redirect, basePath);
      })
      .catch((error) => console.log(error));
    },
    [create, notify, redirectTo, basePath]
  );

  const CreatePostToolbar = ({ ...props }) => (
    <Toolbar {...props}>
      <SaveButton
        label="Save"
        redirect="list"
        submitOnEnter={true}
        onSave={handleSave}
      />
    </Toolbar>
  );

  const toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["bold", "italic", "underline"], // toggled buttons

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ script: "sub" }, { script: "super" }], // superscript/subscript

    ["blockquote", "code-block"],
    ["clean"], // remove formatting button
  ];

  return (
    <Create {...props}>
      <SimpleForm
        toolbar={<CreatePostToolbar />}
        redirect="list"
        variant="outlined"
      > 
        <TextInput source="PageName" id="Page Name" label="Page Name" validate={[required()]} fullWidth={true} />
        <TextInput source="BannerText" id="BannerText" label="BannerText" validate={[required()]} fullWidth={true} />
       
        <TextInput source="ReachUs" id="ReachUs" label="Reach Us"   validate={[required()]} fullWidth={true} />
        <RichTextInput
          multiline
          source="LocateUs"
          id="LocateUs"
          label="Locate Us"
          
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <TextInput source="FormHeading" id="FormHeading" label="Form heading" validate={[required()]} fullWidth={true} />
        <TextInput source="FormSubHeading" id="FormSubHeading" label="Form sub-heading" validate={[required()]} fullWidth={true} />
        <TextInput source="MapSource" id="MapSource" label="Map source" validate={[required()]} fullWidth={true} />
      </SimpleForm>
    </Create>
  );
};

export default CreatePost;
