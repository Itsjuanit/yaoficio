import { useState, useEffect } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Asegúrate de que este archivo esté bien configurado

const WorkersGrid = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const getBackgroundImage = (tag) => {
    if (!tag) {
      return "";
    }
    switch (tag.toUpperCase()) {
      case "ELECTRICISTA":
        return "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)";
      case "REFRIGERACION":
        return "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)";
      case "PLOMERO":
        return "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)";
      case "MUEBLES":
        return "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)";
      case "CARPINTERO":
        return "linear-gradient(to top, #fddb92 0%, #d1fdff 100%)";
      case "GASISTA":
        return "linear-gradient(to top, #f8ac08 0%, #576061 100%)";
      case "METALURGICO":
        return "linear-gradient(to top, #03e4ac 0%, #ee1e9e 100%)";
      case "CERRAJERO":
        return "linear-gradient(to top, #bbf0e4 0%, #7bafda 100%)";
      case "ALBAÑIL":
        return "linear-gradient(to top, #47ceae 0%, #566674 100%)";
      default:
        return "";
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Función para obtener datos de trabajadores de Firestore y filtrar por "accepted"
    const fetchWorkerData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "workers"));
        const workers = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((worker) => worker.status === "accepted"); // Filtrar solo los trabajadores con estado "accepted"

        setData(workers);
      } catch (error) {
        console.error("Error al obtener los trabajadores:", error);
      }
    };

    fetchWorkerData();
  }, []);

  return (
    <section className="py-5 sm:py-10 mt-5 sm:mt-10 min-h-screen">
      <div className="text-center mb-10">
        <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">LISTA DE TRABAJADORES</p>
      </div>

      <div className="max-w-screen-lg mx-auto">
        <div>
          <form className="px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Busqueda de trabajadores"
                value={search}
                onChange={handleSearch}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 mb-10"
                style={{
                  color: "#212121",
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
        {data
          ?.filter((worker) => worker.tag?.toLowerCase().includes(search.toLowerCase())) // Filtro basado en la búsqueda
          .map((worker) => (
            <div key={worker.id}>
              <div
                className="p-4 rounded-lg shadow-md border border-white transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl"
                style={{
                  backgroundImage: getBackgroundImage(worker.tag),
                }}
              >
                <h3 className="font-medium text-lg mb-2 font-bold" style={{ color: "#212121" }}>
                  {worker.name}
                </h3>
                <div>{worker.opinion}</div>
                <div className="flex flex-wrap mb-4">
                  <button
                    style={{
                      backgroundImage: getBackgroundImage(worker.tag),
                      backgroundColor: "#fff",
                      color: "#212121",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      borderRadius: "10px",
                      fontSize: "10px",
                      lineHeight: "1.2",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginRight: "5px",
                    }}
                  >
                    {worker.tag ? worker.tag : ""}
                  </button>
                </div>
                <a
                  href={`https://api.whatsapp.com/send?phone=${worker.phone_number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-900 px-4 py-2 rounded-lg shadow cursor-pointer inline-block"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                      borderRadius: "inherit",
                      padding: "inherit",
                      width: "150px",
                    }}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        <AiOutlineWhatsApp />
                      </span>
                      <span className="text-bold">WhatsApp</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default WorkersGrid;
