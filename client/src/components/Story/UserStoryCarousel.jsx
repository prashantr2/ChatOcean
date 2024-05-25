import { Carousel } from 'react-responsive-carousel';
import cls from "./UserStoryCarousel.module.css";
import "./UserStoryCarouselExtra.css";

const UserStoryCarousel = ({ children }) => {
    const indicator = (clickHandler, isSelected, index, label) => (
        isSelected ? 
            <div onClick={clickHandler} className={cls["indicator"] + " " + cls["active"]} /> :
            <div onClick={clickHandler} className={cls["indicator"]} />
    )
  
  return (
        <div className={cls["story-container"] + " myuserstorycarousel"}>
            <Carousel axis="horizontal"  className={cls["carousel"]} showThumbs={false} showArrows={false} 
                    swipeable={false} showStatus={false} showIndicators={true} renderItem={item => item} 
                    renderIndicator={indicator}
                    >
            {children}
          </Carousel>
        </div>
  )
}

export default UserStoryCarousel