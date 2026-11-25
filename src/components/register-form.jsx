import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../service/auth-service.js';
import { useSession } from '../hooks/use-session.js';

export function RegisterForm() {
  const navigate = useNavigate();
  const setAuthenticated = useSession((state) => state.setAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    try {
      await authService.register(data);
      setAuthenticated(true);
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'registration error');
    }
  };

  return (
    <div className="max-w-md mx-auto ">
      <h1 className="text-3xl font-bold underline text-teal-500 my-6">RegisterForm</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
        <input type="text" name="login" placeholder="Username" className="border border-gray-300 rounded-md py-2 px-4" />
        <input type="email" name="email" placeholder="Email" className="border border-gray-300 rounded-md py-2 px-4" />
        <input type="password" name="password" placeholder="Password" className="border border-gray-300 rounded-md py-2 px-4" />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
        <Link to="/auth?step=login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </form>
    </div>
  );
}
