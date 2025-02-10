// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (req) => {
//         e.preventDefault();
    
//         const { email, password } = req.body; // ✅ Extract email and password from formData
    
//         try {
//             const response = await fetch("http://localhost:8084/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });
    
//             const data = await response.json();
    
//             if (response.ok) {
//                 alert("Login successful!");
//                 localStorage.setItem("userEmail", data.email);
//                 localStorage.setItem("token", data.token);
//                 navigate("/products"); // Redirect to products page
//             } else {
//                 alert(data.error || "Login failed");
//             }
//         } catch (error) {
//             alert("Error: " + error.message);
//         }
//     };
    
    

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
//                 <div>
//                     {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                         Welcome back
//                     </h2> */}
//                     <p className="mt-2 text-center text-lg text-gray-600">
//                         Please sign in to your account
//                     </p>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     <div className="rounded-md shadow-sm space-y-4">
//                         <div>
//                             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 required
//                                 className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                                 placeholder="Enter your username"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                                 placeholder="Enter your password"
//                             />
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//                     >
//                         Sign in
//                     </button>
//                 </form>
//                 <div  className='flex justify-center' >
//                     <button  onClick={ ()=>{
//                         navigate("/admin")
//                     } } >
//                         <h1 className='text text-base font-medium' >admin ?</h1>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload
    
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("userEmail", email);
                localStorage.setItem("token", data.token);
                navigate("/"); // Redirect to products page
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
                <div>
                    <p className="mt-2 text-center text-lg text-gray-600">
                        Please sign in to your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Sign in
                    </button>
                </form>
                <div className='flex justify-center'>
                    <button onClick={() => navigate("/admin")}>
                        <h1 className='text text-base font-medium'>Admin?</h1>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
