import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom';
import "./AddEdit.css";
import fireDb from '../firebase'
import {toast} from "react-toastify";
const initialState={
  name:"",
  email:"",
  age:"",
  gender:"",
  city:""
}

const AddEdit = () => {
  const [state,setState]=useState(initialState);
  
  const [data,setData]=useState({});

  const {name,email,age,gender,city}=state;
 
  // console.log(name);
  // console.log(gender);
  const navigate=useNavigate();
  const {id}=useParams();
  useEffect(() => { 
    fireDb.child("crudOperations").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({}); 
    };
  }, [id]);
  useEffect(()=>{
    if(id){
       setState({...data[id]})
    }else{
      setState({...initialState})
    }
  },[id,data])
  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setState({...state,[name]:value});
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !age  ||!gender || !city){
      toast.error("Please provide value in each input field")
    }else{
    if(!id){
      fireDb.child("crudOperations").push(state,(err)=>{
        if(err){
          toast.error(err);
        }else{
          toast.success("Record added Successfully");
        }
       });
    }else{
      fireDb.child(`crudOperations/${id}`).set(state,(err)=>{
        if(err){
          toast.error(err);
        }else{
          toast.success("Record Updated Successfully");
        }
       });
    }
       setTimeout(()=>navigate("/"),1000);
    }
  };
  return (
    <div style={{marginTop:"100px"}}>
      <form
       style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center"
       }}
       onSubmit={handleSubmit}
       >
        <label htmlFor="name"style={{fontSize:"20px"}}>Name</label>
        <br/>
        <input
        type="text"
        id="name"
        name="name"
        placeholder='Your name....'
        value={name||""}
        size="50"
        width="40"
        autoComplete='off'
        onChange={handleInputChange}
        />
        <br/>
        <label htmlFor="email"style={{fontSize:"20px"}}>Email</label>
        <br/>
        <input
        type="email"
        id="email"
        name="email"
        placeholder='Your Email....'
        value={email || ""}
        autoComplete='off'
        onChange={handleInputChange}
        />
        <br/>
           <label htmlFor="age"style={{fontSize:"20px"}}>Age</label>
          <br/>
        <input
        type="number"
        id="age"
        name="age"
        placeholder='Your age....'
        value={age||""}
        onChange={handleInputChange}
        />
        <br/>
        <label htmlFor="city"style={{fontSize:"20px"}}>City</label>
        <br/>
        <input
        type="text"
        id="city"
        name="city"
        placeholder='Your City....'
        value={city ||""}
        onChange={handleInputChange}
        />
        <label htmlFor="gender"style={{fontSize:"20px"}}>Gender</label>
        <br/>
        <input
        type="select"
        id="gender"
        name="gender"
        placeholder='Your gender....'
        value={gender||""}
        onChange={handleInputChange}
        />
        <br/>
        
        <input type='submit' value={id ? "Update":"Save"}style={{fontSize:"20px"}}/>
       </form>
     
    </div>
  )
}

export default AddEdit ;