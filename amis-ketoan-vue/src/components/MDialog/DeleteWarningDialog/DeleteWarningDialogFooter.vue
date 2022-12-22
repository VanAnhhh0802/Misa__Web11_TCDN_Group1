<template lang="">
  <div class="dialog-footer" style="justify-content: space-between;">
    <button class="m-btn dialog-btn primary-btn accept-btn" id="deleteEmployee" @click="onDeleteAccept">Có</button>
    <button class="m-btn dialog-btn lower-btn cancel-btn" @click='closeWarningDialog'>Không</button>
  </div>
</template>
<script>
export default {
  name: "WarningDialogFooter",
  emits: ["closeWarningDialog", "onDeleteAccept"],
  methods: {
    /**
     * Đóng dialog cảnh báo
     * Author: QuangNV (21/12/2022)
     */
    closeWarningDialog() {
      this.$emit("closeWarningDialog")
    },

    /**
     * Tiến hành xóa 
     * Author: QuangNV (21/12/2022)
     */
    onDeleteAccept() {
      this.$emit("onDeleteAccept")
    }
  }
}
</script>
