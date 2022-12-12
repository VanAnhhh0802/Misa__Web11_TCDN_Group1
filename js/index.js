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
            // Sự kiện click vào nút refresh thì load lại dữ liệu
            $('.m-icon-refresh').click(function () {
                emp.loadData();
            })
            //Sự kiện liên quan đến dialog
            emp.handleDialog();
            //Hiển thị form thêm mới nhân viên
            emp.showAddEmployee();
            // Các sự kiên liên quan đến combobox
            emp.handleCombobox();
            //Sự kiện dropdown
            emp.handleDropdown();
            

            // Các sự kiện liên quan đến form chi tiết nhân viên
            // 1. Sự kiện nút hủy trên form chi tiết nhân viên: Giữ lại các giá trị đã nhập trên form 
            $('.m-button-add-close').click(function(){
                $('.m-popup-add-employee').hide();
            })
           
            //handleAddEmployee
            // emp.handleAddEmployee();
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
                if (event.which == 45) {
                    //Thay đổi title form chi tiết thành thêm mới nhân viên
                    $(".m-title-content").html("Thêm mới nhân viên");
                    emp.showAddEmployee();
                }
            });
            /**
             * Sự kiện nhấn phím esc đóng form chi tiết nhân viên
             * Created  date :07/12/2022
             * Created by : NVQUY
             */
            $(document).keydown(function (event) {
                if (event.which == 27) {
                    $(".m-popup-add-employee").hide();

                }
            });
            /**
            * Mở form sửa thông tin nhân viên
            * Created  date :05/12/2022
            * Created by : NVQUY           
            */
            $(document).on('click', '.m-edit-employee', function () {
                $('.m-title-content').text('Sửa nhân viên');
                // handleFormEmployee();


            });
            /**
            * Mở form sửa thông tin nhân viên bằng sự kiện double click
            * Created  date :05/12/2022
            * Created by : NVQUY           
            */
            $(document).on('dblclick', '.m-td-dynamic', function () {
                $(".m-loading-svg").show();
                $('.m-title-content').text('Sửa nhân viên');

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
            // $(".m-btn-dropdown-department").click(function () {
            //     $(".m-combo-menu").toggle();
            // })

        } catch (error) {
            console.log(error);
        }
    }

    /**
    * So sánh 2 object
    * Author:NVQUY(08/12/2022)
    */
    objectEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        // Check số lượng key của 2 object
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Check lần lượt các value
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = this.isObject(val1) && this.isObject(val2);

            if ((areObjects && !objectEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
                return false;
            }
        }

        return true;
    }
    isObject(object) {
        return object != null && typeof object === 'object';
    }


    /**
 * Xử lý các sự kiện liên quan đến checkbox
 * Author: NVQUY(07/12/2022)
 */
    handleCheckbox() {
        try {
            //  1. Người dùng tích check all
            $('.m-input-checkall').click(function () {
                $('.m-input-checkbox').prop('checked', $(this).prop('checked'));
                $('.m-input-checkbox').parents('tr').addClass('checked');
            });
            // 2. Người dúng tích 1 dòng
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
                // Nếu tất cả đều check thì tích checkall
                if (checkAll) {
                    $('.m-input-checkall').prop('checked', true);
                }
                // Nếu bỏ tích 1 dòng thì bỏ tích check all
                if (!$(this).prop('checked')) {
                    $('.m-input-checkall').prop('checked', false);
                }
            });
            // 3. Làm nổi bật dòng người người dùng click trên bảng
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
     * Các sự kiên liên quan đến dropdow
     * Author: NVQUY(09/12/2022)
     */
    handleDropdown() {
        //Các sự kiện trên dropdown: Nhân bản, Xóa, Ngừng sử dụng
        //Người dúng mở dropdown
        $(document).on('click', '.m-dropdown-icon-emp', function () {
            localStorage.setItem('empId', $(this).parents('tr').data('id'));
            $('.m-dropdown-emp').css({
                top: $(this).offset().top + 20,
                left: $(this).offset().left + 40,
            });
            $('.m-dropdown-emp').show();

            let empCode = $(this).parents('tr').find('.m-td-employeeCode').text();
            $('.m-delete-warning .m-content-message').text(`Bạn có thực sự muốn xóa Nhân viên <${empCode}> không?`);
        });
        // 2. Người dùng ẩn dropdown
        $('body').click(function () {
            $('.m-dropdown-emp').hide();
        });
        // 3. Người dùng chọn xóa nhân viên
        $('.m-item-delete').click(function () {
            $('.m-delete-warning').show();
        });


    }

    handleCombobox() {
        //  Các sự kiện đóng mở combo box
        // 1. Mở và đóng combo box chọn số bản ghi
        $('.m-select-record').click(function () {
            let top = $(this).offset().top;
            let left = $(this).offset().left;
            let arrowElement = $('.m-icon-arrow-dropdown');
            $('.m-combo-dropdown-panel').css({
                top: top - 170,
                left: left - 169,
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
        // 2. Mở và đóng combo box chọn phòng ban
        $(".m-btn-dropdown-department").click(function () {
            $(".m-combo-menu").toggle();
        })
        // 3. Người dùng chọn phòng ban
        $(document).on('click', '.m-menu-items-tr', function () {
            let department = $(this).data('object');
            $('input[name="DepartmentId"]').val(department.DepartmentId);
            $('input[name="DepartmentName"]').val(department.DepartmentName);
            $('.m-combo-menu').removeClass('m-open').hide();
        });

    }
    /**
     * Hàm xử lý các sự kiện liên quan đến dialog
     * Created  date : 07/12/2022
     * Created by : NVQUY
     */
    handleDialog() {
        try {
            //Gắn con trỏ this
            const self = this;
            // 1. Các sự kiện liên quan đến xóa nhân viên theo ID
            // 2. Các sự kiện trên dialog confirm xóa
            $('.m-delete-warning')
                // Người dùng chọn không
                .on('click', '.m-close-delete-warning', function () {
                    $(this).parents('.m-dialog').hide();
                })
                // Người dùng chọn có
                .on('click', '.m-confirm-delete', function () {
                    $('.m-loading-svg').show();
                    $(this).parents('.m-dialog').hide();
                    self.handleDeleteEmployee();
                });
                 // 3. Các sự kiện trên dialog success
            $('.m-employee-success').on('click', '.m-close-success-dialog', function () {
                $(this).parents('.m-dialog').hide();
               
            });
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
            $('.m-loading-svg').show();
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
                            let pagHtml = $(`<tr class="m-tr">
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
                                </tr>`);
                            // append dữ liệu vào table
                            $(".m-tbody").append(pagHtml);
                            $(pagHtml).data('object', emp);
                            $(pagHtml).data('id', emp.EmployeeId);
                            $('.m-loading-svg').hide();
                        }
                    }
                }
            });
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
                            $(trHTML).data('object', department);
                            $('.m-departments-list').append(trHTML);
                        }
                    }
                }
            });
            this.handleEvent();
        } catch (error) {
            console.log(error);
        }
    }
    /**
           * Mở form thêm mới nhân viên
           * Created  date :05/12/2022
           * Created by : NVQUY           
           */
    showAddEmployee() {
        try {
            //click vào nút thêm mới nhân viên sẽ hiển thị form
            $(document).on('click', '.m-button-employee', function () {
                //gắn con trỏ
                $('.m-loading-svg').show();
                $.ajax({
                    type: 'GET',
                    url: 'https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode',
                    success: function (response) {
                        $('.m-loading-svg').hide();
                        $('.m-popup-add-employee').show();
                        $('input[name="Gender"][value="0"]').prop('checked', true);
                        $('input[name="EmployeeCode"]').val(response);
                        $('.m-title-content').text("Thêm mới nhân viên");
                        $('#employeeCode').val(response);
                        $('#employeeCode').focus();
                    },
                    error: function (error) {
                        $('.m-loading-svg').hide();
                        console.log(error);
                    },
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
    /**
 * Người dùng xóa nhân viên
 * Author: NVQUY (09/12/2022
 */
    handleDeleteEmployee() {
        try {
            let empId = localStorage.getItem('empId');
            // Gán con trỏ this
            const self = this;
            $.ajax({
                type: 'DELETE',
                url: `https://amis.manhnv.net/api/v1/Employees/${empId}`,
                success: function (response) {
                    $('.m-loading-svg').hide();
                    // Hiển thị dialog xóa thành công
                    $('.m-employee-success .m-content-message').text('Xóa nhân viên thành công');
                    $('.m-employee-success').show();
                    // Load lại dữ liệu
                    self.loadData();
                }
            });
        } catch (error) {   
            console.log(error);
        }
    }
                
    
}
