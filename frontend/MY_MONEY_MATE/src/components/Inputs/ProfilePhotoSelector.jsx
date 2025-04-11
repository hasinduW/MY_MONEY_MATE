import React, { useRef, useState } from 'react';
import{LuUser, LuUpload, LuTrash }from "react-icons/lu";
 
const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef =useRef(null);
    const [previewUrl, setPreviewUrl] =useState(null);


    const handleImageChange =(event) =>{
        //console.log("Event Triggered:", event);  // <-- Add this line
        const file = event.target.files[0];
        //console.log("Selected File:", file);  // <-- Add this line
        if(file) {
     //update the image state
     setImage(file);

     //generate preview URL from the file
     const preview = URL.createObjectURL(file);
     setPreviewUrl(preview);

        }
    };

    const handleRemoveImage =() => {
        setImage(null);
        setPreviewUrl(null);

    };
    
    const onChooseFile = ()  => {
        inputRef.current.click();
    };



  return <div className="flex justify-center mb-6">
        <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden" //if unhidden show "choose file no file chosen" 
        />
      
{!image ? (
    <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounde-full relative">
      <LuUser className="text-4xl text-primary" />
    
      <button
      type="button"
      className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1" 
      onClick={onChooseFile}
       >

      <LuUpload />
       </button>
    </div>

  ) : (
    <div className="relative">
        <img
        src={previewUrl}
        alt="profile photo"
        className="w-20 h-20 rounded-full object-cover"
    />
    
    <button
    type="button"
    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
    onClick={handleRemoveImage}
    >
        <LuTrash />
        </button>
        </div>
      )}

</div>;
};



export default ProfilePhotoSelector;
