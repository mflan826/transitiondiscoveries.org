import React, { Component, useCallback } from "react";
import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  SelectInput,
  ImageField,
  ImageInput,
  useCreate,
  useRedirect,
  useNotify,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

import { Config } from "../../config";

const CreateStory = (props) => {
  const [create] = useCreate("story_listings");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;

  const handleSave = useCallback(
    (values, redirect) => {
      debugger;

      const form = new FormData();
      //Grab uploaded thumbnail image
      form.append(`thumbnail`, values.thumbnail.rawFile);

      for (let [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
          form.append(`${key}`, `${JSON.stringify(value)}`);
        } else {
          form.append(`${key}`, `${value}`);
        }
      }

      fetch(Config.api() + "/story_listings/upload", {
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

  const CreateStoryToolbar = ({ ...props }) => (
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
        toolbar={<CreateStoryToolbar />}
        redirect="list"
        variant="outlined"
      >
        <TextInput source="title" validate={[required()]} fullWidth={true} />
        <ImageInput
          source="thumbnail"
          label="Image"
          accept="image/png, image/jpg, image/jpeg"
          maxSize={5000000}
          validate={[required()]}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <RichTextInput
          multiline
          source="body"
          label="Story Description"
          toolbar={toolbarOptions}
          validate={[required()]}
        />

        <TextInput source="video_link" label="Video link" />
        <DateInput label="Publish date" source="publish_date" />
        <TextInput source="author" />

        <ArrayInput source="tags">
          <SimpleFormIterator>
            <TextInput label="Tag" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default CreateStory;
