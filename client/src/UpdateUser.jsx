import axios from "axios";
import { useEffect, useState } from "react";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const {id} = useParams()
   
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [status, setReadStatus] = useState();
    const users = useSelector(state => state.users.users)
    
    useEffect(()=> {
        const user = users.find(u => u.id === id)
        setName(user.name)
        setEmail(user.email)
        setAge(user.age)
        setReadStatus(user.status)
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/update/'+id, {name, email, age,status})
        .then(res => {
            dispatch(updateUser({id, name, email, age,status}))
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update the TBR</h2>
          <div className="mb-2">
            <label htmlFor="">Book Name</label>
            <input
              type="text"
              placeholder="Enter Book Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Auther </label>
            <input
              type="text"
              placeholder="Enter Auther name"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Genre</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <input
          type="text"
          placeholder="Read or To be Read"
          className="form-control"
          onChange={(e)=>setReadStatus(e.target.value)}
        />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
     );
}

export default UpdateUser;