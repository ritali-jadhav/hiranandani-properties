import React, { useState, useEffect, useRef } from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref: loadMoreRef, inView } = useInView();

  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
    priceRange: [0, 50000000],
    sortBy: 'price_asc'
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreProperties();
    }
  }, [inView]);

  const loadMoreProperties = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const res = await api.get('/properties', {
        params: {
          ...filters,
          page,
          limit: 9
        }
      });
      
      const newProperties = res.data.properties;
      if (newProperties.length < 9) {
        setHasMore(false);
      }
      
      setProperties(prev => [...prev, ...newProperties]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setProperties([]);
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    resetSearch();
    loadMoreProperties();
  }, [filters]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters section remains the same */}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {properties.map((property, index) => (
          <motion.div key={property._id} variants={item}>
            <PropertyCard
              property={property}
              isAuthenticated={false}
              onLike={(id) => {/* Handle like */}}
              onEnquire={(id) => {/* Handle enquiry */}}
              onShowLoginModal={() => setIsLoginModalOpen(true)}
            />
          </motion.div>
        ))}
      </motion.div>

      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
};

export default PropertyListing;