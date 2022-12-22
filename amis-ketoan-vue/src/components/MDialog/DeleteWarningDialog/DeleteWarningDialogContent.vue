<template lang="">
    <div class="dialog-content">
        <div class="m-icon m-icon-48 dialog-icon warning-icon"></div>
        <div class="dialog-text">{{ warningContent }}</div>
    </div>
</template>
<script>
export default {
  name: "warningDialogContent",
  props: {
    warningContent: String,
  }
}
</script>
