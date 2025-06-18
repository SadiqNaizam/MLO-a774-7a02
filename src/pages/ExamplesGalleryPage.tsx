import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import InteractiveAnimationDemo from '@/components/InteractiveAnimationDemo'; // Custom component
import CodeBlockViewer from '@/components/CodeBlockViewer'; // Custom component
import { Home, BookOpenText, CodeXml, Search as SearchIcon, SquarePlay } from 'lucide-react';

// Placeholder data for animation examples
const animationExamplesData = [
  {
    id: '1',
    title: 'Simple Fade Animation',
    description: 'This example demonstrates a basic fade-in and fade-out effect on an element. Ideal for smooth appearances and disappearances.',
    animationType: 'fade' as 'fade' | 'slide' | 'scale',
    codeString: `
import { motion } from 'framer-motion';

// ...
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.7 }}
>
  Fade Example
</motion.div>
    `
  },
  {
    id: '2',
    title: 'Dynamic Slide Transition',
    description: 'Watch an element slide into view from the side. This uses a spring-like transition for a more natural feel.',
    animationType: 'slide' as 'fade' | 'slide' | 'scale',
    codeString: `
import { motion } from 'framer-motion';

// ...
<motion.div
  initial={{ x: "-100vw", opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 80, damping: 15 }}
>
  Slide Example
</motion.div>
    `
  },
  {
    id: '3',
    title: 'Scale & Rotate Effect',
    description: 'An engaging animation where an element scales up and rotates. Useful for highlighting interactive elements.',
    animationType: 'scale' as 'fade' | 'slide' | 'scale',
    codeString: `
import { motion } from 'framer-motion';

// ...
<motion.div
  initial={{ scale: 0.5, rotate: -45 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Scale & Rotate
</motion.div>
    `
  },
  {
    id: '4',
    title: 'Keyframe Sequence Animation',
    description: 'A more complex animation showing movement through multiple points using keyframes.',
    animationType: 'slide' as 'fade' | 'slide' | 'scale', // Using 'slide' as a base for demo
    codeString: `
import { motion } from 'framer-motion';

// ...
<motion.div
  animate={{
    x: [0, 100, 0, -100, 0],
    y: [0, 50, 100, 50, 0],
    rotate: [0, 90, 180, 270, 360],
  }}
  transition={{
    duration: 5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop"
  }}
>
  Keyframes
</motion.div>
    `
  }
];

const ExamplesGalleryPage = () => {
  console.log('ExamplesGalleryPage loaded');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Show 2 examples per page for this demo

  const totalPages = Math.ceil(animationExamplesData.length / itemsPerPage);
  const currentExamples = animationExamplesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  // Placeholder Header Structure
  const PageHeader = () => (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <SquarePlay className="mr-2 h-7 w-7 text-indigo-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">AnimDocs</span>
        </Link>
        <nav className="flex items-center space-x-3 sm:space-x-6">
          <Link to="/" className="hover:text-indigo-300 transition-colors flex items-center text-sm sm:text-base">
            <Home className="mr-1 h-4 w-4" /> Home
          </Link>
          <Link to="/guides-listing" className="hover:text-indigo-300 transition-colors flex items-center text-sm sm:text-base">
            <BookOpenText className="mr-1 h-4 w-4" /> Guides
          </Link>
          <Link to="/examples-gallery" className="text-indigo-300 font-semibold transition-colors flex items-center text-sm sm:text-base">
            <CodeXml className="mr-1 h-4 w-4" /> Examples
          </Link>
          <Link to="/a-p-i-detail" className="hover:text-indigo-300 transition-colors flex items-center text-sm sm:text-base">
            <CodeXml className="mr-1 h-4 w-4" /> API
          </Link>
          <Link to="/search" className="p-2 rounded-md hover:bg-slate-700 transition-colors">
            <SearchIcon className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );

  // Placeholder DocsContentSidebar Structure
  const DocsContentSidebar = () => (
    <aside className="w-64 bg-slate-50 p-6 space-y-4 border-r border-slate-200 hidden lg:block">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Example Categories</h3>
      <ul className="space-y-2">
        <li><a href="#basic" className="text-slate-600 hover:text-indigo-600 text-sm">Basic Transitions</a></li>
        <li><a href="#physics" className="text-slate-600 hover:text-indigo-600 text-sm">Physics-based</a></li>
        <li><a href="#keyframes" className="text-slate-600 hover:text-indigo-600 text-sm">Keyframe Animations</a></li>
        <li><a href="#scroll" className="text-slate-600 hover:text-indigo-600 text-sm">Scroll-triggered</a></li>
        <li><a href="#ui-elements" className="text-slate-600 hover:text-indigo-600 text-sm">UI Elements</a></li>
      </ul>
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-md font-semibold text-slate-700 mb-2">Filters</h4>
        {/* Placeholder for filter options */}
        <p className="text-xs text-slate-500">Filter options coming soon.</p>
      </div>
    </aside>
  );

  // Placeholder Footer Structure
  const PageFooter = () => (
    <footer className="bg-slate-800 text-slate-400 py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Animation System Docs. All rights reserved.</p>
        <p className="text-xs mt-1">Built with React, Tailwind CSS, and shadcn/ui.</p>
      </div>
    </footer>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <PageHeader />
      <div className="flex flex-1 container mx-auto px-0 sm:px-4 py-0 sm:py-8">
        <DocsContentSidebar />
        <main className="flex-1 p-4 sm:p-8 bg-white shadow-sm sm:rounded-r-lg lg:rounded-none">
          <section aria-labelledby="gallery-title">
            <div className="mb-8 pb-4 border-b border-slate-200">
              <h1 id="gallery-title" className="text-3xl font-bold text-slate-800">Animation Examples</h1>
              <p className="mt-2 text-slate-600">
                Explore interactive demonstrations of various animation techniques. Each example includes a live preview and the corresponding code snippet.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {currentExamples.map((example) => (
                <Card key={example.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <CardTitle className="text-xl text-slate-700">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600 mb-6">{example.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div>
                        <h4 className="text-md font-semibold text-slate-700 mb-2">Live Demo:</h4>
                        <InteractiveAnimationDemo animationType={example.animationType} />
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-slate-700 mb-2">Code:</h4>
                        <CodeBlockViewer codeString={example.codeString} language="javascript" fileName={`${example.title.replace(/\s+/g, '')}.tsx`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {totalPages > 1 && (
            <section className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined} 
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                   {/* Basic ellipsis, not fully dynamic for many pages */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined} 
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>
          )}
        </main>
      </div>
      <PageFooter />
    </div>
  );
};

export default ExamplesGalleryPage;