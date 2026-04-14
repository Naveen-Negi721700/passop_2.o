import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])
    const copyText = (text) => {
        toast('🦄 copy to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text);
    }

    const showpassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/icons/eyecross.png")) {
            ref.current.src = "/icons/eye.png"
            passwordRef.current.type = "password"

        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "/icons/eyecross.png"

        }
    }
    const savePassword = () => {
       if (
  form.site[0]?.length > 3 &&
  form.username[0]?.length > 3 &&
  form.password[0]?.length > 3
){
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
           
            toast('🦄 Password Save Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        else {
            toast('🦄 Error: Password not saved');
        }

    }
    const deletePassword = (id) => {
        
        let c = confirm("Do you really want to delete this password ?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('🦄 Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        
        }
    }

    const editPassword = (id) => {
  
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
     

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className="p-2 md:pt-7 md:mx-[183px] my-0 md:p-0 min-h-[89vh] md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-800'> &lt;</span>
                    pass
                    <span className='text-green-800 '>op/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>your password manager</p>
                <div className='text-black flex flex-col p-4 gap-3 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='border border-green-500 w-full rounded-full  py-1 px-1' type="text" name='site' id='site' />
                    <div className="flex flex-col gap-3 md:flex-row w-full md:gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Website Name' className='border border-green-500 w-full rounded-full  py-1 px-1' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='border border-green-500 w-full rounded-full  py-1 px-1' type="password" name='password' id='password' />
                            <span className='absolute right-1 top-1.5  cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-1 ' width={26} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-600 hover:bg-green-400 rounded-full px-4 gap-2 border-2 border-green-900 py-2 w-fit'>

                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>your passwords</h2>
                    {passwordArray.length === 0 && <div>No password to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-lg overflow-hidden border mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='  py-2 border border-white text-center '>
                                            <span className='lordcopy flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>
                                                    {item.site}</a>
                                                <div className='lordcopy flex items-center justify-center  ' onClick={() => copyText(item.site)}><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5 text-black cursor-pointer "
                                                >
                                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
                                                </svg>
                                                </div>
                                            </span>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <span className='flex justify-center items-center '>
                                                {item.username}
                                                <div className='lordcopy flex items-center justify-center' onClick={() => copyText(item.username)} ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5 text-black cursor-pointer "
                                                >
                                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
                                                </svg>
                                                </div>
                                            </span>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <span className='flex justify-center items-center  '>
                                                {item.password} <div className='lordcopy flex items-center justify-center' onClick={() => copyText(item.password)} ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5 text-black cursor-pointer "
                                                >
                                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
                                                </svg>
                                                </div>
                                            </span></td>

                                        <td className='flex justify-center items-center gap-3 py-2 border border-white text-center '>
                                            <span className='flex justify-center items-center cursor-pointer ' onClick={() => { editPassword(item.id) }}>
                                                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "hight": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='flex justify-center items-center cursor-pointer ' onClick={() => { deletePassword(item.id) }}>
                                                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "hight": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>


                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
