var search = document.querySelector("#searchValue");
var searchDiv = document.querySelector(".search__words");

function showLoading() {
  let loadingDiv = document.createElement("section");
  loadingDiv.id = "loading-container";

  let loader = document.createElement("div");
  loader.className = "loader";

  loadingDiv.appendChild(loader);
  document.body.insertBefore(loadingDiv, document.body.children[0]);
  console.log(loadingDiv);
}

function hideLoading() {
  document.body.children[0].remove();
}

searchBar.onsubmit = (e) => {
  e.preventDefault();
  var word = search.value;

  // word ? callApi(word) : "";
  if (word) {
    showLoading();
    callApi(word);
  }
  search.value = "";
};

async function callApi(word) {
  let getApi = await fetch(`https://owlbot.info/api/v4/dictionary/${word}`, {
    headers: {
      Authorization: "Token 7a10a8768777c16fbd1a4bdbf0ed8762b4d40407",
    },
  });

  result = await getApi.json();

  renderUI(result);
  hideLoading();
}

function renderUI(result) {
  document.querySelector(".searchCard").style.display = "block";

  searchDiv.innerHTML = "";

  for (let res of result.definitions) {
    if (res.image_url === null && result.pronunciation === null) {
      searchDiv.innerHTML = `
    <p class="words">
    ${result.word}
    <span class="type"><i> ${res.type}</i></span></p>
    <hr />
    <div class="content">
        
    <div class="word__content">
      <p class="defination">
       ${res.definition}
      </p>
      <p class="example">
        "${res.example}"
      </p>
    </div>
  </div>`;
    } else if (res.example === "null" || res.example === "") {
      searchDiv.innerHTML = `
        <p class="words">
        ${result.word}
        <span class="type"><i> ${res.type}</i></span></p>
        <p class="pronun">/${result.pronunciation}/</p>
        <hr />

        <div class="content">
            <div class="image">
            <img
                src=${res.image_url}
                alt="image"
            />
            </div>
        <div class="word__content">
          <p class="defination">
           ${res.definition}
          </p>
         
        </div>
      </div>`;
    } else if (res.image_url === null) {
      searchDiv.innerHTML = `
        <p class="words">
        ${result.word}
        <span class="type"><i> ${res.type}</i></span></p>
        <p class="pronun">/${result.pronunciation}/</p>
        <hr />

        <div class="content">
            
        <div class="word__content">
          <p class="defination">
           ${res.definition}
          </p>
          <p class="example">
            "${res.example}"
          </p>
        </div>
      </div>`;
    } else {
      searchDiv.innerHTML = `
          <p class="words">
          ${result.word}
          <span class="type"><i> ${res.type}</i></span></p>
          <p class="pronun">/${result.pronunciation}/</p>
          <hr />
          <div class="content">
              <div class="image">
              <img
                  src=${res.image_url}
                  alt="image"
              />
              </div>
          <div class="word__content">
            <p class="defination">
             ${res.definition}
            </p>
            <p class="example">
              "${res.example}"
            </p>
          </div>
        </div>`;
    }
  }
}
