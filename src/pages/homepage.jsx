import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Handler for navigating to the register/login routes
  const handleRegister = (role) => {
    navigate(`/register/${role}`);
  };

  const handleLogin = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div>
      <h1>Register</h1>
      <p>
        <button onClick={() => handleRegister('admin')}>Admin</button>
      </p>
      <p>
        <button onClick={() => handleRegister('customer')}>Customer</button>
      </p>

      <h1>Login</h1>
      <p>
        <button onClick={() => handleLogin('admin')}>Admin</button>
      </p>
      {/* <p>
        <button onClick={() => handleLogin('customer')}>Customer</button>
      </p> */}
    </div>
  );
};

export default HomePage;
