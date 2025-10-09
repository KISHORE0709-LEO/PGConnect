import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Privacy Policy</h1>
        <p className="mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Last updated: January 2025</p>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p>We collect information you provide directly, including name, email, phone number, and address when you register or use our services.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <p>We automatically collect information about your interactions with our platform, including pages visited, features used, and time spent.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Device Information</h3>
                <p>We collect information about the device you use to access our services, including IP address, browser type, and operating system.</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="space-y-2">
              <li>• Provide and improve our services</li>
              <li>• Process bookings and payments</li>
              <li>• Communicate with you about your account</li>
              <li>• Send marketing communications (with consent)</li>
              <li>• Ensure platform security and prevent fraud</li>
              <li>• Comply with legal obligations</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <div className="space-y-4">
              <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
              <ul className="space-y-2">
                <li>• With PG owners when you make a booking</li>
                <li>• With service providers who help us operate our platform</li>
                <li>• When required by law or to protect our rights</li>
                <li>• In connection with a business transfer or merger</li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
            <ul className="space-y-2">
              <li>• SSL encryption for data transmission</li>
              <li>• Regular security audits and updates</li>
              <li>• Access controls and authentication</li>
              <li>• Secure data storage and backup systems</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="space-y-2">
              <li>• Access and review your personal information</li>
              <li>• Correct inaccurate or incomplete information</li>
              <li>• Delete your account and personal information</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Data portability and export</li>
            </ul>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(38, 92%, 50%), hsl(38, 92%, 40%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-sm">Required for basic platform functionality</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                <p className="text-sm">Help us understand how you use our platform</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div>
              <p>Email: privacy@pgconnect.com</p>
              <p>Phone: +91-9876543210</p>
              <p>Address: 123 Tech Park, Sector 5, Gurgaon, Haryana 122001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;