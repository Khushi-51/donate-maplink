
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo size="medium" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-800 dark:to-green-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <Logo size="large" className="mb-6" />
              <p className="text-xl md:text-2xl font-light mb-6">
                Connecting surplus food to those in need
              </p>
              <p className="mb-8 text-white/80 max-w-lg">
                Our platform uses cutting-edge technology to reduce food waste and 
                fight hunger by linking food donors with NGOs. Every donation is 
                tracked transparently on the blockchain.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-white text-green-600 hover:bg-white/90 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white/10">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-orange-500 rounded-lg dark:bg-orange-600"></div>
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3"
                  alt="Food donation"
                  className="rounded-lg shadow-xl w-full max-w-md mx-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white">How ZeroWaste Works</h2>
            <p className="text-muted-foreground mt-2 dark:text-gray-400">
              Our innovative platform simplifies food donation and distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="pt-6">
                <div className="mb-4 bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                </div>
                <h3 className="font-bold text-xl text-center mb-2 dark:text-white">Donate Surplus Food</h3>
                <p className="text-muted-foreground text-center dark:text-gray-400">
                  Businesses and individuals can easily list their surplus food 
                  items with details on quantity, expiry date, and pickup location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="pt-6">
                <div className="mb-4 bg-orange-500/10 text-orange-500 dark:bg-orange-400/10 dark:text-orange-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                </div>
                <h3 className="font-bold text-xl text-center mb-2 dark:text-white">Find On Live Map</h3>
                <p className="text-muted-foreground text-center dark:text-gray-400">
                  NGOs can browse available donations on our interactive map, 
                  filter by food type, and request pickups from nearby locations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="pt-6">
                <div className="mb-4 bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                </div>
                <h3 className="font-bold text-xl text-center mb-2 dark:text-white">Track on Blockchain</h3>
                <p className="text-muted-foreground text-center dark:text-gray-400">
                  Every donation is recorded on the blockchain, ensuring complete 
                  transparency and traceability from donor to recipient.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <section className="py-16 bg-maplink-lightgray dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-green-500 rounded-lg opacity-50 dark:bg-green-700"></div>
                <img
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3"
                  alt="AI Prediction"
                  className="rounded-lg shadow-xl w-full relative z-10"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">
                AI-Powered Expiry Prediction
              </h2>
              <p className="mb-6 text-muted-foreground dark:text-gray-300">
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
                  <li key={index} className="flex items-center gap-2 dark:text-gray-300">
                    <div className="bg-green-500 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600" asChild>
                <Link to="/ai-expiry">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-500 dark:from-green-800 dark:to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="mt-2 text-white/80">
              Together, we're making a difference in our communities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5,280+", label: "Kilograms of Food Saved", icon: "package" },
              { value: "120+", label: "Active Donors", icon: "users" },
              { value: "45+", label: "NGO Partners", icon: "building" },
              { value: "2,400+", label: "People Fed", icon: "smile" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white">Success Stories</h2>
            <p className="text-muted-foreground mt-2 dark:text-gray-400">
              Hear from our community of donors and NGO partners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ZeroWaste has transformed how we handle excess food inventory. Instead of throwing away unsold items, we now connect with local shelters.",
                name: "Sarah Johnson",
                role: "Cafe Owner",
                image: "https://images.unsplash.com/photo-1567532939604-b6b5b398ccff?ixlib=rb-4.0.3"
              },
              {
                quote: "The platform's efficiency and transparency have allowed us to feed twice as many people with the same resources.",
                name: "Michael Rodriguez",
                role: "Food Bank Director",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3"
              },
              {
                quote: "The AI expiry prediction has been a game-changer for our restaurant. We've reduced waste by over 40% in just three months.",
                name: "Priya Patel",
                role: "Restaurant Manager",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6">
                    <p className="italic text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
                  </div>
                  <div className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-400 dark:from-orange-600 dark:to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Fight Against Food Waste</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Whether you're a business with surplus food or an organization helping 
            those in need, ZeroWaste provides the technology to make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-orange-500 hover:bg-white/90 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700">
              <Link to="/signup">Sign Up as Donor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/signup">Register as NGO</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="medium" className="mb-4" />
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
            <p>© {new Date().getFullYear()} ZeroWaste. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
