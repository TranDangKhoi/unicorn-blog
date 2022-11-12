export default function useDisplayDateBySeconds() {
  function displayDateBySeconds(seconds) {
    return new Date(seconds * 1000).toLocaleDateString("vi-VI");
  }
  return {
    displayDateBySeconds,
  };
}
