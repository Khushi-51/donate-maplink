
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-maplink-green to-green-400 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Map<span className="text-maplink-orange">Link</span>
              </h1>
              <p className="text-xl md:text-2xl font-light mb-6">
                Connecting surplus food to those in need
              </p>
              <p className="mb-8 text-white/80 max-w-lg">
                Our platform uses cutting-edge technology to reduce food waste and 
                fight hunger by linking food donors with NGOs. Every donation is 
                tracked transparently on the blockchain.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-white text-maplink-green hover:bg-white/90">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white/10">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1488330890490-c291ecf62571?ixlib=rb-4.0.3"
                alt="Food donation"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How MapLink Works</h2>
            <p className="text-muted-foreground mt-2">
              Our innovative platform simplifies food donation and distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-maplink-green/10 text-maplink-green w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                </div>
                <h3 className="font-bold text-xl text-center mb-2">Donate Surplus Food</h3>
                <p className="text-muted-foreground text-center">
                  Businesses and individuals can easily list their surplus food 
                  items with details on quantity, expiry date, and pickup location.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-maplink-orange/10 text-maplink-orange w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                </div>
                <h3 className="font-bold text-xl text-center mb-2">Find On Live Map</h3>
                <p className="text-muted-foreground text-center">
                  NGOs can browse available donations on our interactive map, 
                  filter by food type, and request pickups from nearby locations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-maplink-blue/10 text-maplink-blue w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                </div>
                <h3 className="font-bold text-xl text-center mb-2">Track on Blockchain</h3>
                <p className="text-muted-foreground text-center">
                  Every donation is recorded on the blockchain, ensuring complete 
                  transparency and traceability from donor to recipient.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <section className="py-16 bg-maplink-lightgray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3"
                alt="AI Prediction"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                AI-Powered Expiry Prediction
              </h2>
              <p className="mb-6 text-muted-foreground">
                Our advanced machine learning algorithm analyzes food type, storage 
                conditions, and environmental factors to accurately predict expiry 
                dates and reduce waste.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time expiry monitoring",
                  "Proactive alerts before food goes bad",
                  "Storage recommendations to extend shelf life",
                  "Food waste reduction analytics"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="bg-maplink-green rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link to="/ai-expiry">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-maplink-green text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="mt-2 text-white/80">
              Together, we're making a difference in our communities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5,280+", label: "Kilograms of Food Saved" },
              { value: "120+", label: "Active Donors" },
              { value: "45+", label: "NGO Partners" },
              { value: "2,400+", label: "People Fed" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Fight Against Food Waste</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're a business with surplus food or an organization helping 
            those in need, MapLink provides the technology to make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Sign Up as Donor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Register as NGO</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Map<span className="text-maplink-orange">Link</span>
              </h3>
              <p className="text-gray-400">
                Connecting surplus food to those in need through technology.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About Us", "How It Works", "FAQ"].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Donors</h4>
              <ul className="space-y-2">
                {["Register as Donor", "Donation Guidelines", "Success Stories", "Business Partners"].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">For NGOs</h4>
              <ul className="space-y-2">
                {["Register as NGO", "Finding Donations", "Verification Process", "Impact Reporting"].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} MapLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
