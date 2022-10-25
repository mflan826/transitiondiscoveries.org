// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function getImagesUploadPath(slug){
  return slug + "/data/images/";
}

function getVideosUploadPath(slug){
  return slug + "/data/videos/";
}

function getAudioUploadPath(slug){
  return slug + "/data/audio/";
}

function getPdfUploadPath(slug){
  return slug + "/data/pdf/";
}

function getJsonUploadPath(slug){
  return slug + "/";
}

function getIndicatorFullNameByKey(key){

  const indicatorFullNameByKey = {
    "TP" : "Transition Planning",
    "TP_CEP" : "Career Exploration Planning and Preparation",
    "TP_PCP" : "Postsecondary and College Planning",
    "TP_ICL" : "Independent/Community Living",
    "TP_SRS" : "Significant Role of School Personnel",
    "YD" : "Youth Development",
    "YD_SA" : "Self-Awareness",
    "YD_DA" : "Disability Awareness",
    "YD_ILSD" : "Independent Living Skill Development",
    "YD_SDSD" : "Self-Determination Skill Development",
    "YD_SMSD" : "Self-Management Skill Development",
    "YD_LSD" : "Leadership Skill Development",
    "YD_YET" : "Youth Engagement in Transition",
    "YD_SRA" : "Significant Role of Adult",
    "PFDP" : "Person and Family Directed Planning",
    "PFDP_APFCPP" : "Authentic Person and Family Centered Planning Practices",
    "PFDP_PFCPD" : "Person and Family Centered Program Design",
    "FE" : "Family Engagement",
    "FE_FETP" : "Family Engagement in Transition Planning",
    "FE_FISA" : "Family Information Sharing Activities",
    "FE_PPFS" : "Peer to Peer Family Support",
    "FE_FR" : "Family Respite",
    "R" : "Relationships",
    "R_F" : "Friendship",
    "R_SB" : "Sense of Belonging",
    "R_SSD" : "Social Skills Development",
    "R_ABE" : "Anti-Bullying Efforts",
    "ILCE" : "Independent Living and Community Engagement",
    "ILCE_ILSD" : "Independent Living Skills Development",
    "ILCE_PFLA" : "Planning for Future Living Arrangements",
    "ILCE_TTS" : "Travel and Transportation Skills",
    "ILCE_RL" : "Recreation and Leisure",
    "ILCE_CBE" : "Community Based Experiences",
    "ILCE_FBE" : "Faith Based Experiences",
    "ILCE_CE" : "Civic Engagement",
    "ILCE_MHS" : "Mental Health Supports",
    "CAC" : "Cross Agency Collaboration",
    "CAC_AS" : "Agencies in Schools",
    "CAC_TS" : "Transition Staffings",
    "CAC_TF" : "Transition Fairs",
    "CAC_TC" : "Transition Conferences",
    "CAC_EE" : "Employment Expos",
    "CAC_CANAE" : "Community Agency Nights about Employment",
    "CAC_TCC" : "Transition Coordinating Councils",
    "E" : "Employment",
    "E_CDC" : "Career Development Classes",
    "E_CC" : "Career Clubs",
    "E_CTE" : "Career and Technical Education",
    "E_CE" : "Career Exploration",
    "E_DP" : "Discovery Process",
    "E_UWE" : "Unpaid Work Experience",
    "E_PWE" : "Paid Work Experience",
    "E_OVRS" : "OVR Services",
    "E_JCS" : "Job Coaching Serivces",
    "E_SE" : "Summer Employment",
    "E_OJT" : "On-the-Job Training",
    "E_EP" : "Employer Partnerships",
    "E_UP" : "University Partnerships",
    "PSE" : "Post Secondary Education",
    "PSE_PCEP" : "Pree-College Experience Programs",
    "PSE_CBTP" : "College-Based Transition Programs",
    "PSE_PEP" : "Postsecondary Education Programs",
    "PSE_PCTP" : "Postsecondary Career Training Programs",
  };

  return indicatorFullNameByKey[key];
}

module.exports = {
  createSlug: createSlug,
  getImagesUploadPath: getImagesUploadPath,
  getVideosUploadPath: getVideosUploadPath,
  getAudioUploadPath: getAudioUploadPath,
  getPdfUploadPath: getPdfUploadPath,
  getJsonUploadPath: getJsonUploadPath,
  getIndicatorFullNameByKey: getIndicatorFullNameByKey,
};
