/* eslint-disable react/prop-types */
export const CourseCard = ({ course, isFavorite, toggleFavorite }) => {
  return (
    <div className={`course-card ${isFavorite ? "favorite" : ""}`}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <span className="teacher-id">Docente ID: {course.teacherId}</span>
      <button onClick={() => toggleFavorite(course)}>
        {isFavorite ? "❌ Quitar de favoritos" : "⭐ Añadir a favoritos"}
      </button>
    </div>
  );
};