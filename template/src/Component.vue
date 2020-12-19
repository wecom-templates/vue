<template>
  <div>
    <p class="example"> hello world </p>
    <p>this is a demo component</p>
  </div>
</template>

<script>
import './global.css';

export default {
  name: 'cusComponent',
  data(){
    return {}
  } 
}
</script>

<style scoped>
.example {
  color: red;
  font-weight: bold;
}
</style>