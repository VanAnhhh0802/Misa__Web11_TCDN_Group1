
let action = "";


createEvent()
fetchAllEmployees()
getDepartments()
getPositions()
handleDropdown()
handleCombobox()



/**
 * Gọi API và hiển thị vào bảng dữ liệu
 * Author: QuangNV (08/12/2022)
 */
function fetchAllEmployees() {
    try {
        $(".loading").show();
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Employees",
            success: function (response) {
                let employees = response;
                console.log(employees)
                
                // $("#tblEmployee tbody").empty();
                for (const employee of employees) {
                    const code = employee.EmployeeCode?employee.EmployeeCode:"";
                    const name = employee.EmployeeName?employee.EmployeeName:"";
                    const gender = employee.GenderName?employee.GenderName:"";
                    const dob = employee.DateOfBirth?convertDate(employee.DateOfBirth):"";
                    const idCard = employee.IdentityNumber?employee.IdentityNumber:"";
                    const position = employee.PositionName?employee.PositionName:"";
                    const departmentName = employee.DepartmentName?employee.DepartmentName:"";
                    const bankAccountNumber = employee.BankAccountNumber?employee.BankAccountNumber:""
                    const bankName = employee.BankName?employee.BankName:"";
                    const bankBranchName = employee.BankBranchName?employee.BankBranchName:"";
    
                    //bắn dữ liệu vào table
                    const trElement = ` <tr data-value= ${employee.EmployeeId}>
                                            <td class="table-checkbox">
                                                <label class="m-table-checkbox  m-margin-lr-16">
                                                    <input type="checkbox" class="m-input-checkbox" />
                                                        <span class="m-checkbox">
                                                            <span class="m-checkbox-inner">
                                                                <div class="m-icon m-icon-16 m-icon-checkbox-active"></div>
                                                            </span>
                                                        </span>
                                                </label>
                                            </td>
                                            <td class="table-id" table-property-name="EmployeeCode">${code}</td>
                                            <td class="table-name">${name}</td>
                                            <td class="table-gender">${gender}</td>
                                            <td class="table-dob text-center">${dob}</td>
                                            <td class="table-id-card">${idCard}</td>
                                            <td class="table-position">${position}</td>
                                            <td class="table-work">${departmentName}</td>
                                            <td class="table-bank-id">${bankAccountNumber}</td>
                                            <td class="table-bank-name">${bankName}</td>
                                            <td class="table-bank-place">${bankBranchName}</td>
                                            <td class="table-func text-center m-flex">
                                                <div class="m-dropdown">
                                                    <button class="m-dropdown-type-feature m-dropdown-button-text m-edit-employee">
                                                        <div class="m-button-text ">Sửa</div>
                                                    </button>
                                                    <button class="m-dropdown-type-feature m-dropdown-button-icon m-dropdown-icon-emp">
                                                        <div class="m-button-text">
                                                            <div class="m-icon m-icon-16 m-icon-arrow-down-blue"></div>
                                                        </div>
                                                    </button>
                                                    
                                                </div>
                                            </td>
                                        </tr>
                    `
                    $("#tblEmployee tbody").append(trElement);
                    $(".loading").hide();
                    $(".total-record").empty();
                    $(".total-record").append(`Tổng số: <span>${employees.length}</span> bản ghi`)
                }
            }
        })
    } catch (error) {
        debugger
    }
}


/** 
 * Event js 
 * Author: QuangNV (08/12/2022)
 **/

