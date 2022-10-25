import React, { useCallback } from "react";
import {
  Edit,
  TextInput,
  required,
  DateInput,
  SimpleForm,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  useRedirect,
  useUpdate,
  useNotify,
  Toolbar,
  SaveButton,
  ImageInput,
  ImageField,
  DeleteButton
} from "react-admin";
import CustomImageEditField from "./CustomImageEditField";
import RichTextInput from "ra-input-rich-text";
import { Config } from "../../config";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
  },
});
const EditStory = (props) => {
  const [update] = useUpdate("story_listings");
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
          notify("ra.notification.updated", "info", {
            smart_count: 1,
          });
          redirectTo(redirect, basePath);
        })
        .catch((error) => console.log(error));
    },
    [update, notify, redirectTo, basePath]
  );

  const EditStoryToolbar = ({ ...props }) => (
    <Toolbar {...props} classes={useStyles()}>
      <SaveButton
        label="Save"
        redirect="list"
        submitOnEnter={true}
        onSave={handleSave}
      />

      <DeleteButton 
        undoable={false}
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
      <SimpleForm variant="outlined" toolbar={<EditStoryToolbar />}>
        <TextInput source="title" validate={required()} />
        <ImageInput
          source="thumbnail"
          label="Image"
          accept="image/png, image/jpg, image/jpeg"
          maxSize={5000000}
          validate={[required()]}
        >
          <CustomImageEditField source="title" title="images" />
        </ImageInput>
        <RichTextInput
          source="body"
          label="Story Description"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <TextInput source="video_link" label="Video link" />
        <DateInput label="Publish date" source="publish_date" />
        <TextInput source="author" />
        <ArrayInput source="tags" variant="outlined">
          <SimpleFormIterator>
            <TextInput label="Tag" variant="outlined" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default EditStory;
