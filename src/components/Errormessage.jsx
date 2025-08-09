import { useUser } from "../context/userContext";

const ErrorMessage = () => {
  const { user } = useUser();

  return (
    user.error && (
      <div className="text-red-600 bg-red-100 p-3 rounded mt-4">
        ⚠️ {user.error}
      </div>
    )
  );
};

export default ErrorMessage;