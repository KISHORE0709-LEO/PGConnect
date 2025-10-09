import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Terms of Service</h1>
        <p className="mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Last updated: January 2025</p>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using PGConnect, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <div className="space-y-4">
              <p>Permission is granted to temporarily use PGConnect for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="space-y-2 ml-4">
                <li>• Modify or copy the materials</li>
                <li>• Use the materials for commercial purposes or public display</li>
                <li>• Attempt to reverse engineer any software</li>
                <li>• Remove any copyright or proprietary notations</li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
            <div className="space-y-4">
              <h3 className="font-semibold">Account Registration</h3>
              <ul className="space-y-2">
                <li>• You must provide accurate and complete information</li>
                <li>• You are responsible for maintaining account security</li>
                <li>• You must notify us of any unauthorized use</li>
                <li>• One person may not maintain multiple accounts</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Account Termination</h3>
              <p>We reserve the right to terminate accounts that violate these terms or engage in fraudulent activity.</p>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Booking and Payment Terms</h2>
            <div className="space-y-4">
              <h3 className="font-semibold">For Students</h3>
              <ul className="space-y-2">
                <li>• All bookings are subject to PG owner approval</li>
                <li>• Payment must be made as per agreed terms</li>
                <li>• Cancellations are subject to our refund policy</li>
                <li>• You must comply with PG rules and regulations</li>
              </ul>
              
              <h3 className="font-semibold mt-4">For PG Owners</h3>
              <ul className="space-y-2">
                <li>• You must provide accurate property information</li>
                <li>• All listings must comply with local laws</li>
                <li>• Commission fees apply as per our structure</li>
                <li>• You must honor confirmed bookings</li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(0, 84.2%, 60.2%), hsl(0, 84.2%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <p className="mb-4">You may not use our service:</p>
            <ul className="space-y-2">
              <li>• For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>• To violate any international, federal, provincial, or state regulations or laws</li>
              <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>• To submit false or misleading information</li>
              <li>• To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p>
              The information on this platform is provided on an 'as is' basis. To the fullest extent permitted by law, 
              PGConnect excludes all representations, warranties, conditions and terms whether express or implied, 
              statutory or otherwise.
            </p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(38, 92%, 50%), hsl(38, 92%, 40%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p>
              In no event shall PGConnect or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use the materials on PGConnect's platform.
            </p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you 
              irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div>
              <p>Email: legal@pgconnect.com</p>
              <p>Phone: +91-9876543210</p>
              <p>Address: 123 Tech Park, Sector 5, Gurgaon, Haryana 122001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;