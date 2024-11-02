// const API_KEY = "AIzaSyANrbBPpULgkZG_jMuXhtD6erv-8dM1G-k";
// const SHEET_ID = "1X9MNBQpWpv8wlLJrmZ133TQ8REO9s1OHHiYS1_bzlvQ"; // Extract from the Google Sheet URL
// const RANGE = "Form responses 1!A:F"; // Define the range of cells you want to read

let productsData = [];

async function readGsheetData(SHEET_ID, QUERY) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tq=${encodeURIComponent(
    QUERY
  )}`;

  try {
    const response = await fetch(url);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const text = await response.text(); // Get response as text
    const jsonResponse = text
      .replace("/*O_o*/", "")
      .replace(/google\.visualization\.Query\.setResponse\(/, "")
      .replace(/\);$/, ""); // Clean up the string

    // Parse the cleaned string to JSON
    const jsonData = JSON.parse(jsonResponse);

    // Access the desired data
    const customerId = jsonData?.table?.rows?.[0]?.c?.[0]?.v; // Safely access the customerId

    console.log("===resd", customerId); // Log the customerId
    return customerId; // Return the customerId
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Return null or handle the error as needed
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear previous error message
    errorMessage.textContent = "";

    // Simple validation
    if (username === "" || password === "") {
      errorMessage.textContent = "Please fill in both fields.";
      return;
    }
    const SHEET_ID = "1X9MNBQpWpv8wlLJrmZ133TQ8REO9s1OHHiYS1_bzlvQ"; // "1X9MNBQpWpv8wlLJrmZ133TQ8REO9s1OHHiYS1_bzlvQ"; // Extract from the Google Sheet URL
    const QUERY = `SELECT D WHERE B="${username}"  AND C="${password}"`;
    const res = await readGsheetData(SHEET_ID, QUERY);
    console.log("===res", res);
    if (res) {
      alert("Login successful!");
      // Redirect or perform additional actions here
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