function createEvent() {

    /**
     * author: QuangNV (08/12/2022) tạo event click cho btn thêm nhân viên
     */
    $("#add").click(addBtnClickHandle)

    /**
     * author: QuangNV (08/12/2022) Đóng form khi ấn vào dấu x
     */
    
    $("#addAndInsertForm .close-icon").click(function (e) { 
        $("#addAndInsertForm").hide();
        resetForm()
    });

    /**
     * author: QuangNV (08/12/2022) Đóng form khi ấn vào nút cancel
     */
    
    $("#close-btn").click(function (e) { 
        e.preventDefault();
        $("#addAndInsertForm").hide();
        resetForm()
    });
    
    /**
     * author: QuangNV (08/12/2022) Double click vào hàng thì hiện thông tin nhân viên
     */

    $("#tblEmployee").on("dblclick","tbody tr", dblClickHandle)

    $("#tblEmployee").on("click",".m-edit-employee", insertClickHandle)
    
    // $("#tblEmployee").on("click","tbody tr",function(e) {
    //     $(this).addClass("tr-onclick");
    //     $(this).addClass("tr-onclick");
    // })
    
    /**
     * author: QuangNV (08/12/2022) Nhấn nút refresher thì làm mới dữ liệu trong bảng
     */

    $("#refresh-btn").click(function (e) { 
        $("#tblEmployee tbody").empty();
        fetchAllEmployees()
    });
    
    /**
     * Tab index khi hết dialog thì focus ô đầu tiên
     * Author: QuangNV (08/12/2022)
     */
    $("#close-btn").keydown(function (e) {
        e.preventDefault();
        $("#employeeCode").focus();    
    });

    /**
     * Event nút cất và thêm
     * Author: QuangNV (08/12/2022)
     */
    $("#accept-btn").on("click", addAndSaveBtnOnClickHandle);

    /**
     * event đóng dialog báo lỗi
     * Author: QuangNV (08/12/2022)
     */
    $(".dialog-close.close-icon").click(function() {
        $("#errDialog").hide();
    })

     /**
     * event đóng dialog báo lỗi
     * Author: QuangNV (08/12/2022)
     */

    $(".notify-btn").click(function() {
        $(fieldErrors[0]).focus();
        $("#errDialog").hide();
        if(fieldErrors.length) {
            for (const fieldError of fieldErrors) {
                $(fieldError).addClass('m-input-err');
                let fieldLabel = $(fieldError).attr('field-label');
                let errMsgEl = `<div class="m-input-err-text">${fieldLabel} không được để trống</div>`;
                if(!$(fieldError).siblings('.m-input-err-text').length) {
                    $(fieldError).after(errMsgEl);
                }
            } 
        }
    })

     /**
     * event xử lý validate dữ liệu. Báo lỗi ngay khi người dùng unfocus khỏi ô input bị lỗi
     * Author: QuangNV (08/12/2022)
     */

    $('[m-required]').blur(function() {
        const value = $(this).val();
        if (!value || value.trim() == '') {
            $(this).addClass('m-input-err');
            let fieldLabel = $(this).attr('field-label');
            let errMsgEl = `<div class="m-input-err-text">${fieldLabel} không được để trống</div>`;
            if(!$(this).siblings('.m-input-err-text').length) {
                $(this).after(errMsgEl);
            }
        } else {
            $(this).removeClass('m-input-err');
            $(this).siblings('.m-input-err-text').remove();
        }
    })

     /**
     * event xử lý xóa nhân viên
     * Author: QuangNV (12/12/2022)
     */

    // $('.remove-employee').on('click',function(){
    //     try {
    //         const deleteId = $(this).data('value');
    //         console.log(deleteId)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
}

/**
 * 
 * author: QuangNV (08/12/2022) convert dateTime to string
 */

function convertDate(dateTime) {
    dateTime = new Date(dateTime)
    return `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`
}

/**
 * 
 * author: QuangNV (08/12/2022) xử lý hành động click btn thêm nhân viên
 */
function addBtnClickHandle() { 
    $("#addAndInsertForm").show();
    action = 'add'
    $("#addAndInsertForm .header-title").text("Thêm mới nhân viên");
    try {
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function (response) {
                $("#employeeCode").val(response)
                $("#employeeCode").focus()
            }
        });
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * author: QuangNV (08/12/2022) xử lý hành động click btn lưu và cất
 */
function addAndSaveBtnOnClickHandle(){
    //validate dữ liệu
    // const employeeCode =$("#employeeCode").val();
    // const employeeName =$("#employeeName").val();
    // const dob =$("#dob").val();
    // const department =$("#employeeDepartment option:selected").val();
    // const nationalId =$("#nationalId").val();
    // const position = $("#employeePosition option:selected").val();;
    // const nationalIdDate =$("#nationalIdDate").val();
    // const nationalIdPlace =$("#nationalIdPlace").val();
    // const address =$("#address").val();
    // const telephoneNumber =$("#telephoneNumber").val();
    // const phoneNumber =$("#phoneNumber").val();
    // const email =$("#email").val();

    const fields = $('[property-name]')
    const employee = {};
    for (const field of fields) {
        let value
        if($(field).attr('id')=='gender') {
            value = $('[name=gender]:checked').val();
        } else {
            value = $(field).val();
        }
        const propertyName = $(field).attr('property-name');
        employee[propertyName] = value;
    }

    fieldErrors = [];
    let ErrMessages = [];
    let fieldsRequired = $('[m-required]');
    for (const fieldRequired of fieldsRequired) {
        const fieldValue = $(fieldRequired).val();
        const fieldLabel = $(fieldRequired).attr('field-label');
        if(!fieldValue){
            fieldErrors.push(fieldRequired);
            ErrMessages.push(`${fieldLabel} không được để trống`);
        }
    }

    if(fieldErrors.length) {
        $("#errDialog .dialog-text").text(ErrMessages[0])
        $("#errDialog").show();
    }else {
        switch (action) {
            case 'add':
                addEmployee(JSON.stringify(employee))
                break;
                
            case 'insert':
                insertEmployee(JSON.stringify(employee),currentId)
            default:
                break;
        }
        resetForm()
    }
}

