import React from 'react'
import cls from "./Stories.module.css";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import StoryCard from '../components/Feed/StoryCard';

const Stories= () => {
  return (
      <div className={cls["stories-page"]}>
        <nav className={cls["stories-nav"]}>
            <span className={cls["nav-title"]}>Stories</span> 
            <div className={cls["nav-actions"]}>
                <div className={cls["input-wrapper"]}>
                    <input placeholder='Search Here...' className={cls["input"]} type="text" />
                    <SearchIcon className={cls["search-btn"]} sx={{ fontSize: "25px"}} />
                </div>
                    <button className={cls["filter-btn"]}>
                    <FilterAltIcon sx={{ fontSize: "25px" }} /> 
                </button>
            </div>
        </nav>
        <div className={cls["stories"]}>
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
            <StoryCard className={cls["story-card-extra"]} />
        </div>
      </div>
  )
}

export default Stories