import cookieCutter from "cookie-cutter";

const initialState = { user: "", token: "", role: "usuario", };

const auth = (state = initialState, { type, auth }) => {
  switch (type) {
    case "LOGIN":
      cookieCutter.set("Authorization", `${auth.token}`, { path: "/" });
      cookieCutter.set("user", auth.user, { path: "/" });
      cookieCutter.set("role", auth.role, { path: "/" });
      return {
        token: auth.token,
        user: auth.user,
        role: auth.role,
      };
    case "LOGOUT":
      cookieCutter.set("Authorization", "", { expires: new Date(0) });
      cookieCutter.set("user", "", { expires: new Date(0) });
      cookieCutter.set("role", "", { expires: new Date(0) });
      return {
        token: null,
        user: null,
        role: null,
      };
    case "RESTORE":
      return {
        token: cookieCutter.get("Authorization"),
        user: cookieCutter.get("user"),
        role: cookieCutter.get("role"),
      };
    default:
      return state;
  }
};

export default auth;