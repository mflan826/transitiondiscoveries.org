import React, { useCallback } from "react";
import axios from "axios"
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
   

    axios.put(Config.api() + "/managepages",
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
        <TextInput source="PageName" id="Page Name" label="Page Name" validate={[required()]} fullWidth={true} />
        <TextInput source="BannerText" id="BannerText" label="BannerText" validate={[required()]} fullWidth={true} />
        <TextInput source="ReachUs" id="ReachUs" label="Reach Us" validate={[required()]} fullWidth={true} />
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
    </Edit>
  );
};

export default EditPost;
