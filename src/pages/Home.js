import React, { useState, useEffect } from "react";
import firedb from "../firebase";
// import {collection} from "firebase/firestore"

import { Link } from "react-router-dom";
import "./Home.css";
import { DataSnapshot } from "firebase/database";
import { toast } from "react-toastify";
const Home = () => {
  const [data, setData] = useState({});
  //  const db=getFirestore();
  useEffect(() => {
    firedb.child("crudOperations").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);
 const onDelete=(id)=>{
  if(window.confirm("Are you sure that you wanted to delete this record ?")){
    firedb.child(`crudOperations/${id}`).remove((err)=>{
      if(err){
       toast.error(err);
      }else{
        toast.success("Record Deleted Successfully");
      }
    })
  }
 }
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email-id</th>
            <th style={{ textAlign: "center" }}>Age</th>
            <th style={{ textAlign: "center" }}>City</th>
            <th style={{ textAlign: "center" }}>Gender</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].age}</td>
                <td>{data[id].city}</td>
                <td>{data[id].gender}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button className="btn btn-delete"
                    onClick={()=>onDelete(id)}
                    >
                      Delete
                    </button>
                     <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                     </Link>
                   
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
