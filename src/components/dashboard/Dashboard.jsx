import React, { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Asegúrate de que esta ruta sea correcta

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // Tab activo
  const navigate = useNavigate();

  // Función para obtener los datos de Firestore
  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workers"));
      const workerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Datos obtenidos en fetchCards:", workerData);
      setCards(workerData);
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
      console.log(`Se actualizó el estado del trabajador ${workerId} a ${newStatus}`);
      // Refrescar los datos después de la actualización
      fetchCards();
    } catch (error) {
      console.error("Error updating worker status:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No se encontró token de autenticación. Redirigiendo a /login");
      navigate("/login");
    } else {
      console.log("Token encontrado, obteniendo datos de trabajadores...");
      fetchCards();
    }
  }, [navigate]);

  // Filtrar trabajadores por estado
  const filteredCards = cards.filter((worker) => {
    if (activeTab === "all") return true;
    return worker.status === activeTab;
  });

  console.log("Trabajadores filtrados para la pestaña", activeTab, ":", filteredCards);

  // Renderizar una tarjeta de trabajador
  const renderWorkerCard = (worker) => {
    // Mostrar la etiqueta: si worker.tag existe, lo usamos; de lo contrario, verificamos si existe worker.tags (array)
    const displayTag = worker.tag || (worker.tags ? worker.tags.join(", ") : "Sin etiqueta");

    return (
      <div
        className="bg-white p-6 rounded-md shadow-md"
        key={worker.id}
        style={{
          backgroundImage: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        }}
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">{worker.name}</h2>
          <p>
            Phone Number: <a href={`tel:${worker.phone_number}`}>{worker.phone_number}</a>
          </p>
          <p>Opinion: {worker.opinion}</p>
          <p>Status: {worker.status}</p>
          <p>Tag: {displayTag}</p>
          {worker.status === "pending" && (
            <div className="flex mt-3 items-center justify-center">
              <button
                className="flex items-center justify-center text-green-500 rounded-full ml-2"
                onClick={() => updateWorkerStatus(worker.id, "accepted")}
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
                onClick={() => updateWorkerStatus(worker.id, "rejected")}
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
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow py-6 px-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="container mx-auto py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 text-black font-semibold rounded-lg ${activeTab === "all" ? "bg-blue-500" : "bg-gray-400"}`}
            onClick={() => setActiveTab("all")}
          >
            Todos
          </button>
          <button
            className={`px-4 py-2 text-black font-semibold rounded-lg ${activeTab === "accepted" ? "bg-blue-500" : "bg-gray-400"}`}
            onClick={() => setActiveTab("accepted")}
          >
            Aceptados
          </button>
          <button
            className={`px-4 py-2 text-black font-semibold rounded-lg ${activeTab === "rejected" ? "bg-blue-500" : "bg-gray-400"}`}
            onClick={() => setActiveTab("rejected")}
          >
            Rechazados
          </button>
        </div>

        {/* Mostrar trabajadores según la pestaña seleccionada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
          {filteredCards.map((worker) => renderWorkerCard(worker))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
