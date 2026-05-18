/* eslint-disable react/prop-types */
export const SearchBar = ({ searchTerm, setSearchTerm, selectedTeacher, setSelectedTeacher, uniqueTeachers }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar cursos por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <select 
        value={selectedTeacher} 
        onChange={(e) => setSelectedTeacher(e.target.value)}
        className="teacher-select"
      >
        <option value="">Todos los docentes</option>
        {uniqueTeachers.map(id => (
          <option key={id} value={id}>Docente ID: {id}</option>
        ))}
      </select>
    </div>
  );
};