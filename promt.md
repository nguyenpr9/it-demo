Tôi đang sử dụng một project vuejs v3, bao gồm thư viện Ant design, Vue Router, Axios, VeeValidate, yup, Lodash, dayjs.

<!-- NOTE -->
- Chúng ta sẽ tạo thư viện thành phần riêng biệt để tái sử dụng trong các dự án khác nhau, giảm thiểu việc viết lại code.
- Đối với router, Sử dụng kỹ thuật lazy loading cho các thành phần và routes trong Vue Router. Điều này giúp giảm thời gian tải ban đầu và tăng hiệu suất.
- Đối với các api sẽ được quản lý trong thư mục services. Khi có một nhóm các endpoint API liên quan đến một đối tượng cụ thể hoặc một chức năng cụ thể (ví dụ: người dùng, sản phẩm, đơn hàng), chúng ta nên tạo một file service riêng biệt cho nhóm đó. Điều này giúp tổ chức mã nguồn một cách rõ ràng và dễ quản lý. Nếu file service đã tồn tại, chức năng sẽ được add thêm vào file đó.
Ví dụ về file merchantService:

```js
// trong apiService, File này tạo ra một instance của axios
import apiService from "./apiService"; 

export const getMerchantById = (id) => {
  return apiService.get(`/merchants/${id}`);
};
```

- Chúng ta sẽ tôi ưu sử dụng những gì mà thư viện ant design, dayjs, lodash, VeeValidate, Yup cung cấp!
- Đối với các dữ liệu output ra màn hình là amount, chúng ta sẽ format nó về dạng xxx.xxx.xxx
- Đối với các dữ liệu output ra màn hình là date, chúng ta sẽ format nó về dạng dd/mm/yyyy
- Đối với các form thêm mới, cập nhật và các form khác ngoại trừ form search, chúng ta sẽ sử dụng vee-validate và yup để validate và submit form.
- Đối với việc xử lý biểu mẫu, ngoài việc sử dụng VeeValidate và Yup, chúng ta cũng có thể tận dụng các component Form của Ant Design để tạo giao diện người dùng thân thiện và nhất quán. Ant Design cung cấp nhiều loại input và layout form, giúp tạo ra các biểu mẫu một cách nhanh chóng và đẹp mắt.
- Trong việc xây dựng giao diện, hãy tận dụng hệ thống grid của Ant Design để tạo layout. Hệ thống này giúp chúng ta dễ dàng tạo các layout đáp ứng và linh hoạt, phù hợp với mọi kích thước màn hình.

<!-- END NOTE -->
Đối với khung layout cơ bản, chúng ta sẽ có 2 layout.

- layout dành cho các trang như login, register, ...  (BlankLayout)
- layout dành cho các trang như lịch sử giao dịch, thông tin merchant, ... (MainLayout)
Trong MainLayout, sẽ có 3 sections bao gồm Sidebar, Header, RouterView. Đảm bảo Sidebar đè lên trên Header.
Đối với Sidebar:
- Thiết Kế Giao Diện:
  - Vị Trí và Hành Vi:
      Sidebar ở bên trái màn hình.
      Có khả năng mở rộng và thu hẹp khi người dùng click vào icon ở phía trên cùng.
        Mở rộng: Hiển thị logo và menu đa cấp đầy đủ.
        Thu hẹp: Chỉ hiển thị icon hoặc phiên bản rút gọn của menu.
  - Thành Phần:
      Icon Mở rộng/Thu hẹp đặt ở đầu Sidebar.
      Logo nằm dưới icon.
      Menu Đa Cấp với các mục có khả năng mở rộng để hiển thị các mục con.
- Logic Điều Khiển:
  - Xử Lý Sự Kiện Click:
      Mở rộng/Thu hẹp Sidebar: Thay đổi trạng thái Sidebar khi click vào icon.
      Menu Đa Cấp: Mở rộng hoặc thu hẹp các mục con khi click vào một mục menu.
  - Giao Diện Đáp Ứng:
      Đảm bảo Sidebar hiển thị đúng trên các kích thước màn hình khác nhau.
      Trong trạng thái thu hẹp, Sidebar hiển thị thông tin cần thiết mà không chiếm nhiều không gian.
