import { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password } = formData;
  
    // Validate inputs first
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    } else if (!email.includes('@')) {
      setError('Enter a valid email');
      return;
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    } else {
      setError('');
    }
  
    
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || "User registered successfully!");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  

  const containerStyle = {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f4f4f9', // Light grey background for contrast
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const inputContainerStyle = {
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const labelStyle = {
    color: '#555',
  };

  const errorStyle = {
    color: 'red',
  };

  const buttonStyle = {
    padding: '10px',
    width: '100%',
    backgroundColor: '#007bff', // Simple blue button
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, password } = formData;

//     if (!name || !email || !password) {
//       setError('All fields are required');
//     } else if (!email.includes('@')) {
//       setError('Enter a valid email');
//     } else if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//     } else {
//       setError('');
//       alert('Form submitted!');
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: '400px',
//         margin: 'auto',
//         padding: '20px',
//         backgroundColor: '#f4f4f9', // Light grey background for contrast
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <h2 style={{ textAlign: 'center', color: '#333' }}>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '10px' }}>
//           <label style={{ color: '#555' }}>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label style={{ color: '#555' }}>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label style={{ color: '#555' }}>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             style={{
//               width: '100%',
//               padding: '8px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//             }}
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button
//           type="submit"
//           style={{
//             padding: '10px',
//             width: '100%',
//             backgroundColor: '#007bff', // Simple blue button
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
