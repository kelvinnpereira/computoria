import cookieCutter from "cookie-cutter";

const initialState = { matricula: "", token: "", cargo: "usuario", };

const auth = (state = initialState, { type, auth }) => {
  switch (type) {
    case "LOGIN":
      cookieCutter.set("Authorization", `${auth.token}`, { path: "/" });
      cookieCutter.set("matricula", auth.matricula, { path: "/" });
      cookieCutter.set("cargo", auth.cargo, { path: "/" });
      return {
        token: auth.token,
        matricula: auth.matricula,
        cargo: auth.cargo,
      };
    case "LOGOUT":
      cookieCutter.set("Authorization", "", { expires: new Date(0) });
      cookieCutter.set("matricula", "", { expires: new Date(0) });
      cookieCutter.set("cargo", "", { expires: new Date(0) });
      return {
        token: null,
        matricula: null,
        cargo: null,
      };
    case "RESTORE":
      return {
        token: cookieCutter.get("Authorization"),
        matricula: cookieCutter.get("matricula"),
        cargo: cookieCutter.get("cargo"),
      };
    default:
      return state;
  }
};

export default auth;