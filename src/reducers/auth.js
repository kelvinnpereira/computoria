import cookieCutter from "cookie-cutter";

const initialState = { user: "", token: "", permissions: "", team: "" };

const auth = (state = initialState, { type, auth }) => {
  switch (type) {
    case "LOGIN":
      cookieCutter.set("Authorization", `${auth.token}`, { path: "/" });
      cookieCutter.set("user", auth.user, { path: "/" });
      return {
        token: auth.token,
        user: auth.user,
      };
    case "LOGOUT":
      cookieCutter.set("Authorization", "", { expires: new Date(0) });
      cookieCutter.set("user", "", { expires: new Date(0) });
      return {
        token: null,
        user: null,
      };
    case "RESTORE":
      return {
        token: cookieCutter.get("Authorization"),
        user: cookieCutter.get("user"),
      };
    default:
      return state;
  }
};

export default auth;