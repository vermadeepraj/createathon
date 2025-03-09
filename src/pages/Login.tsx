
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default Login;
