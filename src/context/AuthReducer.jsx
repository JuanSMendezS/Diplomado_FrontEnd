export const authReducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        permisos: action.payload.permisos,
        user: action.payload.user,
      };
    case "logout":
      return {
        ...state,
        user: {
          apellidos: "",
          email: "",
          nombres: "",
          numero_identificacion: "",
          id: 0,
        },
        permisos: [],
      };
    case "":
      return {
        user: action.payload,
        ...state,
      };
    default:
      return state;
  }
};
