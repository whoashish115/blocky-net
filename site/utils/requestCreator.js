import axios from 'axios';

const resources = {};

const makeRequestCreator = () => {
  let cancel;

  return async query => {
    if (cancel) {
      cancel.cancel();
    }
    cancel = axios.CancelToken.source();
    try {
      if (resources[query]) {
        return resources[query];
      }
      const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${query}`, { cancelToken: cancel.token });

      const result = res.data.blogs;
      resources[query] = result;

      return result;
    } catch (error) {}
  };
};

export const search = makeRequestCreator()