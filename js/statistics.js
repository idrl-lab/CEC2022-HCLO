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

window.hasSubmit = false;

window.downloadFile = function (dataset) {
  console.log(dataset);
  window.fileDataset = dataset;
  if (!window.hasSubmit) {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
  } else {
    window.downloadSubmit();
  }
};

window.downloadSubmit = function () {
  console.log("submit");
  const filename = window.fileDataset.filename;
  const name = document.getElementById("Name").value;
  const institution = document.getElementById("Institution").value;
  const email = document.getElementById("Email").value;

  if (!name || !institution || !email) {
    alert("Please fill in the required fields");
    return;
  }

  const email_re =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  if (!email_re.test(email)) {
    alert("The mailbox format is incorrect");
    return;
  }

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
  window.hasSubmit = true;
};

window.closeModal = function () {
  modal.style.display = "none";
};
