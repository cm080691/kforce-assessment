import React from 'react';
import {
  useParams
} from "react-router-dom";

const FilmCardDetails = ({currentWindowData}) => {
  let { id } = useParams();
  
  // find the template that matches the id
  let template = currentWindowData.find((item) => item.id === id);

  // if the template is not found, use the first template in the current window
  if (!template) {
    template = currentWindowData[0];
  }


  console.log(template);
  // destructure the template object
  const { title, description, cost, image } = template;

  
  return (
    <div id="large">
    <div className="group">
      <img src={require(`./../assets/images/large/${image}`)} alt="Large Image" width="430" height="360" />
      <div className="details">
        <p><strong>Title</strong> {title}</p>
        <p><strong>Description</strong> {description}</p>
        <p><strong>Cost</strong> {cost}</p>
        <p><strong>ID #</strong> {id}</p>
        <p><strong>Thumbnail File</strong> {`${id}-m.jpg`}</p>
        <p><strong>Large Image File</strong> {`${id}-b.jpg`}</p>
      </div>
    </div>
  </div>
  )
}

export default FilmCardDetails