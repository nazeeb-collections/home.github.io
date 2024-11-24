function loginCheck() {
  const storedData = localStorage.getItem("user");
  const userObject = JSON.parse(storedData);
  if (!userObject?.id) {
    localStorage.removeItem("user");
    if (window.location.pathname !== "/") {
      window.location.pathname = "/";
    }
  } else if (window.location.pathname === "/") {
    window.location.pathname = "/products";
  }
}

loginCheck();
