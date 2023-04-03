import { useContext } from "react";
import { ProjectsContext } from "../../context/ProjectsContext";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { AiOutlineWhatsApp } from "react-icons/ai";
//import TagFilter from "../../components/TagFilter";

const ProjectsGrid = () => {
  const { projects } = useContext(ProjectsContext);
  const [activeTheme] = useThemeSwitcher();

  const getBackgroundImage = (tag) => {
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
      default:
        return ""; // Si no hay coincidencia, devuelve una cadena vacía o el valor por defecto que desees
    }
  };

  return (
    <section
      className="py-5 sm:py-10 mt-5 sm:mt-10 min-h-screen"
      style={{ minHeight: "100vh" }}
    >
      {/* <TagFilter items={projects} /> */}
      <div className="text-center">
        <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
          LISTA DE WORKERS
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
        {projects.map((project) => (
          <div key={project.id}>
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
                {project.title}
              </h3>
              <p className="text-sm mb-2">{project.category}</p>
              <div className="flex flex-wrap mb-4">
                {project.tag.split(",").map((tag) => (
                  <button
                    key={tag}
                    style={{
                      backgroundImage: getBackgroundImage(tag),
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
                    {tag}
                  </button>
                ))}
              </div>
              <a
                href={project.number}
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
                  <div class="flex items-center">
                    <span class="mr-2">
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
