export default () => {
  let cookiesArray = document.cookie.split(";")
  let xsrfTokenCookieArray = cookiesArray.filter(cookieStr => cookieStr.split("=")[0] === "XSRF-TOKEN")
  return xsrfTokenCookieArray.length ? decodeURIComponent(xsrfTokenCookieArray[0].split("=")[1]) : null
}
