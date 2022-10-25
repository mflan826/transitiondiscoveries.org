import React, { Component, useCallback } from "react";
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
      debugger;
      
      const form = new FormData();
      //Grab uploaded thumbnail image
      form.append('TeamMemberImage', values.TeamMemberImage.rawFile);

      for (let [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
          form.append(`${key}`, `${JSON.stringify(value)}`);
        } else {
          form.append(`${key}`, `${value}`);
        }
      }

      fetch(Config.api() + "/teams/upload", {
        // content-type header should not be specified!
        method: "POST",
        body: form,
      })
        .then((resp) => {
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
        <TextInput source="TeamMemberName" id="Name" label="Name" validate={[required()]} fullWidth={true} />
        <TextInput source="TeamMemberJobTitle" label="Designation" validate={[required()]} fullWidth={true} />
        <TextInput source="slug"  label="Slug" validate={[required()]}/>
        <ImageInput
          source="TeamMemberImage"
          label="Profile Picture"
          accept="image/png, image/jpg, image/jpeg"
          maxSize={5000000}
          validate={[required()]}
        >
          <ImageField source="TeamMemberImage" title="Profile Picture" />
        </ImageInput>
        <RichTextInput
          multiline
          source="body"
          label="Work Information"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <RichTextInput
          multiline
          source="body2"
          label="Short Bio"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <RichTextInput
          multiline
          source="body3"
          label="Detailed Bio"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <TextInput source="fbLink" label="Facebook" />
        <TextInput source="twLink" label="Twitter" />
        <TextInput source="InstaLink"  label="Instagram"/>
        <TextInput source="LinkedInLink"  label="LinkedIn"/>
      </SimpleForm>
    </Create>
  );
};

export default CreatePost;
