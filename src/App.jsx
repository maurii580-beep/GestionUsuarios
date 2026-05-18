import { useState, useEffect } from "react";
import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { CourseList } from "./components/CourseList";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleFavorite = (course) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === course.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== course.id));
    } else {
      setFavorites([...favorites, course]);
    }
  };

  const uniqueTeachers = [...new Set(courses.map(course => course.teacherId))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeacher = selectedTeacher === "" || course.teacherId.toString() === selectedTeacher;
    return matchesSearch && matchesTeacher;
  });

  const favoritesPerTeacher = favorites.reduce((contador, course) => {
    contador[course.teacherId] = (contador[course.teacherId] || 0) + 1;
    return contador;
  }, {});

  return (
    <div className="app-container">
      <Header />
      
      <div className="theme-toggle">
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "☀️ Cambiar a Modo Claro" : "🌙 Cambiar a Modo Oscuro"}
        </button>
      </div>

      <main>
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          uniqueTeachers={uniqueTeachers}
        />
        
        {Object.keys(favoritesPerTeacher).length > 0 && (
          <section className="stats-section">
            <h3>📊 Favoritos por Docente</h3>
            <ul className="stats-list">
              {Object.entries(favoritesPerTeacher).map(([teacherId, count]) => (
                <li key={teacherId}>
                  Docente <strong>{teacherId}</strong>: {count} curso(s)
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="favorites-section">
          <h2>Mis Favoritos ⭐ ({favorites.length})</h2>
          {favorites.length > 0 ? (
            <CourseList 
              courses={favorites} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          ) : (
            <p className="no-results">Aún no tienes cursos favoritos.</p>
          )}
        </section>

        <hr />

        <section className="all-courses-section">
          <h2>Todos los Cursos 📚</h2>
          {loading && <p>Cargando cursos...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <CourseList 
              courses={filteredCourses} 
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;