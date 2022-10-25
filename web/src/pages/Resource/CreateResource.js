import React, { useCallback } from "react";
import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  FileInput,
  FileField,
  ArrayInput,
  SelectInput,
  SelectArrayInput,
  ImageInput,
  ImageField,
  FormDataConsumer,
  SimpleFormIterator,
  DateInput,
  useCreate,
  useRedirect,
  useNotify,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-final-form";
import { Config } from "../../config";
import {  
  getAllIndicators,
  getAllSubIndicators,
  getAllPreEmploymentTransitionServices,
  getAllResourceTypes,
  getAllContentTypes,
  getAllFacilitatorTypes,
} from "../../helper";

const useStyles = makeStyles({
  root : { width: "60%", },
});
const curr = new Date();
curr.setDate(curr.getDate());
const date = curr.toISOString().substr(0,10);
const CreateResource = (props) => {
  const [create] = useCreate("resources");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;
  const classes = useStyles();

  //const finalForm = useForm();

  const indicators = getAllIndicators();
  const subIndicators = getAllSubIndicators();
  const preEmploymentTransitionServices = getAllPreEmploymentTransitionServices();
  const resourceTypes = getAllResourceTypes();
  const contentTypes = getAllContentTypes();
  const facilitatorTypes = getAllFacilitatorTypes();

  const handleSave = useCallback(
    (values, redirect) => {

      const form = new FormData();

      //Grab uploaded thumbnail image
      if(values.thumbnail){
        if(values.thumbnail.rawFile){
          form.append(`thumbnail`, values.thumbnail.rawFile);
        }
      }

      //Grab uploaded file
      if(values.files){
        if(values.files.rawFile){
          form.append(`file`, values.files.rawFile);
        }
      }
      
      for (let [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
          form.append(`${key}`, `${JSON.stringify(value)}`);
        } else {
          form.append(`${key}`, `${value}`);
        }
      }
      debugger
      fetch(Config.api() + "/Resources/upload", {
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

  const ResourceCreateToolbar = ({ ...props }) => (
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

  const getSubIndicatorsFor = (indicatorIds) => {
    var filtered = [];
    if(indicatorIds){
       filtered = subIndicators.filter(f => indicatorIds.includes(f.indicator_id));
    }
    return filtered;
  };

  return (
    <Create {...props}>
      <SimpleForm toolbar={<ResourceCreateToolbar />}>
        <TextInput className={classes.root} source="name" validate={[required()]} variant="outlined" />
        {/* <TextInput className={classes.root} source="path" validate={[required()]} variant="outlined" /> */}
        <ImageInput
          className={classes.root}
          source="thumbnail"
          label="Thumbnail"
          accept="image/*"
          validate={[required()]}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <SelectArrayInput
          className={classes.root}
          source="indicator"
          label="Framework"
          validate={[required()]}
          choices={indicators}
          optionText="title"
          optionValue="id"
          variant="outlined"
        />
        <FormDataConsumer
          className={classes.root}
        >
          {({ formData, ...rest }) =>{
            return (
                <SelectArrayInput
                className={classes.root}
                source="subindicator"
                label="Sub Indicator"
                validate={[required()]}
                choices={getSubIndicatorsFor(formData.indicator) }
                optionText="title"
                optionValue="id"
                variant="outlined"
                {...rest}
                />
            );
          }}
        </FormDataConsumer>
        <SelectArrayInput
          className={classes.root}
          source="preemploymenttransitionservices"
          label="Pre-employment Transition Services"
          // validate={[required()]}
          choices={preEmploymentTransitionServices}
          optionText="title"
          optionValue="id"
          variant="outlined"
        />
        <SelectArrayInput
          className={classes.root}
          source="resourcetypes"
          label="Resource Types"
          validate={[required()]}
          choices={resourceTypes}
          optionText="title"
          optionValue="id"
          variant="outlined"
        />
         <SelectInput 
          source="contenttype"
          label="Content Type"
          validate={[required()]}
          variant="outlined"
          choices={contentTypes}
          optionText="name"
          optionValue="id"
          defaultValue={"detailed_description"}
        />
        <FormDataConsumer>
        {({ formData, ...rest }) =>
            formData.contenttype == "detailed_description" &&
            // <TextInput
            //   multiline
            //   source="description"
            //   rows={4}
            //   variant="outlined"
            //   fullWidth
            // />
            <RichTextInput
              source="description"
              label="Description"
              toolbar={toolbarOptions}
              validate={[required()]}
            />
            
          }
        </FormDataConsumer>
        <FormDataConsumer>
        {({ formData, ...rest }) =>
            formData.contenttype == "external_link" &&
            <TextInput
              multiline
              source="external_link"
              label="Other Website Link"
              variant="outlined"
              fullWidth
            />
        }
        </FormDataConsumer>
        <FormDataConsumer>
        {({ formData, ...rest }) =>
            ( formData.contenttype == "pdf" ||formData.contenttype == "video" ) &&
            <FileInput
              source="files"
              label="Files"
              accept="application/pdf,video/*"
              variant="outlined"
              validate={[required()]}
            >
              <FileField source="src" title="title" variant="outlined" />
            </FileInput>
        }
        </FormDataConsumer>
        {/* <FileInput
          source="files"
          label="Files"
          accept="application/pdf,video/*"
          variant="outlined"
          validate={[required()]}
        >
        <FileField source="src" title="title" variant="outlined" />
        </FileInput>
        <TextInput
          multiline
          source="description"
          rows={4}
          variant="outlined"
          fullWidth
        /> */}
        <SelectArrayInput
          className={classes.root}
          source="facilitators"
          label="Leader/Facilitator"
          validate={[required()]}
          variant="outlined"
          choices={facilitatorTypes}
          optionText="name"
          optionValue="id"
        />
        <SelectArrayInput
          className={classes.root}
          source="targetaudience"
          label="Target Audience"
          validate={[required()]}
          variant="outlined"
          choices={facilitatorTypes}
          optionText="name"
          optionValue="id"
        />
        <ArrayInput source="tags" variant="outlined">
          <SimpleFormIterator>
            <TextInput label="Tag" variant="outlined" />
          </SimpleFormIterator>
        </ArrayInput>
        <DateInput label="Publish date" source="publish_date" options={{ format: 'DD/MM/YYYY' }} defaultValue={date}/>
      </SimpleForm>
    </Create>
  );
};

export default CreateResource;
