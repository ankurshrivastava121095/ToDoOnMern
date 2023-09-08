/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Loading from '../Frontend/Components/Loading'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()

    const field = {
        task: ''
    }

    const itemPerPage = 3

    const [searchTask, setSearchTask] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [task, setTask] = useState(field)
    const [taskID, setTaskID] = useState()
    const [data, seData] = useState([])
    const [loading, setLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    const [message, setMessage] = useState()

    const filteredTask = data.filter((item) => 
        item?.task?.toLowerCase().includes(searchTask?.toLowerCase())
    )

    const startIndex = (currentPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const displayData = filteredTask?.slice(startIndex, endIndex)

    const fetchAllToDo = () => {
        fetch('http://localhost:3010/api/show-task')
        .then((res)=>res.json())
        .then((data)=>{
            seData(data?.data)
        })
        .catch((err)=>console.log(err))
    }

    const handleInput = (e) => {
        setTask({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(data);
        setLoading(true)

        try{
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            }

            if (!isUpdating) {
                fetch('http://localhost:3010/api/store-task',options)
                .then((res) => res.json())
                .then((data)=>{
                    // console.log('Data---->>',data);
                    if (data.status == 201) {
                        setLoading(false)
                        setMessage(data?.message)
                        setShowMessage(true)
                        fetchAllToDo()
                        setTask({...task, task: ''})
                    }else{
                        setLoading(false)
                        setMessage(data?.message)
                        setShowMessage(true)
                    }
                })
                .catch((err)=>console.log(err)) 
            } else {
                fetch(`http://localhost:3010/api/update-task/${taskID}`,options)
                .then((res) => res.json())
                .then((data)=>{
                    // console.log('Data---->>',data);
                    if (data.status == 201) {
                        setLoading(false)
                        setMessage(data?.message)
                        setShowMessage(true)
                        fetchAllToDo()
                        setTask({...task, task: ''})
                        setIsUpdating(false)
                    }else{
                        setLoading(false)
                        setMessage(data?.message)
                        setShowMessage(true)
                    }
                })
                .catch((err)=>console.log(err))
            }
            
        }catch(err){
            console.log(err);
        }
    }

    const handleEdit = (id) => {
        setTaskID(id)
        fetch(`http://localhost:3010/api/view-task/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setIsUpdating(true)
            setTask({
                ...task,
                task: data?.data?.task
            })
        })
        .catch((err)=>console.log(err))
    }

    const handleDelete = (id) => {
        setTaskID(id)
        setLoading(true)

        fetch(`http://localhost:3010/api/delete-task/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            if (data.status === 201) {
                fetchAllToDo()
                setLoading(false)
                setMessage(data?.message)
                setShowDeleteMessage(true)
            }
        })
        .catch((err)=>console.log(err))
    }

    const restoreInput = () => {
        setIsUpdating(false)
        setTask({
            ...task,
            task: ''
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userDetail')

        navigate('/')
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if (token) {
            fetchAllToDo()
        } else {
            navigate('/')
        }
    },[])
    

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 text-white">
                    <button onClick={handleLogout} className='btn btn-dark-custom text-white float-end my-4'><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
                        <center>
                            <h1 className='my-5 toDoHeading'>To Do's</h1>
                        </center>

                        <label htmlFor="searchTask">Search Task</label>
                        <input 
                            type="text" 
                            className='form-control addTaskInput mb-5' 
                            name='searchTask' 
                            id='searchTask'
                            value={searchTask}
                            placeholder='Search Task'
                            onChange={(e) => setSearchTask(e.target.value)}
                        />
                        {
                            showDeleteMessage &&
                            <><center><span className={`text-white`}>{message}</span></center></>
                        }
                        {
                            Array.isArray(displayData) && displayData?.map((val,key)=>(
                                <div className='toDoListDiv mb-4' key={key}>
                                    <span>{val?.task}</span>
                                    <div className='d-flex gap-3'>
                                        <i onClick={()=>handleDelete(val?._id)} role='button' className="fa-solid fa-circle-xmark"></i>
                                        <i onClick={()=>handleEdit(val?._id)} role='button' className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                </div>
                            ))
                        }
                        
                        <div className='paginationButton'>
                            <button className='btn btn-dark-custom text-white' onClick={()=> setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><i className="fa-solid fa-arrow-left"></i></button>
                            <button 
                                className='btn btn-dark-custom text-white' 
                                onClick={() => {
                                    if(endIndex < data?.length){
                                        setCurrentPage(currentPage + 1)
                                    }
                                }} 
                            disabled={endIndex >= data?.length}><i className="fa-solid fa-arrow-right"></i></button>
                        </div>


                        <form onSubmit={handleSubmit}>
                            <div className='border border-white p-4 rounded mt-5'>
                                {
                                    isUpdating &&
                                    <i role='button' onClick={restoreInput} className="fa-solid fa-circle-xmark float-end mb-4"></i>
                                }
                                <div className="mb-3">
                                    <label htmlFor="task">{isUpdating ? 'Edit' : 'New'} Task</label>
                                    <input 
                                        type="text" 
                                        className='form-control addTaskInput' 
                                        name='task' 
                                        id='task'
                                        value={task?.task} 
                                        placeholder='Add New Task'
                                        onChange={handleInput} 
                                    />
                                </div>
                                {
                                    showMessage &&
                                    <><center><span className={`text-white`}>{message}</span></center></>
                                }
                                {
                                    !loading ? 
                                        <>
                                            {
                                                !isUpdating ?
                                                    <button type='submit' className='btn btn-dark-custom text-white fs-4 w-100'><i className="fa-solid fa-plus"></i></button>
                                                :
                                                    <button type='submit' className='btn btn-dark-custom text-white fs-4 w-100'><i className="fa-solid fa-check"></i></button>
                                            }
                                        </>
                                    :
                                        <Loading />
                                }
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard