<template>
  <div id="loading-spinner" :class="isLoading ? 'active' : ''"></div>
</template>

<script>
 export default {
  name: 'LoadingSpinner',
  computed: {
    isLoading() {
      return this.$store.state.isLoading || false;
    }
  }
 }
</script>

<style scoped>
  
  #loading-spinner {
    width: 30px;
    height: 30px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2342B983FF' stroke-width='7' stroke-dasharray='50%25%2c 13%25' stroke-dashoffset='86' stroke-linecap='butt'/%3e%3c/svg%3e");
    border-radius: 50%;
    position: absolute;
    right: 20px;
    display: none;
    animation: rotate 4s infinite;
  }

  #loading-spinner.active {
    display: block;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    50%{
      transform: rotateZ(360deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }

</style>