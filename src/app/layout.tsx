import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Live Chat',
    description: 'Participate in topics you are interested in and make friends!',
    authors: {
        name: 'Kris Lui',
        url: 'krissolui.com',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
