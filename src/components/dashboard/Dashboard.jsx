"use client";

import { useState, useEffect } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlinePhone,
  AiOutlineTag,
  AiOutlineComment,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // "all", "accepted" o "rejected"
  const navigate = useNavigate();

  // Estilos inline para componentes
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#fff",
    },
    header: {
      backgroundColor: "#ffffff",
      padding: "1.5rem 1rem",
    },
    headerTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1rem",
    },
    tabsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "2rem",
    },
    tab: {
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: "1px solid #fff",
      backgroundColor: "#ffffff",
      color: "#4b5563",
    },
    tabActive: {
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    tabAll: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      border: "1px solid #3b82f6",
    },
    tabAccepted: {
      backgroundColor: "#10b981",
      color: "#ffffff",
      border: "1px solid #10b981",
    },
    tabRejected: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
      border: "1px solid #ef4444",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "1.5rem",
    },
    noCards: {
      gridColumn: "1 / -1",
      textAlign: "center",
      padding: "2.5rem 0",
      color: "#6b7280",
    },
  };

  // Media queries para el grid
  useEffect(() => {
    const updateGridColumns = () => {
      const cardsGrid = document.getElementById("cards-grid");
      if (cardsGrid) {
        if (window.innerWidth >= 1280) {
          cardsGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
        } else if (window.innerWidth >= 1024) {
          cardsGrid.style.gridTemplateColumns = "repeat(3, 1fr)";
        } else if (window.innerWidth >= 640) {
          cardsGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
        } else {
          cardsGrid.style.gridTemplateColumns = "repeat(1, 1fr)";
        }
      }
    };

    window.addEventListener("resize", updateGridColumns);
    updateGridColumns();

    return () => window.removeEventListener("resize", updateGridColumns);
  }, []);

  // Función para obtener los datos de Firestore y ordenarlos por fecha (más recientes primero)
  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workers"));
      const workerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      workerData.sort((a, b) => {
        // Si se guardó la fecha como un Firebase Timestamp, se usa toDate()
        const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
        const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
        return dateB - dateA;
      });

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
        status: newStatus,
      });
      console.log(`Se actualizó el estado del trabajador ${workerId} a ${newStatus}`);
      toast.success(`Trabajador marcado como ${newStatus}`);
      fetchCards();
    } catch (error) {
      console.error("Error updating worker status:", error);
      toast.error("Error al actualizar el estado del trabajador");
    }
  };

  // Función para borrar un trabajador de Firestore y mostrar un toast
  const deleteWorker = async (workerId) => {
    try {
      const workerRef = doc(db, "workers", workerId);
      await deleteDoc(workerRef);
      console.log(`Trabajador ${workerId} eliminado`);
      toast.success("Trabajador eliminado correctamente");
      fetchCards();
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("Error al borrar el trabajador");
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

  // Filtrar trabajadores según la pestaña activa
  const filteredCards = cards.filter((worker) => {
    if (activeTab === "all") return true;
    return worker.status === activeTab;
  });

  console.log("Trabajadores filtrados para la pestaña", activeTab, ":", filteredCards);

  // Funciones para definir estilos según la etiqueta o estado
  const getTagStyles = (tag) => {
    if (!tag)
      return {
        backgroundColor: "#e5e7eb",
        color: "#4b5563",
      };

    const tagLower = tag.toLowerCase();
    if (tagLower.includes("pintor"))
      return {
        backgroundColor: "#dbeafe",
        color: "#1e40af",
      };
    if (tagLower.includes("plomero"))
      return {
        backgroundColor: "#dcfce7",
        color: "#166534",
      };
    if (tagLower.includes("electricista"))
      return {
        backgroundColor: "#fef3c7",
        color: "#92400e",
      };
    if (tagLower.includes("gasista"))
      return {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
      };
    return {
      backgroundColor: "#f3e8ff",
      color: "#6b21a8",
    };
  };

  const getStatusStyles = (status) => {
    if (status === "accepted")
      return {
        backgroundColor: "#fff",
        color: "#166534",
      };
    if (status === "rejected")
      return {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
      };
    return {
      backgroundColor: "#e5e7eb",
      color: "#4b5563",
    };
  };

  const getStatusBarColor = (status) => {
    if (status === "accepted") return "#B8F28B";
    if (status === "rejected") return "#ef4444";
    return "#3b82f6";
  };

  // Renderizar una tarjeta de trabajador
  const renderWorkerCard = (worker) => {
    const displayTag = worker.tag || (worker.tags ? worker.tags.join(", ") : "Sin etiqueta");
    const tagStyles = getTagStyles(displayTag);
    const statusStyles = getStatusStyles(worker.status);
    const statusBarColor = getStatusBarColor(worker.status);

    const cardStyles = {
      card: {
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        border: "1px solid #f3f4f6",
        transition: "all 0.3s ease",
      },
      statusBar: {
        height: "4px",
        width: "100%",
        backgroundColor: statusBarColor,
      },
      content: {
        padding: "1.25rem",
      },
      title: {
        fontSize: "1.25rem",
        fontWeight: "700",
        marginBottom: "1rem",
        color: "#1f2937",
      },
      infoContainer: {
        marginBottom: "0.75rem",
      },
      infoRow: {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "0.75rem",
        fontSize: "0.875rem",
      },
      icon: {
        color: "#6b7280",
        marginRight: "0.5rem",
        flexShrink: 0,
      },
      label: {
        fontWeight: "500",
        marginRight: "0.5rem",
        color: "#4b5563",
      },
      value: {
        color: "#6b7280",
      },
      phoneLink: {
        color: "#2563eb",
        textDecoration: "none",
      },
      tag: {
        display: "inline-block",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "500",
        ...tagStyles,
      },
      status: {
        display: "inline-block",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "500",
        ...statusStyles,
      },
      divider: {
        borderTop: "1px solid #f3f4f6",
        margin: "1rem 0",
      },
      actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.25rem",
        marginTop: "0.5rem",
      },
      button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        padding: "0.5rem",
        transition: "all 0.2s ease",
        cursor: "pointer",
        border: "none",
        background: "none",
      },
      acceptButton: {
        color: worker.status === "accepted" ? "#86efac" : "#22c55e",
      },
      rejectButton: {
        color: worker.status === "rejected" ? "#fca5a5" : "#ef4444",
      },
      deleteButton: {
        color: "#6b7280",
      },
      srOnly: {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      },
    };

    return (
      <div
        key={worker.id}
        style={cardStyles.card}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
        }}
      >
        {/* Barra superior de color según el estado */}
        <div style={cardStyles.statusBar}></div>

        <div style={cardStyles.content}>
          <h2 style={cardStyles.title}>{worker.name}</h2>

          <div style={cardStyles.infoContainer}>
            <div style={cardStyles.infoRow}>
              <AiOutlinePhone style={cardStyles.icon} />
              <span style={cardStyles.label}>Phone Number:</span>
              <a
                href={`tel:${worker.phone_number}`}
                style={cardStyles.phoneLink}
                onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                {worker.phone_number}
              </a>
            </div>

            <div style={cardStyles.infoRow}>
              <AiOutlineComment style={{ ...cardStyles.icon, marginTop: "2px" }} />
              <span style={cardStyles.label}>Opinion:</span>
              <span style={cardStyles.value}>{worker.opinion}</span>
            </div>

            <div style={cardStyles.infoRow}>
              <AiOutlineInfoCircle style={cardStyles.icon} />
              <span style={cardStyles.label}>Status:</span>
              <span style={cardStyles.status}>{worker.status}</span>
            </div>

            <div style={cardStyles.infoRow}>
              <AiOutlineTag style={cardStyles.icon} />
              <span style={cardStyles.label}>Tag:</span>
              <span style={cardStyles.tag}>{displayTag}</span>
            </div>
          </div>

          {/* Línea separadora */}
          <div style={cardStyles.divider}></div>

          {/* Botones para actualizar estado y borrar */}
          <div style={cardStyles.actions}>
            <button
              style={{
                ...cardStyles.button,
                ...cardStyles.acceptButton,
                cursor: worker.status === "accepted" ? "not-allowed" : "pointer",
              }}
              onClick={() => worker.status !== "accepted" && updateWorkerStatus(worker.id, "accepted")}
              disabled={worker.status === "accepted"}
              title="Marcar como Aceptado"
              onMouseOver={(e) => {
                if (worker.status !== "accepted") {
                  e.currentTarget.style.backgroundColor = "#f0fdf4";
                  e.currentTarget.style.color = "#15803d";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = worker.status === "accepted" ? "#86efac" : "#22c55e";
              }}
            >
              <AiOutlineCheck style={{ fontSize: "1.25rem" }} />
              <span style={cardStyles.srOnly}>Aceptar</span>
            </button>
            <button
              style={{
                ...cardStyles.button,
                ...cardStyles.rejectButton,
                cursor: worker.status === "rejected" ? "not-allowed" : "pointer",
              }}
              onClick={() => worker.status !== "rejected" && updateWorkerStatus(worker.id, "rejected")}
              disabled={worker.status === "rejected"}
              title="Marcar como Rechazado"
              onMouseOver={(e) => {
                if (worker.status !== "rejected") {
                  e.currentTarget.style.backgroundColor = "#fef2f2";
                  e.currentTarget.style.color = "#b91c1c";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = worker.status === "rejected" ? "#fca5a5" : "#ef4444";
              }}
            >
              <AiOutlineClose style={{ fontSize: "1.25rem" }} />
              <span style={cardStyles.srOnly}>Rechazar</span>
            </button>
            <button
              style={{ ...cardStyles.button, ...cardStyles.deleteButton }}
              onClick={() => deleteWorker(worker.id)}
              title="Borrar trabajador"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.color = "#4b5563";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#6b7280";
              }}
            >
              <AiOutlineDelete style={{ fontSize: "1.25rem" }} />
              <span style={cardStyles.srOnly}>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Dashboard</h1>
      </div>
      <div style={styles.content}>
        {/* Tabs */}
        <div style={styles.tabsContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "all" ? { ...styles.tabActive, ...styles.tabAll } : {}),
            }}
            onClick={() => setActiveTab("all")}
          >
            Todos
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "accepted" ? { ...styles.tabActive, ...styles.tabAccepted } : {}),
            }}
            onClick={() => setActiveTab("accepted")}
          >
            Aceptados
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "rejected" ? { ...styles.tabActive, ...styles.tabRejected } : {}),
            }}
            onClick={() => setActiveTab("rejected")}
          >
            Rechazados
          </button>
        </div>

        {/* Mostrar trabajadores según la pestaña seleccionada */}
        <div id="cards-grid" style={styles.cardsGrid}>
          {filteredCards.length > 0 ? (
            filteredCards.map((worker) => renderWorkerCard(worker))
          ) : (
            <div style={styles.noCards}>No hay trabajadores para mostrar en esta categoría.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
