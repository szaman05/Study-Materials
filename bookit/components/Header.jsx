"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import destroySession from '@/app/actions/destroySession';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await destroySession();
        router.push('/login');
        router.refresh();
    };

    return (
        <header className="bg-gray-100 py-3 px-4 shadow-sm">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    {/* Logo/Brand */}
                    <div className="text-2xl font-bold">
                        <a href="/" className="flex items-center">
                            <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded">
                                B
                            </div>
                        </a>
                    </div>
                    
                    {/* Navigation Links - visible only on medium screens and above */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-6">
                            <li>
                                <a href="/rooms" className="text-gray-700 hover:text-black">
                                    Rooms
                                </a>
                            </li>
                            <li>
                                <a href="/bookings" className="text-gray-700 hover:text-black">
                                    Bookings
                                </a>
                            </li>
                            <li>
                                <a href="/add-room" className="text-gray-700 hover:text-black">
                                    Add Room
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                {/* Auth Links - visible only on medium screens and above */}
                <div className="hidden md:flex items-center space-x-4">
                    <a href="/login" className="text-gray-700 hover:text-black flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login
                    </a>
                    <a href="/register" className="text-gray-700 hover:text-black flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Register
                    </a>
                    <a href="/my-rooms" className="text-gray-700 hover:text-black flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        My Rooms
                    </a>
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-black flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>
                
                {/* Hamburger menu button - visible only on small screens */}
                <button 
                    className="md:hidden text-gray-700 hover:text-black"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            
            {/* Mobile menu - shows when hamburger is clicked */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-3 pt-3 border-t">
                    <nav className="container mx-auto">
                        <ul className="space-y-2">
                            <li>
                                <a href="/rooms" className="block text-gray-700 hover:text-black py-1">
                                    Rooms
                                </a>
                            </li>
                            <li>
                                <a href="/bookings" className="block text-gray-700 hover:text-black py-1">
                                    Bookings
                                </a>
                            </li>
                            <li>
                                <a href="/add-room" className="block text-gray-700 hover:text-black py-1">
                                    Add Room
                                </a>
                            </li>
                            <li className="pt-2">
                                <a href="/login" className="block text-gray-700 hover:text-black py-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Login
                                </a>
                            </li>
                            <li>
                                <a href="/register" className="block text-gray-700 hover:text-black py-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Register
                                </a>
                            </li>
                            <li>
                                <a href="/my-rooms" className="block text-gray-700 hover:text-black py-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    My Rooms
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block text-gray-700 hover:text-black py-1 flex items-center w-full text-left"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}
 
export default Header;