import axios from "axios";

const BASE_HOST = "http://105.103.64.87";

const HOST = `${BASE_HOST}`;

const server = axios.create({
  baseURL: HOST,
  validateStatus: function () {

    return true;
  }
});

const serverBase = axios.create({
  baseURL: BASE_HOST,
  validateStatus: function () {

    return true;
  }
});

const getAuthorization = (config) => {
  if (config.cookie) {
    let cookie = config.cookie.split(";").
      filter(cookie => cookie.includes("Authorization"));

    let contentType = config["Content-Type"]
      ? { "Content-Type": config["Content-Type"] }
      : {};
    return cookie.length && {
      headers: {
        Authorization: cookie[0].split("=")[1].replace("%20", " "),
        ...contentType
      }
    };
  }
};

const get = (uri, config = {}) => {
  return server.get(uri, getAuthorization(config));
};

const getBase = (uri, config = {}) => {
  return serverBase.get(uri, getAuthorization(config));
};

const post = (uri, data, config = {}) => {
  return server.post(uri, data, getAuthorization(config));
};

const put = (uri, data, config = {}) => {
  return server.put(uri, data, getAuthorization(config));
};

export { get, post, put, server, getBase, BASE_HOST, HOST };
