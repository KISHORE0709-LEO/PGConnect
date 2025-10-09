import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FAQs = () => {
  const faqs = [
    {
      question: "How do I book a PG through PGConnect?",
      answer: "Simply browse available PGs, select your preferred property, schedule a visit, and complete the booking with online payment."
    },
    {
      question: "Is there a booking fee?",
      answer: "No, PGConnect doesn't charge any booking fee from students. Our commission is paid by PG owners."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking as per our refund policy. Check the refund policy page for detailed terms."
    },
    {
      question: "Are all PGs verified?",
      answer: "Yes, all PGs listed on our platform undergo thorough verification including document checks and physical inspections."
    },
    {
      question: "What if I face issues with my PG?",
      answer: "Contact our 24/7 support team. We'll help resolve any issues with your accommodation or facilitate a transfer if needed."
    },
    {
      question: "Do you provide student insurance?",
      answer: "Yes, we offer optional student insurance covering health, belongings, and accommodation-related issues."
    }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 rounded-lg p-6 text-center shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
          <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
          <p className="mb-4">Our support team is here to help you 24/7</p>
          <button className="px-6 py-2 rounded-lg font-semibold transition-colors" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;