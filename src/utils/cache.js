const cache = (() => {
  const nowInEpoch = () => Math.round((new Date()).getTime() / 1000);

  const get = location => {
    const cachedData = JSON.parse(localStorage.getItem(JSON.stringify(location)));
    if (cachedData && nowInEpoch() - cachedData.cachedAt < 3600) {
      return cachedData.data;
    }

    localStorage.removeItem(JSON.stringify(location));
    return null;
  };

  const set = (location, data) => {
    const cachedData = { cachedAt: nowInEpoch(), data };
    localStorage.setItem(JSON.stringify(location), JSON.stringify(cachedData));
  };

  return { get, set };
})();

export default cache;
