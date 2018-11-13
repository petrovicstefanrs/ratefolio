//**********************************************************************************************************************
// DEFAULT ROUTES
//**********************************************************************************************************************

export const HOME = '/';
export const ABOUT = '/about';

//**********************************************************************************************************************
// PUBLIC ROUTES
//**********************************************************************************************************************

export const AUTH_SIGN_IN = '/sign_in';

//**********************************************************************************************************************
// PRIVATE ROUTES
//**********************************************************************************************************************

export const MY_PROJECTS = '/my_projects';
export const PROJECTS = '/projects';
export const PROJECT_NEW = MY_PROJECTS + '/new';
export const PROJECT_EDIT = MY_PROJECTS + '/edit/:projectId';
export const projectEdit = (projectId) => MY_PROJECTS + '/edit/' + projectId;
export const PROJECT_DETAILS = PROJECTS + '/details/:projectId';
export const projectDetails = (projectId) => PROJECTS + '/details/' + projectId;
