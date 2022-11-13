export default function useTableDisplay() {
  function displayLocaleDateBySeconds(seconds) {
    return new Date(seconds * 1000).toLocaleDateString("vi-VI");
  }

  function displayLocaleTimeBySeconds(seconds) {
    return new Date(seconds * 1000).toLocaleTimeString("vi-VI");
  }

  function displayLocalTimeAndDateBySeconds(seconds) {
    return `${new Date(seconds * 1000).toLocaleTimeString("vi-VI")} ${new Date(
      seconds
    ).toLocaleDateString()}`;
  }

  function displayTruncatedID(id, length) {
    return id.length > length ? `${id.substring(0, length)}...` : id;
  }
  return {
    displayLocaleDateBySeconds,
    displayLocaleTimeBySeconds,
    displayLocalTimeAndDateBySeconds,
    displayTruncatedID,
  };
}
