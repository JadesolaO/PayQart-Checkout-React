import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import upload from '../images/upload.svg';
import { uploadDocument, successToast } from '../services/creditFormService';
import '../stylesheets/scss/fileupload.scss';

const FileUpload = ({ uploadObj, documentStatus, handleDocStatus }) => {

  console.log(documentStatus[uploadObj.statusField]);
  const [inputFile, setInputFile] = useState(null);
 
  useEffect(() => {
    setInputFile(document.getElementById("actual-btn"));
  }, []);

  const handleClick = (event) => {
    console.log('Clicked!');
    event = event || window.event;
    if(event.target.id === 'displayed-btn'){
        inputFile?.click();
    }
  };

  const handleChange = event => {
    console.log('On Change Activated!');
    if (!event.target.files && !event.target.files[0])
      return;

    console.log(event.target.files);

    // HTML5 FileReader API
    let reader = new FileReader();
    reader.onload = (e) => {
      saveDocument(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const saveDocument = async (file) => {

    const myDoc = { [uploadObj.statusField]: 1, [uploadObj.name]: file };
    await uploadDocument(myDoc)
    .then(res => {
      successToast(res.data);
      handleDocStatus({...documentStatus, [uploadObj.statusField]: 1 });
    })
    .catch(() => {});
  }

  return (
    <form>
      <div className="fileUpload text-center">
        <p><strong>{uploadObj.label}</strong></p>
        <input type="file" id="actual-btn" hidden onChange={handleChange} />
        <label className='lablef' for="actual-btn" id="displayed-btn" onClick={handleClick}><Image fluid src={upload} />  Upload</label>
      </div>
    </form>
  )
}

export default FileUpload
