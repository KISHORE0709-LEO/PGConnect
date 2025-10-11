import { MapPin, Navigation, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PGLocationMapProps {
  location: string;
  pgName: string;
  latitude?: number;
  longitude?: number;
}

const PGLocationMap = ({ location, pgName, latitude = 12.9716, longitude = 77.5946 }: PGLocationMapProps) => {
  const [copied, setCopied] = useState(false);
  
  const coordinates = `${latitude}, ${longitude}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.005},${latitude-0.005},${longitude+0.005},${latitude+0.005}&layer=mapnik&marker=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  
  const copyCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(coordinates);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy coordinates:', err);
    }
  };
  
  return (
    <div className="space-y-4">
      {/* GPS Coordinates Display */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Navigation className="h-4 w-4 text-primary" />
            GPS Coordinates
          </h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyCoordinates}
            className="h-8 px-2"
          >
            <Copy className="h-3 w-3 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="font-mono text-xs">
            Lat: {latitude}
          </Badge>
          <Badge variant="secondary" className="font-mono text-xs">
            Lng: {longitude}
          </Badge>
        </div>
      </div>
      
      {/* Interactive Map */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden border-2 border-primary/20">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`GPS Location of ${pgName}`}
          className="rounded-lg"
        />
        
        {/* Overlay with PG Info */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">{pgName}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </div>
        
        {/* Get Directions Button */}
        <div className="absolute bottom-4 right-4">
          <Button 
            size="sm" 
            onClick={() => window.open(directionsUrl, '_blank')}
            className="bg-primary/90 hover:bg-primary shadow-lg"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
        </div>
      </div>
      
      {/* Location Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="font-medium mb-1">Nearest Metro</div>
          <div className="text-muted-foreground">Jayanagar Metro - 0.8 km</div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="font-medium mb-1">Nearest Bus Stop</div>
          <div className="text-muted-foreground">Jayanagar 4th Block - 0.3 km</div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="font-medium mb-1">Nearest Hospital</div>
          <div className="text-muted-foreground">Fortis Hospital - 2.1 km</div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="font-medium mb-1">Nearest Mall</div>
          <div className="text-muted-foreground">Forum Mall - 1.5 km</div>
        </div>
      </div>
    </div>
  );
};

export default PGLocationMap;