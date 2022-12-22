<template>
  <Teleport to="body">
    <div class="dialog" id="addAndInsertForm" style="display:block">
      <div class="dialog-container form">
        <div class="dialog-close">
          <div class="m-icon m-icon-24 help-icon" title="Help"></div>
          <div class="m-icon m-icon-24 close-icon" title="Close" @click="onCloseForm"></div>
        </div>
        <div class="dialog-header form-header">
          <div class="header-title">{{ formTitle }}</div>
          <label class="checkbox m-flex m-margin-lr-16">
            <label class="m-table-checkbox  m-margin-lr-16">
              <input type="checkbox" class="m-input-checkbox" />
              <span class="m-checkbox">
                <span class="m-checkbox-inner">
                  <div class="m-icon m-icon-16 m-icon-checkbox-active"></div>
                </span>
              </span>
            </label>
            <div class="checkbox-title">Là khách hàng</div>
          </label>
          <label class="checkbox m-flex">
            <div class="checkbox-icon">
              <label class="m-table-checkbox  m-margin-lr-16">
                <input type="checkbox" class="m-input-checkbox" />
                <span class="m-checkbox">
                  <span class="m-checkbox-inner">
                    <div class="m-icon m-icon-16 m-icon-checkbox-active"></div>
                  </span>
                </span>
              </label>
            </div>
            <div class="checkbox-title">Là nhà cung cấp</div>
          </label>
        </div>
        <div class="form-content">
          <div class="m-flex">
            <div style="width: 50%;background-color: #fff;padding-right: 10px;">
              <div class="m-flex" style="height:80px">
                <div class="div" style="display: block; width: 150px;">
                  <div class="m-input-box">
                    <label for="" class="m-input-label">Mã nhân viên <div class="m-input-title-require">&nbsp;*
                      </div></label>
                    <input type="text" field-label='Mã nhân viên' class="m-input" v-model.trim="employee.EmployeeCode"
                      :class="{ 'm-input-err': isEmployeeCodeErr }" @blur="inputEmployeeCodeOnBlur">
                    <div class="m-input-err-text" v-if="isEmployeeCodeErr">Mã không được để trống</div>
                  </div>
                </div>
                <div class="div" style="display: block; flex: 1;">
                  <div class="m-input-box" style="padding-left:10px">
                    <label for="" class="m-input-label">Tên nhân viên <div class="m-input-title-require">&nbsp;*
                      </div></label>
                    <input type="text" field-label='Tên nhân viên' class="m-input" v-model.trim="employee.EmployeeName"
                      :class="{ 'm-input-err': isEmployeeNameErr }" @blur="inputEmployeeNameOnBlur">
                    <div class="m-input-err-text" v-if="isEmployeeNameErr">Tên nhân viên không được để trống</div>
                  </div>
                </div>
              </div>

              <div class="m-input-box" style="height:80px">
                <label for="" class="m-input-label">Đơn vị <div class="m-input-title-require">&nbsp;*
                  </div></label>
                <ms-combobox url="https://amis.manhnv.net/api/v1/Departments" propValue="DepartmentId"
                  propText="DepartmentName" @getValue='departmentGetValue' :isRequired="true"
                  :isError="isDepartmentErr"></ms-combobox>
                <div class="m-input-err-text" v-if="isDepartmentErr">Đơn vị không được để trống</div>
              </div>
              <div class=" m-input-box" style="display: block;">
                <label for="" class="m-input-label">Chức danh</label>
                <ms-combobox url="https://amis.manhnv.net/api/v1/positions" propValue="PositionId"
                  propText="PositionName"></ms-combobox>
              </div>
            </div>

            <div style="flex: 1;padding-left:10px">
              <div class="m-flex" style="height:80px">
                <div class="m-input-box" style="display: block; width: 150px;">
                  <label for="" class="m-input-label">Ngày sinh</label>
                  <input type="date" class="m-input" id="dob" property-name="DateOfBirth"
                    v-model="employee.DateOfBirth">
                </div>
                <div class="radio-box" style="display: block; flex: 1;">
                  <label for="" class="m-input-label">Giới tính</label>
                  <div class="radio-list" property-name="Gender" id="gender">
                    <label class="m-con-radio">
                      <input type="radio" class="m-input-radio" value="0" name="gender" v-model="employee.Gender" />
                      <span class="m-radio">
                        <span class="m-radio-border"></span>
                        <span class="m-radio-circle"></span>
                      </span>
                      <span class="m-radio-label">Nam</span>
                    </label>
                    <label class="m-con-radio">
                      <input type="radio" class="m-input-radio" value="1" name="gender" v-model="employee.Gender" />
                      <span class="m-radio">
                        <span class="m-radio-border"></span>
                        <span class="m-radio-circle"></span>
                      </span>
                      <span class="m-radio-label">Nữ</span>
                    </label>
                    <label class="m-con-radio">
                      <input type="radio" class="m-input-radio" value="2" name="gender" v-model="employee.Gender" />
                      <span class="m-radio">
                        <span class="m-radio-border"></span>
                        <span class="m-radio-circle"></span>
                      </span>
                      <span class="m-radio-label">Khác</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="m-flex" style="height:80px">
                <div style="display: block; flex: 1;">
                  <div class="m-input-box">
                    <label for="" class="m-input-label" title="Số chứng minh nhân dân">Số CMND</label>
                    <input type="text" field-label='Số CMTND' class="m-input" v-model="employee.IdentityNumber">
                  </div>
                </div>
                <div style="display: block; width: 150px;">
                  <div class="m-input-box" style="padding-left:10px">
                    <label for="" class="m-input-label" title="Số chứng minh thư nhân dân">Ngày cấp</label>
                    <input type="date" field-label='Ngày cấp' class="m-input" v-model="employee.IdentityDate">
                  </div>
                </div>
              </div>
              <div class="m-input-box">
                <label for="" class="m-input-label" title="Số chứng minh thư nhân dân">Nơi cấp</label>
                <input type="text" field-label='Nơi cấp' class="m-input" v-model="employee.IdentityPlace">
              </div>
            </div>
          </div>
          <div>
            <div class="m-input-box">
              <label for="" class="m-input-label" title="Số chứng minh thư nhân dân">Địa chỉ</label>
              <input type="text" field-label='Địa chỉ' class="m-input" v-model="employee.Address">
            </div>
          </div>
          <div style="width:75%">
            <div class="m-flex" style="width: 100%;">
              <div style="display: block; width: 33%;">
                <div class="m-input-box">
                  <label for="" class="m-input-label" title="Điện thoại di động">ĐT di động</label>
                  <input type="text" field-label='ĐT di động' class="m-input" v-model="employee.TelephoneNumber">
                </div>
              </div>
              <div style="display: block; width: 33%;">
                <div class="m-input-box" style="padding-left:10px">
                  <label for="" class="m-input-label" title="Điện thoại cố định">ĐT cố định</label>
                  <input type="text" field-label='ĐT cố định' class="m-input" v-model="employee.PhoneNumber">
                </div>
              </div>
              <div style="display: block; width: 33%;">
                <div class="m-input-box" style="padding-left:10px">
                  <label for="" class="m-input-label">Email</label>
                  <input type="text" field-label='Email' class="m-input" v-model="employee.Email">
                </div>
              </div>
            </div>
            <div class="m-flex" style="width: 100%;">
              <div style="display: block; width: 33%;">
                <div class="m-input-box">
                  <label for="" class="m-input-label">Tài khoản ngân hàng</label>
                  <input type="text" field-label='Tài khoản ngân hàng' class="m-input"
                    v-model="employee.BankAccountNumber">
                </div>
              </div>
              <div style="display: block; width: 33%;">
                <div class="m-input-box" style="padding-left:10px">
                  <label for="" class="m-input-label">Tên ngân hàng</label>
                  <input type="text" field-label='Tên ngân hàng' class="m-input" v-model="employee.BankName">
                </div>
              </div>
              <div style="display: block; width: 33%;">
                <div class="m-input-box" style="padding-left:10px">
                  <label for="" class="m-input-label">Chi nhánh</label>
                  <input type="text" field-label='Chi nhánh' class="m-input" v-model="employee.BankBranchName">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-footer">
          <div class="footer-right">
            <MButton class="dialog-btn primary-btn accept-btn" text="Cất và thêm"></MButton>
            <MButton class="m-btn dialog-btn lower-btn cancel-btn" text="Cất" @click="saveBtnOnClick"></MButton>
          </div>
          <div class="footer-left">
            <MButton class=" dialog-btn lower-btn" text="Hủy" @click="onCloseForm"></MButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
  <!-- dialog báo lỗi -->
  <BaseDiaLog v-if="isErrShow">
    <template v-slot:dialogContent>
      <ErrDialogContent :errContent="errContent"></ErrDialogContent>
    </template>
    <template v-slot:dialogFooter>
      <ErrDialogFooter @closeErrDialog='onToggleErrDialog'></ErrDialogFooter>
    </template>
  </BaseDiaLog>
