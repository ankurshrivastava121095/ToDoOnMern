/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Components/Loading'

const SignUp = () => {

    const navigate = useNavigate()

    const fields= {
        name: '',
        fatherName: '',
        email: '',
        mobile: '',
        password: '',
    }

    const [data, setData] = useState(fields)
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState()

    const handleInput = (e) => {
        setData({
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
                body: JSON.stringify(data)
            }
            fetch('http://localhost:3010/api/register',options)
                .then((res) => res.json())
                .then((data)=>{
                    if (data.status == 201) {
                        setLoading(false)
                        setMessage(data?.message)
                        setShowMessage(true)
                    }
                })
                .catch((err)=>console.log(err))
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if (token) {
            navigate('/dashboard')
        }
    },[])

    return (
        <>
             <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className='form-body'>
                            <div className='form-body-child'>
                                <h1 className='text-center text-white'>Sign Up</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <label className='text-white' htmlFor="name">Name</label>
                                        <input 
                                            type="text" 
                                            name='name' 
                                            id='name' 
                                            value={data?.name}
                                            className='form-control' 
                                            placeholder='John'
                                            onChange={handleInput} 
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='text-white' htmlFor="fatherName">Father Name</label>
                                        <input 
                                            type="text" 
                                            name='fatherName' 
                                            id='fatherName'
                                            value={data?.fatherName} 
                                            className='form-control' 
                                            placeholder='Doe'
                                            onChange={handleInput} 
                                            required 
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='text-white' htmlFor="email">Email/Mobile</label>
                                        <input 
                                            type="text" 
                                            name='email' 
                                            id='email'
                                            value={data?.email} 
                                            className='form-control' 
                                            placeholder='john@gmail.com'
                                            onChange={handleInput} 
                                            required 
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='text-white' htmlFor="mobile">Phone Number</label>
                                        <input 
                                            type="text" 
                                            name='mobile' 
                                            id='mobile'
                                            value={data?.mobile} 
                                            className='form-control' 
                                            placeholder='+1 9876543210'
                                            onChange={handleInput} 
                                            required 
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='text-white' htmlFor="password">Password</label>
                                        <input 
                                            type="password" 
                                            name='password' 
                                            id='password'
                                            value={data?.password} 
                                            className='form-control' 
                                            placeholder='john@gmail.com'
                                            onChange={handleInput} 
                                            required 
                                        />
                                    </div>
                                    {
                                        showMessage &&
                                        <><center><span className={`text-white`}>{message}</span></center></>
                                    }
                                    {
                                        !loading ? 
                                            <button type='submit' className='btn btn-success w-100'>SignUp</button>
                                        :
                                        <Loading />
                                    }
                                </form>
                                <center><p className='text-white mt-3'>Already a member? <Link className='text-white text-decoration-none' to='/'>SignIn</Link></p></center>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}

export default SignUp