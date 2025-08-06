import { useState } from 'react'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    //images
    const loginImg = '/assets/images/login/login-side.png';

    return (
        <section className='login'>
            <div className="background">
                <div className="curve"></div>
                <div className="content">
                    <div className="main-content">
                        <h1>Ankurshala</h1>
                        <p>Login to your account</p>
                        <form>
                            <div className="input-group">
                                <MdEmail className="input-icon" />
                                <input type="email" placeholder="Email" required />
                            </div>
                            <div className="input-group">
                                <MdLock className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                />
                                <div
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </div>
                            </div>
                            <div className="form-options">
                                <a href="#" className="forgot-password">Forgot Password?</a>
                            </div>
                            <button type="submit" className="login-btn">Login</button>
                        </form>
                    </div>
                    <div className="img-content">
                        <img src={loginImg} alt="Login" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login