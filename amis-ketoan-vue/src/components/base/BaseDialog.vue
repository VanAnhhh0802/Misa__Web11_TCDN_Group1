<template>
  <teleport to='body'>
    <div>
      <div class="dialog" style="display:block">
        <div class="dialog-container">
          <div>
            <slot name="dialogContent"></slot>
          </div>
          <div>
            <slot name="dialogFooter"></slot>
          </div>

        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {

}
</script>
