<template>
  <div>
    <a-card title="Thông tin Doanh nghiệp, Tổ chức" v-if="merchantInfo" :loading="loading">
      <p><strong>Tên Doanh nghiệp:</strong> {{ merchantInfo.businessName }}</p>
      <p><strong>Địa chỉ:</strong> {{ merchantInfo.businessAddress }}</p>
      <p><strong>Người đại diện pháp luật:</strong> {{ merchantInfo.authoriserName }}</p>
      <p><strong>Chủ sở hữu:</strong> {{ merchantInfo.authoriserEmail }}</p>
      <!-- Thêm các trường thông tin khác tại đây theo định dạng tương tự -->
    </a-card>
  </div>
</template>

<script>
import {getMerchantById} from '@/services/merchantService';

export default {
  data() {
    return {
      loading: false,
      merchantInfo: null,
      feeSettings: {
        transactionFee: false,
        installmentFee: false,
        allowFeeChange: false
      }
    };
  },
  created() {
    this.fetchMerchantInfo();
  },
  methods: {
    async fetchMerchantInfo() {
      this.loading = true;
      try {
        const merchantId = this.$route.params.id; // Hoặc cung cấp ID cố định nếu cần
        const response = await getMerchantById(1);
        this.merchantInfo = response.data;
      } catch (error) {
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi
        console.error('There was an error fetching the merchant info:', error);
      } finally {
        this.loading = false;
      }
    },
    async updateFeeSettings() {
      // Xử lý cập nhật thiết lập tính phí ở đây
      console.log('Cập nhật thiết lập:', this.feeSettings);
    }
  }
};
</script>
