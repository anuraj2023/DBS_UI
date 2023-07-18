import http from "../http-common";

const getAll = () => {
  return http.get("http://127.0.0.1:5000/bezirksgrenzens");
};

const get = (id) => {
  return http.get(`/tutorials/${id}`);
};

const create = (data) => {
  return http.post("http://127.0.0.1:5000/bezirksgrenzen", data);
};

const update = (id, data) => {
  return http.put(`http://127.0.0.1:5000/bezirksgrenzen/${id}`, data);
};

const remove = (id) => {
  return http.delete(`http://127.0.0.1:5000/bezirksgrenzen/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

const BezService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default BezService;
