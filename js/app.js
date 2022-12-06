// function initEvent() {
//   //Gán sự kiện hover hiện ra border
//   const inputElement = document.querySelector("#input-show");
//   const showBorders = document.querySelectorAll(".input__wrapper");
//   inputElement.addEventListener("focus", function () {
//     console.log("show");
//     //Bắt sự kiện khi focus vào ô input thì hiển thị border
//     for (const item of showBorders) {
//       item.target.classList.add("border-focus");
//     }
//   });

//   //   inputElement.addEventListener("blur", function () {
//   //     //Bắt sự kiện khi blur ra ngoài ô input thì ẩn border
//   //     for (const item of showBorders) {
//   //       item.classList.remove("border-hover");
//   //     }
//   //   });
// }
// initEvent();
/**
 * Lấy dữ liệu
 * Author: Văn Anh (6/12/2022)
 *
 */
function loadData() {
  try {
    //Gọi api lấy dữ liệu
    $.ajax({
      type: "GET",
      url: "https://amis.manhnv.net/api/v1/Employees",
      success: function (res) {
        //Xóa tất cả các dữ liệu có sẫn từ trước
        $(".list__table tbody").empty();
        //Xử lý dữ liệu
        for (const emp of res) {
          var employeeCode = emp.EmployeeCode;
          var fullName = emp.EmployeeName;
          var gender = emp.GenderName;
          var dob = emp.DateOfBirth;
          //1.Định dạng ngày tháng => ngày/tháng/năm
          var dob = new Date(dob);
          var year = dob.getFullYear();
          var month = dob.getMonth() + 1;
          month = month < 10 ? `0${month}` : `${month}`;
          var date = dob.getDate();
          date = date < 10 ? `0${date}` : `${date}`;
          dob = `${date}/${month}/${year}`;
          //2.Định dạng tiền tệ
          var salary = Math.round(Math.random(0, 1) * 1000000000);
          salary = new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
          }).format(salary);

          var positonName = emp.PositionName;
          var trHTML = `<tr>
                          <td class="width-table-checkbox">
                            <input type="checkbox" name="" id="">
                          </td>
                          <td class="w-200 text-align-left ">${
                            employeeCode || ""
                          }</td>
                          <td class="text-align-left">${fullName || ""}t</td>
                          <td class="text-align-left">${gender || ""}</td>
                          <td class="text-align-left w-150">${dob || ""}</td>
                          <td class="text-align-right w-150">${
                            salary || ""
                          }</td>
                          <td class="text-align-left">${positonName || ""}</td>
                          <td class="text-align-left">
                            <div class="flex table__function">
                              <button class=" btn-function-fix">Sửa</button>
                              <button class=" btn-function__dropdown">
                                <div class="icon w-h-24 function-dropdown-icon"></div>
                              </button>
                            </div>
                          </td>
                        </tr>`;

          $(".list__table tbody").append(trHTML);
        }

        //Hiển thị dữ liệu
      },
      error: function (error) {
        var statusCode = error.status;
        switch (statusCode) {
          case 400:
            var errMsg = error.responseJSON.userMsg;
            break;
          case 500:
            break;
          default:
            break;
        }
      },
    });
  } catch (error) {}
}
function createEvent() {
  let btnAdd = document.getElementById("btn--add");
  let formAdd = document.getElementById("form__add");
  //Gán sự kiện cho cho btn thêm mới nhân viên
  btnAdd.addEventListener("click", function () {
    formAdd.style.display = "block";
  });
  //Nhấn vào nút close thì ẩn form thêm nhân viên
  let btnCloses = document.getElementsByName("btn--close");
  for (const btnClose of btnCloses) {
    btnClose.removeEventListener("click", function () {
      formAdd.style.display = "none";
    });
  }
}
loadData();
createEvent();
