"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShieldCheck, Link as LinkIcon, GraduationCap, LogOut } from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/context/AuthContext";

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const menuProfil = [
        { label: "Profil", href: "/profil", icon: User },
        { label: "Data Pribadi", href: "/profil/data-pribadi", icon: ShieldCheck },
        { label: "Link Portofolio", href: "/profil/link-portfolio", icon: LinkIcon },
        { label: "Riwayat Kursus", href: "/profil/riwayat-kursus", icon: GraduationCap },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10">

                    <aside className="w-full lg:w-70 shrink-0">
                        <div className="bg-white border-2 rounded-md border-slate-100 p-6 sticky top-24">
                            <div className="space-y-2">
                                {menuProfil.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={clsx(
                                            "flex items-center gap-4 px-4 py-3.5 rounded-md text-sm font-semibold transition-all",
                                            pathname === item.href
                                                ? "bg-primary text-white"
                                                : "text-slate-400 hover:bg-slate-50 hover:text-navy"
                                        )}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <button onClick={logout} className="cursor-pointer flex items-center gap-4 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all w-full text-left">
                                    <LogOut size={18} />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="bg-white border border-slate-100 rounded-md p-8 md:p-12 shadow-sm min-h-150">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}