import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { forms, categories } from '../data/forms';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Library = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Forms');
    const [sortBy, setSortBy] = useState('Newest');
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const formsPerPage = 8;
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const sortOptions = [
        { value: 'Newest', label: 'Newest' },
        { value: 'Oldest', label: 'Oldest' },
        { value: 'Name_ASC', label: 'Name (A-Z)' },
        { value: 'Name_DESC', label: 'Name (Z-A)' }
    ];

    // Reset to page 1 when filters or sort change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory, sortBy]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSortDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);





    const filteredForms = useMemo(() => {
        return forms
            .filter(form => {
                const title = form.title.toLowerCase();
                const desc = form.description.toLowerCase();
                const search = searchTerm.toLowerCase();
                const matchesSearch = title.includes(search) || desc.includes(search);
                const matchesCategory = activeCategory === 'All Forms' || form.category === activeCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                if (sortBy === 'Name_ASC') return a.title.localeCompare(b.title);
                if (sortBy === 'Name_DESC') return b.title.localeCompare(a.title);

                const dateA = new Date(a.updatedAt || 0);
                const dateB = new Date(b.updatedAt || 0);

                if (sortBy === 'Oldest') return dateA - dateB;
                // Default to Newest
                return dateB - dateA;
            });
    }, [searchTerm, activeCategory, sortBy]);

    const indexOfLastForm = currentPage * formsPerPage;
    const indexOfFirstForm = indexOfLastForm - formsPerPage;
    const currentForms = filteredForms.slice(indexOfFirstForm, indexOfLastForm);
    const totalPages = Math.ceil(filteredForms.length / formsPerPage);

    const DynamicIcon = ({ name }) => {
        const IconComponent = Icons[name] || Icons.File;
        return (
            <div className="icon-wrapper" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                <IconComponent size={20} />
            </div>
        );
    };

    return (
        <div className="library-page">
            <header className="library-header">
                <div className="container">
                    {/* Breadcrumb row */}
                    <div className="breadcrumbs">
                        <span className="status-badge">Public Directory</span>
                    </div>

                    {/* Title + Sort row */}
                    <div className="header-main">
                        <div className="header-text">
                            <h1 className="page-title">Public Forms Library</h1>
                            <p className="page-subtitle">Browse and access public forms securely. Select a form below to start your submission process.</p>
                        </div>
                        <div className="header-actions">
                            <div className="search-container">
                                <Icons.Search size={16} color="#64748b" />
                                <input
                                    type="text"
                                    placeholder="Search forms..."
                                    className="search-input"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div
                                className="sort-container"
                                ref={dropdownRef}
                                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                            >
                                <Icons.ArrowUpDown size={14} />
                                <span className="sort-label">Sort:</span>
                                <span className="sort-value">
                                    {sortOptions.find(o => o.value === sortBy)?.label || 'Newest'}
                                </span>
                                <Icons.ChevronDown size={14} className={`dropdown-arrow ${sortDropdownOpen ? 'open' : ''}`} />

                                {sortDropdownOpen && (
                                    <div className="dropdown-menu">
                                        {sortOptions.map(option => (
                                            <div
                                                key={option.value}
                                                className={`dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSortBy(option.value);
                                                    setSortDropdownOpen(false);
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category filter row */}
            <div className="category-bar">
                <div className="container">
                    <div className="categories">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setCurrentPage(1);
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cards grid */}
            <div className="container forms-grid-container">
                {currentForms.length > 0 ? (
                    <div className="forms-grid">
                        {currentForms.map(form => (
                            <div key={form.id} className="form-card">
                                <div className="card-top-border" style={{ backgroundColor: '#e2e8f0' }}></div>
                                <div className="fcard-inner">
                                    <div className="fcard-header">
                                        <DynamicIcon name={form.icon} />
                                        <span className="card-category-text">{form.category}</span>
                                    </div>
                                    <div className="fcard-body">
                                        <h3>{form.title}</h3>
                                        <p>{form.description}</p>
                                    </div>
                                    <div className="fcard-footer">
                                        <button
                                            className="open-form-btn"
                                            onClick={() => navigate(`/view/${form.id}`)}
                                        >
                                            Open Form
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No results found</h3>
                        <p>Try selecting a different category.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="page-btn"
                        >
                            &laquo;
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="page-btn"
                        >
                            &raquo;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;
