const permissions = {

  USER_ADMIN: {
    FIND_ALL: true,
    FIND_ONE: true,
    FIND_PAGINATION: true,
    CREATE: true,
    UPDATE: true,
    DELETE: true,
    ALTER_USER: false
  },

  USER_EVENT: {
    FIND_ALL_EVENT: true,
    FIND_ONE_EVENT: true,
    FIND_PAGINATION_EVENT: true,
    CREATE_EVENT: true,
    UPDATE_EVENT: true,
    DELETE_EVENT: true
  },

  // ejemplo para crear un nuevo tipo de usuario de un modulo con mas de una palabra en su nombre
  // deben de ir los nombres como en el modulo pero en mayusculas y separadas las palabras por guion bajo
  USER_REPORT_TYPE: {
    FIND_ALL_REPORT_TYPE: true,
    FIND_ONE_REPORT_TYPE: true,
    FIND_PAGINATION_REPORT_TYPE: true,
    CREATE_REPORT_TYPE: true,
    UPDATE_REPORT_TYPE: true,
    DELETE_REPORT_TYPE: true
  },

  SUPER_ADMIN: {
    FIND_ALL: true,
    FIND_ONE: true,
    FIND_PAGINATION: true,
    CREATE: true,
    UPDATE: true,
    DELETE: true,
    ALTER_USER: true
  },
  
  USER_READ: {
    FIND_ALL: true,
    FIND_ONE: true,
    FIND_PAGINATION: true,
    CREATE: false,
    UPDATE: false,
    DELETE: false,
    ALTER_USER: false
  }
}


module.exports = permissions;