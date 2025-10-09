import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const OwnerGuidelines = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Owner Guidelines</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Property Standards</h2>
            <ul className="space-y-2">
              <li>• Maintain clean and hygienic living conditions</li>
              <li>• Ensure proper ventilation and lighting in all rooms</li>
              <li>• Provide basic furniture (bed, study table, storage)</li>
              <li>• Regular maintenance of electrical and plumbing systems</li>
              <li>• Install proper security measures (CCTV, locks)</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Tenant Relations</h2>
            <ul className="space-y-2">
              <li>• Treat all tenants with respect and fairness</li>
              <li>• Respond promptly to maintenance requests</li>
              <li>• Provide clear house rules and regulations</li>
              <li>• Maintain transparent communication about fees</li>
              <li>• Respect tenant privacy and personal space</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Platform Compliance</h2>
            <ul className="space-y-2">
              <li>• Keep property information updated and accurate</li>
              <li>• Respond to booking inquiries within 24 hours</li>
              <li>• Honor confirmed bookings and pricing</li>
              <li>• Report any issues or disputes immediately</li>
              <li>• Follow PGConnect's terms and conditions</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">For Better Occupancy</h3>
                <ul className="space-y-1">
                  <li>• Upload high-quality photos</li>
                  <li>• Offer competitive pricing</li>
                  <li>• Provide additional amenities</li>
                  <li>• Maintain good reviews</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">For Tenant Satisfaction</h3>
                <ul className="space-y-1">
                  <li>• Regular property maintenance</li>
                  <li>• Quick issue resolution</li>
                  <li>• Flexible payment options</li>
                  <li>• Create a friendly environment</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(0, 84.2%, 60.2%), hsl(0, 84.2%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Violations & Penalties</h2>
            <p className="mb-4">
              Failure to comply with these guidelines may result in:
            </p>
            <ul className="space-y-2">
              <li>• Warning notifications</li>
              <li>• Temporary listing suspension</li>
              <li>• Permanent account termination</li>
              <li>• Forfeiture of pending payments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerGuidelines;