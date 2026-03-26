"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        router.push("/");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary"
        >
            <button
                onClick={() => router.back()}
                className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Back</span>
            </button>
            <div className="w-325 h-325 absolute -top-170 -left-90 rounded-full border-120 border-[#3D6885]"></div>
            <div className="w-325 h-325 absolute -bottom-170 -right-90 rounded-full border-120 border-[#3D6885]"></div>
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white rounded-2xl shadow-2xl px-8 py-8">

                    <div className="text-center mb-5">
                        <h1 className="text-2xl text-navy">Welcome Back</h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Didn&apos;t have an account?{" "}
                            <Link href="/auth/register" className="text-primary font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <form
                        onSubmit={handleSignIn}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Email <span className="text-red-600">*</span></label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Password <span className="text-red-600">*</span></label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full pl-9 pr-9 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-gray-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                                >
                                    {showPassword
                                        ? <EyeOff className="w-3.5 h-3.5" />
                                        : <Eye className="w-3.5 h-3.5" />
                                    }
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 bg-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-300">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: "Google", content: <span className="font-bold text-sm text-primary"><FaGoogle size={20} /></span> },
                            { label: "Apple", content: <span className="text-sm text-primary"><FaApple size={20} /></span> },
                            { label: "Facebook", content: <span className="font-bold text-sm text-primary"><FaFacebook size={20} /></span> },
                        ].map((s) => (
                            <button
                                key={s.label}
                                className="flex items-center justify-center py-2.5 rounded-lg border border-primary hover:bg-gray-50 transition-colors"
                            >
                                {s.content}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}