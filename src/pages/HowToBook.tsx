import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const HowToBook = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>How to Book a PG</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Step 1: Browse Available PGs</h2>
            <p>Search through our extensive list of verified PG accommodations in your preferred location.</p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Step 2: Check Details & Photos</h2>
            <p>Review room types, amenities, pricing, and authentic photos of the property.</p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Step 3: Schedule a Visit</h2>
            <p>Book a free visit to inspect the property and meet the owner in person.</p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Step 4: Secure Your Booking</h2>
            <p>Pay the booking amount online and receive instant confirmation with all necessary documents.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBook;