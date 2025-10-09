import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CommissionStructure = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Commission Structure</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">How Our Commission Works</h2>
            <p className="mb-4">
              PGConnect operates on a simple and transparent commission model. We only charge when you successfully 
              get a booking, ensuring our success is aligned with yours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg p-6 text-center shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
              <h3 className="text-xl font-semibold mb-4">Standard Plan</h3>
              <div className="text-3xl font-bold mb-4">8%</div>
              <p className="mb-4">Commission per booking</p>
              <ul className="text-sm space-y-1">
                <li>• Basic listing features</li>
                <li>• Standard support</li>
                <li>• Payment processing</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-6 text-center shadow-lg border-2" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white', borderColor: 'hsl(38, 92%, 50%)'}}>
              <h3 className="text-xl font-semibold mb-4">Premium Plan</h3>
              <div className="text-3xl font-bold mb-4">6%</div>
              <p className="mb-4">Commission per booking</p>
              <ul className="text-sm space-y-1">
                <li>• Priority listing</li>
                <li>• Professional photography</li>
                <li>• Dedicated support</li>
                <li>• Marketing boost</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-6 text-center shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
              <h3 className="text-xl font-semibold mb-4">Enterprise Plan</h3>
              <div className="text-3xl font-bold mb-4">4%</div>
              <p className="mb-4">Commission per booking</p>
              <ul className="text-sm space-y-1">
                <li>• Multiple properties</li>
                <li>• Custom solutions</li>
                <li>• Account manager</li>
                <li>• Advanced analytics</li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">When We Charge</h3>
                <ul className="space-y-1">
                  <li>• Only after successful booking</li>
                  <li>• When tenant moves in</li>
                  <li>• No upfront fees</li>
                  <li>• No hidden charges</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Schedule</h3>
                <ul className="space-y-1">
                  <li>• Monthly commission deduction</li>
                  <li>• Automatic from rent collection</li>
                  <li>• Detailed monthly statements</li>
                  <li>• 24/7 payment support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(38, 92%, 50%), hsl(38, 92%, 40%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Additional Services</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Professional Photography</span>
                <span className="font-semibold">₹2,000 (one-time)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Property Verification</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tenant Background Check</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Legal Agreement Support</span>
                <span className="font-semibold">₹500 per agreement</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 text-center shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h3 className="text-xl font-semibold mb-4">Questions about our commission?</h3>
            <p className="mb-4">Our team is here to help you understand our pricing structure</p>
            <button className="px-6 py-2 rounded-lg font-semibold transition-colors" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionStructure;