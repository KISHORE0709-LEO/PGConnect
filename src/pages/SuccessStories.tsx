import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      property: "Kumar PG House",
      story: "Within 3 months of listing on PGConnect, my occupancy rate increased from 60% to 95%. The platform's verification process brings quality tenants.",
      earnings: "₹45,000/month",
      rating: 4.8
    },
    {
      name: "Priya Sharma",
      location: "Bangalore",
      property: "Sharma Residency",
      story: "PGConnect's professional photography and marketing helped me attract students from top colleges. The support team is incredibly responsive.",
      earnings: "₹38,000/month",
      rating: 4.9
    },
    {
      name: "Mohammed Ali",
      location: "Hyderabad",
      property: "Ali Student Home",
      story: "The tenant verification process is excellent. I've had zero payment issues since joining PGConnect. Highly recommend to fellow owners.",
      earnings: "₹52,000/month",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: 'hsl(0, 0%, 100%)'}}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-6" style={{color: 'hsl(217, 91%, 60%)'}}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-center" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>Success Stories</h1>
        <p className="text-xl text-center mb-12" style={{color: 'hsl(222.2, 84%, 4.9%)'}}>
          Hear from PG owners who transformed their business with PGConnect
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <div key={index} className="rounded-lg p-6 shadow-lg" style={{background: 'linear-gradient(to right, hsl(217, 91%, 60%), hsl(217, 91%, 50%))', color: 'white'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{backgroundColor: 'white', color: 'hsl(217, 91%, 60%)'}}>
                  {story.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">{story.name}</h3>
                  <p className="text-sm opacity-90">{story.location}</p>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">{story.property}</h4>
              <p className="text-sm mb-4 leading-relaxed opacity-90">"{story.story}"</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{story.earnings}</p>
                  <p className="text-xs opacity-75">Monthly Revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{color: 'hsl(38, 92%, 50%)'}}>★ {story.rating}</p>
                  <p className="text-xs opacity-75">Rating</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="rounded-lg p-8 shadow-lg" style={{background: 'linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 30%))', color: 'white'}}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Join Our Success Community</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <p>Happy Owners</p>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <p>Occupancy Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold">₹2.5Cr</div>
              <p>Revenue Generated</p>
            </div>
            <div>
              <div className="text-3xl font-bold">4.8★</div>
              <p>Average Rating</p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to Write Your Success Story?</h3>
            <p className="mb-6">Join thousands of successful PG owners on our platform</p>
            <button className="px-8 py-3 rounded-lg font-semibold transition-colors" style={{backgroundColor: 'white', color: 'hsl(142, 76%, 36%)'}}>
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;