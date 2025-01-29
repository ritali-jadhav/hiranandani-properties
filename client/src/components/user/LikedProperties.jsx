import React, { useState, useEffect } from 'react';
import PropertyCard from '../PropertyCard';
import api from '../../services/api';

const LikedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedProperties = async () => {
      try {
        const res = await api.get('/users/liked-properties');
        setProperties(res.data);
      } catch (error) {
        console.error('Failed to fetch liked properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProperties();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Liked Properties</h1>
      
      {properties.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven't liked any properties yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard
              key={property._id}
              property={property}
              isAuthenticated={true}
              onLike={() => {/* Handle unlike */}}
              onEnquire={() => {/* Handle enquiry */}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedProperties;