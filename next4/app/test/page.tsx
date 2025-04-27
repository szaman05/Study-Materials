import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left Side - Login Form */}
      <div className="flex flex-col p-4 md:p-8">
        <div className="flex justify-between items-center">
          <Image
            src="/images/logo/logo-dark.svg"
            alt="Nexus"
            width={120}
            height={40}
            className="dark:hidden"
          />
          <Image
            src="/images/logo/logo-light.svg"
            alt="Nexus"
            width={120}
            height={40}
            className="hidden dark:block"
          />
          <ThemeToggle />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Login</h1>
            <p className="text-base-content/60 text-sm">
              Seamless Access, Secure Connection: Your Gateway to a Personalized
              Experience.
            </p>
          </div>

          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Icon
                  icon="lucide:mail"
                  className="w-4 h-4 text-base-content/50"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="grow"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Icon
                  icon="lucide:key"
                  className="w-4 h-4 text-base-content/50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="grow"
                />
                <Icon
                  icon="lucide:eye"
                  className="w-4 h-4 cursor-pointer text-base-content/50"
                />
              </label>
            </div>

            <div className="flex justify-between items-center">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
                <span className="label-text">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
            </div>

            <button className="btn btn-primary w-full">
              <Icon icon="lucide:log-in" className="w-4 h-4" />
              Login
            </button>

            <button className="btn btn-outline w-full">
              <Image
                src="/images/brand-logo/google-mini.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Login with Google
            </button>

            <p className="text-center text-sm">
              Haven't account?
              <a href="#" className="text-primary hover:underline ml-1">
                Create One
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex bg-base-200 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="mb-8 relative">
            <Image
              src="/images/login-illustration.svg"
              alt="Login Illustration"
              width={400}
              height={400}
              className="drop-shadow-xl"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-base-100 rounded-full p-4 shadow-xl">
              <Icon
                icon="lucide:sparkles"
                className="h-6 w-6 text-primary animate-pulse"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="/images/avatar.png" alt="Profile" />
              </div>
            </div>
            <div className="rating rating-sm">
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked
                readOnly
              />
              <input type="radio" className="mask mask-star-2 bg-orange-400" />
            </div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-base-content/60">Creator of DaisyUI</p>
            <p className="text-sm">
              This is the ultimate admin dashboard for any React project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
