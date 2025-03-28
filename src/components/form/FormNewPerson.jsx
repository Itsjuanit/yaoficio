import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const FormNewPerson = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [opinion, setOpinion] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const categories = [
    { id: 1, name: "Plomero" },
    { id: 2, name: "Gasista" },
    { id: 3, name: "Electricista" },
    { id: 4, name: "Carpintero" },
    { id: 5, name: "Albañil" },
    { id: 6, name: "Cerrajero" },
    { id: 7, name: "Pintor" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !number || !opinion || tags.length === 0) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const data = {
      name,
      phone_number: "54" + number,
      opinion,
      tags,
      status: "pending",
    };

    try {
      const docRef = await addDoc(collection(db, "workers"), data);
      console.log("Documento agregado con ID:", docRef.id);
      setName("");
      setNumber("");
      setOpinion("");
      setTags([]);
      setSelectedCategory("");
      setCustomCategory("");
      toast.success("Tu información ha sido enviada y guardada.");
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      toast.error("Error al enviar la información.");
    }
  };

  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    if (value !== "other") {
      setTags([value]);
      setCustomCategory("");
    } else {
      setTags([]); // Se espera que se ingrese un oficio personalizado
    }
  };

  const handleCustomCategoryChange = (event) => {
    setCustomCategory(event.target.value);
    setTags([event.target.value]);
  };

  return (
    <div className="container mx-auto">
      <div className="w-full max-w-md mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
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
            <label htmlFor="opinion" className="block text-gray-700 text-sm font-bold mb-2">
              Opinión:
            </label>
            <textarea
              id="opinion"
              value={opinion}
              onChange={(event) => setOpinion(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
            <select
              value={selectedCategory}
              onChange={handleSelectChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
              style={{ borderRadius: "10px" }}
            >
              <option value="">Seleccione un oficio</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {capitalizeFirstLetter(category.name)}
                </option>
              ))}
              <option value="other">Otro oficio (sugerir)</option>
            </select>
            {selectedCategory === "other" && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={handleCustomCategoryChange}
                  placeholder="Sugerir nuevo oficio"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 rounded-md"
                  style={{ borderRadius: "10px" }}
                />
              </div>
            )}
          </div>
          <button
            style={{
              backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
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
