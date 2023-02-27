import React from 'react'
import { NavLink } from 'react-router-dom';


const FilmCard = (props) => {
  const { title, thumbnail, id } = props;

  return (
    <NavLink to={`/templates/${id}`} key={id}>
        <img src={require(`./../assets/images/thumbnails/${thumbnail}`)} alt={title} />
        <span>{id}</span>
    </NavLink>
  )
}

export default FilmCard