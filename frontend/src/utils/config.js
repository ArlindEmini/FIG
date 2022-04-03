/**
 * Get configuration for fetching data
 * @param {String} type type of content
 * @returns request config to fetch data
 */
export const getRequestHeaders = (type = "application/json") => {
  return {
    "Content-Type": type,
    //tenant_id: localStorage.getItem("prosperoware.accountData.SubscriberId"),
    Authorization: `Bearer`,
  };
};
