const { google } = require("googleapis");
const credentail = "./credential.json";

let fullData = null;

async function getGSheetClient() {
  console.log("===reached here002");

  const auth = await new google.auth.GoogleAuth({
    keyFile: credentail,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: "v4",
    auth: authClient,
  });
}

async function readGoogleSheet() {
  console.log("===reached here001");
  const GSHEET_ID = "1X9MNBQpWpv8wlLJrmZ133TQ8REO9s1OHHiYS1_bzlvQ";
  const GSHEET_NAME = "sheet1";
  const GSHEET_RANGE = "A2:F273";
  const gSheetClient = await getGSheetClient();
  const res = await gSheetClient.spreadsheets.values.get({
    spreadsheetId: GSHEET_ID,
    range: `${GSHEET_NAME}!${GSHEET_RANGE}`,
  });

  fullData = res.data.values;
  console.log("===reached here3", fullData);
}

const registerUserSession = async (chatID, username, session) => {
  const { GSHEET_ID } = process.env;
  const gSheetClient = await getGSheetClient();

  try {
    gSheetClient.spreadsheets.values
      .append({
        spreadsheetId: GSHEET_ID,
        range: "Users!A:D",
        valueInputOption: "RAW",
        insertDataOption: "OVERWRITE",
        resource: {
          values: [[chatID, username, formateDate(), session]],
        },
      })
      .then(function (response) {
        console.log(response);
      });
  } catch (err) {
    console.error("Error appending row:", err);
  }
};

const formateDate = () => {
  let ts = Date.now();

  let date_time = new Date(ts);
  let date = date_time.getDate();
  let month = date_time.getMonth() + 1;
  let year = date_time.getFullYear();

  // prints date & time in YYYY-MM-DD format
  return year + "-" + month + "-" + date;
};

const shouldPublish = async () => {
  try {
    const { GSHEET_ID } = process.env;
    const gSheetClient = await getGSheetClient();
    const res = await gSheetClient.spreadsheets.values.get({
      spreadsheetId: GSHEET_ID,
      range: `Settings!A2`,
    });
    return res.data.values[0][0];
  } catch (error) {
    return "FALSE";
  }
};

const published = async () => {
  const { GSHEET_ID } = process.env;

  const gSheetClient = await getGSheetClient();
  gSheetClient.spreadsheets.values
    .update({
      spreadsheetId: GSHEET_ID,
      range: "Settings!A2",
      valueInputOption: "RAW",
      resource: {
        values: [["FALSE"]],
      },
    })
    .then(function (response) {
      console.log(response);
    });
};

const getFullData = () => {
  return fullData;
};

const registerUserComments = async (chatID, username, suggestion) => {
  const { GSHEET_ID } = process.env;
  const gSheetClient = await getGSheetClient();

  try {
    gSheetClient.spreadsheets.values
      .append({
        spreadsheetId: GSHEET_ID,
        range: "Suggestions!A:D",
        valueInputOption: "RAW",
        insertDataOption: "OVERWRITE",
        resource: {
          values: [[chatID, username, formateDate(), suggestion]],
        },
      })
      .then(function (response) {
        console.log(response);
      });
  } catch (err) {
    console.error("Error appending row:", err);
  }
};

module.exports = {
  readGoogleSheet,
  getFullData,
  published,
  shouldPublish,
  registerUserSession,
  registerUserComments,
};
