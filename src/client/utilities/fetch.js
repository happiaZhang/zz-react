import 'whatwg-fetch';

const fetchApi = self.fetch.bind(self);
export function fetch(url, options) {
  const finalOptions = Object.assign({credentials: 'include'}, options);
  return fetchApi(url, finalOptions)
    .then(res => res.json())
    .then(json => json)
    .catch(error => {
      throw error;
    });
};
