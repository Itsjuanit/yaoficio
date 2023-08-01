import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormNewPerson = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [opinion, setOpinion] = useState("");
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);
  const URL = `${process.env.REACT_APP_API_PROD}/api/worker`;
  const URLTAGS = `${process.env.REACT_APP_API_PROD}/api/tag`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !number || !opinion || !tag) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const data = {
      name,
      phone_number: "https://api.whatsapp.com/send?phone=54" + number,
      opinion,
      tag,
    };

    const token = localStorage.getItem("authToken");

    fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    })
      .then((response) => {
        console.log(response);
        setName("");
        setNumber("");
        setOpinion("");
        setTag({});
        toast.success("Tu información ha sido enviada.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch(URLTAGS)
      .then((res) => res.json())
      .then((data) => setTags(data?.tags));
  }, []);

  const onChangeSelect = (event) => {
    setTag(event.target.value);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="container mx-auto">
      <div className="w-full max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                const regex = /^[a-zA-Z\s]+$/;
                const inputText = event.target.value;
                if (regex.test(inputText)) {
                  setName(inputText);
                } else {
                  alert("Solo se permiten letras y espacios en blanco");
                }
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Número de celular:
            </label>
            <input
              id="number"
              type="text"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="opinion"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Opinión:
            </label>
            <textarea
              id="opinion"
              type="text"
              value={opinion}
              onChange={(event) => setOpinion(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tag"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Categoría:
            </label>
            {tags && (
              <select
                id="tag"
                value={tag}
                onChange={onChangeSelect}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
                style={{ borderRadius: "10px" }}
              >
                {tags.map((item) => (
                  <option key={item._id} value={item._id}>
                    {capitalizeFirstLetter(item.name)}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            style={{
              backgroundImage:
                "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
              color: "#212121",
              borderRadius: "10px",
            }}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ENVIAR
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