</template>

<script>
import axios from "axios"
import MButton from './MButton.vue';
import BaseDiaLog from '../base/BaseDialog.vue';
import ErrDialogContent from '../MDialog/ErrDialog/ErrDialogContent.vue';
import ErrDialogFooter from '../MDialog/ErrDialog/ErrDialogFooter.vue';
export default {
  name: "AddSaveForm",
  emits: ["cancel", "saveBtnOnClick"],
  props: {
    employeeSelectedId: String,
  },
  data() {
    return {
      employee: {},
      formTitle: '',
      isEmployeeCodeErr: false,
      isEmployeeNameErr: false,
      isDepartmentErr: false,
      isErrShow: false,
      errMsg: [],
      isLoadData: false,
      errContent: null
    }
  },
  components: {
    MButton,
    BaseDiaLog,
    ErrDialogContent,
    ErrDialogFooter
  },
  methods: {
    /**
     * Đóng form thêm và sửa thông tin
     * Author: QuangNV (15/12/2022)
     */
    onCloseForm() {
      this.$emit("cancel")
    },

    /**
     * Định dạng ngày tháng để hiển thị vào bảng dữ liệu
     * Author: QuangNV (15/12/2022)
     */
    formatDate(date) {
      try {
        if (date) {
          date = new Date(date)
          let day, month, yeah;
          if (date.getDate() > 9) {
            day = date.getDate();
          } else {
            day = '0' + date.getDate();
          }
          if ((date.getMonth() + 1) > 9) {
            month = (date.getMonth() + 1);
          } else {
            month = '0' + (date.getMonth() + 1);
          }
          yeah = date.getFullYear();
          return `${yeah}-${month}-${day}`
        } else {
          return ""
        }
      } catch (error) {
        console.log(error);
        return ""
      }
    },

    /**
     * Lấy dữ liệu nhân viên để hiển thị vào form sửa
     * Author: QuangNV (16/12/2022)
     */
    getEmployeeSelected(id) {
      try {
        axios.get(`https://amis.manhnv.net/api/v1/Employees/${id}`)
          .then(res => {
            this.employee = res.data;
            this.employee.DateOfBirth = this.formatDate(res.data.DateOfBirth)
            this.employee.IdentityDate = this.formatDate(res.data.IdentityDate)
          })
          .catch(res => {
            console.log(res)
          })
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy dữ liệu nhân viên để hiển thị vào form sửa
     * Author: QuangNV (16/12/2022)
     */
    getNewEmployeeCode() {
      try {
        axios.get(`https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode`)
          .then(res => {
            this.employee.EmployeeCode = res.data;
          })
          .catch(res => {
            console.log(res)
          })
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra xem value có trống hay không
     * Author: QuangNV (16/12/2022)
     */
    isEmpty(value) {
      try {
        if ((!value) || value.trim() == '') {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Validate dữ liệu
     * Author: QuangNV (19/12/2022)
     */
    isValid() {
      try {
        this.errMsg = []
        if (this.isEmpty(this.employee.EmployeeCode)) {
          console.log('Mã nhân viên ko đc để trống');
          this.isEmployeeCodeErr = true;
          this.errMsg.push('Mã nhân viên ko đc để trống')

        }
        if (this.isEmpty(this.employee.EmployeeName)) {
          console.log('Tên nhân viên ko đc để trống');
          this.isEmployeeNameErr = true;
          this.errMsg.push('Tên nhân viên ko đc để trống')
        }
        if (this.isEmpty(this.employee.DepartmentId)) {
          this.isDepartmentErr = true;
          console.log(this.isDepartmentErr);
          this.errMsg.push('Đơn vị ko đc để trống')
        }

        if (this.errMsg.length) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log(error);
      }

    },

    /**
     * Xử lý logic cất dữ liệu
     * Author: QuangNV (19/12/2022)
     */
    saveBtnOnClick() {
      try {
        // Validate dữ liệu
        if (this.isValid()) {
          this.errContent = this.errMsg[0]
          this.isErrShow = !this.isErrShow;
        } else {
          if (this.isAdd) {
            //tiến hành thêm nhân viên
            this.addEmployee(this.employee)
          } else {
            //tiến hành sửa nhân viên
            this.editEmployee(this.employee)
          }

        }
      } catch (error) {
        console.log(error);
      }

    },

    /**
     * set dữ liệu department
     * Author: QuangNV (19/12/2022)
     */
    departmentGetValue(departmentValue) {
      try {
        this.employee.DepartmentId = departmentValue;
        this.isDepartmentErr = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xử lý lỗi cho ô mã nhân viên
     * Author: QuangNV (19/12/2022)
     */
    inputEmployeeCodeOnBlur() {
      try {
        if (this.isEmpty(this.employee.EmployeeCode)) {
          this.isEmployeeCodeErr = true;
        } else {
          this.isEmployeeCodeErr = false;
        }
      } catch (error) {
        console.log(error)
      }

    },

    /**
     * Xử lý lỗi cho ô họ tên nhân viên
     * Author: QuangNV (19/12/2022)
     */
    inputEmployeeNameOnBlur() {
      try {
        if (this.isEmpty(this.employee.EmployeeName)) {
          this.isEmployeeNameErr = true;
        } else {
          this.isEmployeeNameErr = false;
        }
      } catch (error) {
        console.log(error)
      }

    },

    /**
     * Ẩn hiện Dialog thông báo
     * Author: QuangNV (15/12/2022)
     */
    onToggleErrDialog() {
      this.isErrShow = !this.isErrShow;
    },

    /**
     * Thêm nhân viên
     * Author: QuangNV (19/12/2022)
     */
    addEmployee(employee) {
      try {
        axios.post(`https://amis.manhnv.net/api/v1/Employees`, employee)
          .then(() => {
            console.log('thêm thành công')
            this.$emit("saveBtnOnClick", true, false)
          })
          .catch(res => {
            console.log(res.response.data.userMsg);
            this.errContent = res.response.data.userMsg;
            this.onToggleErrDialog()
          })
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sửa nhân viên
     * Author: QuangNV (19/12/2022)
     */
    editEmployee(employee) {
      try {
        axios.put(`https://amis.manhnv.net/api/v1/Employees/${this.employeeSelectedId}`, employee)
          .then(() => {
            console.log('thêm thành công')
            this.$emit("saveBtnOnClick", true, false)
          })
          .catch(res => {
            console.log(res);
            this.errContent = res.response.data.userMsg;
            this.onToggleErrDialog()
          })
      } catch (error) {
        console.log(error);
      }
    }
  },

  created() {
    if (this.isAdd) {
      this.getNewEmployeeCode();
      this.formTitle = 'Thêm nhân viên mới'
    } else {
      this.getEmployeeSelected(this.employeeSelectedId)
      this.formTitle = 'Thông tin nhân viên'
    }
  },

  computed: {
    isAdd() {
      if (this.isEmpty(this.employeeSelectedId)) {
        return true
      } else {
        return false
      }
    }
  }


}
</script>


