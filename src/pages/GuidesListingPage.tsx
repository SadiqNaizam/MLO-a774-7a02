import React from 'react';
import { Link } from 'react-router-dom';
import APIMemberCard, { APIMemberCardProps } from '@/components/APIMemberCard'; // Custom component

// Placeholder Header Component
const PlaceholderHeader = () => (
  <header className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-slate-300 transition-colors">
        Animation System Docs
      </Link>
      <nav className="space-x-4">
        <Link to="/guides-listing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Guides
        </Link>
        <Link to="/examples-gallery" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Examples
        </Link>
        <Link to="/a-p-i-detail" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          API Reference
        </Link>
        <Link to="/search" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Search
        </Link>
      </nav>
    </div>
  </header>
);

// Placeholder DocsContentSidebar Component
const PlaceholderDocsContentSidebar = () => (
  <aside className="w-72 bg-slate-50 p-6 border-r border-slate-200 h-full sticky top-[64px] overflow-y-auto"> {/* Assuming header height is 64px */}
    <h3 className="text-base font-semibold mb-3 text-slate-700 tracking-tight">Guide Categories</h3>
    <nav className="flex flex-col space-y-1.5">
      <Link to="/guides-listing?category=getting-started" className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors">
        Getting Started
      </Link>
      <Link to="/guides-listing?category=core-concepts" className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors">
        Core Concepts
      </Link>
      <Link to="/guides-listing?category=how-to-guides" className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors">
        How-to Guides
      </Link>
      <Link to="/guides-listing?category=advanced-techniques" className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors">
        Advanced Techniques
      </Link>
      <Link to="/guides-listing?category=best-practices" className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors">
        Best Practices
      </Link>
      <Link to="/guides-listing?category=integration" className="text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors">
        Integration
      </Link>
    </nav>
  </aside>
);

// Placeholder Footer Component
const PlaceholderFooter = () => (
  <footer className="bg-slate-100 text-slate-600 p-6 text-center text-sm border-t border-slate-200">
    <p>&copy; {new Date().getFullYear()} Animation System Documentation. All rights reserved.</p>
    <p className="mt-1">
      <Link to="/search" className="hover:underline text-blue-600">Search Docs</Link> | 
      <Link to="/" className="hover:underline text-blue-600 ml-1">Homepage</Link>
    </p>
  </footer>
);

// Sample data for guides
const guidesData: Omit<APIMemberCardProps, 'deprecated'>[] = [
  {
    name: "Introduction to the Animation System",
    description: "A beginner-friendly guide to understand the basics and get started with our animation library. Covers setup, first animation, and core principles.",
    docLink: "/guides-listing/introduction", // Placeholder for a specific guide page/route
    memberType: 'type-alias',
  },
  {
    name: "Mastering Keyframe Animations",
    description: "Learn how to create complex and expressive animations using keyframes, custom timing functions, and animation properties.",
    docLink: "/guides-listing/keyframes",
    memberType: 'type-alias',
  },
  {
    name: "Understanding Easing Functions",
    description: "Explore different easing functions (linear, ease-in, ease-out, cubic-bezier) and how they impact the feel and realism of your animations. Includes examples.",
    docLink: "/guides-listing/easing-functions", // As per user journey
    memberType: 'type-alias',
  },
  {
    name: "Performance Best Practices for Smooth Animations",
    description: "Optimize your animations for smooth performance across all devices and browsers. Learn about hardware acceleration, debouncing, and efficient state management.",
    docLink: "/guides-listing/performance",
    memberType: 'type-alias',
  },
  {
    name: "Integrating Animations with React Components",
    description: "Step-by-step tutorial on how to seamlessly integrate the animation library with your React components using hooks and lifecycle methods.",
    docLink: "/guides-listing/react-integration",
    memberType: 'type-alias',
  },
  {
    name: "Advanced Timeline Control and Sequencing",
    description: "Deep dive into timeline management for creating sophisticated animation sequences, synchronizing multiple animations, and controlling playback.",
    docLink: "/guides-listing/timeline-control",
    memberType: 'type-alias',
  },
  {
    name: "State-Driven Animations",
    description: "Learn how to create animations that react to application state changes, making your UI more dynamic and responsive.",
    docLink: "/guides-listing/state-driven-animations",
    memberType: 'type-alias',
  },
  {
    name: "Debugging Animations Effectively",
    description: "Tips and techniques for troubleshooting common animation issues, using browser developer tools, and logging animation states.",
    docLink: "/guides-listing/debugging",
    memberType: 'type-alias',
  },
];

const GuidesListingPage = () => {
  console.log('GuidesListingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PlaceholderHeader />
      <div className="flex flex-1 container mx-auto">
        <PlaceholderDocsContentSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <section aria-labelledby="guides-title">
            <h1 id="guides-title" className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 border-b pb-4">
              Guides &amp; Tutorials
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              Explore our comprehensive guides to learn everything about the animation system, from basic concepts to advanced techniques.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guidesData.map((guide) => (
                <APIMemberCard
                  key={guide.name}
                  name={guide.name}
                  description={guide.description}
                  docLink={guide.docLink}
                  memberType={guide.memberType as APIMemberCardProps['memberType']} // Ensure type compatibility
                />
              ))}
            </div>
          </section>
        </main>
      </div>
      <PlaceholderFooter />
    </div>
  );
};

export default GuidesListingPage;