import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ListYourProperty = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>List Your Property</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Why List with PGConnect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p>• Reach thousands of verified students</p>
                <p>• Zero listing fees</p>
                <p>• Professional photography service</p>
                <p>• 24/7 customer support</p>
              </div>
              <div>
                <p>• Secure payment processing</p>
                <p>• Tenant verification services</p>
                <p>• Marketing and promotion</p>
                <p>• Easy property management tools</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">How to List Your Property</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(142, 76%, 36%)'}}>1</div>
                <div>
                  <h3 className="font-semibold">Create Your Account</h3>
                  <p>Sign up as a PG owner and verify your identity</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(142, 76%, 36%)'}}>2</div>
                <div>
                  <h3 className="font-semibold">Add Property Details</h3>
                  <p>Upload photos, set pricing, and describe amenities</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(142, 76%, 36%)'}}>3</div>
                <div>
                  <h3 className="font-semibold">Verification Process</h3>
                  <p>Our team will verify your property and documents</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(142, 76%, 36%)'}}>4</div>
                <div>
                  <h3 className="font-semibold">Go Live</h3>
                  <p>Your property goes live and starts receiving bookings</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 text-center shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
            <p className="mb-6">Join thousands of successful PG owners on our platform</p>
            <button className="px-8 py-3 rounded-lg font-semibold transition-colors" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>
              List Your Property Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListYourProperty;