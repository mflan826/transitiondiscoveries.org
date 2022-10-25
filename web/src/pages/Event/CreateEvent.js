import React, { Component, useCallback, useEffect, useState } from "react";
import {
  Create,
  Edit,
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
  useNotify
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

import { Config } from "../../config";
import moment from "moment";
import EventsDataObject from '../../util/eventsData';
let time = {
  start_time: '',
  end_time: ''
}
const CreateEvent = (props) => {
  debugger
  let selectedDate = EventsDataObject.getEventParamOption();
  const [date, setDate] = useState(new Date(selectedDate.start));
  const [start_time, setStartTime] = useState();
  const [end_time, setEndTime] = useState();
  const [loader, setLoader] = useState(false);
  const [create] = useCreate("events");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;

  useEffect(() => {
    debugger
    let selectedDate = EventsDataObject.getEventParamOption();
    console.log('selectedDate#', selectedDate.start)

    setDate(new Date(selectedDate.start));
  }, []);


  const handleSave = useCallback(
    (values, redirect) => {
      debugger
      setLoader(true);
      console.log("time object", time)
      values.start_time = time.start_time;
      values.end_time = time.end_time;
      values.start_date = moment(values.start_date).format("YYYY-MM-DD"); 
      const form = new FormData();
      //Grab uploaded thumbnail image
      if (values.thumbnail && values.thumbnail.rawFile) {
        form.append(`thumbnail`, values.thumbnail.rawFile);
      }

      for (let [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
          form.append(`${key}`, `${JSON.stringify(value)}`);
        } else {
          form.append(`${key}`, `${value}`);
        }
      }

      fetch(Config.api() + "/events/upload", {
        // content-type header should not be specified!
        method: "POST",
        body: form,
      })
        .then((resp) => {
          notify("ra.notification.created", "info", {
            smart_count: 1,
          });
          setLoader(false)
          redirectTo(redirect, basePath);
        })
        .catch((error) => console.log(error));
    },
    [create, notify, redirectTo, basePath]
  );

  const handleStartTimeEvent = (e) => {
    console.log('start time', e.target.value)
    setStartTime(e.target.value)
    time.start_time = e.target.value
  }
  const handleEndTimeEvent = (e) => {
    console.log('end time', e.target.value)
    setEndTime(e.target.value)
    time.end_time = e.target.value
  }

  const CreateEventToolbar = ({ ...props }) => (
    <Toolbar {...props}>
      <SaveButton
        disabled={loader}
        label="Save"
        redirect="list"
        submitOnEnter={true}
        onSave={handleSave}
      />
      {loader ? loaderHandler() : null}
    </Toolbar>
  );
  const loaderHandler = () => {
    return (
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }
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
  console.log("####date", date)
  return (
    <Create {...props}>
      <SimpleForm
        toolbar={<CreateEventToolbar />}
        redirect="list"
        variant="outlined"
      >
        <TextInput source="title" validate={[required()]} fullWidth={true} />
        <ImageInput
          source="thumbnail"
          label="Image"
          accept="image/png, image/jpg, image/jpeg"
          maxSize={5000000}
        >
          <ImageField source="src" title="images" />
        </ImageInput>
        <RichTextInput
          multiline
          source="body"
          label="Event Description"
          toolbar={toolbarOptions}
          validate={[required()]}
        />
        <DateInput label="Start date" source="start_date" defaultValue={date} validate={[required()]} />
        <DateInput label="End date" source="end_date" />
        <label for="start_time">Start time</label>
        <input type="time" className="time-Controll" value={start_time} onChange={(e) => handleStartTimeEvent(e)} />
        <label for="end_time">End time</label>
        <input type="time" className="time-Controll" value={end_time} onChange={(e) => handleEndTimeEvent(e)} />
        {/* <TextInput label="Start time" source="start_time" validate={[required()]} />
        <TextInput label="End time" source="end_time" /> */}
        <TextInput label="Event Location" source="event_place" />

        <DateInput label="Publish date" source="publish_date" validate={[required()]} />

        <ArrayInput source="tags">
          <SimpleFormIterator>
            <TextInput label="Tag" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default CreateEvent;
