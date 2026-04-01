import { LoginForm } from '@features/auth/login/ui/LoginForm';

export function LoginPage() {
  return <LoginForm />;
}

let obj = {
  productId: 1,
  quantity: 5,
};
// fetch("http://localhost:3005/api/cart", {
//   method: "POST",
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json", // 👈 ЭТО КЛЮЧЕВОЕ!
//   },
//   body: JSON.stringify(obj),
// }).catch((err) => console.log(err));

// fetch("http://localhost:3005/api/cart", { credentials: "include" })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
