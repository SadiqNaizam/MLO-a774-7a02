import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import APIMemberCard, { APIMemberCardProps } from '@/components/APIMemberCard'; // Custom component
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { Search as SearchIcon, FileText, Code, Box, ArrowRight } from 'lucide-react';

interface SearchResultItem {
  id: string;
  type: 'guide' | 'api' | 'example' | 'api-member';
  title: string;
  snippet: string;
  link: string;
  apiMemberProps?: APIMemberCardProps; // Only for 'api-member' type
}

// Placeholder search results
const allResults: SearchResultItem[] = [
  {
    id: 'guide1',
    type: 'guide',
    title: 'Understanding Easing in Animations',
    snippet: 'Explore the core concepts of easing functions and how they bring animations to life with natural, smooth transitions...',
    link: '/guides-listing#easing-guide', // Link to a section or specific guide if structure allows
  },
  {
    id: 'api1',
    type: 'api-member',
    title: 'easeInOutQuad',
    snippet: 'A quadratic easing function that accelerates and decelerates.',
    link: '/a-p-i-detail#easeInOutQuad', // Link to API detail page, potentially with hash
    apiMemberProps: {
      name: 'easeInOutQuad',
      memberType: 'function',
      signature: '(t: number): number',
      description: 'Provides a quadratic easing in and out. Ideal for smooth starts and stops.',
      docLink: '/a-p-i-detail#easeInOutQuad', // This should ideally be the exact link
    }
  },
  {
    id: 'example1',
    type: 'example',
    title: 'Carousel with Custom Easing',
    snippet: 'See a practical example of implementing custom easing functions in a carousel component for unique slide transitions.',
    link: '/examples-gallery#carousel-easing',
  },
  {
    id: 'guide2',
    type: 'guide',
    title: 'Mastering Keyframe Animations',
    snippet: 'Learn how to create complex animations using keyframes, defining multiple states over time for precise control.',
    link: '/guides-listing#keyframes',
  },
  {
    id: 'api2',
    type: 'api-member',
    title: 'AnimationController',
    snippet: 'The main class for controlling animation playback, state, and lifecycle.',
    link: '/a-p-i-detail#AnimationController',
    apiMemberProps: {
      name: 'AnimationController',
      memberType: 'class',
      description: 'Manages animation sequences, allowing for play, pause, stop, and seeking operations. Essential for orchestrating animations.',
      docLink: '/a-p-i-detail#AnimationController',
    }
  },
  {
    id: 'example2',
    type: 'example',
    title: 'Dynamic List Item Entrance Animations',
    snippet: 'An example showcasing how to animate list items as they enter the view, using various easing and staggering techniques.',
    link: '/examples-gallery#list-entrance',
  }
];

const ITEMS_PER_PAGE = 3;

const SearchPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResultItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Extract search query from URL params on initial load (e.g., /search?q=easing)
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q') || '';
    setSearchTerm(q);
    setCurrentQuery(q);
    console.log('SearchPage loaded, initial query:', q);
  }, [location.search]);

  useEffect(() => {
    if (currentQuery) {
      const results = allResults.filter(item =>
        item.title.toLowerCase().includes(currentQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(currentQuery.toLowerCase()) ||
        (item.apiMemberProps?.name.toLowerCase().includes(currentQuery.toLowerCase()))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]); // Or show all/popular results if query is empty
    }
    setCurrentPage(1); // Reset to first page on new search
  }, [currentQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentQuery(searchTerm);
    // Update URL query parameter (optional, but good UX)
    // navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    // For this exercise, direct update is fine.
    console.log('Search submitted:', searchTerm);
  };
  
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getResultIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'guide': return <FileText className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />;
      case 'api-member': return <Code className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />;
      case 'example': return <Box className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0" />;
      default: return <FileText className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Simplified Header for Search Page */}
      <header className="bg-background border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary mb-4 sm:mb-0">
            Animation Docs
          </Link>
          <form onSubmit={handleSearchSubmit} className="w-full sm:w-auto sm:max-w-md flex">
            <Input
              type="search"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" variant="default" className="ml-2">
              <SearchIcon className="h-4 w-4 mr-2 sm:mr-0" />
              <span className="hidden sm:inline ml-2">Search</span>
            </Button>
          </form>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section aria-labelledby="search-results-heading">
          {currentQuery ? (
            <h1 id="search-results-heading" className="text-2xl sm:text-3xl font-semibold mb-6">
              Results for "{currentQuery}"
            </h1>
          ) : (
            <h1 id="search-results-heading" className="text-2xl sm:text-3xl font-semibold mb-6">
              Enter a search term to begin
            </h1>
          )}

          {filteredResults.length > 0 ? (
            <div className="space-y-6">
              {paginatedResults.map((item) => (
                item.type === 'api-member' && item.apiMemberProps ? (
                  <APIMemberCard key={item.id} {...item.apiMemberProps} docLink={item.link} />
                ) : (
                  <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center">
                        {getResultIcon(item.type)}
                        <CardTitle className="text-xl">
                          <Link to={item.link} className="hover:underline text-primary">
                            {item.title}
                          </Link>
                        </CardTitle>
                      </div>
                      <CardDescription className="capitalize pt-1">{item.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{item.snippet}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm">
                        <Link to={item.link}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              ))}
            </div>
          ) : currentQuery ? (
            <p className="text-muted-foreground text-lg">No results found for "{currentQuery}". Try a different search term.</p>
          ) : (
             <p className="text-muted-foreground text-lg">Start by typing your query in the search bar above.</p>
          )}
        </section>

        {totalPages > 1 && (
          <section className="mt-12" aria-label="Search results pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                   // Simplified pagination, ideally show ellipsis for many pages
                  <PaginationItem key={i + 1}> 
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>

      {/* Simplified Footer */}
      <footer className="bg-muted py-6 mt-auto border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Animation System Documentation. All rights reserved.
          <p className="mt-1">
            <Link to="/" className="hover:underline">Homepage</Link> | 
            <Link to="/guides-listing" className="hover:underline ml-2">Guides</Link> | 
            <Link to="/examples-gallery" className="hover:underline ml-2">Examples</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;