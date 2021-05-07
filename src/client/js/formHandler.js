
require("babel-polyfill");

function handleSubmit(event) {
  event.preventDefault();

  // get Url
  let formUrl = document.getElementById("url").value;
  console.log("formUrl = ", formUrl);
  const expression = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  const regex = new RegExp(expression);
  if (formUrl.match(regex)) {
    postReq("http://localhost:8081/analyze", { url: formUrl }).then(function (
      res
    ) {
      const result =
        `${res.score_tag}` +
        " " +
        `${res.agreement}` +
        "  " +
        `${res.subjectivity}` +
        "  " +
        `${res.confidence}` +
        " " +
        `${res.irony}`;
      document.getElementById("results").innerHTML = result;
    });
  } else {
    alert("Please enter valid URL");
    document.getElementById("results").innerHTML = "Please enter valid URL";
  }
}

const postReq = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
export { handleSubmit };
