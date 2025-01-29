import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Info, Phone, Bed, Bath, 
  Square, MapPin, Indian, Share2 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PropertyCard = ({ 
  property, 
  isAuthenticated, 
  onLike, 
  onEnquire, 
  onShowLoginModal 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      onShowLoginModal();
      return;
    }
    onLike(property.id);
  };

  const cardVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="h-full"
    >
      <Card className="relative h-full overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            variants={imageVariants}
            src={property.imageUrl || "/api/placeholder/400/320"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge 
              className="bg-primary/90 hover:bg-primary text-white"
            >
              {property.type}
            </Badge>
            {property.isNew && (
              <Badge 
                className="bg-green-500/90 hover:bg-green-500 text-white"
              >
                New
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md"
            onClick={handleLikeClick}
          >
            <Heart 
              className={`h-5 w-5 transition-colors duration-300 ${
                property.isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'
              }`}
            />
          </Button>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4">
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-1 line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{property.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center text-2xl font-bold text-primary">
              <Indian className="h-5 w-5 mr-1" />
              {property.price.toLocaleString('en-IN')}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {/* Handle share */}}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Square className="h-4 w-4" />
              <span>{property.size} sq.ft</span>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 mb-4">
            {property.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => property.onMoreInfo(property.id)}
            >
              <Info className="h-4 w-4 mr-2" />
              More Info
            </Button>
            <Button 
              className="w-full"
              onClick={() => onEnquire(property.id)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Enquire
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;