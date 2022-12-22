<template>
  <div class="m-input-box">
    <label for="" class="m-input-label">{{ fieldLabel }} <div class="m-input-title-require" v-if="required">&nbsp;*
      </div></label>
    <input type="text" field-label={{fieldLabel}} class="m-input" id={{id}} property-name={{propertyName}}>
  </div>
</template>

<script>
export default {
  name: "MInput",
  props: {
    fieldLabel: String,
    propertyName: String,
    id: String,
    placeHolder: String,
    required: Boolean
  }
}
</script>

