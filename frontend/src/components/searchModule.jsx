import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModule = ({ closeSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

const handleSearch = async (e) => {
  if (e.key === 'Enter' && searchTerm.trim()) {
    try {
      const res = await fetch(`http://localhost:5000/api/products/search?q=${searchTerm}`);
      if (res.status === 404) {
        setNotFound(true);
      } else {
        const product = await res.json();
        closeSearch(); // close the search modal
        navigate(`/product/${product._id}`); // redirect directly
      }
    } catch (err) {
      console.error("Search failed:", err);
      setNotFound(true);
    }
  }
};


  return (
    <div className="w-11/12 md:w-6/12 text-white" onClick={(e) => e.stopPropagation()}>
      {/* Search Input */}
      <div className="flex items-center relative mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute left-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <line x1="16" y1="16" x2="20" y2="20" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Type product name and press Enter"
          className="bg-transparent border-b border-gray-500 pl-12 pr-4 py-2 w-full text-2xl rounded-lg shadow-2xl text-white outline-none"
        />
      </div>

      {/* Search Result */}
      {notFound ? (
        <div className="text-center text-red-400 text-lg">No product found</div>
      ) : result ? (
        <div
          onClick={() => {
            navigate(`/product/${result._id}`);
            closeSearch();
          }}
          className="cursor-pointer bg-white text-black rounded-lg shadow-lg p-4 flex gap-4 items-center hover:shadow-2xl transition"
        >
          
          <img
            src={result.images}
            alt={result.name}
            className="w-24 h-24 object-cover rounded-md"
          />
          <div>
            <h2 className="text-xl font-semibold">{result.name}</h2>
            <p className="text-sm text-gray-600">{result.description?.slice(0, 100)}...</p>
            <p className="mt-1 font-bold text-[#ec0b43]">₹{result.price}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchModule;
