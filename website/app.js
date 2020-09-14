// G-Vars

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let key = "4fe7af38da93b1a5e4ed889c23e8ef65&units=imperial";

// Inst-Creation

let d = new Date();
let newDate = d.toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const postCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  console.log(newDate);
  getTemperature(baseURL, postCode, key).then(function (data) {
    // post-Request "Data"

    postData("http://localhost:8081/addWeatherData", {
      temperature: data.main.temp,
      date: newDate,
      user_response: feelings,
    })
      // func-UI-update

      .then(function () {
        updateUI();
      });
  });
}

// A-sync Get

const getTemperature = async (baseURL, code, key) => {
  const response = await fetch(baseURL + code + ",us" + "&APPID=" + key);
  console.log(response);
  try {
    const data = await response.json();
    console.log(data);
    console.log("PIRMAS");
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// A-sync-Post

const postData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    console.log("ANTRAS");
    const newData = await postRequest.json();
    console.log(newData, "ANTRAS VEL");
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

// updating-UI

const updateUI = async () => {
  const request = await fetch("http://localhost:8081/all");
  try {
    const allData = await request.json();
    console.log("TRECIAS");
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.user_response;
  } catch (error) {
    console.log("error", error);
  }
};
