function handleSubmit(event) {
    event.preventDefault()

    // get Url
    let formUrl = document.getElementById('url').value;
    console.log('formUrl = ', formUrl)
    
    postReq("http://localhost:8081/analyze", { url: formUrl }).then(function (
      res
    ) {
        
        const result = `${res.score_tag}`+ ' ' + `${res.agreement}` + '  ' + `${res.subjectivity}` + '  ' + `${res.confidence}` + ' ' + `${res.irony}`;
        document.getElementById(
          "results"
        ).innerHTML = result
    });
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