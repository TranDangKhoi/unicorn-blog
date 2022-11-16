# Setup dự án

1. Cài đặt đầy đủ packages cần thiết nhất (như firebase, react-router-dom, styled-components), setup sao cho tất cả chạy đều ổn áp

2. Thiết lập Firebase :fire: **(LƯU Ý): Khi start in production mode thì ta sẽ có một số luật để có thể tác động vào database, nên ta sẽ phải chỉnh sửa rules trong Firestore Database như sau:**

   - `allow read, write: if request.auth != null;`: Dòng lệnh này dành cho những user đã đăng nhập có thể CRUD database hay nói cách khác là thêm/sửa/xóa bài viết

   - Biết rõ thêm tại: [Basic Security Rules](https://firebase.google.com/docs/rules/basics?authuser=0&hl=en)

3. Thiết lập Routes

4. Viết auth-context để lưu trữ thông tin người dùng và dùng ở nhiều nơi

# Phân tích database

#### Collection: posts

- id
- title
- slug
- image
- content
- status (approved, pending, rejected)
- user: {id, username, avatar, bio, ...} (để lấy ra thông tin user đã viết bài viết đó)
- <s> categoryId (lấy ra thông tin danh mục)</s>
- category: {id, name, slug}
- createdAt

UPDATED v1.3:

- id
- title
- slug
- image
- content
- status (approved, pending, rejected)
- isPopular (true, false)
- userId (để lấy ra thông tin user đã viết bài viết đó)
- categoryId (lấy ra thông tin danh mục)
- createdAt (serverTimeStamp)
- updatedAt

#### Collection: Category

- id
- name
- slug
- status (approved, reject)
- createdAt (serverTimeStamp)

#### Collection User

- id
- username
- avatar
- email
- password
- status (active, pending, banned)
- role (admin,mod,user), trong đó:
  - admin: Có mọi quyền của mod + thêm/sửa/xóa user
  - mod: Có mọi quyền của user + duyệt bài viết, thêm/xóa/sửa bài viết của user
  - user: thêm/xóa/sửa bài viết của chính mình
  - Bình thường trong dự án thật sẽ ít ai làm như này, người ta sẽ tạo ra một trường là permissions, và permissions sẽ là mảng chứa các quyền ở trong đó. Nhưng làm như vậy sẽ khá phức tạp vì sẽ có hàng trăm quyền ở trong đó nên mình sẽ sử dụng role
- createdAt

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

- v1.2:

- Collection: Posts

  - Add new post
  - Delete post
  - Update post

- v1.3:

- Display(Pagination, Filter), Add, Update & Delete Category

- Display(Pagination, Filter), Add, Update & Delete User

- Display, Delete Post

- Optimize source code(PropTypes, logic, error boundary)

- Responsive and optimize UI UX

- Update post with ckeditor

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

# Nếu database trả về status của một đối tượng nào đó dưới dạng number thì sao

- Đọc phần tiêu đề có thể bạn chưa hiểu mình đang muốn nói tới cái gì, thì bây giờ mình sẽ giải thích đei:

  - Khi bạn **đăng một bài viết** lên một nhóm trên Facebook, thường thì **bạn sẽ phải đợi quản trị viên duyệt bài của bạn** thì **bài viết mới được hiển thị lên**
  - Ta chia trạng thái bài viết cả bạn thành 3 trạng thái phổ biến như sau (Đã được duyệt bài thành công / Đang chờ để được duyệt bài / Bị từ chối duyệt bài)
  - Lúc này, status của bài viết bạn nằm trong database thực ra là 3 con số tương ứng với các trạng thái trên
    - 1: **Đã được duyệt bài thành công**
    - 2: **Đang chờ để được duyệt bài**
    - 3: **Bị từ chối duyệt bài**
  - Vậy nên để code Front-End cho các dev khác hiểu, ta sẽ tạo ra một object nằm trong constants.js trong folder utils, ta không nên code như này:

  ```js
  <>
    <Radio
      name="status"
      control={control}
      checked={watchStatus === 1}
      value={1}
    >
      Approved
    </Radio>
    <Radio
      name="status"
      control={control}
      checked={watchStatus === 2}
      value={2}
    >
      Pending
    </Radio>
    <Radio
      name="status"
      control={control}
      checked={watchStatus === 3}
      value={3}
    >
      Reject
    </Radio>
  </>
  ```

  - Các con số 1,2,3 kia là các magic number, nếu đọc mà không hiểu ý nhau thì sẽ gây mâu thuẫn, nên OK, ta sẽ tạo một object lưu trữ các con số 1,2,3 kia và định nghĩa ý nghĩa cho các con số đó luôn

  ```js
  // Bên file constants.js nằm trong folder utils thêm
  export const postStatus = {
    APPROVED: 1,
    PENDING: 2,
    REJECTED: 3,
  };
  ```

  - Đó nhìn trông rất trực quan, giờ mình sẽ sửa lại đoạn code khó hiểu ở bên trên

  ```js
  <>
    <Radio
      name="status"
      control={control}
      checked={watchStatus === postStatus.APPROVED}
      value={1}
    >
      Approved
    </Radio>
    <Radio
      name="status"
      control={control}
      checked={watchStatus === postStatus.PENDING}
      value={2}
    >
      Pending
    </Radio>
    <Radio
      name="status"
      control={control}
      checked={watchStatus === postStatus.REJECTED}
      value={3}
    >
      Reject
    </Radio>
  </>
  ```

## Lưu ý khi thêm user vào database

- Khi thêm user vào database thì ta nên sử dụng `setDoc` thay vì `addDoc`. Vì sao ư?

- Nếu sử dụng firebase thì khi ta đăng kí một account bằng Firebase:

  1. Account đó sẽ tự generate ra user id sau khi đăng kí
  2. Sau đó, ta sử dụng addDoc để lưu user đó vào trong một document

  - **ĐÂY CHÍNH LÀ NÓ** đã gây ra cho mình 1 cơn đau đầu đến gần trầm cảm cả tối, và nó mà mình nói tới ở đây chính là bản chất của câu lệnh `addDoc` này
  - Nếu ta sử dụng `addDoc` thì document sẽ tự generate ra `ID` và lúc này `id giữa document và cái mà tự generate ra lúc tạo account` sẽ **KHÁC NHAU**.
  - Mình sẽ ví dụ về một đoạn code khi đăng kí, ta sẽ sử dụng `addDoc` để `thêm users vào database`:

  ```js
  const handleSignUp = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userRef = collection(db, "users");
      await addDoc(userRef, {
        username: values.username,
        email: values.email,
        password: values.password,
        userId: user.user.uid,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  ```

  - Lúc này nếu mình code để lấy ra id người dùng như sau:

  ```js
  // props item ở đây là thông tin của một bài viết (tiêu đề, thông tin người viết bài, ảnh, ...v.v)
  const PostFeatureItem = ({ item }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
      async function getUser() {
        // Lấy ra reference của doc có trùng userId với item.userId của prop item truyền vào
        const docRef = doc(db, "users", item.userId);
        // Lấy ra thông tin của doc
        const docSnap = await getDoc(docRef);
        // In ra màn hình thông tin của người dùng trùng với userId của người viết bài
        console.log(docSnap.data());
        // Truyền toàn bộ thông tin có được vào state user để sử dụng
        setUser(docSnap.data());
      }
      // Invoke
      getAuthor();
    }, [item.user]);
  };
  ```

  - Trông **code rất hoàn hảo**, nhưng bạn hãy cùng đoán xem ở màn hình console sẽ in ra gì. Mình cũng sốc lúc nhìn lắm ... Và trầm cảm lúc debug nữa vì không mò ra được bệnh
  - Ouput hiển thị ra là `undefined`! Lúc đầu mình cũng bối rối lắm, rõ ràng code chuẩn chỉ như thế rồi, chả nhẽ sai ở đâu, sao không có lỗi đỏ, ...
  - Sau khi mò mẫm một hồi thì mình nhận ra docRef này nó đang cố references tới một cái `item.userId` mà không hề trùng với `id của document chứa thông tin user`. OK, nói có thể hơi khó hiểu nhưng các bạn có thể hiểu như sau:

  1. Như ở trên mình nói, khi sử dụng `addDoc` thì id của document sẽ đc `auto-generate`.
  2. Khi `tạo tài khoản`,` id của tài khoản` cũng sẽ được `auto-generate`.
  3. **VÀ ĐƯƠNG NHIÊN**, vì hai cái `id được generate của document` và `id của account được tạo` chả liên quan quái gì tới nhau cả nên id của chúng nó sẽ **KHÁC NHAU HOÀN TOÀN** (document chứa thông tin user có id một kiểu, userId mình lưu trữ trong authentication cũng có id một kiểu). Vậy nên bây giờ mọi thứ đều đã dễ hiểu, cái document này không có trùng id với user id nên nó không tìm được docReference -> output là `undefined`

- Ok vậy ta đã tìm ra được bệnh rồi, giờ phải làm thế nào you may ask???
- Thay vì sử dụng `addDoc`, mình sẽ sử dụng `setDoc` để set cho `ID CỦA DOCUMENT CHỨA THÔNG TIN CỦA USER GIỐNG VỚI ID CỦA USER` luôn (chú ý kĩ đoạn này nha)
- Okay, giờ cùng bắt tay vào fix đoạn code ở `function handleSignUp` nha:

```js
const handleSignUp = async (values) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    // Đoạn code cũ
    // const userRef = collection(db, "users");
    // await addDoc(userRef, {
    //   username: values.username,
    //   email: values.email,
    //   password: values.password,
    //   userId: user.user.uid,
    // });
    // setDoc(doc(database, tên collection, id của doc))
    // Đó như bạn thấy ở dưới đây thì id của doc mình đã set luôn cho
    // nó thành auth.currentUser.uid rồi nên không có chuyện bị lỗi nữa
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      username: values.username,
      email: values.email,
      password: values.password,
      userId: auth.currentUser.uid,
    });
  } catch (error) {
    console.log(error);
  }
};
```

# Chức năng sửa trong Firebase

- Khi click vào nút sửa post/category, thì ta sẽ route sang trang sửa
- Chạy qua trang /manage/update-category?id=foobar

# Những thứ cần cập nhật để ghi nhớ

- Cập nhật lại README trong react-studying:

  #### FIREBASE

  - Query:

    - Cách để query trả về giá trị gần giống, chứ không cần giống hoàn toàn:

    - query trong firebase nếu ta dùng toán tử `==` thì nó sẽ chỉ trả cho ta về giá trị giống y hệt với những gì ta nhập vào ô search, ví dụ như sau:

    - Ta có 1 list tên học sinh gồm: "Khôi, Nam, Việt, Minh". Bây giờ ta muốn tìm học sinh tên Khôi, thông thường chỉ cần nhập vào `K` hoặc `Kh`, kết quả query cũng sẽ vẫn hiển thị ra "Khôi", nhưng trong firebase thì không như vậy.

    - Nếu ta sử dụng `==` thì nó sẽ tìm kết quả y hệt những gì ta nhập vào ô search nên ta phải nhập hẳn từ `Khôi` vào thì nó mới hiển thị cho ta thông tin học sinh `Khôi`:

    ```js
    const q = query(colRef, where("name", "==", searchValue));
    ```

    - Vậy nên ta phải sửa lại query của firebase như sau:

    ```js
    const q = query( colRef, where("name", ">=", searchValue), where("name", "<=", searchValue) ); `
    ```

    - Lấy ra số lượng document trong collection:

    ```js
    //Small collection: Áp dụng khi số lượng docs <100 bản
    onSnapshot(q, colRef, (snapshot) => {
      console.log(snapshot.size);
    });
    // Medium collection: Áp dụng khi số lượng docs 100 < docs < 1000
    // Cloud function:
    db.collection("...")
      .get()
      .then((snap) => {
        res.status(200).send({
          length: snap.size,
        });
      });
    // Front-End:
    yourHttpClient
      .post(yourCloudFunctionUrl)
      .toPromise()
      .then((snap) => {
        size = snap.length; // will return the collection size
      });
    ```

    - Nếu muốn xem thêm cả large collection > 1000 bản thì có thể tìm hiểu thêm tại đây
      [Cloud Firestore Collection Count](https://stackoverflow.com/questions/46554091/cloud-firestore-collection-count)

  #### REACT-HOOK-FORM

  - setValue:

    - Truyền vào 2 giá trị (name, values)
    - Ví dụ khi click vào input và muốn set lại value của username thì code như sau:

    ```js
    <Input
      name="username"
      control={control}
      onClick={() => setValue("username", "something")}
    ></Input>
    ```

    - watch: Lưu giữ value của input được truyền vào, ví dụ:
    - Truyền vào status của một món hàng chẳng hạn, thường món hàng sẽ có 2 status chính là: Còn hàng / Hết hàng, ta sẽ coi:
      - Hết hàng = 1
      - Còn hàng = 2

    ```js
    // Chuyển về number để chắc chắn khi set lại nó trả về 1 chứ không phải "1"
    const watchStatus = Number(watch("status"));
    ```

# Xóa users ra khỏi authentication

- Muốn xóa users ra khỏi Authentication của Firebase thì khá phức tạp, ta phải sử dụng Firebase Admin và phải có 1 con server riêng nữa, configs cũng rất phức tạp.
