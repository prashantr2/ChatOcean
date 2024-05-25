import { useRef } from 'react'
import { Search } from "@mui/icons-material";
import cls from "./Searchbar.module.css";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const searchRef = useRef(); 
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
   
    navigate('/profile/' + searchRef.current.value);
    searchRef.current.value = '';
    searchRef.current.blur();
  } 

  return (
      <form onSubmit={searchHandler}>
        <div className={cls["searchbar"]}>
            <button type="submit" className={cls["search-btn"]}><Search sx={{ fontSize: "20px", color: "#ccc" }} /> </button>
            <input type="text" ref={searchRef} placeholder="Search here..." />
        </div>
      </form>
  )
}

export default SearchBar