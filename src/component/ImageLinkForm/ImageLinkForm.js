import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div>
         <p className='f3 white'>{'This Magic brain will detect your face. Give it a try'}</p>
         <div className='center'>
          <div className='center form br3 shadow-5 pa4'>
           <input className='center w-70 pa2 f4' type='text' onChange={onInputChange}/>
           <button className='w-30 link f4 grow black bg-light-green ph3 pv2 dib' 
                   onClick={onButtonSubmit}>Detect</button>
          </div>
         </div>
        </div>
    )
}

export default ImageLinkForm;
