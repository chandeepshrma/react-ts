import Brand from "../../shared/components/Brand";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { FiLogIn } from "react-icons/fi";
import { HiLockClosed, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { login } from "../../shared/services/auth/auth.service";
import { useAppDispatch } from "../../shared/store/hooks";
import { loginSuccess } from "../../shared/features/auth/authSlice";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setErrorMessage("");
    setNotice("");
    setIsSubmitting(true);
    try {
      const response = await login({
        username: username.trim(),
        password,
        expiresInMins: 30,
      });
      localStorage.setItem("accessToken", response.accessToken);

      localStorage.setItem("refreshToken", response.refreshToken);
      
      dispatch(
        loginSuccess({
          user: response,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      );
      navigate("/home", { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="relative isolate grid place-items-center min-h-svh overflow-hidden py-20 px-6 text-[#17191c]
          [font-family:Arial,_Helvetica,_sans-serif] [color-scheme:light]
          [background:linear-gradient(_180deg,_#8dcee8_0%,_#c9eaf4_34%,_#e8f2f9_65%,_#f9fafc_100%_)] [&_*]:box-border
          [&_*::before]:box-border [&_*::after]:box-border [&_button:focus-visible]:[outline:2px_solid_#2683ad]
          [&_button:focus-visible]:outline-offset-[3px] max-[480px]:pt-20 max-[480px]:px-5 max-[480px]:pb-12.5"
    >
      <div
        className="absolute inset-0 -z-1 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[36%] w-[94vw] aspect-square border border-[#ffffff80] rounded-full -translate-x-1/2 max-[480px]:w-[180vw]" />
        <div className="absolute left-1/2 top-[47%] w-[78vw] aspect-square border border-[#ffffff60] rounded-full -translate-x-1/2 max-[480px]:w-[150vw]" />
        <div
          className="absolute [inset:44%_-10%_-16%] blur-[10px] opacity-85
          [background:radial-gradient(ellipse_9%_13%_at_7%_20%,_#fff_30%,_transparent_75%),_radial-gradient(ellipse_8%_15%_at_14%_24%,_#fff_25%,_transparent_75%),_radial-gradient(ellipse_13%_18%_at_24%_45%,_#fff_25%,_transparent_75%),_radial-gradient(ellipse_9%_17%_at_32%_39%,_#fff_25%,_transparent_75%),_radial-gradient(ellipse_13%_21%_at_66%_50%,_#fff_25%,_transparent_75%),_radial-gradient(ellipse_10%_18%_at_76%_36%,_#fff_25%,_transparent_75%),_radial-gradient(ellipse_12%_16%_at_88%_46%,_#fff_25%,_transparent_75%),_radial-gradient(ellipse_15%_22%_at_98%_57%,_#fff_25%,_transparent_75%)]"
        />
        <div
          className="absolute [inset:66%_-15%_-27%] blur-[7px] opacity-95
          [background:radial-gradient(ellipse_16%_23%_at_4%_49%,_white_35%,_transparent_72%),_radial-gradient(ellipse_12%_23%_at_17%_40%,_white_35%,_transparent_72%),_radial-gradient(ellipse_12%_24%_at_28%_48%,_white_35%,_transparent_72%),_radial-gradient(ellipse_10%_27%_at_37%_35%,_white_35%,_transparent_72%),_radial-gradient(ellipse_15%_32%_at_49%_50%,_white_35%,_transparent_72%),_radial-gradient(ellipse_10%_24%_at_62%_56%,_white_35%,_transparent_72%),_radial-gradient(ellipse_12%_24%_at_75%_44%,_white_35%,_transparent_72%),_radial-gradient(ellipse_14%_23%_at_86%_52%,_white_35%,_transparent_72%),_linear-gradient(transparent_25%,_#ffffffbd_70%)]"
        />
      </div>
      <a
        className="absolute top-3.75 left-[6.25%] flex items-center gap-1.25 text-base font-semibold no-underline text-[#14181a]
          focus-visible:[outline:2px_solid_#2683ad] focus-visible:outline-offset-[3px] max-[480px]:left-6"
        href="/login"
        aria-label="Architects sign in"
      >
        <Brand />
      </a>
      <section
        className="w-75 max-w-full pt-6.5 px-6.5 pb-5.5 border border-[#b6d8e3] [border-bottom-color:#d8c9ef] rounded-[22px]
          [background:linear-gradient(180deg,_#c8f6ff99,_#ffffffdf_37%,_#ffffffef)]
          shadow-[0_3px_5px_#407da91a,_0_7px_14px_#7994c012,_1px_2px_2px_#d9cced70] backdrop-blur-[10px] text-center scale-120 max-[480px]:scale-100
          [&_h1]:mt-0 [&_h1]:mx-0 [&_h1]:mb-0.75 [&_h1]:text-[17px] [&_h1]:leading-[1.3] [&_h1]:font-semibold
          [&_h1]:tracking-[-0.4px] max-[480px]:w-85 max-[480px]:pt-7.5 max-[480px]:px-6.25 max-[480px]:pb-6.5"
        aria-labelledby="login-title"
      >
        <div
          className="grid place-items-center w-11 h-11 mt-0 mx-auto mb-4.25 border border-[#ffffffa6] rounded-[14px]
          [background:linear-gradient(145deg,_#f8fcfd,_#edf6f9)] shadow-[0_4px_5px_#569bad26] text-[#393f43] text-[21px]"
          aria-hidden="true"
        >
          <FiLogIn />
        </div>
        <h1 id="login-title">Sign in with username</h1>
        <p className="mt-0 mx-0 mb-4.25 text-[#7b7f89] text-[11.5px] leading-normal">
          Make a new doc to bring your words, data,
          <br />
          and teams together. For free
        </p>
        <form
          className="flex flex-col gap-1.5"
          onSubmit={handleLogin}
          aria-busy={isSubmitting}
        >
          <label
            className="flex items-center gap-1.25 min-h-7 py-0 px-2 border border-transparent rounded-[9px] bg-[#edf1f4] text-[#858d99]
          text-left [&>svg]:shrink-0 [&>svg]:w-3.25 [&>svg]:h-3.25 focus-within:border-[#6caac4]
          focus-within:shadow-[0_0_0_3px_#92d1ec33] [&_input]:w-full [&_input]:min-w-0 [&_input]:py-1.5 [&_input]:px-0
          [&_input]:border-0 [&_input]:outline-none [&_input]:bg-transparent [&_input]:text-[#252b32]
          [&_input]:[font-family:inherit] [&_input]:text-[10px] [&_input::placeholder]:text-[#858b95]
          [&_input::placeholder]:opacity-100 max-[480px]:[&_input]:text-base max-[480px]:min-h-11"
          >
            <HiUser aria-hidden="true" />
            <span className="sr-only">Username</span>
            <input
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              aria-describedby="login-username-hint"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>
          <span id="login-username-hint" className="sr-only">
            Use your username for the current demo authentication service.
          </span>
          <div
            className="flex items-center gap-1.25 min-h-7 py-0 px-2 border border-transparent rounded-[9px] bg-[#edf1f4] text-[#858d99]
          text-left [&>svg]:shrink-0 [&>svg]:w-3.25 [&>svg]:h-3.25 focus-within:border-[#6caac4]
          focus-within:shadow-[0_0_0_3px_#92d1ec33] [&_input]:w-full [&_input]:min-w-0 [&_input]:py-1.5 [&_input]:px-0
          [&_input]:border-0 [&_input]:outline-none [&_input]:bg-transparent [&_input]:text-[#252b32]
          [&_input]:[font-family:inherit] [&_input]:text-[10px] [&_input::placeholder]:text-[#858b95]
          [&_input::placeholder]:opacity-100 max-[480px]:[&_input]:text-base max-[480px]:min-h-11"
          >
            <HiLockClosed aria-hidden="true" />
            <label className="sr-only" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={isSubmitting}
            />
            <button
              className="grid place-items-center shrink-0 w-6 h-6.5 mr-[-5px] border-0 bg-transparent text-[#828b97] cursor-pointer
          max-[480px]:w-9 max-[480px]:h-10.5"
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HiEye aria-hidden="true" />
              ) : (
                <HiEyeOff aria-hidden="true" />
              )}
            </button>
          </div>
          <button
            className="self-end p-0 border-0 bg-transparent text-[#2b2d31] [font-family:inherit] text-[10px] cursor-pointer hover:underline
          max-[480px]:min-h-8 max-[480px]:text-xs"
            type="button"
            onClick={() =>
              setNotice(
                "Password recovery is not available yet. Please contact your administrator.",
              )
            }
          >
            Forgot password?
          </button>
          {errorMessage && (
            <p
              className="mt-1 mx-0 mb-0 text-xs leading-normal text-[#b42332]"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
          <button
            className="min-h-7.5 mt-1 border border-[#34343c] rounded-[9px] [background:linear-gradient(#35363e,_#15161c)]
          shadow-[inset_0_1px_2px_#ffffff40,_0_1px_2px_#00000015] text-[#fff] [font-family:inherit] text-[11px] cursor-pointer
          [transition:filter_0.15s] hover:[filter:brightness(1.2)] disabled:opacity-65 disabled:cursor-wait
          max-[480px]:min-h-11"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Get Started"}
          </button>
        </form>
        <div
          className="flex items-center gap-2 my-3.25 mx-0 text-[#7e838c] text-[9px] [&::before]:[content:''] [&::before]:flex-1
          [&::before]:h-px [&::before]:[background:repeating-linear-gradient(_to_right,_#d7dce2_0_1px,_transparent_1px_7px_)]
          [&::after]:[content:''] [&::after]:flex-1 [&::after]:h-px
          [&::after]:[background:repeating-linear-gradient(_to_right,_#d7dce2_0_1px,_transparent_1px_7px_)]"
        >
          <span>Or sign in with</span>
        </div>
        <div
          className="grid grid-cols-3 gap-2 [&_button]:grid [&_button]:place-items-center [&_button]:min-h-7 [&_button]:border
          [&_button]:border-[#edf0f5] [&_button]:rounded-[9px] [&_button]:bg-[#ffffffb3]
          [&_button]:shadow-[0_1px_2px_#dce8f233] [&_button]:text-[#080808] [&_button]:text-sm [&_button]:cursor-pointer
          [&_button:hover]:bg-[#edf7fc] [&_button:hover]:border-[#c5dfed] max-[480px]:[&_button]:min-h-11"
        >
          {[
            { name: "Google", icon: <FcGoogle /> },
            {
              name: "Facebook",
              icon: <FaFacebook className="text-[#0786fa]" />,
            },
            { name: "Apple", icon: <FaApple /> },
          ].map(({ name, icon }) => (
            <button
              key={name}
              type="button"
              aria-label={`Sign in with ${name}`}
              onClick={() =>
                setNotice(
                  `${name} sign-in is not connected yet. Please use your username and password.`,
                )
              }
            >
              <span aria-hidden="true">{icon}</span>
            </button>
          ))}
        </div>
        {notice && (
          <p
            className="mt-1 mx-0 mb-0 text-xs leading-normal mt-3.75 text-[#566575]"
            role="status"
          >
            {notice}
          </p>
        )}
      </section>
    </main>
  );
}

export default Login;
