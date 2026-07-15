import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { signupurl,loginurl } from "./utils/constants";

const Login = () => {

  const [mode, setMode] = useState("login");
  const [userName,setusername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpass] = useState("");
  const [organization,setorg] = useState("");
  const [logerr,setlogerr] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () =>{
    try{
      await axios.post(loginurl,{email,password},{withCredentials:true});
      navigate("/home");
    }
    catch(err){
      setlogerr(true);
      console.error(err);
    }
  }

  const handleSignup = async () =>{
        try{
          await axios.post(signupurl,{userName,email,password,organization},{withCredentials:true});
          navigate("/home");
        }
        catch(err){
          console.error(err);
        }
    }

  const fontHeading = { fontFamily: "'Barlow Condensed', sans-serif" };
  const fontMono = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans text-gray-900">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div id="leftpanel" className="hidden md:flex relative overflow-hidden bg-gray-900 text-stone-200 flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #EDEAE1 1px, transparent 1px), linear-gradient(to bottom, #EDEAE1 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-6 h-6 border-2 border-stone-200 rounded-sm relative">
            <div className="absolute left-1/2 -top-1.5 w-px h-1.5 bg-stone-200 -translate-x-1/2" />
          </div>
          <div className="text-xl font-bold uppercase tracking-wide" style={fontHeading}>Vaultly </div>
        </div>

        <div className="relative z-10 max-w-sm">
          <div className="text-4xl font-bold uppercase leading-tight mb-4" style={fontHeading}>
            Every asset,<br />accounted for.
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">Sign in to see what's overdue, who's assigned to what, and which piece of equipment needs attention next — across every facility, in one view.</p>
        </div>

        <div className="relative z-10 flex gap-10">
          <div>
            <div className="text-2xl text-amber-400" style={fontMono}>128k+</div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wide mt-0.5">Assets tracked</div>
          </div>
          <div>
            <div className="text-2xl text-amber-400" style={fontMono}>99.98%</div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wide mt-0.5">Uptime</div>
          </div>
          <div>
            <div className="text-2xl text-amber-400" style={fontMono}>2.3s</div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wide mt-0.5">Record lookup</div>
          </div>
        </div>
      </div>

      {/* ---------- RIGHT: form panel ---------- */}
      <div className="flex items-center justify-center bg-stone-50 p-8 md:p-12">
        <div className="w-full max-w-sm">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-sky-700 mb-4 before:content-[''] before:w-4 before:h-px before:bg-sky-700" style={fontMono}>
            {mode === "login" ? "Facility sign in" : "New registration"}
          </div>

          {mode === "login" ? (
            <>
              <h1 className="text-3xl font-bold uppercase mb-2" style={fontHeading}>Welcome back</h1>
              <p className="text-sm text-stone-500 mb-8">Sign in to your Vaultly account to continue.</p>

              <div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-xs font-semibold mb-2">Work email</label>
                  <input id="email" type="email" placeholder="name@gmail.com" value={email} onChange={(e) => setemail(e.target.value)} required className="w-full px-3.5 py-3 text-sm rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-xs font-semibold mb-2">Password</label>
                  <div className="relative">
                    <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setpass(e.target.value)} required className="w-full px-3.5 py-3 text-sm rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                  </div>
                </div>

                <div className="flex items-center justify-end text-sm mb-6">
                  <a href="#" className="text-sky-700 font-medium hover:underline">Forgot password?</a>
                </div>
                {logerr && (
                  <div>
                    <h1 className="text-red-400 absolute top-111 left-193">Invalid Email ID or Password</h1>
                  </div>
                )}

                <button type="submit" onClick={()=>{
                  handleLogin();
                  setlogerr(false)
                }} className="cursor-pointer w-full bg-gray-900 text-stone-50 py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors mb-5"> Sign in</button>
              </div>

              <div className="text-center text-sm text-stone-500">Don't have an account?
                <button className="text-sky-700 font-semibold hover:underline ml-1" onClick={()=>setMode("signup")}>Create one</button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold uppercase mb-2" style={fontHeading}>Create your vault</h1>
              <p className="text-sm text-stone-500 mb-8">Set up a Vaultly account for your facility team.</p>

              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-xs font-semibold mb-2">Full name</label>
                  <input id="name" type="text" placeholder="Your Name" value={userName} onChange={(e) => setusername(e.target.value)} required className="w-full px-3.5 py-3 text-sm rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                </div>

                <div className="mb-4">
                  <label htmlFor="signup-email" className="block text-xs font-semibold mb-2">Work email</label>
                  <input id="signup-email" type="email" placeholder="name@gmail.com" value={email} onChange={(e) => setemail(e.target.value)} required className="w-full px-3.5 py-3 text-sm rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                </div>

                <div className="mb-4">
                  <label htmlFor="facility" className="block text-xs font-semibold mb-2">Facility / organization name</label>
                  <input id="facility" type="text" placeholder="North Plant" value={organization} onChange={(e) => setorg(e.target.value)} required className="w-full px-3.5 py-3 text-sm rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-xs font-semibold mb-2">Password</label>
                  <input id="signup-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setpass(e.target.value)}  required className="w-full px-3.5 py-3 text-sm rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                </div>
                
                <button type="submit" onClick={handleSignup} className="cursor-pointer w-full bg-gray-900 text-stone-50 py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors mb-5 mt-5"> Create account</button>
              </div>

              <div className="text-center text-sm text-stone-500">Already have an account?
                <button className="text-sky-700 font-semibold hover:underline ml-1" onClick={()=>setMode("login")}> Sign in</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;