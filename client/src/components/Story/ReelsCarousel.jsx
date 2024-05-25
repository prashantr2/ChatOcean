import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import cls from "./StoryCarousel.module.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import "./StoryCarouselExtra.css";

const ReelsCarousel = ({ children }) => {
    const reelsArrowDown = (clickHandler, hasNext, labelNext) => hasNext && (
            <button className={cls["carousel-control-btn-down"] + " " + cls["down"]} onClick={clickHandler}>
                <ArrowDownwardIcon sx={{fontSize: "100%"}} /> 
            </button>
        )

    const reelsArrowPrev = (clickHandler, hasPrev, labelPrev) => hasPrev && (
            <button className={cls["carousel-control-btn"] + " " + cls["down-back"]} onClick={clickHandler}>
            </button>
        )
        
    const indicator = (clickHandler, isSelected, index, label) => (
        isSelected ? 
            <div onClick={clickHandler} className={cls["indicator"] + " " + cls["active"]} /> :
            <div onClick={clickHandler} className={cls["indicator"]} />
    )

  return (
        <div className={cls["story-container"] + " mycarousel"}>
            <Carousel axis={'vertical'}  className={cls["carousel"]} showThumbs={false} showArrows={true} showStatus={false} showIndicators={false}
                     renderItem={item => item} renderArrowNext={reelsArrowDown} renderArrowPrev={reelsArrowPrev} renderIndicator={indicator}
                    >
            {children}
          </Carousel>
        </div>
  )
}

export default ReelsCarousel