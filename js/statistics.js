axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers = {
      ...config.headers,
      Origin: "https://idrl.superberry.cn",
      Referer: "https://idrl.superberry.cn/",
    };
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axios
  .get("https://idrl.superberry.cn/quantity/viewer")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

window.downloadFile = function (dataset) {
  console.log(dataset);
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  window.fileDataset = dataset;
};

window.downloadSubmit = function () {
  console.log("submit");
  const filename = window.fileDataset.filename;
  const name = document.getElementById("Name").value;
  const institution = document.getElementById("Institution").value;
  const email = document.getElementById("Email").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("institution", institution);
  formData.append("email", email);
  formData.append("filename", filename);

  axios
    .post("https://idrl.superberry.cn/quantity/download", formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  modal.style.display = "none";
  window.open(window.fileDataset.src);
};

window.closeModal = function () {
  modal.style.display = "none";
};
