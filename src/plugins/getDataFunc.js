const GetDataAsync = {
  install(Vue) {
    Vue.prototype.$simulateAsyncReq = async function(data) {
      const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const delay = (ms) =>
        new Promise((res, rej) =>
          setTimeout(getRandomInt(1, 5) > 2 ? res : rej, ms)
        );
      await delay(getRandomInt(500, 2000));

      return data;
    };
  },
};

export default GetDataAsync;
