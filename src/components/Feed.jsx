import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Feed = () => {

  

  const feed=useSelector((store)=>store.feed)
  const dispatch=useDispatch()


  const getFeed= async ()=>{
   
    try{
    const res=await axios.get(BASE_URL+"/user/feed",{withCredentials:true})
    
    dispatch(addFeed(res?.data?.data))
    }catch(err){
      

    }
  }

  useEffect(()=>{
    getFeed()
  },[])

  if (!feed) return;
  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && <div className='flex justify-center my-10'>
      <UserCard user={feed[0]} />
      </div>
  )
}

export default Feed