Đối với Header, Header sẽ luôn nằm trên cùng của screen khi scroll. Header có background #c93f45 và ở ngoài cùng bên phải sẽ có một dropdown menu có title hiển thị thông tin username và avatar icon. khi click vào menu đó sẽ hiển thị danh sách action: Thay đổi mật khẩu và Đăng xuất

Chúng ta có 2 trang quản lý lịch sử giao dịch (TransactionHistory) và thông tin merchant (MerchantInfo) với cấu trúc view như sau:

```md
views
  Merchant
      MerchantInfo
  Transaction
    TransactionHistory
```

- Trong TransactionHistory:
  Api để lấy dữ liệu: POST http://10.5.10.216:8080/api/transaction/history
  request params: {
    "authCode": "string",
    "did": "string",
    "endDate": "2024-01-04T09:16:14.690Z",
    "holderName": "string",
    "maxAmount": 0,
    "merchantId": 0,
    "mid": "string",
    "minAmount": 0,
    "pan": "string",
    "startDate": "2024-01-04T09:16:14.690Z",
    "status": 0,
    "tid": "string",
    "txid": "string"
  }
  response params: {
    "data": [
      {
        "id": 1,
        "txid": "202401041234",
        "authCode": "123456",
        "merchant": {
          "id": 1,
          "authoriserEmail": "Nguyen Van T",
          "businessName": "Fpt shop",
          "businessAddress": "22 Minh khai, Hà nội",
          "authoriserName": "longld@mpos.vn",
          "businessRegistrationNumber": "1234342",
          "businessPhone": "012342343",
          "createdDate": "2024-01-03T21:26:21.309+00:00",
          "status": "ACTIVE"
        },
        "amount": 2000000,
        "pan": "443211******1122",
        "holderName": "Luu dat Long",
        "tid": "10101010",
        "mid": "123456789012345",
        "did": "MPOS12345",
        "createdDate": "2024-01-03T21:25:00.439+00:00",
        "status": 104
      }
    ],
    "pageIndex": 0,
    "pageSize": 20,
    "totalCount": 1
  }
  Có form search gồm các trường request params trên
  Có bảng hiển thị danh sách lịch sử giao dịch cùng phân trang
  Có tổng danh sách giao dịch đã thực hiện
- Trong MerchantInfo:
  Api để lấy dữ liệu: GET http://10.5.10.216:8080/api/merchants/{id}
  response params: {
    "id": 1,
    "authoriserEmail": "Nguyen Van T",
    "businessName": "Fpt shop",
    "businessAddress": "22 Minh khai, Hà nội",
    "authoriserName": "longld@mpos.vn",
    "businessRegistrationNumber": "1234342",
    "businessPhone": "012342343",
    "createdDate": "2024-01-03T21:26:21.309+00:00",
    "status": "ACTIVE"
  }
  Có thông tin hiển thị như sau:
    Thông tin Doanh nghiệp, Tổ chức
    Thông tin người đại diện pháp luật, chủ sở hữu

Chúng ta có trang Login. Cụ thể login sẽ sử dụng username và password để đăng nhập. form đăng nhập cần validate thông tin trước khi submit. Khi submit, nếu api trả ra lỗi hiển thị message lỗi. nếu thành công, bạn cần gọi API để tạo OTP, và đi đến bước verify otp. Đối với màn verify otp sẽ có nút gửi lại và nút xác thực otp. nếu lỗi thì hiển thị message lỗi. nếu thành công thì lưu thông tin đăng nhập, token và chuyển đến màn home.
Api đăng nhập: POST http://10.5.10.216:8080/api/auth/login
Api tạo OTP: POST http://10.5.10.216:8080/api/auth/generate-otp
Api xác thực: POST http://10.5.10.216:8080/api/auth/verify-otp