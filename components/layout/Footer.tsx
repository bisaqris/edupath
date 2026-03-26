import Link from "next/link";
import { Youtube, Instagram, Linkedin, Facebook } from "lucide-react";
import Image from "next/image";
import { edupathLinks, lainnyaLinks, quickLinks } from "@/lib/data";

const socialIcons = [Youtube, Instagram, Linkedin, Facebook];

export default function Footer() {
    return (
        <footer
            className="w-full text-white bg-primary"
        >
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    <div className="space-y-5">
                        <Link href="/" className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            >
                                <Image src="/logo/Logo_white.png" alt="Edupath Logo" width={60} height={60} />
                            </div>
                            <div>
                                <span className="font-display font-bold text-xl text-white">Edupath</span>
                                <p className="text-white/60 text-xs leading-3 max-w-45">
                                    Uncover your potential, choose your path, reach your dream
                                </p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-3 pt-2">
                            {socialIcons.map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4 text-white/70" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white text-sm mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white text-sm mb-5">Edupath</h4>
                        <ul className="space-y-3">
                            {edupathLinks.map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white text-sm mb-5">Lainnya</h4>
                        <ul className="space-y-3">
                            {lainnyaLinks.map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
}