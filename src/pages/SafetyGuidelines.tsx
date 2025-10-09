import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SafetyGuidelines = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Safety Guidelines</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Do's</h2>
            <ul className="space-y-2">
              <li>• Always verify the property owner's identity</li>
              <li>• Keep emergency contact numbers handy</li>
              <li>• Inform family about your accommodation details</li>
              <li>• Check fire safety equipment in the building</li>
              <li>• Keep your room locked when away</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(0, 84.2%, 60.2%), hsl(0, 84.2%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Don'ts</h2>
            <ul className="space-y-2">
              <li>• Don't share personal documents with strangers</li>
              <li>• Don't pay advance without visiting the property</li>
              <li>• Don't ignore safety protocols</li>
              <li>• Don't leave valuables unattended</li>
              <li>• Don't compromise on basic safety features</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Police:</strong> 100</p>
                <p><strong>Fire:</strong> 101</p>
                <p><strong>Ambulance:</strong> 108</p>
              </div>
              <div>
                <p><strong>PGConnect Support:</strong> +91-9876543210</p>
                <p><strong>Emergency Helpline:</strong> 24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;