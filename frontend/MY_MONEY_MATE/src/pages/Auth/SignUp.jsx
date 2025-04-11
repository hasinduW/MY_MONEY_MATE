import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState (null);
  const[fullName,setFullName] = useState ("");
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[error, setError] = useState(null);
  
  const{updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  //Handle SignUp Form submit
  const handleSignUp =async (e) => {
    e.preventDefault();

    let profileImageUrl ="";

    //validation 
    if (!fullName){
      setError("please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("please enter a valid email address.");
      return;
    }

    if(!password){
      setError("please enter the parssword");
      return;
    }

    setError("");

    //SignUp API call
    
try {
  //Upload image if present
  if(profilePic){
    //console.log("Uploading Image:", profilePic);  // <-- Add this line
    const imgUploadsRes = await uploadImage(profilePic);
   // console.log("Upload Response:", imgUploadsRes);  // <-- Add this line
    profileImageUrl = imgUploadsRes.imageUrl || "";
  }

  const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      fullName,
      email,
      password,
      profileImageUrl
    });

   const { token, user } = response.data;

   if (token) {
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
   }
    } catch (error) {
   if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
  }
 }
  }


  return (
    <Authlayout>
     <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
      <h3 className="text-xl font-semibold text-black ">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by enter your details below.
      </p>


<form onSubmit={handleSignUp}>

  <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input
    value={fullName}
    onChange={({ target }) => setFullName(target.value)}
    label="Full Name"
    placeholder="Rushani Randeni"
    type="text"
    />

<Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email Address"
        placeholder="ruu@example.com"
        type="text"

        />

      <div className="col-span-2">
        <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 Characters"
        type="password"

        />

        </div>


  </div>

  
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
  
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
  
          <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" to ="/login">
          Login
          </Link>
          </p>


</form>

     </div>
    </Authlayout>
  )
}

export default SignUp
