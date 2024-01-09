<template>
  <a-layout class="layout-blank">
    <a-layout-content>
      <div class="content-wrapper">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: "BlankLayout",
};
</script>

<style scoped>
.layout-blank {
  min-height: 100vh;
  background: #f0f2f5; /* You can change the background color as needed */
}

.content-wrapper {
  max-width: 400px; /* Adjust the width as necessary */
  margin: 0 auto;
  padding: 24px;
  text-align: center;
}

/* Additional styles can be added here if needed */
</style>
