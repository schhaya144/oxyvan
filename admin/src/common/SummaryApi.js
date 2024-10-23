const backendDomain = "http://localhost:8083";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
    method: 'post',
  },
  contactAll: {
    url: `${backendDomain}/api/get-contact`,
    method: "get",
  },
  donorAll: {
    url: `${backendDomain}/api/doner-get`,
    method: "get",
  },
  donorDelete: {
    url: `${backendDomain}/api/delete-donor/:id`,
    method: "delete",
  },
  donorUpdate: {
    url: `${backendDomain}/api/update-donor/:id`,
    method: "put",
  },

  getUserRecordDetails:{
    url:`${backendDomain}/api/get-userRecord`,
    method: "get",
  },
  postUserRecordDetails:{
    url:`${backendDomain}/api/post-userRecord`,
    method: "post",
  },
  volunteersAll: {
    url: `${backendDomain}/api/get-Volunteers`,
    method: "get",
  },
  volunteersUpdate: {
    url: `${backendDomain}/api/update-volunteer/:id`,
    method: "put",
  },
  volunteersDelete: {
    url: `${backendDomain}/api/delete-volunteer/:id`,
    method: "delete",
  },
  putUserRecordDetails: {
    url: `${backendDomain}/api/putUserRecord/:id`,
    method: "put",
  },
  deleteUserRecordDetails: {
    url: `${backendDomain}/api/delete-userRecord/:id`,
    method: "delete",
  },
  updateContactDetails:{
    url:`${backendDomain}/api/update-contact/:id`,
    method: "put",
  },
  deleteContactDetails:{
    url:`${backendDomain}/api/delete-contact/:id`,
    method: "delete",
  },
  volunteerDetails:{
    url:`${backendDomain}/api/profile/:id`,
    method: "get",
  }
}

export default SummaryApi;