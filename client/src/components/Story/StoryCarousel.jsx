import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import cls from "./StoryCarousel.module.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./StoryCarouselExtra.css";


const StoryCarousel = ({children}) => {
    const arrowPrev = (clickHandler, hasPrev, labelPrev) => hasPrev && (
            <button className={cls["carousel-control-btn"] + " " + cls["back"]} onClick={clickHandler}>
                <ArrowBackIosNewIcon sx={{fontSize: "100%"}} /> 
            </button>
        )
    
    const arrowNext = (clickHandler, hasNext, labelNext) => hasNext && (
            <button className={cls["carousel-control-btn"] + " " + cls["next"]} onClick={clickHandler}>
                <ArrowForwardIosIcon sx={{fontSize: "100%"}} /> 
            </button>
        )
    
    return (
        <div className={cls["story-container"] + " mycarousel"}>
            <Carousel axis={'horizontal'}  className={cls["carousel"]} showThumbs={false} showArrows={true} showStatus={false} showIndicators={false}
                     renderItem={item => item} 
                     renderArrowNext={arrowNext } renderArrowPrev={arrowPrev}
                    >
            {children}
          </Carousel>
        </div>
    )
}

export default StoryCarousel