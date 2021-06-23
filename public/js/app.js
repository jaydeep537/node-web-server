console.log("App Runnig");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (!location || location == "") {
    console.log("Please enter value");
    return;
  }
  messageOne.textContent = "Loading...!";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.foreCast;
        console.log(data);
      }
    });
  });
  console.log(location);
});
