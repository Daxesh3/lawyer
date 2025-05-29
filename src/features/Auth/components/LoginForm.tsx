import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    // Static credentials
    const validEmail = 'edmund.boyo@cliffordchance.com';
    const validPassword = 'Edmud@123';

    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        localStorage.setItem('isLogin', 'true');
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-[360px] w-full space-y-8  rounded-xl">
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="w-full px-4 py-3 text-white rounded-lg bg-[#191919] border border-[#454545] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 text-white rounded-lg border bg-[#191919] border-[#454545] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="#" className="text-[#807F83] cursor-not-allowed">
                Forgot password
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#41A5DB] hover:bg-[#41A5CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {isLoading ? 'Logging you in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
