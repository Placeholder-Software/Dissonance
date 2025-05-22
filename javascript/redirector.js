if (window.location.host == "dissonance.readthedocs.io") {

  // RTD style links are: dissonance.readthedocs.io/en/latest/some/page
  // This needs to be rewritten into: https://placeholder-software.co.uk/dissonance/docs/some/page

  var path = window.location.pathname;
  if (path.startsWith("/en/latest")) {
    path = path.substring(10);
  }

  window.location.replace("https://placeholder-software.co.uk/dissonance/docs" + path)
}