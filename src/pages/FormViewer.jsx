import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { forms } from '../data/forms';
import { ChevronLeft, ExternalLink } from 'lucide-react';

const FormViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const cleanupRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const form = forms.find(f => f.id === parseInt(id));

    const configFile = {
        authenticationType: 'anonymous',
        formioUrl: import.meta.env.VITE_FORMIO_URL || 'http://localhost:3001',
        webApiUrl: import.meta.env.VITE_WEB_API_URL || 'http://localhost:5000'
    };

    useEffect(() => {
        if (!form || !containerRef.current) return;

        setIsLoading(true);

        // Suppress all web component errors
        const originalError = console.error;
        console.error = (...args) => {
            const message = String(args[0]);
            if (message.includes('n2 is not a function') ||
                message.includes('Cannot delete property') ||
                message.includes('Should not already be working')) {
                return;
            }
            originalError.apply(console, args);
        };

        // Create web component
        const webComponent = document.createElement('formsflow-wc');
        webComponent.setAttribute('configFile', JSON.stringify(configFile));
        webComponent.setAttribute('anonymousUrl', form.embedUrl);
        webComponent.setAttribute('message', 'Thank you for your Response');

        // Add to container
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(webComponent);

        // Simulate a smooth loading experience
        // Usually, the web component takes a moment to initialize its own internal frames/styles
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        // Store cleanup function
        cleanupRef.current = () => {
            clearTimeout(timer);
            try {
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }
            } catch (error) { }
            console.error = originalError;
        };

        return cleanupRef.current;
    }, [form?.id]);

    // Handle navigation errors
    useEffect(() => {
        const handleError = (event) => {
            if (event.error && (
                event.error.message?.includes('n2 is not a function') ||
                event.error.message?.includes('Should not already be working')
            )) {
                window.location.reload();
            }
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (!form) return (
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
            <h3>Form not found</h3>
            <button onClick={() => navigate('/')} className="contact-btn" style={{ marginTop: '1rem' }}>Back to Library</button>
        </div>
    );

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
                <div className={`form-portal-wrapper ${isLoading ? 'is-loading' : ''}`}>
                    {isLoading && (
                        <div className="loading-overlay">
                            <div className="premium-spinner"></div>
                            <span className="loading-text">Loading secure form...</span>
                        </div>
                    )}

                    <div
                        ref={containerRef}
                        style={{
                            width: '100%',
                            minHeight: '500px',
                            display: isLoading ? 'none' : 'block'
                        }}
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

