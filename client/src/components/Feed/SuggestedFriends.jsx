import {useEffect} from 'react'
import BasicInfo from '../UI/BasicInfo'
import cls from "./SuggestedFriends.module.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SectionCard from '../UI/SectionCard';
import {PF} from "../../constants/constants";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { authActions } from '../../store/auth';
import { Link } from 'react-router-dom';

const SuggestedRequest = ({ person }) => {
    return (
        <div className={cls["request"]}>
            <BasicInfo img={person.avatar} name={person.username} info={person.from} />
            <button className={cls["profile-btn"]}>
               <Link to={`/profile/${person.username}`}>
                   <KeyboardArrowRightIcon /> 
               </Link>
            </button>
        </div>
    )
}

const SuggestedFriends = () => {
  const { suggestedFriends, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();


    useEffect(() => {
        const fetchSuggestions = async() => {
            const { data: fetchedSuggestedFriends } = await axios.get('/user/suggestedFriends/' + user._id);
            dispatch(authActions.setSuggestedFriends(fetchedSuggestedFriends));
        }
        if (user) fetchSuggestions();
    }, [user])
  
    
  return (
    <SectionCard title={"Suggested Friends"} expandLinkText={"See All"}>
      {suggestedFriends?.map(person => (
          <SuggestedRequest person={person} />
      ))}
    </SectionCard>
  )
}

export default SuggestedFriends