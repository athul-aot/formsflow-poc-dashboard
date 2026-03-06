import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { forms } from '../data/forms';
import { ChevronLeft, ExternalLink } from 'lucide-react';

const FormViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const cleanupRef = useRef(null);

    const form = forms.find(f => f.id === parseInt(id));

    const configFile = {
        authenticationType: 'anonymous',
        formioUrl: import.meta.env.VITE_FORMIO_URL || 'http://localhost:3001',
        webApiUrl: import.meta.env.VITE_WEB_API_URL || 'http://localhost:5000'
    };

    useEffect(() => {
        if (!form || !containerRef.current) return;

        // Suppress all web component errors to prevent React crashes
        const originalError = console.error;
        console.error = (...args) => {
            const message = String(args[0]);
            if (message.includes('n2 is not a function') ||
                message.includes('Cannot delete property') ||
                message.includes('Should not already be working')) {
                return; // Suppress these errors
            }
            originalError.apply(console, args);
        };

        // Create web component outside React's control
        const webComponent = document.createElement('formsflow-wc');

        // Set attributes
        webComponent.setAttribute('configFile', JSON.stringify(configFile));
        webComponent.setAttribute('anonymousUrl', form.embedUrl);
        webComponent.setAttribute('message', 'Thank you for your Response');

        // Add to container
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(webComponent);

        console.log('✅ Form component loaded');

        // Store cleanup function
        cleanupRef.current = () => {
            try {
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }
            } catch (error) {
                // Ignore cleanup errors
            }
            console.error = originalError;
        };

        // Cleanup on unmount
        return cleanupRef.current;
    }, [form?.id]);

    // Handle navigation errors by forcing a page reload
    useEffect(() => {
        const handleError = (event) => {
            if (event.error && (
                event.error.message?.includes('n2 is not a function') ||
                event.error.message?.includes('Should not already be working')
            )) {
                console.log('Handling web component error, reloading...');
                window.location.reload();
            }
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (!form) return <div>Form not found</div>;

    return (
        <div className="viewer-page">

            {/* ── Header ── */}
            <div className="viewer-header">
                <div className="container header-flex">
                    <div className="header-left">
                        <button className="back-btn" onClick={() => navigate('/')} title="Back">
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                        <div className="header-title">
                            <h2>{form.title}</h2>
                            <span className="subtitle">{form.category} · Public Submission</span>
                        </div>
                    </div>
                    <div className="header-right">
                        <a
                            href={form.publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="open-external-btn"
                        >
                            <ExternalLink size={15} />
                            Open in New Tab
                        </a>
                        <div className="status-indicator">
                            <span
                                className="dot"
                                style={{
                                    backgroundColor:
                                        form.status === 'Active' ? '#10b981' :
                                            form.status === 'Archive' ? '#ef4444' : '#f59e0b'
                                }}
                            />
                            {form.status}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Embedded Form ── */}
            <div className="container embed-container">
                <div className="form-portal-wrapper">
                    <div
                        ref={containerRef}
                        style={{ width: '100%', minHeight: '500px' }}
                        key={form.id}
                    >
                        {/* Web component will be inserted here */}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FormViewer;
