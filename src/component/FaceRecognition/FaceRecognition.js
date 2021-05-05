import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgurl,box}) =>{
    return(
        <div className='ma center'>
          <div className='absolute mt2'>
            <img id="imageinput" src={imgurl} alt='' width='500px' height='auto'/>
            <div className='bounding-box' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
          </div>
        </div>
    )
}

export default FaceRecognition;