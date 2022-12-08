
/**
   * Hàm khởi tạo đối tượng Employee khi trang web được tải
   * Created date :05/12/2022
   * Created by : NVQUY
   */
$(document).ready(function () {
    new Employee;
});
class Employee {
    /**
    * Hàm khởi tạo đối tượng Employee
    * Created date :05/12/2022
    * Created by : NVQUY
    */
    constructor() {
        this.initEvent();
        this.loadData();
    }

    /**
   * Các hàm liên quan đến khởi tạo các sự kiện
   * Created date :05/12/2022
   * Created by : NVQUY
   */
    initEvent() {
        try {
            //Gắn con trỏ this
            let emp = this;
            //Sự kiện liên quan đến checkbox
            emp.handleCheckbox();
            //Sự kiện liên quan đến dialog
            emp.handleDialog();
            /**
          * Sự kiện TabOder form chi tiết nhân viên
          * Created date :06/12/2022
          * Created by : NVQUY
          */
            $('.m-button-close').keydown(function (event) {
                $(this).parents('.m-dialog').find('[tabindex="1"]').focus();
                event.preventDefault();
                if (event.which == 13) {
                    $(".m-popup-add-employee").hide();
                }
            });
            /**
             * Sự kiện nhấn phím Insert hiển thị form thêm mới nhân viên
             * Created  date :07/12/2022
             * Created by : NVQUY
             */
            $(document).keydown(function (event) {
                // var keycode = (event.keyCode ? event.keyCode : event.which);
                if (event.which == 45) {
                    //Thay đổi title form chi tiết thành thêm mới nhân viên
                    $(".m-title-content").html("Thêm mới nhân viên");
                    handleFormEmployee();
                }
            });
            /**
             * Sự kiện nhấn phím esc đóng form chi tiết nhân viên
             * Created  date :07/12/2022
             * Created by : NVQUY
             */
            $(document).keydown(function (event) {
                // var keycode = (event.keyCode ? event.keyCode : event.which);
                if (event.which == 27) {
                    $(".m-popup-add-employee").hide();

                }
            });
            /**
             * Sự kiện liên quan đến form chi tiết nhân viên như thêm mới nhân viên và sửa nhân viên
             * Created date :05/12/2022
             * Created by : NVQUY
             */
            let handleFormEmployee = function () {
                $(".m-loading-svg").show();
                setTimeout(() => {
                    $(".m-loading-svg").hide();
                    $("#employeeCode").focus();
                    $(".m-popup-add-employee").show();
                }, 1000);
            }
            /**
            * Mở form thêm mới nhân viên
            * Created  date :05/12/2022
            * Created by : NVQUY           
            */
            $(".m-button-employee").click(function () {
                $("#employeeCode").focus();
                //Thay đổi title form chi tiết thành thêm mới nhân viên
                $(".m-title-content").html("Thêm mới nhân viên");
                handleFormEmployee();
            });

            /**
            * Mở form sửa thông tin nhân viên
            * Created  date :05/12/2022
            * Created by : NVQUY           
            */
            $(document).on('click', '.m-edit-employee', function () {
                $(".m-employee-code").focus();
                $('.m-title-content').text('Sửa nhân viên');
                handleFormEmployee();

            });
            /**
            * Mở form sửa thông tin nhân viên bằng sự kiện double click
            * Created  date :05/12/2022
            * Created by : NVQUY           
            */
            $(document).on('dblclick', '.m-td-dynamic', function () {
                $(".m-loading-svg").show();
                $('.m-title-content').text('Sửa nhân viên');
                handleFormEmployee();
            });
            /**
             * Ẩn hiện dropdown chọn số bản ghi
             * Created date :05/12/2022
             * Created by : NVQUY
             */
            $('.m-select-record').click(function () {
                let top = $(this).offset().top;
                let left = $(this).offset().left;
                let arrowElement = $('.m-icon-arrow-dropdown');
                $('.m-combo-dropdown-panel').css({
                    top: top - 170,
                    left: left - 167,
                    display: '',
                });

                if (arrowElement.hasClass('m-dropdown-close')) {
                    arrowElement.addClass('m-dropdown-open');
                    arrowElement.removeClass('m-dropdown-close');
                } else {
                    arrowElement.addClass('m-dropdown-close');
                    arrowElement.removeClass('m-dropdown-open');
                    $('.m-combo-dropdown-panel').css({ display: 'none' });
                }
            });

            /**
             * Đóng form chi tiết nhân viên
             * Created  date :05/12/2022
             * Created by : NVQUY
             * 
             */
            $(".m-close-add-employee").click(function () {
                $(".m-combo-menu").hide();
                $(".m-popup-add-employee").hide();
            });
            /**
             * Người dùng chọn phòng ban
             * Created  date :05/12/2022
             * Created by : NVQUY
             * 
             */
            $(".m-btn-dropdown-department").click(function () {
                $(".m-combo-menu").toggle();
            })
            /**
            * Các sự kiện trên dropdown: Nhân bản, Xóa, Ngừng sử dụng
            * Created  date :05/12/2022
            * Created by : NVQUY
            * 
            */
            //Người dúng mở dropdown
            $(document).on('click', '.m-dropdown-icon-emp', function () {
                $('.m-dropdown-emp').css({
                    top: $(this).offset().top + 20,
                    left: $(this).offset().left + 40,
                });
                $('.m-dropdown-emp').show();
            });
            //Người dùng ẩn dropdown
            $('body').click(function () {
                $('.m-dropdown-emp').hide();
            });

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Validate dữ liệu nhập vào từ người dùng : Các trường bắt buộc nhập và định dạng dữ liệu như email, số điện thoại
     * CreatedDate: 07/12/2022
     * CreatedBy: NVQUY
     */
    validateData() {
        //Các trường bắt buộc nhập
        $('.m-input-require').each(function () {
            if (!$(this).val()) {
                $(this).addClass('m-input-error');

            } else {
                $(this).removeClass('m-input-error');

            }
        });
        //Các trường định dạng sai 
    }

    /**
 * Xử lý các sự kiện liên quan đến checkbox
 * Author: NVQUY(27/10/2022)
 */
    handleCheckbox() {
        try {

            //Người dùng tích check all
            $('.m-input-checkall').click(function () {
                $('.m-input-checkbox').prop('checked', $(this).prop('checked'));
                $('.m-input-checkbox').parents('tr').addClass('checked');
            });
            //Người dúng tích 1 dòng
            $(document).on('change', '.m-input-checkbox', function () {
                // Làm nổi bật dòng đang tích
                let trElement = $(this).parents('tr');
                if ($(this).prop('checked')) {
                    trElement.addClass('checked');
                } else {
                    trElement.removeClass('checked');
                }
                let checkAll = true;
                // Kiểm tra tất cả các checkbox
                $('.m-input-checkbox').each(function () {
                    if (!$(this).prop('checked')) {
                        checkAll = false;
                    }
                });
                // // Nếu tất cả đều check thì tích checkall
                // if (checkAll) {
                //     $('.m-input-checkall').prop('checked', true);
                // }
                // Nếu bỏ tích 1 dòng thì bỏ tích check all
                if (!$(this).prop('checked')) {
                    $('.m-input-checkall').prop('checked', false);
                }
            });
            //Làm nổi bật dòng người người dùng click trên bảng
            $(document).on('click', '.m-tr', function () {
                const focusElement = $(this);
                $('.m-tr').each(function () {
                    if ($(this) !== focusElement && !$(this).find('.m-input-checkbox').prop('checked')) {
                        $(this).removeClass('checked');
                    }
                });
                focusElement.addClass('checked');
            });
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Hàm xử lý các sự kiện liên quan đến dialog
     * Created  date : 07/12/2022
     * Created by : NVQUY
     */
    handleDialog(){
        try {
            $(document).on('click','.m-item-delete', function(){
                $(".m-delete-warning").show();
            })
        
        } catch (error) {
            console.log(error);
        }   
    }
       

    /**
     * Hàm xử lý các sự kiện liên quan đến load dữ liệu
     * Created date :05/12/2022
     * Created by : NVQUY
     */
    loadData() {
        try {
            if ($('.m-loading-svg').is(':hidden')) {
                $('m-loading-svg').show();
            }
            /**
             * Lấy danh sách tất cả nhân viên từ api
             * Created  date : 05/12/2022
             * Created by : NVQUY
             */
            $.ajax({
                type: "GET",
                url: "https://amis.manhnv.net/api/v1/Employees",
                success: function (response) {
                    const employees = response;
                    // $(".m-tbody").empty();
                    for (const emp of employees) {
                        if (emp) {
                            let dob = emp.DateOfBirth;
                            if (dob) {
                                dob = new Date(dob);
                                // Lấy ngày
                                let date = dob.getDate();
                                date = date < 10 ? `0${date}` : date;
                                // Lấy tháng
                                let month = dob.getMonth() + 1;
                                month = month < 10 ? `0${month}` : month;
                                // Lấy năm
                                let year = dob.getFullYear();

                                dob = `${date}/${month}/${year}`;
                            }
                            let pagHtml = `<tr class="m-tr">
                                    <td class="m-td m-td-multi">
                                        <label class="m-table-checkbox">
                                            <input type="checkbox" class="m-input-checkbox" />
                                            <span class="m-checkbox">
                                                <span class="m-checkbox-inner">
                                                    <div class="m-icon-16 m-icon-checkbox-active"></div>
                                                </span>
                                            </span>
                                        </label>
                                    </td>
                                    <td class="m-td m-td-dynamic m-td-employeeCode">${emp.EmployeeCode || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.EmployeeName || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.GenderName || ''}</td>
                                    <td class="m-td m-td-dynamic" style="text-align: center;">${dob || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.IdentityNumber || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.EmployeePosition || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.DepartmentName || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.BankAccountNumber || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.BankName || ''}</td>
                                    <td class="m-td m-td-dynamic">${emp.BankBranchName || ''}</td>
                                    <td class="m-td m-td-widget">
                                        <div class="m-dropdown">
                                            <button class="m-dropdown-type-feature m-dropdown-button-text m-edit-employee">
                                                <div class="m-button-text ">Sửa</div>
                                            </button>
                                            <button class="m-dropdown-type-feature m-dropdown-button-icon m-dropdown-icon-emp">
                                                <div class="m-button-text">
                                                    <div class="m-icon-16 m-icon-arrow-down-blue"></div>
                                                </div>
                                            </button>
                                        </div>
                                    </td>
                                </tr>`
                            $(".m-tbody").append(pagHtml);
                        }
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            }),
                /**
                 * Lấy danh sách tất cả phòng ban từ api
                 * Created  date : 05/12/2022
                 * Created by : NVQUY
                 */
                $.ajax({
                    type: 'GET',
                    url: 'https://amis.manhnv.net/api/v1/Departments',
                    success: function (response) {
                        const departments = response;
                        $('.m-departments-list').empty();
                        for (const department of departments) {
                            if (department) {
                                let trHTML = $(`
                                <tr class="m-menu-items-tr">
                                    <td class="m-menu-items-td" style="width: 100px; text-align: left"><span>${department.DepartmentCode || ''}</span></td>
                                    <td class="m-menu-items-td" style="width: 250px; text-align: left"><span>${department.DepartmentName || ''}</span></td>
                                </tr>
                                `);
                                $('.m-departments-list').append(trHTML);
                            }
                        }
                    },
                    error: function (response) {
                        console.log(response);
                    },
                });
        } catch (error) {
            console.log(error);
        }
    }

}

