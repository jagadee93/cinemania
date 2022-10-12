import React from 'react'
import axios, { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
function Profile(props) {
  const Navigate=useNavigate();
  const {auth}=useAuth();
  const params=useParams();

  console.log(params.id)
  if (!params.id===undefined) {
    Navigate('/login')
  }
 
  if (!auth.user) Navigate('/login');
  const Auth=auth?.accessToken

    const response =axiosPrivate.get(`/users/${params.id}`,{
              'Authorization':`Bearer ${Auth}`
            });
    console.log(response.data)

  return (

    <div>
      <h1>ijfefii</h1>
    </div>
  )
}
export default Profile