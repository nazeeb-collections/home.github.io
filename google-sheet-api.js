const API_KEY = "AIzaSyANrbBPpULgkZG_jMuXhtD6erv-8dM1G-k";
const SHEET_ID = "1X9MNBQpWpv8wlLJrmZ133TQ8REO9s1OHHiYS1_bzlvQ"; // Extract from the Google Sheet URL
const RANGE = "sheet1!A2:F273"; // Define the range of cells you want to read

let productsData = [];
async function readGsheetData() {
  console.log("===reached here");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("===e", data);
      productsData = [data];
    })
    .catch((error) => {
      //   document.getElementById("output").textContent = `Error: ${error.message}`;
    });
  console.log("===productsData", productsData);
  return productsData;
}
