<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header-title">Nhân viên</div>

      <div class="page-header-button">
        <MButton @click="onAddEmployeeClick" text="Thêm nhân viên mới"></MButton>
      </div>
    </div>
    <div class="page-content">
      <div class="page-toolbar">
        <div class="m-input-box">
          <input type="text" class="m-input m-input-with-icon" placeholder="Tìm theo mã, tên nhân viên" v-model="input">
          <div class="m-icon m-icon-16 m-input-icon search-icon"></div>
        </div>
        <div class="m-icon m-icon-24 refresh-icon" style="margin: 0 10px;" id="refresh-btn" @click="onReload"></div>
      </div>
      <MTable :isReloadData="isReloadData" @tr-dbl="onInsertEmployee" @loadDataDone="loadDataDone"
        @deleteSuccess="onReload" :paging="paging" :url="url"> </MTable>
      <div class="page-paging">
        <div class="total-record">Tổng số: <span>{{ totalRecords }}</span> bản ghi</div>
        <div class="right-paging">
          <div class="m-record-in-page">
            <div class="m-combo-box">

              <div class="m-combo-main-content" @click="pagingOnClick($event)">
                <div class="m-selected-options">
                  <input type="text" class="m-combo-input" readonly="true" autofocus value="10 bản ghi trên 1 trang" />
                </div>
                <div class="m-combo-action m-select-record">
                  <div class="m-btn-dropdown">
                    <div class="m-icon m-icon-16 m-icon-arrow-dropdown m-dropdown-close">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination">
            <div class="page-btn disable-btn">trước</div>
            <div class="page-btn active">1</div>
            <div class="page-btn">2</div>
            <div class="page-btn">3</div>
            <div class="page-btn">...</div>
            <div class="page-btn">42</div>
            <div class="page-btn">sau</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddSaveForm v-if="isFormShow" @cancel="onToggleForm" :employeeSelectedId="employeeSelectedId"
    @saveBtnOnClick="btnSaveOnClick"></AddSaveForm>
  <TheLoading v-if="isLoading"></TheLoading>

  <Teleport to="body" v-if="isShowPaging">
    <!-- dropdown chọn số bản ghi trên 1 trang -->
    <div class="m-combo-dropdown-panel" :style="pagingPosition">
      <div class="m-dropdown-body-container">
        <div class="m-combo-dropdown-items">
          <a class="m-combo-box-item" value="10" @click="pagingItemOnClick">10 bản ghi trên 1 trang</a>
          <a class="m-combo-box-item" value="20" @click="pagingItemOnClick">20 bản ghi trên 1 trang</a>
          <a class="m-combo-box-item" value="30" @click="pagingItemOnClick">30 bản ghi trên 1 trang</a>
          <a class="m-combo-box-item" value="50" @click="pagingItemOnClick">50 bản ghi trên 1 trang</a>
          <a class="m-combo-box-item" value="100" @click="pagingItemOnClick">100 bản ghi trên 1 trang</a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import MButton from '../base/MButton.vue';
import MTable from '../base/MTable.vue';
import AddSaveForm from '../base/AddSaveForm.vue';
import TheLoading from '../TheLoading.vue';
export default {
  name: "ThePage",
  data() {
    return {
      isFormShow: false,
      employeeSelectedId: null,
      isReloadData: false,
      isLoading: true,
      timeout: null,
      isShowPaging: false,
      pagingPositionX: 0,
      pagingPositionY: 0,
      totalRecords: null,
      paging: {
        pageSize: 10,
        pageNumber: 1,
        employeeFilter: '',
      }
    }
  },
  components: {
    MButton,
    MTable,
    AddSaveForm,
    TheLoading,
  },
  methods: {
    /**
     * Ẩn hiện form 
     * Author: QuangNV (15/12/2022)
     */
    onToggleForm() {
      this.isFormShow = !this.isFormShow;
    },

    /**
     * Xử lý sự kiện click vào thêm nhân viên
     * Author: QuangNV (16/12/2022)
     */
    onAddEmployeeClick() {
      try {
        this.onToggleForm();
        this.employeeSelectedId = null;
        console.log(this.employeeSelectedId);

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xử lý sự kiện dbl click và nhấn sửa
     * Author: QuangNV (16/12/2022)
     */
    onInsertEmployee(employeeId) {
      try {
        this.onToggleForm();
        console.log(employeeId);
        this.employeeSelectedId = employeeId;
      } catch (error) {
        console.log(error);
      }

    },

    /**
     * Xử lý logic khi ấn cất
     * Author: QuangNV (20/12/2022)
     */
    btnSaveOnClick(isLoadData, isShowForm) {
      try {
        this.isReloadData = isLoadData;
        this.isLoading = true;
        this.isFormShow = isShowForm;

      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lắng nghe sự kiện load xong data. Tắt hiệu ứng loading
     * Author: QuangNV (20/12/2022)
     */
    loadDataDone(isLoadData, totalRecords) {
      try {
        this.isLoading = isLoadData;
        this.isReloadData = false;
        this.totalRecords = totalRecords
      } catch (error) {
        console.log(error);
      }

    },

    /**
     * Xử lý logic khi nhấn vào nút reload
     * Author: QuangNV (20/12/2022)
     */
    onReload() {
      try {
        this.isLoading = true;
        this.isReloadData = true;
        console.log("reload")
      } catch (error) {
        console.log(error);
      }

    },

    /**
     * Xử lý sự kiện nhấn vào dropdown chọn số dòng trên 1 trang
     * Author: QuangNV (20/12/2022)
     */

    pagingOnClick(e) {
      try {
        this.pagingPositionX = e.clientX;
        this.pagingPositionY = e.clientY;
        this.isShowPaging = !this.isShowPaging;

      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy giá trị số bản ghi trên 1 trang
     * Author: QuangNV (21/12/2022)
     */
    pagingItemOnClick(e) {
      try {
        this.paging.pageSize = e.target.getAttribute("value");
        console.log(this.paging);
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    /**
     * Xử lý debound ô search
     */
    input: {
      get() {
        return this.paging.employeeFilter
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.paging.employeeFilter = val
          console.log(this.paging.employeeFilter)
        }, 300)
      }
    },

    /**
     * Xử lý vị trí của list pageSize
     * Author: QuangNV (21/12/2022)
     */
    pagingPosition() {
      return {
        "top": `${this.pagingPositionY}px`,
        "left": `${this.pagingPositionX}px`
      };
    },

    /**
     * Chuyển obj thành chuổi url xử dụng trong phân trang
     * Author: QuangNV (21/12/2022)
     */
    url() {
      let query = '';
      for (const key in this.paging) {
        if (!(key == 'employeeFilter')) {
          query = query + `${key}=${this.paging[key]}&`
        } else {
          if (this.paging[key] == '') {
            return query
          }
          query = query + `${key}=${this.paging[key]}`
        }
      }
      console.log(query)
      return query
    }
  }
}

</script>

