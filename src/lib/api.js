import axios from "axios";

const HOST = 'http://' + (process.env?.URL ? process.env.URL : "localhost:3000");

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
  console.log('post url: ' + HOST);
  console.log('post url: ' + process.env?.URL);
  console.log('post url: ' + process.env?.HOST);
  console.log('post url: ' + process.env?.host);
  return server.post(uri, data, config);
};

export { get, post, put, server };
