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
  ImageInput,
  ImageField,
  SimpleFormIterator,
  useCreate,
  useRedirect,
  useNotify,
} from "react-admin";
import { Config } from "../../config";
import { parse } from "papaparse/papaparse.min";

const CreateWhatWorks = (props) => {
  const [create] = useCreate("whatworks");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;
  const subIndicatorData = [];
  const IndicatorData = [];

  const IndicatorNameMap = new Map();
  IndicatorNameMap.set("TP", "Transition Planning");
  IndicatorNameMap.set("YD", "Youth Development");
  IndicatorNameMap.set("PFDP", "Person and Family Directed Planning");
  IndicatorNameMap.set("FE", "Family Engagement");
  IndicatorNameMap.set("R", "Relationships");
  IndicatorNameMap.set("ILCE", "Independent Living and Community Engagement");
  IndicatorNameMap.set("CAC", "Cross Agency Collaboration");
  IndicatorNameMap.set("E", "Employment");
  IndicatorNameMap.set("PSE", "Post Secondary Education");

  const SubIndicatorNameMap = new Map();
  SubIndicatorNameMap.set(
    "TP_CEP",
    "Career Exploration Planning and Preparation"
  );
  SubIndicatorNameMap.set("TP_PCP", "Postsecondary and College Planning");
  SubIndicatorNameMap.set("TP_ICL", "Independent/Community Living");
  SubIndicatorNameMap.set("TP_SRS", "Significant Role of School Personnel");

  SubIndicatorNameMap.set("YD_SA", "Self-Awareness");
  SubIndicatorNameMap.set("YD_DA", "Disability Awareness");
  SubIndicatorNameMap.set("YD_ILSD", "Independent Living Skill Development");
  SubIndicatorNameMap.set("YD_SDSD", "Self-Determination Skill Development");
  SubIndicatorNameMap.set("YD_SMSD", "Self-Management Skill Development");
  SubIndicatorNameMap.set("YD_LSD", "Leadership Skill Development");
  SubIndicatorNameMap.set("YD_YET", "Youth Engagement in Transition");
  SubIndicatorNameMap.set("YD_SRA", "Significant Role of Adult");

  SubIndicatorNameMap.set(
    "PFDP_APFCPP",
    "Authentic Person and Family Centered Planning Practices"
  );
  SubIndicatorNameMap.set(
    "PFDP_PFCPD",
    "Person and Family Centered Program Design"
  );

  SubIndicatorNameMap.set(
    "FE_FETP",
    "Family Engagement in Transition Planning"
  );
  SubIndicatorNameMap.set("FE_FISA", "Family Information Sharing Activities");
  SubIndicatorNameMap.set("FE_PPFS", "Peer to Peer Family Support");
  SubIndicatorNameMap.set("FE_FR", "Family Respite");

  SubIndicatorNameMap.set("R_F", "Friendship");
  SubIndicatorNameMap.set("R_SB", "Sense of Belonging");
  SubIndicatorNameMap.set("R_SSD", "Social Skills Development");
  SubIndicatorNameMap.set("R_ABE", "Anti-Bullying Efforts");

  SubIndicatorNameMap.set("ILCE_ILSD", "Independent Living Skills Development");
  SubIndicatorNameMap.set(
    "ILCE_PFLA",
    "Planning for Future Living Arrangements"
  );
  SubIndicatorNameMap.set("ILCE_TTS", "Travel and Transportation Skills");
  SubIndicatorNameMap.set("ILCE_RL", "Recreation and Leisure");
  SubIndicatorNameMap.set("ILCE_CBE", "Community Based Experiences");
  SubIndicatorNameMap.set("ILCE_FBE", "Faith Based Experiences");
  SubIndicatorNameMap.set("ILCE_CE", "Civic Engagement");
  SubIndicatorNameMap.set("ILCE_MHS", "Mental Health Supports");

  SubIndicatorNameMap.set("CAC_AS", "Agencies in Schools");
  SubIndicatorNameMap.set("CAC_TS", "Transition Staffings");
  SubIndicatorNameMap.set("CAC_TF", "Transition Fairs");
  SubIndicatorNameMap.set("CAC_TC", "Transition Conferences");
  SubIndicatorNameMap.set("CAC_EE", "Employment Expos");
  SubIndicatorNameMap.set(
    "CAC_CANAE",
    "Community Agency Nights about Employment"
  );
  SubIndicatorNameMap.set("CAC_TCC", "Transition Coordinating Councils");

  SubIndicatorNameMap.set("E_CDC", "Career Development Classes");
  SubIndicatorNameMap.set("E_CC", "Career Clubs");
  SubIndicatorNameMap.set("E_CTE", "Career and Technical Education");
  SubIndicatorNameMap.set("E_CE", "Career Exploration");
  SubIndicatorNameMap.set("E_DP", "Discovery Process");
  SubIndicatorNameMap.set("E_UWE", "Unpaid Work Experience");
  SubIndicatorNameMap.set("E_PWE", "Paid Work Experience");
  SubIndicatorNameMap.set("E_OVRS", "OVR Services");
  SubIndicatorNameMap.set("E_JCS", "Job Coaching Serivces");
  SubIndicatorNameMap.set("E_SE", "Summer Employment");
  SubIndicatorNameMap.set("E_OJT", "On-the-Job Training");
  SubIndicatorNameMap.set("E_EP", "Employer Partnerships");
  SubIndicatorNameMap.set("E_UP", "University Partnerships");

  SubIndicatorNameMap.set("PSE_PCEP", "Pree-College Experience Programs");
  SubIndicatorNameMap.set("PSE_CBTP", "College-Based Transition Programs");
  SubIndicatorNameMap.set("PSE_PEP", "Postsecondary Education Programs");
  SubIndicatorNameMap.set("PSE_PCTP", "Postsecondary Career Training Programs");

  const UpdateSubIndicatorData = (subIndicatorobj) => {
    if (subIndicatorData.length > 0) {
      const found = subIndicatorData.some(
        (el) => el.name === subIndicatorobj.name
      );
      if (found) {
        let index = subIndicatorData.findIndex(
          (el) => el.name === subIndicatorobj.name
        );
        Object.assign(subIndicatorData[index], subIndicatorobj);
      } else {
        subIndicatorData.push(subIndicatorobj);
      }
    } else {
      subIndicatorData.push(subIndicatorobj);
    }
  };

  const UpdateIndicatorData = (subIndicatorobj) => {
    if (IndicatorData.length > 0) {
      const found = IndicatorData.some(
        (el) => el.name === subIndicatorobj.name
      );
      if (found) {
        let index = IndicatorData.findIndex(
          (el) => el.name === subIndicatorobj.name
        );
        Object.assign(IndicatorData[index], subIndicatorobj);
      } else {
        IndicatorData.push(subIndicatorobj);
      }
    } else {
      IndicatorData.push(subIndicatorobj);
    }
  };

  const getFullIndicatorName = (shortValue) => {
    let indicatorFullName = IndicatorNameMap.get(shortValue);
    if (indicatorFullName) {
      return indicatorFullName;
    }
    return shortValue;
  };

  const getFullSubIndicatorName = (shortValue) => {
    let subIndicatorFullName = SubIndicatorNameMap.get(shortValue);
    if (subIndicatorFullName) {
      return subIndicatorFullName;
    }
    return shortValue;
  };

  const ReassembleData = () => {
    IndicatorData.forEach((item) => {
      let subIndicators = subIndicatorData.filter((subItem) => {
        return subItem.name.startsWith(item.name + "_");
      });
      item.name = getFullIndicatorName(item.name);
      item.subIndicators = subIndicators;
    });
  };

  const FormatNames = () => {
    IndicatorData.forEach((item) => {
      subIndicatorData.forEach((subIndicatorItem) => {
        subIndicatorItem.name = getFullSubIndicatorName(subIndicatorItem.name);
      });
    });
  };

  const ProcessArray = (
    subIndicatorArr,
    subIndicatorName,
    qisKeyName,
    sdevKeyName
  ) => {
    let count = subIndicatorArr.length;

    let QIS = subIndicatorArr.reduce((a, b) => a + b) / count;
    let standardDev = Math.sqrt(
      subIndicatorArr.map((x) => Math.pow(x - QIS, 2)).reduce((a, b) => a + b) /
        count
    );
    let sdevUpper = QIS + 1.96 * (standardDev / count);
    let sdevLower = QIS - 1.96 * (standardDev / count);

    //create data object from calculated values
    let subIndicatorObj = new Object();
    subIndicatorObj.name = subIndicatorName;
    subIndicatorObj[qisKeyName] = new Number(QIS.toFixed(2));
    subIndicatorObj[sdevKeyName] = [
      new Number(sdevLower.toFixed(2)),
      new Number(sdevUpper.toFixed(2)),
    ];
    return subIndicatorObj;
  };

  const ProcessCategory = (categoryArr, qisKeyName, sdevKeyName) => {
    let subIndicatorKeys = Object.keys(categoryArr[0]).filter(
      (x) => x !== "Geographical Region" && x !== "ROLE"
    );

    let i;
    let subIndicatorobj;
    for (i = 0; i < subIndicatorKeys.length; i++) {
      let subIndicatorArr = categoryArr.map(
        (item) => item[subIndicatorKeys[i]]
      );

      let subIndicatorArrFiltered = subIndicatorArr.filter(Number);
      subIndicatorobj = ProcessArray(
        subIndicatorArrFiltered,
        subIndicatorKeys[i],
        qisKeyName,
        sdevKeyName
      );
      if (subIndicatorKeys[i].includes("_")) {
        UpdateSubIndicatorData(subIndicatorobj);
      } else {
        UpdateIndicatorData(subIndicatorobj);
      }
    }
  };

  const ProcessData = (data, filterCategory) => {
    let categoryArray = data;
    let qisKeyName = "";
    let sdevKeyName = "";
    switch (filterCategory) {
      case "Y":
        qisKeyName = "YOUTH_QIS";
        sdevKeyName = "YOUTH_sdev";
        categoryArray = data.filter((item) => item.ROLE === filterCategory);
        break;
      case "F":
        qisKeyName = "FAMILY_QIS";
        sdevKeyName = "FAMILY_sdev";
        categoryArray = data.filter((item) => item.ROLE === filterCategory);
        break;
      case "S":
        qisKeyName = "SH_QIS";
        sdevKeyName = "SH_sdev";
        categoryArray = data.filter((item) => item.ROLE === filterCategory);
        break;
      default:
        qisKeyName = "ALL_QIS";
        sdevKeyName = "ALL_sdev";
    }

    ProcessCategory(categoryArray, qisKeyName, sdevKeyName);
  };

  const handleSave = useCallback(
    (values, redirect) => {
      parse(values.files.rawFile, {
        dynamicTyping: true,
        complete: async (results) => {
          debugger;

          let dataKeys = results.data[0];
          let dataValues = results.data.slice(1);
          let objects = dataValues.map((array) => {
            let object = {};
            dataKeys.forEach((key, i) => (object[key] = array[i]));
            return object;
          });

          //calculation logic
          // let Youth_array = objects.filter((item) => item.ROLE === "Y");

          ProcessData(objects, "Y");
          ProcessData(objects, "F");
          ProcessData(objects, "S");
          ProcessData(objects, "ALL");
          debugger;
          ReassembleData();
          FormatNames();
          create(
            {
              payload: {
                data: {
                  ...values,
                  status: "IN_PROCESS",
                  data: IndicatorData,
                },
              },
            },
            {
              onSuccess: ({ data: newRecord }) => {
                notify("ra.notification.created", "info", {
                  smart_count: 1,
                });
                redirectTo(redirect, basePath, newRecord.id, newRecord);
              },
            }
          );
        },
      });
    },
    [create, notify, redirectTo, basePath]
  );
  const WhatWorksCreateToolbar = ({ ...props }) => (
    <Toolbar {...props}>
      <SaveButton
        label="Save"
        redirect="list"
        onSave={handleSave}
        submitOnEnter={true}
      />
    </Toolbar>
  );
  return (
    <Create {...props}>
      <SimpleForm toolbar={<WhatWorksCreateToolbar />}>
        <SelectInput
          source="state"
          label="State"
          validate={[required()]}
          variant="outlined"
          choices={[{ id: "Pennsylvania", name: "Pennsylvania" }]}
        />
        <FileInput
          source="files"
          label="Upload File"
          variant="outlined"
          validate={[required()]}
        >
          <FileField source="src" title="title" variant="outlined" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
};
export default CreateWhatWorks;
