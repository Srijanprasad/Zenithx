'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'INDEX', path: '/' },
    { name: 'PRODUCT', path: '/product' },
    { name: 'TECH', path: '/technology' },
    { name: 'AUDIO', path: '/experience' },
    { name: 'RESERVE', path: '/contact' },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col gap-4 pointer-events-auto">
                <Link href="/" className="font-black text-xl tracking-tighter text-white">
                    ZENITH X
                </Link>
                <div className="flex flex-col gap-2 items-start">
                    {navItems.map((item) => (
                        <Link key={item.path} href={item.path} className="group flex items-center gap-2">
                            <span className={`text-[9px] font-mono tracking-[0.3em] transition-all duration-500 ${pathname === item.path ? 'text-white' : 'text-white/30 group-hover:text-white/60 group-hover:translate-x-1'}`}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="pointer-events-auto">
                <Link href="/contact">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[9px] font-bold tracking-[0.4em] uppercase border border-white/10 px-8 py-3 hover:bg-white hover:text-black transition-all duration-500"
                    >
                        Buy Alpha
                    </motion.button>
                </Link>
            </div>
        </nav>
    );
}
