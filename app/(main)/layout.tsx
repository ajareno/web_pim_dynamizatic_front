"use client"

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useAuth } from "../auth/AuthContext";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const ProtectedRoute = ({ children }: MainLayoutProps) => {
        const { usuarioAutenticado } = useAuth();
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            if (!usuarioAutenticado && pathname !== '/auth/login') {
                router.push('/auth/login');
            } else {
                router.push(pathname);
            }
        }, [usuarioAutenticado, pathname, router]);

        if (!usuarioAutenticado && pathname !== '/auth/login') {
            return null; // O un componente de carga
        }

        return <>{children}</>;
    };

    return (
            <ProtectedRoute>
                    {children}
            </ProtectedRoute>
    );
}
