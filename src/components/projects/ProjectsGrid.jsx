import { useState, useEffect } from "react";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { AiOutlineWhatsApp } from "react-icons/ai";

const ProjectsGrid = () => {
  const [activeTheme] = useThemeSwitcher();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [dataTag, setTag] = useState([]);
  const URL = `${process.env.REACT_APP_API_PROD}/api`;
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
      default:
        return "";
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await fetch(`${URL}/worker?status=active`);
        const data = await response.json();
        setData(data?.worker);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkerData();
  }, []);

  useEffect(() => {
    fetch(URL + "/tag")
      .then((res) => res.json())
      .then((data) => setTag(data?.tag));
  }, [dataTag]);

  return (
    <section
      className="py-5 sm:py-10 mt-5 sm:mt-10 min-h-screen"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center mb-10">
        <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
          LISTA DE WORKERS
        </p>
      </div>

      <div className="max-w-screen-lg mx-auto">
        <div>
          <form className="px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Busqueda de workers"
                value={search}
                onChange={handleSearch}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 mb-10"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, rgba(246, 211, 101, 0.2) 0%, rgba(253, 160, 133, 0.7) 100%)",
                  color: "#212121",
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
        {data
          ?.filter((project) =>
            project.tag?.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((project) => (
            <div key={project._id}>
              <div
                className="p-4 rounded-lg shadow-md border border-white transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                }}
              >
                <h3
                  className="font-medium text-lg mb-2 font-bold"
                  style={{ color: "#212121" }}
                >
                  {project.name}
                </h3>
                <div>{project.opinion}</div>
                <div className="flex flex-wrap mb-4">
                  <button
                    style={{
                      backgroundImage: getBackgroundImage(project.tag?.name),
                      backgroundColor:
                        activeTheme === "dark" ? "#312E81" : "#fff",
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
                    {project.tag ? project.tag.name : ""}
                  </button>
                </div>
                <a
                  href={project.phone_number}
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
                      backgroundImage:
                        "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
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

export default ProjectsGrid;
