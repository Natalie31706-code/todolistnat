import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './home.css'
import { addUser, deleteUser , toggleComplete /*⬅️ added toggle handler*/ } from '../useReducers/useReducers'
import swal from 'sweetalert';

export default function Home() {
    let [task, setTask] = useState('')
    let [notes, setNotes] = useState('')

    let users = useSelector((state) => state.users)
    let dispatch = useDispatch()
    console.log(users)

    function handleSubmit(e) {
      e.preventDefault();

      let newId = users.length ? users[users.length - 1].id + 1 : 1;
        
      if(task === ""){
        alert("please enter your task")
        return
      }

      if (notes === "") {
        dispatch(addUser({id : newId, task, notes: "-"}))
      }else{
        dispatch(addUser({id : newId, task, notes}))
      }

      setTask(''); //⬅️ clear after submit
      setNotes('');
    }

    function handleDelete(id){
      dispatch(deleteUser({id: id}))
    }

    function handleToggleY(id) { // ⬅️ added toggle handler
      dispatch(toggleComplete({id}))
      swal({
      title: "Good job!",
      text: "keep it Up!",
      icon: "success",
      button: "close",
      });
    }

    function handleToggleN(id) { // ⬅️ added toggle handler
      dispatch(toggleComplete({id}))
    }

  return (
    <div className='Home d-flex align-items-center justify-content-center'>
        <div className="container p-5" data-aos="zoom-out">
            <h2 className='text-center'>To-do List App <span style={{ textTransform: "lowercase" , fontSize: "20px" }}>for girls</span> <span style={{ color: "#276cb6" }}>❀</span></h2>
            <form onSubmit={handleSubmit} className='my-4 d-flex gap-3'>
              <input type="text" id="inputTask" className="form-control p-3" placeholder='Task' value={task} onChange={(e)=>setTask(e.target.value)}/>  
              <input type="text" id="inputNotes" className="form-control p-3" placeholder='Notes' value={notes} onChange={(e)=>setNotes(e.target.value)}/>  
              <button type="submit" className='btn btn-dark'>Add New Task</button>
            </form>
            
          <div className='d-flex align-items-center justify-content-center'>
            <div className='line'>
              <h3 className='d-flex align-items-center'><i className="fa-solid fa-hourglass-half me-2" style={{ color: "#efc040ff" }}></i>Pending Tasks</h3>
            </div>
          </div>

            <table className="table table-success table-striped text-center">
              <thead>
                <tr>
                    {/* <th scope="col"></th> */}
                    <th scope="col">Task</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Check</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.filter(u => !u.completed).map((u) => ( // ⬅️ filter pending only
                <tr key={u.id}>
                    {/* <td>{u.id}</td> */}
                    <td>{u.task}</td>
                    <td>{u.notes}</td>
                    <td><button onClick={() => handleToggleY(u.id)} /*⬅️ added toggle handler*/ className='btn btn-light'><i className="fa-solid fa-check" style={{ color: "#88bb65ff" }}></i></button></td>
                    <td><Link to={`/update/${u.id}`} className='btn btn-primary'>Update</Link></td>
                    <td><button onClick={()=> handleDelete(u.id)} className='btn btn-danger'>Delete</button></td>
                </tr>
                ))}
            </tbody>
            </table>


          <div className='d-flex align-items-center justify-content-center'>
            <div className='line'>
              <h3 className='d-flex align-items-center'><i className="fa-solid fa-square-check me-2" style={{ color: "#88bb65ff" }}></i>Completed Tasks</h3>
            </div>
          </div>
            
            <table className="table table-success table-striped text-center">
              <thead>
                <tr>
                    {/* <th scope="col"></th> */}
                    <th scope="col">Task</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Uncheck</th>
                </tr>
            </thead>
            <tbody>
                {users.filter(u => u.completed).map((u) => ( // ⬅️ filter completed only
                <tr key={u.id}>
                    {/* <td>{u.id}</td> */}
                    <td>{u.task}</td>
                    <td>{u.notes}</td>
                    <td><button onClick={() => handleToggleN(u.id)} className='btn btn-light'><i className="fa-solid fa-xmark" style={{ color: "#f36565ff" }}></i></button></td> {/* ⬅️ added toggle handler */}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}