/**
 * Lấy dữ liệu Đơn vị trong form thêm nhân viên
 * author: QuangNV (08/12/2022)
 */
function getDepartments() {
    try {
        $("#employeeDepartment").empty();
        $("#employeeDepartment").append(`<option value="">Chọn đơn vị</option>`);
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Departments",
            success: function (response) {
                for (const department of response) {
                    const departmentOption = `<option value="${department.DepartmentId}">${department.DepartmentName}</option>`;
                    $("#employeeDepartment").append(departmentOption);
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

/**
 * Lấy dữ liệu Đơn vị trong form thêm nhân viên
 * author: QuangNV (08/12/2022)
 */
function getPositions() {
    try {
        $("#employeePosition").empty();
        $("#employeePosition").append(`<option value="">Chọn chức danh</option>`);
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Positions",
            success: function (response) {
                for (const position of response) {
                    const positionOption = `<option value="${position.PositionId}">${position.PositionName}</option>`;
                    $("#employeePosition").append(positionOption);
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

/**
 * xử lý hành động thêm nhân viên
 * author: QuangNV (08/12/2022) 
 */
function addEmployee(data) {
    try {
        $.ajax({
            type: "POST",
            url: "https://amis.manhnv.net/api/v1/Employees",
            data: data,
            contentType: "application/json;charset=utf-8",
            success: function (response) {
                console.log(response)
                fetchAllEmployees()
                console.log("Thêm thành công")
            }
        });
        $("#addAndInsertForm").hide();
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * Author: QuangNV (09/12/2022) Xử lý sửa nhân viên
 */

function insertEmployee(data, id) {
    try {
        $.ajax({
            type: "PUT",
            url: `https://amis.manhnv.net/api/v1/Employees/${id}`,
            data: data,
            contentType: "application/json;charset=utf-8",
            success: function (response) {
                console.log(response)
                $("#addAndInsertForm").hide();
                fetchAllEmployees()
            }
        });
    } catch (error) {
        console.log(error)
    }
}

/**
 * xóa các dữ liệu cũ trong ô input
 * Author: QuangNV (09/12/2022) 
 */
function resetForm() {
    $("#employeeName").val("");
    $("#dob").val('');
    // $("#employeeDepartment option:selected").val();
    $("#nationalId").val('');
    // $("#employeePosition").val('');
    $("#nationalIdDate").val('');
    $("#nationalIdPlace").val('');
    $("#address").val('');
    $("#telephoneNumber").val('');
    $("#phoneNumber").val('');
    $("#email").val('');
}

/**
 * Định dạng ngày tháng để hiển thị dữ liệu vào ô input
 * Author: QuangNV (09/12/2022) 
 */
function bindingDate(date) {
    if(date) {
        date = new Date(date)
        if(date.getDate() > 9) {
            var day = date.getDate();
        } else {
            var day = '0' + date.getDate();
        }
        if((date.getMonth() + 1) > 9) {
            var month = (date.getMonth() + 1);
        } else {
            var month = '0' + (date.getMonth() + 1);
        }
        let yeah = date.getFullYear();
        return yeah + '-' + month + '-' + day;
    }
}

 /**
     * Các sự kiên liên quan đến dropdow
     * Author: QuangNV (12/12/2022)
*/
 function handleDropdown() {
    //Các sự kiện trên dropdown: Nhân bản, Xóa, Ngừng sử dụng
    //Người dúng mở dropdown
    $(document).on('click', '.m-dropdown-icon-emp', function () {
        deleteId = $(this).parents('tr').data('value');
        $('.m-dropdown-emp').css({
            top: $(this).offset().top + 20,
            left: $(this).offset().left + 40,
        });
        $('.m-dropdown-emp').show();

        let empCode = $(this).parents('tr').find('.table-id').text();
        console.log(empCode)
        $('.m-delete-warning .dialog-text').text(`Bạn có thực sự muốn xóa Nhân viên <${empCode}> không?`);
    });
    // 2. Người dùng ẩn dropdown
    $('body').click(function () {
        $('.m-dropdown-emp').hide();
    });
    // 3. Người dùng chọn xóa nhân viên
    $('.m-item-delete').click(function () {
        $('.m-delete-warning').show();
    });

    // 4. Người dùng chọn có
    $('#warningDialog .accept-btn').click(function() {
        console.log('xóa')
        try {
            $.ajax({
                type: "DELETE",
                url: `https://amis.manhnv.net/api/v1/Employees/${deleteId}`,
                success: function (response) {
                    console.log('xóa thành công')
                    $('.m-delete-warning').hide();
                    fetchAllEmployees();
                }
            });
        } catch (error) {
            console.log(error)
        }
        
    })

    // 5. Người dùng chọn không
    $('#warningDialog .cancel-btn').click(function() {
        console.log('Ko xóa')
        $('.m-delete-warning').hide();
    })

    $('#warningDialog .close-icon').click(function() {
        console.log('Ko xóa')
        $('.m-delete-warning').hide();
    })
}

 /**
     * Các sự kiên liên quan đến combobox
     * Author: QuangNV (12/12/2022)
*/
function handleCombobox() {
    //  Các sự kiện đóng mở combo box
    let arrowElement = $('.m-icon-arrow-dropdown');
    // 1. Mở và đóng combo box chọn số bản ghi
    $('.m-select-record').click(function () {
        let top = $(this).offset().top;
        let left = $(this).offset().left;
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

    // $('body').click(function () {
    //     arrowElement.addClass('m-dropdown-close');
    //     arrowElement.removeClass('m-dropdown-open');
    //     $('.m-combo-dropdown-panel').css({ display: 'none' });
    // });
}

/**
 * logic xử lý sự kiện dblClick
 * author: QuangNV(12/12/2022) 
 */

function dblClickHandle(e){
    $("#addAndInsertForm").show();
    action = 'insert';
    currentId = $(this).data("value");
    const fields = $("[property-name]");
    try {
        $("#addAndInsertForm .header-title").text("Thông tin nhân viên");
        $.ajax({
            type: "GET",
            url: `https://amis.manhnv.net/api/v1/Employees/${currentId}`,
            success: function (response) {
                console.log(response)
                for (const field of fields) {
                    const propertyName = $(field).attr('property-name');
                    if($(field).attr('type') == 'date') {
                        $(field).val(bindingDate(response[propertyName]))
                    } else if($(field).attr('id') == 'gender') {
                        console.log('xử lý sau')
                    } else {
                        $(field).val(response[propertyName])
                    }
                }
                // $("#addAndInsertForm .header-title").text("Thông tin nhân viên");
                // $("#employeeCode").val(response.EmployeeCode);
                // $("#employeeName").val(response.EmployeeName);
                // $("#dob").val(bindingDate(response.DateOfBirth));
                // // $("input[name='gender']:checked").val();
                // // $("#employeeDepartment option:selected").val();
                // $("#nationalId").val(response.IdentityNumber);
                // // $("#employeePosition").val('05458d48-e7a0-11ec-9b48-00163e06abee');
                // // $("#nationalIdDate").val(response.IdentityDate);
                // $("#nationalIdPlace").val(response.IdentityPlace);
                // $("#address").val(response.Address);
                // $("#telephoneNumber").val(response.TelephoneNumber);
                // $("#phoneNumber").val(response.PhoneNumber);
                // $("#email").val(response.email);
            }
        });    
    } catch (error) {
        console.log(error)
    }
}

/**
 * logic xử lý sự kiện click nút sửa
 * author: QuangNV(12/12/2022) 
 */

function insertClickHandle(e){
    $("#addAndInsertForm").show();
    action = 'insert';
    currentId = $(this).parents('tr').data("value");
    const fields = $("[property-name]");
    try {
        $("#addAndInsertForm .header-title").text("Thông tin nhân viên");
        $.ajax({
            type: "GET",
            url: `https://amis.manhnv.net/api/v1/Employees/${currentId}`,
            success: function (response) {
                console.log(response)
                for (const field of fields) {
                    const propertyName = $(field).attr('property-name');
                    if($(field).attr('type') == 'date') {
                        $(field).val(bindingDate(response[propertyName]))
                    } else if($(field).attr('id') == 'gender') {
                        console.log('xử lý sau')
                    } else {
                        $(field).val(response[propertyName])
                    }
                }
                // $("#employeeCode").val(response.EmployeeCode);
                // $("#employeeName").val(response.EmployeeName);
                // $("#dob").val(bindingDate(response.DateOfBirth));
                // // $("input[name='gender']:checked").val();
                // // $("#employeeDepartment option:selected").val();
                // $("#nationalId").val(response.IdentityNumber);
                // // $("#employeePosition").val('05458d48-e7a0-11ec-9b48-00163e06abee');
                // // $("#nationalIdDate").val(response.IdentityDate);
                // $("#nationalIdPlace").val(response.IdentityPlace);
                // $("#address").val(response.Address);
                // $("#telephoneNumber").val(response.TelephoneNumber);
                // $("#phoneNumber").val(response.PhoneNumber);
                // $("#email").val(response.email);
            }
        });    
    } catch (error) {
        console.log(error)
    }
}