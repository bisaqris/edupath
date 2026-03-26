"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Menu, X, ChevronDown, LogOut, User, ShieldCheck, LinkIcon, GraduationCap } from "lucide-react";
import { clsx } from "clsx";
import { navLinks } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const closeMenus = () => {
        setMobileOpen(false);
        setProfileOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link
                        href={"/landing"}
                        className="flex items-center gap-2 group"
                        onClick={closeMenus}
                    >
                        <Image src="/logo/Logo.png" alt="Edupath Logo" width={30} height={30} />
                        <span className="font-bold text-primary text-xl tracking-tight">Edupath</span>
                    </Link>

                    <div className={clsx("hidden md:flex items-center gap-1", !isLoggedIn && "md:hidden")}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                    (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                                        ? "text-primary bg-primary/10 font-semibold"
                                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            {isLoggedIn ? (
                                <div className="flex items-center gap-2 md:gap-4">
                                    <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors group">
                                        <Bell className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                                    </button>

                                    <div className="relative">
                                        <button
                                            onClick={() => setProfileOpen(!profileOpen)}
                                            className="flex items-center gap-2 p-1 rounded-full md:rounded-xl md:pl-1 md:pr-3 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-bold overflow-hidden relative">
                                                {/* <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad" alt="Avatar" fill className="object-cover" /> */}
                                                <User />

                                            </div>
                                            <div className="hidden md:block text-left">
                                                <p className="text-[12px] font-bold text-primary leading-none">Ahmad Fauzi</p>
                                                <p className="text-[10px] text-gray-500 leading-none mt-1">Pro Member</p>
                                            </div>
                                            <ChevronDown className={clsx("w-4 h-4 text-gray-400 transition-transform hidden md:block", profileOpen && "rotate-180")} />
                                        </button>

                                        {profileOpen && (
                                            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-md shadow-xl border border-gray-100 py-2 z-50">
                                                <div className="px-5 py-4 border-b border-gray-50">
                                                    <p className="font-bold text-sm text-navy">Ahmad Fauzi</p>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Pro Member</p>
                                                </div>
                                                <div className="p-2 space-y-1">
                                                    <Link href="/profil" onClick={closeMenus} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary rounded-md transition-all">
                                                        <User size={16} /> Profil Saya
                                                    </Link>
                                                    <Link href="/profil/data-pribadi" onClick={closeMenus} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary rounded-md transition-all">
                                                        <ShieldCheck size={16} /> Data Pribadi
                                                    </Link>
                                                    <Link href="/profil/link-portofolio" onClick={closeMenus} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary rounded-md transition-all">
                                                        <LinkIcon size={16} /> Link Portofolio
                                                    </Link>
                                                    <Link href="/profil/riwayat-kursus" onClick={closeMenus} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary rounded-md transition-all">
                                                        <GraduationCap size={16} /> Riwayat Kursus
                                                    </Link>
                                                </div>
                                                <div className="border-t border-gray-50 p-2">
                                                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-md transition-all">
                                                        <LogOut size={16} /> Keluar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-3">
                                    <Link href="/login" className="px-6 py-2! text-sm font-bold text-primary border-2 border-primary rounded-xl hover:bg-gray-50 transition-colors">Sign In</Link>
                                    <Link href="/login" className="px-6 py-2! text-sm font-bold text-white bg-primary border-2 border-primary rounded-xl hover:bg-[#162d4a] transition-colors shadow-sm">Sign Up</Link>
                                </div>
                            )}
                        </div>

                        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
                            {mobileOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={clsx(
                "md:hidden border-t border-gray-100 bg-white px-4 py-6 space-y-4 transition-all duration-300",
                mobileOpen ? "block opacity-100" : "hidden opacity-0"
            )}>
                {isLoggedIn ? (
                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenus}
                                className={clsx(
                                    "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                                    pathname.startsWith(link.href) ? "text-primary bg-primary/10" : "text-gray-600"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <Link href="/login" onClick={closeMenus} className="w-full py-3 text-center font-bold text-primary border border-primary rounded-xl">Masuk</Link>
                        <Link href="/login" onClick={closeMenus} className="w-full py-3 text-center font-bold text-white bg-primary rounded-xl">Daftar</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}