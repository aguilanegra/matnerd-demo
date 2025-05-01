import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p>&copy; {currentYear} MatNerd, LLC.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
