<template lang="">
  <div class="dialog-footer">
    <button class="m-btn dialog-btn primary-btn accept-btn notify-btn" @click='closeErrDialog'>Đồng ý</button>
  </div>
</template>
<script>
export default {
  name: "ErrDialogFooter",
  emits: ["closeErrDialog"],
  methods: {
    /**
     * Đóng dialog báo lỗi
     * Author: QuangNV (21/12/2022)
     */
    closeErrDialog() {
      this.$emit("closeErrDialog")
    }
  }
}
</script>
