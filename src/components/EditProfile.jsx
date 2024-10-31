import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import axios from 'axios'

const EditProfile = ({user}) => {


    const [firstName,setFirstName]=useState(user.firstName)
    const [lastName,setLastName]=useState(user.lastName)
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
    const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
    const [error,setError]=useState('')
    const [showToast,setShowToast]=useState(false)
     const[check,setCheck]=useState(false)

    const dispatch=useDispatch()

    

    const saveProfile = async()=>{
        setError("")
        try{
           const res= await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,photoUrl,age,gender,about},{withCredentials:true})
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
            },3000)

            
            
        }
        catch(err){
            setError(err.response.data)
        }
    }

    
    const navigate=useNavigate()
  return (
    <>
    <div className='flex justify-center my-10'>
    <div className='flex justify-center mx-10'>
    <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>
        
        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">First Name</span>
               
            </div>
            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            
            </label>
        
        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">Last Name</span>
               
            </div>
            <input  value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            
            </label>
            <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">Photo Url</span>
               
            </div>
            <input  value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            
            </label>
            <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">Age</span>
               
            </div>
            <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            
            </label>
            <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">Gender</span>
               
            </div>
            <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            
            </label>
            <label className="form-control w-full max-w-xs my-2">
            <div className="label">
                <span className="label-text">About</span>
               
            </div>
            <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            
            </label>
        
        <p className='text-red-500'>{error}</p>
        <div className="card-actions justify-center m-2">
        <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
        </div>
        </div>
    </div>
    </div>
    <UserCard user={{firstName,lastName,photoUrl,age,gender,about,check}}/>

    </div>
    {showToast && <div className="toast toast-top toast-center">
  
  <div className="alert alert-success">
    <span>Profile saved succesfully.</span>
  </div>
</div>}
    </>
  )
}

export default EditProfile