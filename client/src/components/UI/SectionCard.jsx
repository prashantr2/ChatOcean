import React from 'react'
import cls from "./SectionCard.module.css";
import Divider from './Divider'

const SectionCard = ({ className, children, title, expandLinkText, type }) => {
  const classes = className + " " +  cls["section-card"] + " card-shadow";
  const classesMini = className + " " + cls['section-card-mini'] + ' card-shadow';

  let card = null;
  if (type === 'mini'){
    card = (<div className={classesMini}>
              {/* <div className={cls["section-top-mini"]}>
                <span className={cls["section-top-text-mini"]}>{title}</span>
                <a href="#" className={cls["section-top-link-mini"]}>{expandLinkText} </a>
              </div>
              <Divider className={cls["section-divider-mini"]} /> */}
              <div className={cls["section-container-mini"]}>
                {children}
              </div>
           </div> )
  } else {
    card = (<div className={classes}>
          <div className={cls["section-top"]}>
            <span className={cls["section-top-text"]}>{title}</span>
            {/* <a href="#" className={cls["section-top-link"]}>{expandLinkText} </a> */}
          </div>
          <Divider />
          <div className={cls["section-container"]}>
            {children}
          </div>
       </div> )
  }

  return ( card )
}

export default SectionCard