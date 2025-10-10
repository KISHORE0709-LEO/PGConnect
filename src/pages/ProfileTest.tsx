import { useAuth } from "@/context/AuthContext";

const ProfileTest = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Profile Test Page</h1>
      {user ? (
        <div>
          <p>User: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default ProfileTest;