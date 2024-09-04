import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Importa tu configuración de Firebase
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

export const Login = () => {
  const [activeTheme] = useThemeSwitcher();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      toast.success("Autenticación exitosa");

      localStorage.setItem("authToken", user.accessToken); // Guarda el token en localStorage
      navigate("/dashboard"); // Redirige al dashboard
    } catch (error) {
      console.error("Error en la autenticación:", error);
      toast.error("Por favor ingresa el usuario y la contraseña correctos.");
    }
  };

  return (
    <div className="container mx-auto">
      <div
        className="w-full max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8"
        style={{
          border: "1px solid #d4fc79",
          borderRadius: "10px",
          padding: "100px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-semibold mb-2"
              style={{ color: activeTheme === "light" ? "#fff" : "#212121" }}
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold text-sm mb-2 mt-2"
              style={{ color: activeTheme === "light" ? "#fff" : "#212121" }}
            >
              CONTRASEÑA
            </label>

            <div className="mb-4 relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md pr-10"
                style={{
                  borderRadius: "10px",
                  paddingRight: "10px",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center cursor-pointer"
                onClick={handlePasswordVisibility}
              >
                {passwordVisible ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </div>
            <button
              style={{
                backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                color: "#212121",
                borderRadius: "10px",
                marginTop: "40px",
              }}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              INGRESAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
