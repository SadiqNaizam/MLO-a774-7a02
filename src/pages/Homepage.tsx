import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input'; // For potential search in header
import InteractiveAnimationDemo from '@/components/InteractiveAnimationDemo'; // Custom component
import { Rocket, Palette, Code2, Search as SearchIcon, ArrowRight } from 'lucide-react';

const Homepage = () => {
  console.log('Homepage loaded');

  const features = [
    {
      icon: <Rocket className="h-8 w-8 mb-4 text-primary" />,
      title: 'Blazing Fast Performance',
      description: 'Optimized for speed, ensuring smooth animations even in complex UIs and interactions.',
    },
    {
      icon: <Palette className="h-8 w-8 mb-4 text-primary" />,
      title: 'Expressive & Flexible API',
      description: 'Fine-grained control with an intuitive API for keyframes, timelines, physics, and more.',
    },
    {
      icon: <Code2 className="h-8 w-8 mb-4 text-primary" />,
      title: 'Developer Friendly',
      description: 'Easy to integrate and use, with comprehensive documentation, guides, and examples.',
    },
  ];

  const carouselItems = [
    {
      title: 'New Guide: Mastering Easing Functions',
      description: 'Deep dive into various easing techniques for natural motion.',
      link: '/guides-listing', // Link to the general guides page
      linkLabel: 'Read Guide',
    },
    {
      title: 'Example: Complex UI Transitions',
      description: 'Showcase of advanced transition animations between views.',
      link: '/examples-gallery', // Link to the general examples page
      linkLabel: 'View Example',
    },
    {
      title: 'API Update: Enhanced Timeline Controls',
      description: 'Discover new features for orchestrating complex animation sequences.',
      link: '/a-p-i-detail', // Link to the general API detail/listing page
      linkLabel: 'Explore API',
    },
     {
      title: 'Community Spotlight: Amazing Creations',
      description: 'See what developers are building with our animation library.',
      link: '/examples-gallery', 
      linkLabel: 'See More',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            AnimLib<span className="font-light">Docs</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/guides-listing">Guides</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/examples-gallery">Examples</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/a-p-i-detail">API Reference</Link>
            </Button>
             <Link to="/search">
                <Button variant="outline" size="sm">
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                </Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Link to="/search">
                <Button variant="ghost" size="icon" aria-label="Search">
                    <SearchIcon className="h-5 w-5" />
                </Button>
            </Link>
            {/* TODO: Add mobile menu toggle here if needed */}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-br from-purple-600 via-primary to-indigo-700 dark:from-purple-700 dark:via-primary/90 dark:to-indigo-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Craft Stunning Animations with Ease
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-purple-100 dark:text-purple-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our high-performance animation library empowers you to build rich, interactive, and delightful user experiences.
            </motion.p>
            <motion.div 
              className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 dark:bg-gray-100 dark:text-primary dark:hover:bg-gray-200 shadow-lg transform hover:scale-105 transition-transform duration-200 w-full sm:w-auto">
                <Link to="/guides-listing">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary dark:hover:bg-gray-800 dark:hover:text-white dark:border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-200 w-full sm:w-auto">
                <Link to="/examples-gallery">View Examples</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
              Why Choose <span className="text-primary">AnimLib</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800/50">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              See It In Action
            </h2>
            <InteractiveAnimationDemo animationType="slide" />
          </div>
        </section>

        {/* Carousel Section for Updates/Featured Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
              What's New & Noteworthy
            </h2>
            <Carousel 
              className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                // Autoplay({ delay: 5000 }) // Example: if Autoplay plugin is installed and imported
              ]}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800/50">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                           <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-white dark:text-primary dark:border-primary dark:hover:bg-primary dark:hover:text-gray-950">
                            <Link to={item.link}>
                              {item.linkLabel} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-16 md:py-24 text-center bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">Ready to Create?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
                    Explore our comprehensive guides, detailed API documentation, and inspiring examples to start building amazing animations today.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
                    <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 w-full sm:w-auto">
                        <Link to="/guides-listing">Explore Guides</Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                        <Link to="/a-p-i-detail">Browse API Docs</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} AnimLib. All rights reserved. Built with Passion.</p>
          <nav className="mt-2 space-x-4">
            <Link to="/search" className="hover:text-primary">Search</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
            {/* Add more footer links as needed */}
          </nav>
        </div>
      </footer>
    </div>
  );
};

// Dummy motion component for the example hero - replace with actual framer-motion if installed and configured
// For this exercise, we assume framer-motion is available via dependencies, so this is just illustrative.
// If not, remove motion.div and related props for a static version.
const motion = {
  div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { initial?: any, animate?: any, transition?: any }) => <div {...props}>{children}</div>,
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { initial?: any, animate?: any, transition?: any }) => <h1 {...props}>{children}</h1>,
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { initial?: any, animate?: any, transition?: any }) => <p {...props}>{children}</p>,
};


export default Homepage;