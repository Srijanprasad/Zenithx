'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'ZENITH X', path: '/', isLogo: true },
    { name: 'PRODUCT', path: '/product' },
    { name: 'TECHNOLOGY', path: '/technology' },
    { name: 'EXPERIENCE', path: '/experience' },
    { name: 'CONTACT', path: '/contact' },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 mix-blend-difference text-white flex justify-between items-center pointer-events-none">
            {/* Pointer events auto on links, none on container to let clicks pass through to 3D */}
            <div className="flex gap-8 items-center pointer-events-auto">
                {navItems.map((item) => (
                    <Link key={item.path} href={item.path} className="relative group overflow-hidden">
                        {item.isLogo ? (
                            <span className="font-bold text-2xl tracking-tighter">ZENITH X</span>
                        ) : (
                            <span className={`text-sm font-medium tracking-widest transition-colors duration-300 ${pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                {item.name}
                                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                            </span>
                        )}
                    </Link>
                ))}
            </div>

            <div className="pointer-events-auto">
                <button className="text-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                    Buy Now
                </button>
            </div>
        </nav>
    );
}
