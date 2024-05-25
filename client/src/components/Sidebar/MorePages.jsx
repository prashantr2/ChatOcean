import cls from "./MorePages.module.css";
import EmailIcon from '@mui/icons-material/Email';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const MorePages = () => {
  return (
      <div className={"card-shadow category-card"}>
        <span className={"title"}>More Pages</span>
        <div className={"category"}>
            <EmailIcon sx={{fontSize:"30px"}} />
            <span className={"category-text"}>Email Box</span>
        </div>
        <div className={"category"}>
            <MapsHomeWorkIcon sx={{fontSize:"30px"}} /> 
            <span className={"category-text"}>Near Hotel</span>
        </div>
        <div className={"category"}>
            <LocationOnIcon sx={{fontSize:"30px"}} />
            <span className={"category-text"}>Latest Event </span>
        </div>
        <div className={"category"}>
            <YouTubeIcon sx={{fontSize:"30px"}} />
            <span className={"category-text"}>Live Streaming </span>
        </div>
      </div>
  )
}

export default MorePages