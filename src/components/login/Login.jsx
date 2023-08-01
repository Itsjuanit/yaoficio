import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Login = () => {
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
      const response = await fetch(
        "https://bkworkers-api.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();

      localStorage.setItem("authToken", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
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
              className="block text-gray-700 text-sm font-bold mb-2"
              type="email"
            >
              Email
            </label>
            <input
              id="name"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
              value={email} // Agrega esta línea
              onChange={(e) => setEmail(e.target.value)} // Agrega esta línea
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
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
                value={password} // Agrega esta línea
                onChange={(e) => setPassword(e.target.value)} // Agrega esta línea
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center cursor-pointer"
                onClick={handlePasswordVisibility}
              >
                {passwordVisible ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>
            <button
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
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
