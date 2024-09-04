import React, { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Asegúrate de que esta ruta sea correcta

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  // Función para obtener los datos de Firestore y filtrar por estado "pending"
  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workers"));
      const workerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filtrar solo los trabajadores con estado "pending"
      const pendingWorkers = workerData.filter((worker) => worker.status === "pending");

      setCards(pendingWorkers); // Actualiza el estado con los datos filtrados
    } catch (error) {
      console.error("Error fetching cards: ", error);
    }
  };

  // Función para actualizar el estado del trabajador en Firestore
  const updateWorkerStatus = async (workerId, newStatus) => {
    try {
      const workerRef = doc(db, "workers", workerId);
      await updateDoc(workerRef, {
        status: newStatus, // Cambiar el estado a "accepted" o "rejected"
      });
      fetchCards(); // Refrescar los datos después de la actualización
    } catch (error) {
      console.error("Error updating worker status:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    } else {
      fetchCards();
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow py-6 px-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
          {Array.isArray(cards) &&
            cards.map((card) => (
              <div
                className="bg-white p-6 rounded-md shadow-md"
                key={card.id}
                style={{
                  backgroundImage: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                }}
              >
                <div>
                  <h2 className="text-xl font-semibold mb-4 color-red">{card.name}</h2>
                  <p>
                    Phone Number: <a href={`tel:${card.phone_number}`}>{card.phone_number}</a>
                  </p>
                  <p>Opinion: {card.opinion}</p>
                  <p>Status: {card.status}</p>
                  <p>Tag: {card.tag?.name || "Sin etiqueta"}</p>
                  <div className="flex mt-3 items-center justify-center">
                    <button
                      className="flex items-center justify-center text-green-500 rounded-full ml-2"
                      onClick={() => updateWorkerStatus(card.id, "accepted")}
                      style={{
                        backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                        borderRadius: "10px",
                        padding: "inherit",
                        width: "50px",
                      }}
                      title="Aceptar trabajador"
                    >
                      <AiOutlineCheck className="text-xl mr-1" />
                    </button>
                    <button
                      className="flex items-center justify-center text-red-500 rounded-full ml-2"
                      onClick={() => updateWorkerStatus(card.id, "rejected")}
                      style={{
                        backgroundImage: "linear-gradient(120deg, #fc798a 0%, #d4b0b0 100%)",
                        borderRadius: "10px",
                        padding: "inherit",
                        width: "50px",
                      }}
                      title="Rechazar trabajador"
                    >
                      <AiOutlineClose className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
