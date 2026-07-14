import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logouturl } from "./utils/constants";

const Settings = () => {
    const [notifyEmail, setNotifyEmail] = useState(true);
    const [notifySummary, setNotifySummary] = useState(true);
    const [notifySms, setNotifySms] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [popup,setpopup] = useState(false);

    const navigate = useNavigate();

    const handleContactSubmit = () => {
        console.log({ contactName, contactEmail, contactMessage });
        setSent(true);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        setTimeout(() => setSent(false), 4000);
    };

    const handleLogout = async() =>{
        try{
            await axios.post(logouturl,{},{withCredentials:true});
            navigate("/");
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div className="p-6 md:p-10 bg-[#ededdf] min-h-screen">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 scale-y-110">SETTINGS</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage thresholds, notifications, and account preferences for your organization.</p>
                </div>
            </div>

            <div className="rounded-lg mt-9 max-w-xl bg-white mx-auto border border-gray-300">
                <h1 className="text-xl font-bold text-gray-900 scale-y-110 scale-x-90 mt-6 px-6">NOTIFICATIONS</h1>
                <div className="w-full h-px bg-gray-300 mt-8" />
                <div className="px-6">
                    <label className="flex justify-between items-center mt-4 mb-4 cursor-pointer">
                        <h1 className="text-gray-900/80 text-lg scale-x-95">Email when equipment is overdue</h1>
                        <input type="checkbox" checked={notifyEmail} onChange={() => setNotifyEmail((v) => !v)} className="w-4 h-4" />
                    </label>
                    <div className="w-full h-px bg-gray-300" />
                    <label className="flex justify-between items-center mt-4 mb-4 cursor-pointer">
                        <h1 className="text-gray-900/80 text-lg scale-x-95">Weekly summary to managers</h1>
                        <input type="checkbox" checked={notifySummary} onChange={() => setNotifySummary((v) => !v)} className="w-4 h-4" />
                    </label>
                    <div className="w-full h-px bg-gray-300" />
                    <label className="flex justify-between items-center mt-4 mb-4 cursor-pointer">
                        <h1 className="text-gray-900/80 text-lg scale-x-95">SMS for critical equipment</h1>
                        <input type="checkbox" checked={notifySms} onChange={() => setNotifySms((v) => !v)} className="w-4 h-4" />
                    </label>
                </div>
            </div>

            <div className="rounded-lg mt-9 max-w-xl bg-white mx-auto border border-gray-300">
                <h1 className="text-xl font-bold text-gray-900 scale-y-110 scale-x-90 mt-6 px-6">ACCOUNT</h1>
                <div className="w-full h-px bg-gray-300 mt-8" />
                <div className="px-6">
                    <button className="w-full flex justify-between items-center mt-4 mb-4 cursor-pointer text-left">
                        <h1 className="text-gray-900/80 text-lg scale-x-95">Change password</h1>
                        <span className="text-gray-400 text-sm">&rsaquo;</span>
                    </button>
                    <div className="w-full h-px bg-gray-300" />
                    <button className="w-full flex justify-between items-center mt-4 mb-4 cursor-pointer text-left">
                        <h1 className="text-gray-900/80 text-lg scale-x-95">Manage team access</h1>
                        <span className="text-gray-400 text-sm">&rsaquo;</span>
                    </button>
                    <div className="w-full h-px bg-gray-300" />
                    <button className="w-full flex justify-between items-center mt-4 mb-4 cursor-pointer text-left">
                        <button onClick={()=>setpopup(true)} className="text-rose-600 text-lg scale-x-95">Log out</button>
                        <span className="text-rose-400 text-sm">&rsaquo;</span>
                    </button>
                </div>
                {popup && (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-xs bg-black/20">
        <div className="relative z-50 w-full max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Log out?</h2>
            <p className="text-sm text-gray-500 mb-6">
                You'll need to sign in again to access your account.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => setpopup(false)}
                    className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleLogout}
                    className="flex-1 bg-rose-600 text-white text-sm font-semibold py-2.5 rounded-md hover:bg-rose-700 transition-colors cursor-pointer"
                >
                    Log out
                </button>
            </div>
        </div>
    </div>
)}
            </div>

            <div className="rounded-lg mt-9 max-w-xl bg-white mx-auto border border-gray-300">
                <h1 className="text-xl font-bold text-gray-900 scale-y-110 scale-x-90 mt-6 px-6">ABOUT US</h1>
                <div className="w-full h-px bg-gray-300 mt-8" />
                <div className="px-6 mt-4 mb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Upkeep is built to keep every piece of equipment across your facilities accounted
                        for — who has it, where it lives, and when it's due back or due for maintenance.
                        One record, always current, never misplaced.
                    </p>
                    <div className="flex gap-8 mt-5">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Version</div>
                            <div className="text-sm text-gray-800 mt-1">1.0.0</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Facilities tracked</div>
                            <div className="text-sm text-gray-800 mt-1">North · Central · South</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-lg mt-9 mb-9 max-w-xl bg-white mx-auto border border-gray-300">
                <h1 className="text-xl font-bold text-gray-900 scale-y-110 scale-x-90 mt-6 px-6">CONTACT US</h1>
                <div className="w-full h-px bg-gray-300 mt-8" />
                <div className="px-6 mt-5 mb-6 space-y-3.5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your name</label>
                        <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Rae Marsh"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="you@facility.com"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message</label>
                        <textarea
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            rows="4"
                            placeholder="Tell us what's going on…"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700 resize-none"
                        />
                    </div>
                    <button
                        onClick={handleContactSubmit}
                        className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        Send message
                    </button>
                    {sent && <p className="text-xs text-emerald-600 font-medium">Message sent — we'll get back to you shortly.</p>}

                    <div className="w-full h-px bg-gray-300 mt-5!" />
                    <div className="flex gap-8 pt-1">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Support email</div>
                            <div className="text-sm text-gray-800 mt-1">support@upkeep-app.com</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hours</div>
                            <div className="text-sm text-gray-800 mt-1">Mon–Fri, 9 AM – 6 PM</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;