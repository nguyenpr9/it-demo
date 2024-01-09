<template>
  <a-layout>
    <a-layout-content>
      <a-card title="Lịch Sử Giao Dịch">
        <a-form @submit.prevent="fetchTransactionHistory">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item label="ID Giao Dịch">
                <a-input
                  v-model:value="searchParams.txid"
                  placeholder="Nhập ID Giao Dịch"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Từ Ngày">
                <a-date-picker
                  v-model:value="searchParams.startDate"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Đến Ngày">
                <a-date-picker
                  v-model:value="searchParams.endDate"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- Thêm các trường tìm kiếm khác ở đây nếu cần -->
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <a-button type="primary" html-type="submit">Tìm kiếm</a-button>
              <a-button @click="resetSearch" style="margin-left: 8px"
                >Reset</a-button
              >
            </a-col>
          </a-row>
        </a-form>
        <a-table
          :columns="columns"
          :dataSource="transactions.data"
          :loading="loading"
          :pagination="{
            total: transactions.totalCount,
            current: transactions.pageIndex + 1,
            pageSize: transactions.pageSize,
            onChange: changePage,
          }"
          rowKey="id"
        ></a-table>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { getTransaction } from "@/services/transactionService";

export default {
  data() {
    return {
      loading: false,
      transactions: {
        data: [],
        pageIndex: 0,
        pageSize: 4,
        totalCount: 0,
      },
      searchParams: {},
      columns: [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "TxID",
          dataIndex: "txid",
        },
        {
          title: "Auth Code",
          dataIndex: "authCode",
        },
        {
          title: "Merchant",
          dataIndex: "merchant",
          customRender: ({ text }) => {
            return `${text.authoriserName}`;
          },
        },
        {
          title: "Amount",
          dataIndex: "amount",
        },
        {
          title: "Pan",
          dataIndex: "pan",
        },
        {
          title: "Holder Name",
          dataIndex: "holderName",
        },
        {
          title: "TID",
          dataIndex: "tid",
        },
        {
          title: "createdDate",
          dataIndex: "createdDate",
          customRender: ({ text }) => new Date(text).toLocaleString(),
        },
        // ... thêm các cột khác theo dữ liệu
      ],
    };
  },
  methods: {
    async fetchTransactionHistory() {
      this.loading = true;
      try {
        const paginate = `page=${this.transactions.pageIndex}&size=${this.transactions.pageSize}`;
        const response = await getTransaction(this.searchParams, paginate);
        this.transactions = response.data;
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo
      } finally {
        this.loading = false;
      }
    },
    resetSearch() {
      this.searchParams = {
        txid: "",
        // Reset các trường tìm kiếm khác
      };
      this.fetchTransactionHistory();
    },
    downloadCSV() {
      // Xử lý logic tải xuống CSV ở đây
      console.log("Downloading CSV");
    },
    changePage(page, pageSize) {
      this.transactions.pageIndex = page - 1;
      this.transactions.pageSize = pageSize;
      this.fetchTransactionHistory();
    },
  },
  created() {
    this.fetchTransactionHistory();
  },
};
</script>
