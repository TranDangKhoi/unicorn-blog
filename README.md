# Setup dự án

1. Cài đặt đầy đủ packages cần thiết nhất (như firebase, react-router-dom, styled-components), setup sao cho tất cả chạy đều ổn áp

2. Thiết lập Firebase :fire: **(LƯU Ý): Khi start in production mode thì ta sẽ có một số luật để có thể tác động vào database, nên ta sẽ phải chỉnh sửa rules trong Firestore Database như sau:**

   - `allow read, write: if request.auth != null;`: Dòng lệnh này dành cho những user đã đăng nhập có thể CRUD database hay nói cách khác là thêm/sửa/xóa bài viết

   - Biết rõ thêm tại: [Basic Security Rules](https://firebase.google.com/docs/rules/basics?authuser=0&hl=en)

3. Thiết lập Routes

4. Viết auth-context để lưu trữ thông tin người dùng và dùng ở nhiều nơi

# List những tasks/targets cần hoàn thành

- v1.0:

1. Code trang Sign Up sử dụng RHF và Yup

2. Authentication với Firebase

3. Sử dụng prop-types và comment params cho component

4. Login UI

5. Header UI

6. Homepage UI

7. Details UI

8. Routing

9. Hoàn thiện form để submit bài viết

10. Hoàn thiện chức năng thêm bài viết và thêm chi tiết bài viết đó vào database

11. Hoàn thiện chức năng sửa/xóa bài viết

12. Table UI

13. Categories UI

14. Users

15. 404 Not Found Page

16. Checkbox, Radio, Toggle components

- v1.1:

17. Dashboard

18. Admin/User Authentication

19. Tách code ra thành nhiều re-useable components nhất có thể

# Những thứ rút ra được sau khi làm project

I. `Rút ngắn đường dẫn import giữa các file lại` = cách `add thêm file jsconfig.json nằm cùng cấp với folder src`, sau đó code vào bên trong là:

```json
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

- Mỗi khi viết một component thì ta cũng cần tạo file index.js trong FOLDER CHỨA CODE CỦA COMPONENT ĐÓ

- VD như ảnh sau đây: ![Ảnh](https://i.ibb.co/7GKBw3P/file.png)

- Trong file index.js ta sẽ import những component hiện tại đang có trong folder sau đó lại export những components đó ra ngoài, ví dụ với folder Icon của mình thì mình sẽ viết như sau:

```js
// index.js
import IconEyeOpen from "./IconEyeOpen";
import IconEyeClosed from "./IconEyeClosed";
export { IconEyeOpen, IconEyeClosed };

// IconEyeClosed.js
import React from "react";

const IconEyeClosed = ({ className = "", onClick = () => {} }) => {
  return (
    <span className={className} onClick={onClick}>
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5356 8.46454C13.7677 8.69669 13.9519 8.97229 14.0775 9.27561C14.2032 9.57892 14.2678 9.90401 14.2678 10.2323C14.2678 10.5606 14.2031 10.8857 14.0775 11.189C13.9518 11.4923 13.7677 11.7679 13.5355 12.0001C13.3034 12.2322 13.0278 12.4164 12.7245 12.542C12.4211 12.6676 12.0961 12.7323 11.7678 12.7323C11.4394 12.7323 11.1144 12.6676 10.811 12.5419C10.5077 12.4163 10.2321 12.2322 10 12"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11 4C7.04003 4 4.01115 6.27449 1.4755 9.39738C1.19014 9.74883 1.19009 10.2511 1.47544 10.6025C2.18711 11.479 2.93763 12.2887 3.73669 13M6.74043 15.0348C8.03446 15.6495 9.44549 16 11 16C11.2884 16 11.5719 15.9879 11.8507 15.9643L12.2607 15.9122M15.7029 5.18844C17.5178 6.15443 19.0991 7.64187 20.5245 9.39741C20.8099 9.74885 20.8099 10.2512 20.5245 10.6026C19.1774 12.2617 17.6911 13.6813 16 14.6476"
          stroke="#999999"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.1217 1.11547L1.9998 18.9996"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export default IconEyeClosed;

// IconEyeOpen.js

import React from "react";

const IconEyeOpen = ({ className = "", onClick = () => {} }) => {
  return (
    <span className={className} onClick={onClick}>
      <svg
        width="22"
        height="14"
        viewBox="0 0 22 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 1.62156C16.8312 2.50868 18.7928 4.24569 20.5245 6.37837C20.8098 6.72982 20.8099 7.23217 20.5245 7.58361C17.9889 10.7065 14.96 12.981 11 12.981C7.04003 12.981 4.01115 10.7065 1.4755 7.58361C1.19014 7.23216 1.19016 6.72981 1.47551 6.37837C3.69735 3.64197 6.29789 1.55697 9.5717 1.0828C9.75303 1.05654 9.93641 1.03522 10.1219 1.019L10.561 1"
          stroke="#999999"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 6.98096C13.5 8.36167 12.3807 9.48096 11 9.48096C9.61929 9.48096 8.5 8.36167 8.5 6.98096C8.5 5.60025 9.61929 4.48096 11 4.48096C12.3807 4.48096 13.5 5.60025 13.5 6.98096Z"
          stroke="#999999"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export default IconEyeOpen;

```

II. Cách bố trì files:

- ![Ảnh bố trí files/folders](https://i.ibb.co/0hv83Ym/image.png)

- public: Nhét ảnh logo, ảnh vặt vào đó, nếu muốn sử dụng cho thẻ img thì thay vì sử dụng `src` thì ta sẽ sử dụng `srcSet`

- components: Chứa các components có thể tái sử dụng ở nhiều nơi

- contexts: Cái này thì không cần nói nhiều, để `lưu giá trị state, props sử dụng ở nhiều nơi`

- firebase-app: Đặt là `firebase` sẽ **bị trùng với 1 thứ gì đó** nên phải đổi thành `firebase-app`, **dùng để chứa config của firebase**

- hooks: Chứa custom hooks để tái sử dụng ở nhiều nơi

- module: Chứa các component của các page nhưng không mang tính chất có thể tái sử dụng ở nhiều nơi (VD: Chỉ ở trang homepage với có banner, các trang khác đều không có thì ta sẽ nhét cái đó vào đây)

- pages: **Dùng để chứa layout của một page** và **trong page đó** sẽ **sử dụng các components từ folder components**

- styles: Theo mình thấy thì sẽ xóa file App.scss đi, sử dụng chính trong file index.scss và import reset.css vào thui, nếu có styled-component thì thêm vào các global styles và global classess

- utils: Chứa những mã màu để sử dụng với styled-components cho nhanh
