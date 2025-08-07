import { useEffect, useState } from "react";
import { getProfile } from "../../API/profileApi";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaSpinner,
} from "react-icons/fa";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        toast.error("Failed to load user profile.");
        console.error("Failed to load user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full flex justify-center items-center py-10">
        <div className="text-center text-3xl font-semibold text-red-600 bg-white p-6 rounded-xl shadow-lg">
          User profile not found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full p-4 sm:p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105">
        <div className="flex flex-col items-center gap-4 mb-6 border-b pb-6 border-gray-200">
          <FaUserCircle className="text-8xl text-blue-600 mb-2" />
          <h2 className="text-3xl font-extrabold text-gray-800">{user.name || user.username || 'User'}</h2>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-4 text-gray-700 text-lg">
            <FaEnvelope className="text-blue-500 text-2xl" />
            <span>{user.email || 'No email provided'}</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700 text-lg">
            <FaPhone className="text-blue-500 text-2xl" />
            <span>{user.phone || user.phoneNumber || 'No phone provided'}</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700 text-lg">
            <FaMapMarkerAlt className="text-blue-500 text-2xl" />
            <span>{user.address || user.location || 'No address provided'}</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700 text-lg">
            <FaBirthdayCake className="text-blue-500 text-2xl" />
            <span>{user.birthday || user.dateOfBirth || 'No birthday provided'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
