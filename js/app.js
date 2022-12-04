function initEvent() {
  //Gán sự kiện hover hiện ra border
  const inputElement = document.querySelector("#input-show");
  const showBorders = document.querySelectorAll(".input__wrapper");
  inputElement.addEventListener("focus", function () {
    console.log("show");
    //Bắt sự kiện khi focus vào ô input thì hiển thị border
    for (const item of showBorders) {
      item.target.classList.add("border-focus");
    }
  });

  //   inputElement.addEventListener("blur", function () {
  //     //Bắt sự kiện khi blur ra ngoài ô input thì ẩn border
  //     for (const item of showBorders) {
  //       item.classList.remove("border-hover");
  //     }
  //   });
}
initEvent();
