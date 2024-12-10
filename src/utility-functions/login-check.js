function loginCheck() {
  const storedData = localStorage.getItem("user");
  const userObject = storedData ? JSON.parse(storedData) : {};
  if (!userObject?.id) {
    localStorage.removeItem("user");
    loadPage("login", "main-content");
  } else {
    loadPage("products", "main-content");
  }
}

loginCheck();
