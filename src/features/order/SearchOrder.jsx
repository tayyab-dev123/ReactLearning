import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchOrder = () => {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    navigate(`/order/${search}`);
    console.log(search);
    setSearch('');
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search order #"
          className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-slate-400 focus:outline-none focus:ring-0 focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        />
      </form>
    </div>
  );
};
