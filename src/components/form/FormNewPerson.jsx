import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

export const FormNewPerson = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [opinion, setOpinion] = useState("");
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const URL = `${process.env.REACT_APP_API_PROD}/api/worker`;
  const URLTAGS = `${process.env.REACT_APP_API_PROD}/api/tag`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !number || !opinion || !tag) {
      alert("Por favor completa todos los campos");
      return;
    }
    const data = {
      name,
      phone_number: "https://api.whatsapp.com/send?phone=54" + number,
      opinion,
      tag,
    };

    fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setName("");
        setNumber("");
        setOpinion("");
        setTag({});
        setShowModal(true);
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
    //console.log(event.target.value);
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

          {showModal && (
            <div
              className="fixed inset-0 flex items-center justify-center"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                className="rounded-full border-4 border-red-500 flex items-center justify-center"
                style={{
                  width: "350px",
                  height: "100px",
                  backgroundImage:
                    "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                  color: "#212121",
                  borderRadius: "10px",
                }}
              >
                <div className="bg-white rounded-lg p-8">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute top-0 right-0"
                  >
                    <FaTimes
                      style={{
                        top: "0",
                        right: "0",
                        width: "100%",
                        color: "#212121",
                      }}
                    />
                  </button>
                  <p className="text-lg font-bold">
                    Tu información ha sido enviada.
                    <FaCheckCircle />
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
