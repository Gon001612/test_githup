// Hàm chuyển hướng đến trang chi tiết sản phẩm
function goToDetail(id) {
  window.location.href = `product_detail.html?id=${id}`;
}

// Hàm chuyển hướng về trang chủ
function goHome() {
  window.location.href = "index.html";
}

// Lấy danh sách sản phẩm từ API và hiển thị trên trang chủ
function getShoeList() {
  axios
    .get("https://shop.cyberlearn.vn/api/Product")
    .then((response) => {
      const shoes = response.data.content;
      let shoeList = "";
      shoes.forEach((shoe) => {
        shoeList += `
          <div class="shoe-item col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="card">
              <button onclick="goToDetail(${shoe.id})" class="btn">
                <img
                  src="${shoe.image}"
                  class="card-img-top"
                  alt="${shoe.name}"
                />
              </button>
              <div class="card-body">
                <!-- name -->
                <div class="card-title">
                  <h5>${shoe.name}</h5>
                  <i class="fa fa-shopping-cart"></i>
                </div>
                <!-- detail -->
                <p class="card-text">
                  ${shoe.shortDescription}
                </p>
                <!-- price -->
                <p class="card-price">$${shoe.price}</p>
              </div>
            </div>
          </div>
              `;
      });
      document.getElementById("shoeList").innerHTML = shoeList;
    })
    .catch((error) => {
      console.error("There was an error fetching the shoes!", error);
    });
}

// Lấy chi tiết sản phẩm từ API và hiển thị trên trang chi tiết sản phẩm
function getShoeDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const shoeId = urlParams.get("id");

  axios
    .get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoeId}`)
    .then((response) => {
      const shoe = response.data.content;
      const shoeDetail = `
            <div class="row">
              <div class="col-12 col-md-6 mb-3">
                <img src="${shoe.image}" class="img-fluid" alt="${shoe.name}">
              </div>
              <div class="col-12 col-md-6 mb-3">
                <h3>${shoe.name}</h3>
                <p>${shoe.description}</p>
                <p>Price: $${shoe.price}</p>
                <div class="d-flex align-items-center">
                  <p class="mb-0 me-2">Sizes:</p>
                  <div id="sizeOptions" class="d-flex flex-wrap">
                    ${shoe.size.map(size => `
                      <div class="form-check m-1">
                        <input class="form-check-input" type="radio" name="shoeSize" value="${size}" id="size${size}" onchange="selectSize('${size}')">
                        <label class="form-check-label" for="size${size}">${size}</label>
                      </div>
                    `).join('')}
                  </div>
                </div>
                <button class="btn btn-success mt-3">Mua ngay</button>
                <button class="btn btn-primary mt-3" onclick="goHome()">Back to Home</button>
              </div>
            </div>
          `;

      document.getElementById("shoeDetail").innerHTML = shoeDetail;

      // Gọi hàm để lấy các sản phẩm tương tự
      getSimilarShoes(shoeId);
    })
    .catch((error) => {
      console.error("There was an error fetching the shoe details!", error);
    });
}

//Hàm show thông tin bạn đã chọn size
function selectSize(size) {
  const checkbox = document.getElementById(`size${size}`);
  if (checkbox.checked) {
    alert(`Bạn đã chọn size ${size}`);
  }
}

// Lấy danh sách giày tương tự
function getSimilarShoes(shoeId) {
  axios
    .get("https://shop.cyberlearn.vn/api/Product")
    .then((response) => {
      const shoes = response.data.content.filter(
        (shoe) => shoe.id !== shoeId
      );
      let similarShoeList = "";
      for (let i = 0; i < 12 && i < shoes.length; i++) {
        similarShoeList += `
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
          <div class="card">
            <img src="${shoes[i].image}" class="card-img-top" alt="${shoes[i].name}">
            <div class="card-body">
              <h5 class="card-title">${shoes[i].name}</h5>
              <p class="card-text">$${shoes[i].price}</p>
              <button onclick="goToDetail(${shoes[i].id})" class="btn btn-primary">Xem chi tiết</button>
            </div>
          </div>
        </div>
      `;
      }
      document.getElementById("similarShoes").innerHTML = similarShoeList;
    })
    .catch((error) => {
      console.error("There was an error fetching similar shoes!", error);
    });
}

// Lấy đánh giá sản phẩm
function getReviews() {
  const reviews = [
    { name: "Nguyễn Văn A", rating: 5, comment: "Sản phẩm rất tốt!" },
    { name: "Trần Thị B", rating: 4, comment: "Giày rất đẹp nhưng hơi chật." },
    { name: "Lê Văn C", rating: 3, comment: "Chất lượng trung bình." },
    { name: "Phạm Thị D", rating: 5, comment: "Tuyệt vời, rất hài lòng!" },
    { name: "Đỗ Văn E", rating: 4, comment: "Rất đẹp, sẽ mua thêm." },
  ];

  let reviewList = "";
  reviews.forEach((review) => {
    reviewList += `
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">${review.name}</h5>
        <p class="card-text">Đánh giá: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
        <p class="card-text">${review.comment}</p>
      </div>
    </div>
  `;
  });
  document.getElementById("reviews").innerHTML = reviewList;
}

// Gọi hàm lấy danh sách sản phẩm khi tải trang chủ
if (window.location.pathname.endsWith("index.html")) {
  getShoeList();
}

// Gọi hàm lấy chi tiết sản phẩm khi tải trang chi tiết sản phẩm
if (window.location.pathname.endsWith("product_detail.html")) {
  getShoeDetail();
  getReviews(); // Gọi hàm lấy đánh giá sản phẩm
}


