function isBrowserSupported() {
  // check if browser is chrome or firefox
  return (
    navigator.userAgent.includes("Chrome") ||
    navigator.userAgent.includes("Firefox")
  );
  //   return false;
}

export function checkCompat() {
  if (!isBrowserSupported()) {
    const err = document.getElementById(
      "browser-unsupported"
    ) as HTMLDivElement;
    err.style.display = "block";
    return false;
  }
  return true;
}
