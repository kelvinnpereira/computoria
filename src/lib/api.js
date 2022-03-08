import axios from "axios";

const HOST = 'http://' + (process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "localhost:3000");

const server = axios.create({
  baseURL: HOST,
  validateStatus: function () {
    return true;
  }
});

const get = (uri, config = {}) => {
  return server.get(uri, config);
};

const put = (uri, data, config = {}) => {
  return server.put(uri, data, config);
};

const post = (uri, data, config = {}) => {
  return server.post(uri, data, config);
};

export { get, post, put, server, HOST};
