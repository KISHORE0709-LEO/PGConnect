import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-center" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Contact Us</h1>
        <p className="text-xl text-center mb-12" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>
          We're here to help! Reach out to us anytime.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-lg p-8 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: 'white', focusRingColor: 'rgba(255,255,255,0.5)'}}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: 'white'}}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                  style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: 'white'}}
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold transition-colors"
                style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+91-9876543210</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>support@pgconnect.com</p>
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p>123 Tech Park, Sector 5<br />Gurgaon, Haryana 122001</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <div className="mt-4 pt-4" style={{borderTop: '1px solid rgba(255,255,255,0.2)'}}>
                  <p className="font-semibold">Emergency Support: 24/7</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(38, 92%, 50%), hsl(38, 92%, 40%))', color: 'white'}}>
              <h3 className="text-xl font-semibold mb-4">Quick Support</h3>
              <div className="space-y-3">
                <button className="w-full py-2 rounded-lg font-semibold transition-colors" style={{backgroundColor: 'white', color: 'hsl(38, 92%, 50%)'}}>
                  Live Chat
                </button>
                <button className="w-full py-2 rounded-lg font-semibold border transition-colors" style={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)'}}>
                  WhatsApp Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;