<template>
<div>
  <div v-if='errorMessage'>
    <el-alert
    type="error"
    show-icon>
    <slot>{{errorMessage}}</slot>
  </el-alert>
  </div>
  <div >
    <el-alert v-if='infoMessage'
    type="success"
    show-icon>
    <slot>{{infoMessage}}</slot>
  </el-alert>
  </div>
  </div>
</template>
<script>
export default {
  computed: {
    errorMessage: function() {
      return this.$store.state.errorMessage;
    },
    infoMessage: function() {
      return this.$store.state.infoMessage;
    }
  }
};
</script>
<style scoped>
</style>