import React from "react";
import {
  Show,
  TextField,
  TopToolbar,
  ArrayField,
  SimpleShowLayout,
  SimpleFormIterator,
  Datagrid,
  TabbedShowLayout,
  TabbedShowLayoutTabs,
  Tab,
  ReferenceManyField,
} from "react-admin";
import PublishButton from "./PublishButton";

const ShowWhatWorks = (props) => {
  const ShowWhatWorksActions = ({ basePath, data, resource }) => (
    <TopToolbar>
      {/* <PublishButton record={data} /> */}
    </TopToolbar>
  );

  return (
    <Show {...props} actions={<ShowWhatWorksActions />}>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField source="state" />
        <TabbedShowLayout tabs={<TabbedShowLayoutTabs variant="scrollable" {...props} />}>
            <Tab label="Transition Planning">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="TP"   label="Transition Planning" />
                  <TextField source="TP_CEP" label="Career Exploration Planning and Preparation" />
                  <TextField source="TP_PCP" label="Postsecondary and College Planning" />
                  <TextField source="TP_ICL" label="Independent/Community Living" />
                  <TextField source="TP_SRS" label="Significant Role of School Personnel" />

                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Youth Development">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="YD"   label="Youth Development" />
                  <TextField source="YD_SA" label="Self-Awareness" />
                  <TextField source="YD_DA" label="Disability Awareness" />
                  <TextField source="YD_ILSD" label="Independent Living Skill Development" />
                  <TextField source="YD_SDSD" label="Self-Determination Skill Development" />
                  <TextField source="YD_SMSD" label="Self-Management Skill Development" />
                  <TextField source="YD_LSD" label="Leadership Skill Development" />
                  <TextField source="YD_YET" label="Youth Engagement in Transition" />
                  <TextField source="YD_SRA" label="Significant Role of Adult" />
                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Person and Family Directed Planning">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="PFDP"   label="Person and Family Directed Planning" />
                  <TextField source="PFDP_APFCPP" label="Authentic Person and Family Centered Planning Practices"  />
                  <TextField source="PFDP_PFCPD" label="Person and Family Centered Program Design" />
                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Family Engagement">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="FE" label="Family Engagement" />
                  <TextField source="FE_FETP"  label="Family Engagement in Transition Planning" />
                  <TextField source="FE_FISA"  label="Family Information Sharing Activities" />
                  <TextField source="FE_PPFS"  label="Peer to Peer Family Support" />
                  <TextField source="FE_FR"  label="Family Respite" />
                  
                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Relationships">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="R" label="Relationships" />
                  <TextField source="R_F" label="Friendship" />
                  <TextField source="R_SB" label="Sense of Belonging" />
                  <TextField source="R_SSD" label="Social Skills Development" />
                  <TextField source="R_ABE" label="Anti-Bullying Efforts" />
                  
                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Independent Living and Community Engagement">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="ILCE" label="Independent Living and Community Engagement" />
                  <TextField source="ILCE_ILSD"  label="Independent Living Skills Development" />
                  <TextField source="ILCE_PFLA"  label="Planning for Future Living Arrangements" />
                  <TextField source="ILCE_TTS"  label="Travel and Transportation Skills" />
                  <TextField source="ILCE_RL"  label="Recreation and Leisure" />
                  <TextField source="ILCE_CBE"  label="Community Based Experiences" />
                  <TextField source="ILCE_FBE"  label="Faith Based Experiences" />
                  <TextField source="ILCE_CE"  label="Civic Engagement" />
                  <TextField source="ILCE_MHS"  label="Mental Health Supports" />
                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Cross Agency Collaboration">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="CAC" label="Cross Agency Collaboration" />
                  <TextField source="CAC_AS" label="Agencies in Schools" />
                  <TextField source="CAC_TS" label="Transition Staffings" />
                  <TextField source="CAC_TF" label="Transition Fairs" />
                  <TextField source="CAC_TC" label="Transition Conferences" />
                  <TextField source="CAC_EE" label="Employment Expos" />
                  <TextField source="CAC_CANAE" label="Community Agency Nights about Employment" />
                  <TextField source="CAC_TCC" label="Transition Coordinating Councils" />
                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Employment">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="E" label="Employment" />
                  <TextField source="E_CDC" label="Career Development Classes" />
                  <TextField source="E_CC" label="Career Clubs" />
                  <TextField source="E_CTE" label="Career and Technical Education" />
                  <TextField source="E_CE" label="Career Exploration" />
                  <TextField source="E_DP" label="Discovery Process" />
                  <TextField source="E_UWE" label="Unpaid Work Experience" />
                  <TextField source="E_PWE" label="Paid Work Experience" />
                  <TextField source="E_OVRS" label="OVR Services" />
                  <TextField source="E_JCS" label="Job Coaching Serivces" />
                  <TextField source="E_SE" label="Summer Employment" />
                  <TextField source="E_OJT" label="On-the-Job Training" />
                  <TextField source="E_EP" label="Employer Partnerships" />
                  <TextField source="E_UP" label="University Partnerships" />
                  
                </Datagrid>
              </ArrayField>
            </Tab>
            <Tab label="Post Secondary Education">
              <ArrayField source="data" label="">
                <Datagrid>
                  <TextField source="ROLE" />
                  <TextField source="Age" label="Age" />
                  <TextField source="PSE" label="Post Secondary Education" />
                  <TextField source="PSE_PCEP" label="Pree-College Experience Programs" />
                  <TextField source="PSE_CBTP" label="College-Based Transition Programs" />
                  <TextField source="PSE_PEP" label="Postsecondary Education Programs" />
                  <TextField source="PSE_PCTP" label="Postsecondary Career Training Programs" />
                  
                </Datagrid>
              </ArrayField>
            </Tab>
            
        </TabbedShowLayout>
        </SimpleShowLayout>

    </Show>
  );
};
export default ShowWhatWorks;
