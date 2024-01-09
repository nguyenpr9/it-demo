<template>
  <a-row justify="center" align="middle" class="login-container">
    <a-col>
      <a-card>
        <a-form @submit.prevent="onSubmit" layout="vertical">
          <a-form-item
            label="Username"
            :validate-status="errors.username ? 'error' : 'validating'"
            :help="errors.username"
          >
            <a-input v-model:value="username" placeholder="username" />
          </a-form-item>
          <a-form-item
            label="Password"
            :validate-status="errors.password ? 'error' : 'validating'"
            :help="errors.password"
          >
            <a-input
              type="password"
              v-model:value="password"
              placeholder="password"
            />
          </a-form-item>
          <a-button :loading="loading" type="primary" htmlType="submit">Login</a-button>
        </a-form>
      </a-card>
      <br />
      <a-alert v-if="loginError" type="error" :message="loginError" />
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { login, generateOTP, setAuthToken, removeAuthToken } from "@/services/authService";

const router = useRouter();
const { handleSubmit, errors, meta } = useForm();
const { value: username } = useField("username", yup.string().required());
const { value: password } = useField("password", yup.string().required());
const loginError = ref("");
const loading = ref(false);

const onSubmit = handleSubmit(async () => {
  loginError.value = "";
  loading.value = true
  try {
    const res = await login({ username: username.value, password: password.value });
    if(res.status === 200) {
      setAuthToken(res.data.jwt)
      const res1 = await generateOTP();
      if(res1.status === 200) {
        router.push("/verify-login");
      } else {
        removeAuthToken()
      }
    }
  } catch (err) {
    loginError.value = "Thông tin đăng nhập không chính xác";
    removeAuthToken()
  } finally {
    loading.value = false
  }
});
</script>

<style scoped>
.login-container {
  min-height: 100vh;
}

/* Additional styles can be added here if needed */
</style>
