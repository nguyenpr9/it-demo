<template>
  <a-layout id="main-layout">
    <sidebar-component @toggleSidebar="toggleSidebar" />
    <a-layout class="site-layout">
      <header-component />
      <a-layout-content :style="{ marginLeft: sidebarWidth }">
        <div class="content-wrapper">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SidebarComponent from "../components/Sidebar.vue";
import HeaderComponent from "../components/Header.vue";

export default {
  name: "MainLayout",
  components: {
    SidebarComponent,
    HeaderComponent,
  },
  data() {
    return {
      isSidebarVisible: true,
      sidebarWidth: "200px", // Adjust based on your sidebar width
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      this.sidebarWidth = this.isSidebarVisible ? "200px" : "80px";
    },
  },
};
</script>

<style scoped>
#main-layout {
  padding-top: 65px;
  min-height: 100vh;
}

.site-layout {
  transition: margin-left 0.2s;
}

.content-wrapper {
  padding: 24px;
}

/* Additional styles can be added here */
</style>
