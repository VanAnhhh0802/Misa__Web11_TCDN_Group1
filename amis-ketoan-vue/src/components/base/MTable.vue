<template>
  <div class="page-table">
    <div class="table-container">
      <table class="m-table" id="tblEmployee">
        <thead>
          <tr>
            <th class="table-checkbox">
              <label class="m-table-checkbox  m-margin-lr-16">
                <input type="checkbox" class="m-input-checkbox" />
                <span class="m-checkbox">
                  <span class="m-checkbox-inner">
                    <div class="m-icon m-icon-16 m-icon-checkbox-active"></div>
                  </span>
                </span>
              </label>
            </th>
            <th class="table-id">
              MÃ NHÂN VIÊN
            </th>
            <th class="table-name">
              TÊN NHÂN VIÊN
            </th>
            <th class="table-gender">
              GIỚI TÍNH
            </th>
            <th class="table-dob text-center">
              NGÀY SINH
            </th>
            <th class="table-id-card" title="Số chứng minh nhân dân">
              SỐ CMND
            </th>
            <th class="table-position">
              CHỨC DANH
            </th>
            <th class="table-work">
              TÊN ĐƠN VỊ
            </th>
            <th class="table-bank-id">
              SỐ TÀI KHOẢN
            </th>
            <th class="table-bank-name">
              TÊN NGÂN HÀNG
            </th>
            <th class="table-bank-place">
              CHI NHÁNH NGÂN HÀNG
            </th>
            <th class="table-func text-center">
              CHỨC NĂNG
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(employee) in employees" :key="employee.EmployeeId"
            @dblclick="insertEmployeeHandle(employee.EmployeeId)">
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
            <td class="table-id" table-property-name="EmployeeCode">{{ employee.EmployeeCode }}</td>
            <td class="table-name">{{ employee.EmployeeName }}</td>
            <td class="table-gender">{{ employee.GenderName }}</td>
            <td class="table-dob text-center">{{ convertDate(employee.DateOfBirth) }}</td>
            <td class="table-id-card">{{ employee.IdentityNumber ? employee.IdentityNumber : "" }}</td>
            <td class="table-position">{{ employee.PositionName ? employee.PositionName : "" }}</td>
            <td class="table-work">{{ employee.DepartmentName ? employee.DepartmentName : "" }}</td>
            <td class="table-bank-id">{{ employee.BankAccountNumber ? employee.BankAccountNumber : "" }}
            </td>
            <td class="table-bank-name">{{ employee.BankName ? employee.BankName : "" }}</td>
            <td class="table-bank-place">{{ employee.BankBranchName ? employee.BankBranchName : "" }}</td>
            <td class="table-func text-center m-flex">
              <div class="m-dropdown">
                <button class="m-dropdown-type-feature m-dropdown-button-text m-edit-employee">
                  <div class="m-button-text " @click="insertEmployeeHandle(employee.EmployeeId)">Sửa</div>
                </button>
                <button class="m-dropdown-type-feature m-dropdown-button-icon m-dropdown-icon-emp"
                  @click="featureOnClick($event, employee.EmployeeId, employee.EmployeeCode)">
                  <div class="m-button-text">
                    <div class="m-icon m-icon-16 m-icon-arrow-down-blue"></div>
                  </div>
                </button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Teleport to="body" v-if="isShowFeature">
    <div class="m-dropdown-menu m-dropdown-emp" :style="featurePosition">
      <ul class="m-dropdown-menu-items">
        <li class="m-dropdown-item">
          <a class="m-dropdown-item-link">Nhân bản</a>
        </li>
        <li class="m-dropdown-item m-item-delete" @click="deleteOnClick">
          <a class="m-dropdown-item-link">Xóa</a>
        </li>
        <li class="m-dropdown-item">
          <a class="m-dropdown-item-link">Ngừng sử dụng</a>
        </li>
      </ul>
    </div>
  </Teleport>
  <BaseDiaLog v-if="isDelete">
    <template v-slot:dialogContent>
      <DeleteWarningDialogContent :warningContent="warningContent"></DeleteWarningDialogContent>
    </template>
    <template v-slot:dialogFooter>
      <DeleteWarningDialogFooter @closeWarningDialog='onCloseDialog' @onDeleteAccept="onDelete">
      </DeleteWarningDialogFooter>
    </template>
  </BaseDiaLog>
</template>

<script>
import axios from "axios"
import BaseDiaLog from '../base/BaseDialog.vue';
import DeleteWarningDialogContent from '../MDialog/DeleteWarningDialog/DeleteWarningDialogContent.vue';
import DeleteWarningDialogFooter from '../MDialog/DeleteWarningDialog/DeleteWarningDialogFooter.vue';

