import cookieCutter from "cookie-cutter";

const initialState = { username: "", token: "", permissions: "", team: "" };

const auth = (state = initialState, { type, auth }) => {
  switch (type) {
    case "LOGIN":
      cookieCutter.set("username", auth.username, { path: "/" });
      return {
        username: auth.username,
      };
    case "LOGOUT":
      cookieCutter.set("Authorization", "", { expires: new Date(0) });
      cookieCutter.set("username", "", { expires: new Date(0) });
      localStorage.setItem("permissions", "");
      return {
        username: null,
        token: null,
        permissions: null,
        team: null
      };
    case "RESTORE":
      return {
        username: cookieCutter.get("username"),
        token: cookieCutter.get("Authorization"),
        permissions: localStorage.getItem("permissions"),
        team: localStorage.getItem("team")
      };
    default:
      return state;
  }
};

export default auth;