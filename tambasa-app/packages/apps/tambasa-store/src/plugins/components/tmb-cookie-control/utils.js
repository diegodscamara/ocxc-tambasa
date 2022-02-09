/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/**
 * Adds cookie to the browser with given key, value and expiry to one year
 * @param {*} key: cookie name
 * @param {*} value : cookie value
 */
export const createCookie = (key, value) => {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${value};expires=${d}`;
};

/**
 * Deletes given cookie from the browser by setting the expiry to current date.
 * @param {*} cookie: cookie to remove
 */
export const removeCookie = cookie => {
  if (cookie) {
    const curDate = new Date();
    //removes current domain cookie
    document.cookie = `${cookie};expires=${curDate.toUTCString()}`;
    document.cookie = `${cookie};expires=${curDate.toUTCString()};path=/`;
    //removes sub domain cookie
    for (let domainSplit = document.location.hostname.split('.'); domainSplit.length; ) {
      const curDomain = domainSplit.join('.');
      document.cookie = `${cookie};expires=${curDate.toUTCString()};domain=${curDomain}`;
      document.cookie = `${cookie};path=/;expires=${curDate.toUTCString()};domain=${curDomain}`;
      domainSplit.shift();
    }
  }
};
