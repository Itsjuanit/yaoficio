import React, { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const URL = `${process.env.REACT_APP_API_PROD}/api/worker`;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${URL}?status=inactive`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCards(data.worker);
        } else {
          throw new Error("Error fetching cards");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  const handleActivateCard = async (cardId) => {
    try {
      const response = await fetch(`${URL}/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "active" }),
      });
      if (response.ok) {
        // Actualizar el estado local de las tarjetas
        setCards((prevCards) =>
          prevCards.map((card) =>
            card._id === cardId ? { ...card, status: "active" } : card
          )
        );

        // Verificar si el estado se actualizó correctamente en la base de datos
        const updatedCardResponse = await fetch(`${URL}/${cardId}`);
        if (updatedCardResponse.ok) {
          const updatedCardData = await updatedCardResponse.json();
          const updatedCardStatus = updatedCardData.worker.status;
          if (updatedCardStatus === "active") {
            console.log("Estado actualizado correctamente a 'active'");
          } else {
            console.log("No se pudo actualizar el estado a 'active'");
          }
        } else {
          console.log("Error al obtener la tarjeta actualizada");
        }
      } else {
        throw new Error("Error activating card");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                key={card._id}
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                }}
              >
                <div>
                  <h2 className="text-xl font-semibold mb-4 color-red">
                    {card.name}
                  </h2>
                  <p>
                    Phone Number:{" "}
                    <a href={card.phone_number}>{card.phone_number}</a>
                  </p>
                  <p>Opinion: {card.opinion}</p>
                  <p>Status: {card.status}</p>
                  <p>Tag: {card.tag.name}</p>
                  <div className="flex mt-3">
                    {card.status === "inactive" ? (
                      <button
                        className="flex items-center text-green-500 rounded-full mr-2"
                        onClick={() => handleActivateCard(card._id)}
                      >
                        <AiOutlineCheck className="text-xl mr-1" />
                      </button>
                    ) : null}
                    <button className="flex items-center text-green-500 rounded-full ml-2">
                      <AiOutlineClose className="text-xl mr-1" />
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
