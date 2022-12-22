<template lang="">
    <div class="dialog-content">
        <div class="m-icon m-icon-48 dialog-icon err-icon"></div>
        <div class="dialog-text">{{ errContent }}</div>
    </div>
</template>
<script>
export default {
  name: "ErrDialogContent",
  props: {
    errContent: String,
  }
}
</script>
