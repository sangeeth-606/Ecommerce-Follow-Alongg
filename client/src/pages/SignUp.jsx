// import { useState } from 'react';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const { name, email, password } = formData;
  
//     // Validate inputs first
//     if (!name || !email || !password) {
//       setError('All fields are required');
//       return;
//     } else if (!email.includes('@')) {
//       setError('Enter a valid email');
//       return;
//     } else if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     } else {
//       setError('');
//     }
  
    
//     try {
//       const response = await fetch("https://ecommerce-zof6.onrender.com/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert(data.message || "User registered successfully!");
//       } else {
//         setError(data.message || "Registration failed");
//       }
//     } catch (error) {
//       alert("Error: " + error.message);
//     }
//   };
  

//   const containerStyle = {
//     maxWidth: '400px',
//     margin: 'auto',
//     padding: '20px',
//     backgroundColor: '#f4f4f9', // Light grey background for contrast
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   };

//   const headingStyle = {
//     textAlign: 'center',
//     color: '#333',
//   };

//   const inputContainerStyle = {
//     marginBottom: '10px',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '8px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//   };

//   const labelStyle = {
//     color: '#555',
//   };

//   const errorStyle = {
//     color: 'red',
//   };

//   const buttonStyle = {
//     padding: '10px',
//     width: '100%',
//     backgroundColor: '#007bff', // Simple blue button
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headingStyle}>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={inputContainerStyle}>
//           <label style={labelStyle}>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <div style={inputContainerStyle}>
//           <label style={labelStyle}>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <div style={inputContainerStyle}>
//           <label style={labelStyle}>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         {error && <p style={errorStyle}>{error}</p>}
//         <button type="submit" style={buttonStyle}>
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

// // import { useState } from 'react';

// // const SignUp = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //   });

// //   const [error, setError] = useState('');

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const { name, email, password } = formData;

// //     if (!name || !email || !password) {
// //       setError('All fields are required');
// //     } else if (!email.includes('@')) {
// //       setError('Enter a valid email');
// //     } else if (password.length < 6) {
// //       setError('Password must be at least 6 characters');
// //     } else {
// //       setError('');
// //       alert('Form submitted!');
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         maxWidth: '400px',
// //         margin: 'auto',
// //         padding: '20px',
// //         backgroundColor: '#f4f4f9', // Light grey background for contrast
// //         borderRadius: '8px',
// //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// //       }}
// //     >
// //       <h2 style={{ textAlign: 'center', color: '#333' }}>Sign Up</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div style={{ marginBottom: '10px' }}>
// //           <label style={{ color: '#555' }}>Name:</label>
// //           <input
// //             type="text"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             style={{
// //               width: '100%',
// //               padding: '8px',
// //               border: '1px solid #ccc',
// //               borderRadius: '4px',
// //             }}
// //           />
// //         </div>
// //         <div style={{ marginBottom: '10px' }}>
// //           <label style={{ color: '#555' }}>Email:</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             style={{
// //               width: '100%',
// //               padding: '8px',
// //               border: '1px solid #ccc',
// //               borderRadius: '4px',
// //             }}
// //           />
// //         </div>
// //         <div style={{ marginBottom: '10px' }}>
// //           <label style={{ color: '#555' }}>Password:</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             style={{
// //               width: '100%',
// //               padding: '8px',
// //               border: '1px solid #ccc',
// //               borderRadius: '4px',
// //             }}
// //           />
// //         </div>
// //         {error && <p style={{ color: 'red' }}>{error}</p>}
// //         <button
// //           type="submit"
// //           style={{
// //             padding: '10px',
// //             width: '100%',
// //             backgroundColor: '#007bff', // Simple blue button
// //             color: '#fff',
// //             border: 'none',
// //             borderRadius: '4px',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           Sign Up
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SignUp;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://ecommerce-zof6.onrender.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      navigate("/login");
    } catch (error) {
      setError(error.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;