import React from "react";
const handleSubmit = (event) => {
  event.preventDefault();
  console.log("Submit");
};
export const Login = () => {
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
            >
              Email
            </label>
            <input
              id="name"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              id="name"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            />
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
