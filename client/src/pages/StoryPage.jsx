import React from 'react'
import StoryCarousel from "../components/Story/StoryCarousel"
import cls from "./StoryPage.module.css";
import Post from "../components/Feed/Post"
import Story from "../components/Story/Story"

const StoryPage = () => {
  return (
        <div className={cls["story-page"]}>
            <div className={cls["story-backdrop"]} />
           <div className={cls["story-wrapper"]}>
              <StoryCarousel axis={'horizontal'}>
                    <Story />
                    <Story />
                    <Story type="video" />
                    <Story />
              </StoryCarousel>
           </div>   
        </div>
  )
}

export default StoryPage