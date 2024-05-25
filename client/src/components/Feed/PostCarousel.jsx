import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cls from "./PostCarousel.module.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./PostCarouselExtra.css";

const PostCarousel = ({ children, className }) => {
    const classes = className + " " + cls["carousel"] + " mypostcarousel";
    const itemsCount = children.length || 1;
    
    const arrowPrev = (clickHandler, hasPrev, labelPrev) => hasPrev && (
            <button className={cls["carousel-control-btn"] + " " + cls["back"]} onClick={clickHandler}>
                <ArrowBackIosNewIcon sx={{fontSize: "25px"}} /> 
            </button>
        )
    
    const arrowNext = (clickHandler, hasNext, labelNext) => hasNext && (
            <button className={cls["carousel-control-btn"] + " " + cls["next"]} onClick={clickHandler}>
                <ArrowForwardIosIcon sx={{fontSize: "25px"}} /> 
            </button>
        )
    
    const indicator = (clickHandler, isSelected, index, label) => (
        isSelected ? 
            <div onClick={clickHandler} className={cls["indicator"] + " " + cls["active"]} /> :
            <div onClick={clickHandler} className={cls["indicator"]} />
    )
    

  return (
        <Carousel className={classes} showThumbs={false} showArrows={itemsCount === 1 ? false: true} showStatus={false} 
                showIndicators={itemsCount === 1 ? false: true} renderItem={item => item} renderArrowPrev={arrowPrev} 
                renderArrowNext={arrowNext} renderIndicator={indicator}
                >
                {children}
      </Carousel>
  )
}

export default PostCarousel