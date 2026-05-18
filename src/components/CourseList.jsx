/* eslint-disable react/prop-types */
import { CourseCard } from "./CourseCard";

export const CourseList = ({ courses, favorites, toggleFavorite }) => {
  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isFavorite={favorites.some((fav) => fav.id === course.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};