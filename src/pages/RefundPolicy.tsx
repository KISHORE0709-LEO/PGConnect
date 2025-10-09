import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Refund Policy</h1>
        <p className="mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Last updated: January 2025</p>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p>
              At PGConnect, we understand that plans can change. Our refund policy is designed to be fair to both 
              students and PG owners while ensuring the sustainability of our platform.
            </p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Booking Cancellation by Students</h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                <h3 className="font-semibold mb-2">Before Check-in (More than 7 days)</h3>
                <ul className="space-y-1">
                  <li>• 100% refund of booking amount</li>
                  <li>• Processing time: 3-5 business days</li>
                  <li>• No cancellation charges</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                <h3 className="font-semibold mb-2">Before Check-in (3-7 days)</h3>
                <ul className="space-y-1">
                  <li>• 75% refund of booking amount</li>
                  <li>• 25% cancellation charges</li>
                  <li>• Processing time: 5-7 business days</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                <h3 className="font-semibold mb-2">Before Check-in (Less than 3 days)</h3>
                <ul className="space-y-1">
                  <li>• 50% refund of booking amount</li>
                  <li>• 50% cancellation charges</li>
                  <li>• Processing time: 7-10 business days</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">After Check-in Cancellations</h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                <h3 className="font-semibold mb-2">Within 24 hours of check-in</h3>
                <p>If the property doesn't match the listing or has serious issues:</p>
                <ul className="space-y-1 mt-2">
                  <li>• Full refund after verification</li>
                  <li>• Alternative accommodation assistance</li>
                  <li>• No charges for genuine complaints</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-4" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                <h3 className="font-semibold mb-2">After 24 hours</h3>
                <ul className="space-y-1">
                  <li>• Refund based on remaining tenure</li>
                  <li>• 30-day notice period required</li>
                  <li>• Subject to PG owner's terms</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">PG Owner Cancellations</h2>
            <div className="space-y-4">
              <p>If a PG owner cancels a confirmed booking:</p>
              <ul className="space-y-2">
                <li>• Student receives 100% refund immediately</li>
                <li>• PG owner pays penalty to PGConnect</li>
                <li>• Alternative accommodation assistance provided</li>
                <li>• Compensation for inconvenience may apply</li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(0, 84.2%, 60.2%), hsl(0, 84.2%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Situations</h2>
            <p className="mb-4">Refunds will not be provided in the following cases:</p>
            <ul className="space-y-2">
              <li>• Violation of PG rules leading to eviction</li>
              <li>• Damage to property beyond normal wear</li>
              <li>• Providing false information during booking</li>
              <li>• No-show without prior cancellation</li>
              <li>• Requests made after the refund period</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>1</div>
                <div>
                  <h3 className="font-semibold">Submit Request</h3>
                  <p>Contact our support team with your booking details</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>2</div>
                <div>
                  <h3 className="font-semibold">Review & Verification</h3>
                  <p>We review your request and verify the details</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>3</div>
                <div>
                  <h3 className="font-semibold">Processing</h3>
                  <p>Refund is processed to your original payment method</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>4</div>
                <div>
                  <h3 className="font-semibold">Confirmation</h3>
                  <p>You receive confirmation once the refund is completed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(38, 92%, 50%), hsl(38, 92%, 40%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
            <ul className="space-y-2">
              <li>• Refunds are processed to the original payment method only</li>
              <li>• Bank processing times may vary (3-10 business days)</li>
              <li>• Service charges and taxes are non-refundable</li>
              <li>• Partial month refunds are calculated on a pro-rata basis</li>
              <li>• All refund requests must be made through official channels</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Contact for Refunds</h2>
            <p className="mb-4">
              For refund requests or questions about our refund policy:
            </p>
            <div>
              <p>Email: refunds@pgconnect.com</p>
              <p>Phone: +91-9876543210</p>
              <p>Support Hours: 9:00 AM - 7:00 PM (Mon-Sat)</p>
              <p>Emergency: 24/7 support available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;