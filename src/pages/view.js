import React, {useState,useEffect} from 'react'
import fireDb from "../firebase";
import { useNavigate,useParams,Link } from 'react-router-dom';
import "./view.css";
const View = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(()=>{
    fireDb.child(`crudOperations/${id}`).get().then((snapshot)=>{
      if(snapshot.exists()){
        setUser({...snapshot.val()});
      }
      else{
        setUser({});
      }
    }); 
  },[id]);
  console.log("User",user);
  return (
    <div style={{marginTop:"150px"}}>
    <div className='card'>
      <div className='card-header'>
        <p>User Details</p>
      </div>
      <div className='container'>
        <strong>ID:</strong>
        <span>{id}</span>
        <br/>
        <br/>
        <strong>Name:</strong>
        <sapn>{user.name}</sapn>
        <br/>
        <br/>
        <strong>Email:</strong>
        <sapn>{user.email}</sapn>
        <br/>
        <br/>
        <strong>Age:</strong>
        <sapn>{user.age}</sapn>
        <br/>
        <br/>
        <strong>City:</strong>
        <sapn>{user.city}</sapn>
        <br/>
        <br/>
        <strong>Gender:</strong>
        <sapn>{user.gender}</sapn>
        <br/>
        <br/>
      <Link to="/">    
      <button className='btn btn-edit'>Go Back</button>
      </Link>   
      </div>
    </div>
  </div>
  )
}

export default View;