/**
 * Gán sự kiện nhấn click chuột ra ngoài combobox data (ẩn data list đi)
 * NVMANH (31/07/2022)
 */
// const clickoutside = {
//   mounted(el, binding) {
//     el.clickOutsideEvent = (event) => {
//       // Nếu element hiện tại không phải là element đang click vào
//       // Hoặc element đang click vào không phải là button trong combobox hiện tại thì ẩn đi.
//       if (
//         !(
//           (
//             el === event.target || // click phạm vi của combobox__data
//             el.contains(event.target) || //click vào element con của combobox__data
//             el.previousElementSibling.contains(event.target)
//           ) //click vào element button trước combobox data (nhấn vào button thì hiển thị)
//         )
//       ) {
//         // Thực hiện sự kiện tùy chỉnh:
//         binding.value(event, el);
//         // vnode.context[binding.expression](event); // vue 2
//       }
//     };
//     document.body.addEventListener("click", el.clickOutsideEvent);
//   },
//   beforeUnmount: (el) => {
//     document.body.removeEventListener("click", el.clickOutsideEvent);
//   },
// };
export default {
  name: "MTable",
  // directives: {
  //   clickoutside,
  // },
  props: {
    isReloadData: {
      type: Boolean,
      default: false
    },
    url: String,
    paging: Object
  },
  components: {
    BaseDiaLog,
    DeleteWarningDialogContent,
    DeleteWarningDialogFooter,
  },
  emits: ['trDbl', 'loadDataDone', 'deleteSuccess'],
  data() {
    return {
      employees: [],
      featurePositionX: 0,
      featurePositionY: 0,
      isShowFeature: false,
      isDelete: false,
      warningContent: '',
      deleteEmployeeId: '',
    }
  },
  methods: {
    /**
     * Định dạng ngày tháng để hiển thị vào bảng dữ liệu
     * Author: QuangNV (15/12/2022)
     */
    convertDate(date) {
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
          return `${day}/${month}/${yeah}`
        } else {
          return ""
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xử lý khi double click vào row
     *  Author: QuangNV (16/12/2022)
     */
    insertEmployeeHandle(employeeId) {
      this.$emit('trDbl', employeeId)
    },

    /**
     * Gọi Api và trả về dữ liệu
     * Author: QuangNV (16/12/2022)
     */
    fetchAll() {
      try {
        axios.get(`https://amis.manhnv.net/api/v1/Employees/filter?${this.url}`)
          .then(res => {
            // console.log(`https://amis.manhnv.net/api/v1/Employees/filter?${this.url}`)
            console.log(res.data)
            this.employees = res.data.Data;
            this.$emit('loadDataDone', false, res.data.TotalRecord)
          })

      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xử lý sự kiện nhấn vào dropdown thêm tính năng
     * Author: QuangNV (20/12/2022)
     */

    featureOnClick(e, deleteEmployeeId, deleteEmployeeCode) {
      try {
        console.log(e)
        this.featurePositionX = e.clientX;
        this.featurePositionY = e.clientY;
        this.isShowFeature = !this.isShowFeature;
        this.warningContent = `Bạn có thực sự muốn xóa nhân viên <${deleteEmployeeCode}> không?`;
        this.deleteEmployeeId = deleteEmployeeId
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * xử lý đóng feature khi click ra ngoài
     * Author:QuangNV (21/12/2022)
     */
    hideFeature() {
      this.isShowFeature = false
    },

    /**
     * Xử lý khi nhấn xóa
     * Author: QuangNV (20/12/2022)
     */
    deleteOnClick() {
      try {
        // Đóng list feature
        this.isShowFeature = false;
        // Hiện popup cảnh báo xóa
        this.isDelete = true;

      } catch (error) {
        console.log(error);
      }

    },

    /**
     * Đóng popup cảnh báo
     * Author: QuangNV (20/12/2022)
     */
    onCloseDialog() {
      this.isDelete = false;
    },

    /**
     * Tiến hành xóa
     * Author: QuangNV (20/12/2022)
     */
    onDelete() {
      try {
        this.isDelete = false;
        this.$emit('deleteSuccess')
        axios.delete(`https://amis.manhnv.net/api/v1/Employees/${this.deleteEmployeeId}`)
          .then(() => {
            this.fetchAll();
          })
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.fetchAll()
  },

  watch: {
    isReloadData: {
      immediate: true,
      handler(newVal) {
        this.fetchAll()
        console.log(newVal)
      }
    },
    url: function (newVal, oldVal) {
      this.fetchAll()
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)

    }
  },

  computed: {
    featurePosition() {
      return {
        "top": `${this.featurePositionY}px`,
        "left": `${this.featurePositionX}px`
      };
    },

  },


}

</script>


