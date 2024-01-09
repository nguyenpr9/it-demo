<template>
  <a-layout-header
    style="
      background: #c93f45;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 10;
    "
  >
    <div style="float: right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar icon="user" />
          Username <a-icon type="down" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a-icon type="lock" />
              Thay đổi mật khẩu
            </a-menu-item>
            <a-menu-item @click="logout">
              <a-icon type="logout" />
              Đăng xuất
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import { removeAuthToken } from "../services/authService";
export default {
  methods: {
    logout() {
      removeAuthToken();
      this.$router.push("/login");
      // Xử lý logic đăng xuất ở đây
    },
  },
};
</script>
