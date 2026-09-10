import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../useReducers/useReducers'
import "./update.css"

export default function Update() {
    let {id} = useParams()
    let users = useSelector((state) => state.users)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const existUser = users.find((u) => u.id == id)
    let [utask, setTask] = useState(existUser ? existUser.task : "")
    let [unotes, setNotes] = useState(existUser ? existUser.notes : "")

    function handleSubmit(e) {
        e.preventDefault()

        if (unotes === "") {
            dispatch(updateUser({id, task: utask , notes: "-"}))
        }else{
            dispatch(updateUser({id, task: utask , notes: unotes}))
        }
        navigate("/home")
    }

  return (
    <div className='Update d-flex align-items-center justify-content-center'>
        <div className="container p-5" data-aos="zoom-out">
            <h2 className='text-center'>To-do List App <span style={{ textTransform: "lowercase" , fontSize: "20px" }}>for girls</span> <span style={{ color: "#276cb6" }}>❀</span> Update Section</h2>
            <form onSubmit={handleSubmit} className='form my-4'>
              <input type="text" id="inputTasku" className="form-control p-3" placeholder='Task' value={utask} onChange={(e)=>setTask(e.target.value)}/>  
              <input type="text" id="inputNotesu" className="form-control p-3" placeholder='Notes' value={unotes} onChange={(e)=>setNotes(e.target.value)}/>  
              <button type="submit" className='Up btn btn-dark'>Update Task</button>
            </form>
        </div>
    </div>
  )
}
