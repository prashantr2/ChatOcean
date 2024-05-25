import React from 'react'
import StoryCard from "./StoryCard"; 
import cls from "./Stories.module.css";

const Stories = () => {
  return (
      <div className={cls["stories"]}>
        <StoryCard type="add" />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
        <StoryCard />
      </div>
  )
}

export default Stories