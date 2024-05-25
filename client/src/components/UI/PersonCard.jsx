import React from 'react'
import BasicInfo from './BasicInfo';
import cls from "./PersonCard.module.css";
import { Link } from 'react-router-dom';

const PersonCard = ({ person, followersCount, followingsCount }) => {
   const fullName = (person.firstName || '') + ' ' + (person.lastName || '');

  return (
    <Link to={`/profile/${person.username}`}  className={cls["person-card"] + " card-shadow linkStyles"}>
        <BasicInfo img={person.avatar} name={fullName !== ' ' ? fullName : (person.username)} info={'@'+ person.username} />
        <div className={cls["info"]}>
            <span className="follower-info">{followersCount || 0} followers</span> 
            <span className="following-info">{followingsCount || 0} following</span> 
        </div>
    </Link>
  )
}

export default PersonCard