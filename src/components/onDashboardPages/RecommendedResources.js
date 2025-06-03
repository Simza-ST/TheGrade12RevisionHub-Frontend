import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RecommendedResources = ({ resources }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResources = resources.filter((resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Recommended Resources</h2>
            <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                aria-label="Search resources"
            />
            <ul className="space-y-2 max-h-80 overflow-y-auto mt-4">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <li
                            key={resource.id}
                            className="p-2 bg-[var(--bg-secondary)] rounded hover:bg-[var(--hover-primary)] transition"
                        >
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--accent-primary)] hover:underline font-medium"
                            >
                                {resource.title}
                            </a>
                            <p className="text-sm text-[var(--text-secondary)]">{resource.description}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-[var(--text-secondary)]">No resources available.</p>
                )}
            </ul>
        </div>
    );
};

RecommendedResources.propTypes = {
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default RecommendedResources;