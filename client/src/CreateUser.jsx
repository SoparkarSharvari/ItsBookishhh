import axios from "axios";
import { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [status, setReadStatus] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/create', {name, email, age,status})
        .then(res => {
            dispatch(addUser(res.data))
            navigate('/')
        })
        .catch(err => console.log(err))
    }
  
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add a book 📚</h2>
          <div className="mb-2">
            <label htmlFor="">Book Name</label>
            <input
              type="text"
              placeholder="Enter Book Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Auther</label>
            <input
              type="text"
              placeholder="Enter Auther name"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Genre</label>
            <input
              type="text"
              placeholder="Enter Genre"
              className="form-control"
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
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
