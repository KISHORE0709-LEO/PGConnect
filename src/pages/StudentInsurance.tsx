import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const StudentInsurance = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Student Insurance</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Student Insurance?</h2>
            <p className="mb-4">
              Protect yourself and your belongings while staying in a PG. Our comprehensive insurance covers health emergencies, 
              personal belongings, and accommodation-related issues.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
              <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
              <div className="space-y-2">
                <p><strong>₹999/year</strong></p>
                <p>• Health coverage up to ₹1 Lakh</p>
                <p>• Personal belongings up to ₹25,000</p>
                <p>• 24/7 helpline support</p>
                <p>• Accommodation dispute resolution</p>
              </div>
              <button className="mt-4 px-4 py-2 rounded-lg font-semibold transition-colors w-full" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>
                Choose Basic
              </button>
            </div>
            
            <div className="rounded-lg p-6 shadow-lg border-2" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white', borderColor: 'hsl(38, 92%, 50%)'}}>
              <h3 className="text-xl font-semibold mb-4">Premium Plan</h3>
              <div className="space-y-2">
                <p><strong>₹1,999/year</strong></p>
                <p>• Health coverage up to ₹3 Lakhs</p>
                <p>• Personal belongings up to ₹75,000</p>
                <p>• Emergency accommodation</p>
                <p>• Legal assistance</p>
                <p>• Family coverage extension</p>
              </div>
              <button className="mt-4 px-4 py-2 rounded-lg font-semibold transition-colors w-full" style={{backgroundColor: 'hsl(38, 92%, 50%)', color: 'white'}}>
                Choose Premium
              </button>
            </div>
          </div>
          
          <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
            <h3 className="text-xl font-semibold mb-4">How to Apply</h3>
            <ol className="space-y-2">
              <li>1. Choose your preferred insurance plan</li>
              <li>2. Fill out the application form with your details</li>
              <li>3. Upload required documents (ID proof, PG agreement)</li>
              <li>4. Make payment online</li>
              <li>5. Receive your insurance certificate within 24 hours</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInsurance;