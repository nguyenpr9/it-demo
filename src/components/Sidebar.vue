<template>
  <a-layout-sider
    v-model:collapsed="collapsed" collapsible @collapse="onCollapse"
    width="200"
    style="background: #fff; position: fixed; height: 100vh; z-index: 12; top: 0"
  >
    <div class="logo" style="height: 64px; padding: 16px; overflow: hidden">
      <!-- Đảm bảo logo phù hợp với container của nó -->
      <img
        src="https://devportal.mpos.vn/assets/admin/images/logo-mpos.svg"
        alt="logo"
        style="max-width: 100%; height: auto"
      />
    </div>

    <a-menu
      mode="inline"
      default-selected-keys="['1']"
      default-open-keys="['sub1']"
      style="height: 100%; border-right: 0"
    >
      <a-menu-item key="1">
        <router-link to="/">Trang chủ</router-link>
      </a-menu-item>
      <a-sub-menu key="sub1" title="Giao dịch">
        <a-menu-item key="2">
          <router-link to="/transaction-history">Lịch sử giao dịch</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2" title="Cài đặt">
        <a-menu-item key="3">
          <router-link to="/merchant-info">Thông tin Merchant</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "MenuComponent",
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    onCollapse(collapsed) {
      this.collapsed = collapsed;
      this.$emit('toggleSidebar', collapsed); // Optional: Emit event for layout adjustments
    }
  }
};
</script>
