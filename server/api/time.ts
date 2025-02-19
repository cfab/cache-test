export default defineCachedEventHandler(
  async (event) => {
    setResponseHeader(
      event,
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    setResponseHeader(event, "Pragma", "no-cache");
    setResponseHeader(event, "Expires", "0");
    const time = new Date();
    return time.toLocaleString();
  },
  {
    maxAge: 30, // 30 seconds
    swr: true, // Default cache options
    group: "time",
    name: "time",
    getKey: () => "time",
    shouldBypassCache: (event) => {
      const { preview } = getQuery(event);
      return preview === "true";
    },
  }
);
