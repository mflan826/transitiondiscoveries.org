import React, { useCallback } from "react";
import {
  Edit,
  TextInput,
  required,
  DateInput,
  SimpleForm,
  ArrayInput,
  SimpleFormIterator,
  ImageField,
  ImageInput,
  Toolbar,
  useUpdate,
  useRedirect,
  useNotify,
  SaveButton,
} from "react-admin";
import CustomImageEditField from "./CustomImageEditField";
import { Config } from "../../config";
import RichTextInput from "ra-input-rich-text";

const EditPost = (props) => {
  const [update] = useUpdate("teams");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;

  const handleSave = useCallback(
    (values, redirect) => {
      const form = new FormData();
      //Grab uploaded thumbnail image
      form.append(`TeamMemberImage`, values.TeamMemberImage.rawFile);

      for (let [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
          form.append(`${key}`, `${JSON.stringify(value)}`);
        } else {
          if(value){
            form.append(`${key}`, `${value}`);
          }
        }
      }

      fetch(Config.api() + "/teams/upload", {
        // content-type header should not be specified!
        method: "POST",
        body: form,
      })
        .then((resp) => {
          console.log(resp);
          notify("ra.notification.updated", "info", {
            smart_count: 1,
          });
          redirectTo(redirect, basePath);
        })
        .catch((error) => console.log(error));
    },
    [update, notify, redirectTo, basePath]
  );

  const EditPostToolbar = ({ ...props }) => (
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
    <Edit {...props}>
      <SimpleForm variant="outlined" toolbar={<EditPostToolbar />}>
        <TextInput source="TeamMemberName" label="Name" validate={[required()]} fullWidth={true}  />
        <TextInput source="TeamMemberJobTitle" label="Designation" validate={[required()]} fullWidth={true} />
        <TextInput source="slug"  label="Slug" validate={[required()]}/>
        <ImageInput
          source="TeamMemberImage"
          label="Profile Picture"
          accept="image/png, image/jpg, image/jpeg"
          maxSize={5000000}
          validate={required()}
        >
          <CustomImageEditField source="title" title="Profile Picture" />
        </ImageInput>
        <RichTextInput
          source="bio_content"
          label="Work Information"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <RichTextInput
          multiline
          source="bio_content2"
          label="Short Bio"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <RichTextInput
          multiline
          source="bio_content3"
          label="Detailed Bio"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <TextInput source="fbLink"  label="Facebook"/>
        <TextInput source="twLink" label="Twitter"/>
        <TextInput source="InstaLink" label="Instagram" />
        <TextInput source="LinkedInLink" label="LinkedIn" />
      </SimpleForm>
    </Edit>
  );
};

export default EditPost;
