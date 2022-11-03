# Setup dự án

1. Cài đặt đầy đủ packages cần thiết nhất (như firebase, react-router-dom, styled-components), setup sao cho tất cả chạy đều ổn áp

2. Thiết lập Firebase :fire: **(LƯU Ý): Khi start in production mode thì ta sẽ có một số luật để có thể tác động vào database, nên ta sẽ phải chỉnh sửa rules trong Firestore Database như sau:**

   - `allow read, write: if request.auth != null;`: Dòng lệnh này dành cho những user đã đăng nhập có thể CRUD database hay nói cách khác là thêm/sửa/xóa bài viết

   - Biết rõ thêm tại: [Basic Security Rules](https://firebase.google.com/docs/rules/basics?authuser=0&hl=en)

3. Thiết lập Routes

4. Viết auth-context để lưu trữ thông tin người dùng và dùng ở nhiều nơi

5. Code trang Sign Up sử dụng RHF và Yup

6. Authentication với Firebase
