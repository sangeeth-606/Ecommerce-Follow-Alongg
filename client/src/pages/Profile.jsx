// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("userEmail"); // Fetch from localStorage

//   useEffect(() => {
//     fetchProfile();
//   });
//   const fetchProfile = async () => {
//     try {
//         console.log("Fetching profile for userEmail:", userEmail); // Debugging

//         const res = await fetch(
//             `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${userEmail}`,
//             {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             }
//         );

//         console.log("Response Status:", res.status); // Debugging

//         const data = await res.json();
//         console.log("Response Data:", data); // Debugging

//         if (res.ok) {
//             // Assuming setProfile is a state setter for { name, email }
//             setProfile({
//                 name: data.name,
//                 email: data.email
//             });
//         } else {
//             console.error("Failed to fetch profile:", data.error || "Unknown error");
//         }
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//     }
// };
//   // const fetchProfile = async () => {
//   //   try {
//   //     console.log("Fetching profile for userEmail:", userEmail); // Debugging

//   //     const res = await fetch(
//   //       `https://ecommerce-zof6.onrender.com/getUserbyEmail?userEmail=${userEmail}`,
//   //       {
//   //         method: "GET",
//   //         headers: { "Content-Type": "application/json" },
//   //       }
//   //     );

//   //     console.log("Response Status:", res.status); // Debugging

//   //     const data = await res.json();
//   //     console.log("Response Data:", data); // Debugging

//   //     if (res.ok) {
//   //       setProfile(data.profile);
//   //     } else {
//   //       console.error("Failed to fetch profile:", data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching profile:", error);
//   //   }
//   // };

//   return (
//     <div className="profile-container">
//       {profile ? (
//         <>
//           {/* Profile Section */}
//           <div className="profile-info">
//             <img
//               src={profile.profileUrl || "default-avatar.png"}
//               alt="Profile"
//             />
//             <h2>{profile.name}</h2>
//             <p>{userEmail}</p>
//           </div>

//           {/* Address Section */}
//           <div className="profile-address">
//             <h3>Address</h3>
//             {profile.addresses.length > 0 ? (
//               profile.addresses.map((addr, index) => (
//                 <p key={index}>
//                   {addr.street}, {addr.city}, {addr.state}, {addr.zipCode},{" "}
//                   {addr.country}
//                 </p>
//               ))
//             ) : (
//               <p>No address found</p>
//             )}
//             <button onClick={() => navigate("/add-address")}>
//               {profile.addresses.length > 0 ? "Edit Address" : "Add Address"}
//             </button>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail"); // Fetch from localStorage

  useEffect(() => {
    fetchProfile();
  }, []); // Add empty dependency array to prevent infinite loops

  const fetchProfile = async () => {
    try {
      console.log("Fetching profile for userEmail:", userEmail); // Debugging

      const res = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${userEmail}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response Status:", res.status); // Debugging

      const data = await res.json();
      console.log("Response Data:", data); // Debugging

      if (res.ok) {
        // Set only name and email since backend returns { name, email }
        setProfile({
          name: data.name,
          email: data.email,
        });
      } else {
        console.error("Failed to fetch profile:", data.error || "Unknown error");
        setProfile(null); // Reset profile on error
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null); // Reset profile on error
    }
  };

  return (
    <div className="profile-container">
      {profile ? (
        <>
          {/* Profile Section */}
          <div className="profile-info">
            <img
              src={"default-avatar.png"} // Since we’re not fetching profileUrl, use a default
              alt="Profile"
            />
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>

          {/* Address Section (Note: Since we’re not fetching addresses, show a message or remove this section) */}
          <div className="profile-address">
            <h3>Address</h3>
            <p>No address data available. Please add an address.</p>
            <button onClick={() => navigate("/add-address")}>
              Add Address
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;