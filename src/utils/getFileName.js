export default function (url) {
  if (!url) {
    return;
  }
  const urlArr = url.split('/');

  return urlArr[urlArr.length - 1];
}
