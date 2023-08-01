import React, { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const URL = `${process.env.REACT_APP_API_PROD}/api/worker`;
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    } else {
      fetchCards();
    }
  }, [navigate]);

  const handleActivateCard = async (cardId, status) => {
    try {
      const response = await fetch(`${URL}/${cardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchCards();
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
                  <div className="flex mt-3 items-center justify-center">
                    {card.status === "inactive" ? (
                      <button
                        className="flex items-center justify-center text-green-500 rounded-full ml-2"
                        onClick={() => handleActivateCard(card._id, "active")}
                        style={{
                          backgroundImage:
                            "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                          borderRadius: "10px",
                          padding: "inherit",
                          width: "50px",
                        }}
                        title="Se agrega a la lista de trabajadores"
                      >
                        <AiOutlineCheck className="text-xl mr-1" />
                      </button>
                    ) : null}
                    <button
                      className="flex items-center justify-center text-green-500 rounded-full ml-2"
                      onClick={() => handleActivateCard(card._id, "rejected")}
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, #fc798a 0%, #d4b0b0 100%)",
                        borderRadius: "10px",
                        padding: "inherit",
                        width: "50px",
                      }}
                      title="Se elimina de la base de datos"
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
