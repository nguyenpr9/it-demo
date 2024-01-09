<template>
  <a-row justify="center" align="middle" class="login-container">
    <a-col>
      <a-card>
        <a-form @submit.prevent="handleSubmit" layout="vertical">
          <a-form-item label="OTP Code">
            <a-input v-model:value="otp" placeholder="Enter OTP" />
          </a-form-item>

          <a-form-item>
            <a-space wrap>
              <a-button :loading="loading" type="primary" htmlType="submit"
                >Verify OTP</a-button
              >
              <a-button :loading="loading" type="default" @click="resendOTP"
                >Resend OTP</a-button
              >
            </a-space>
          </a-form-item>

          <a-alert v-if="error" type="error" :message="error" />
          <a-alert v-if="hint" type="success" :message="hint" />
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from "vue";
import {
  setVerifyAccount,
  verifyOTP,
  generateOTP,
  setAuthToken,
} from "@/services/authService";
import { useRouter } from "vue-router";

const router = useRouter();
const otp = ref("");
const error = ref("");
const hint = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  error.value = "";
  hint.value = "";
  loading.value = true;
  try {
    const res = await verifyOTP(otp.value);
    if (res.status === 200) {
      setVerifyAccount();
      setAuthToken(res.data.jwt);
      router.push("/");
    }
  } catch (err) {
    console.log(err);
    error.value =
      err.response.data || "An error occurred during OTP verification.";
  } finally {
    otp.value = "";
    loading.value = false;
  }
};

const resendOTP = async () => {
  error.value = "";
  hint.value = "";
  loading.value = true;
  try {
    await generateOTP();
    error.value = "";
    hint.value = "Mã xác thực đã được gửi lại!";
  } catch (err) {
    error.value =
      err.response.data.message || "An error occurred while resending OTP.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
}

/* Additional styles can be added here if needed */
</style>
