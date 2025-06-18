import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import APIDetailPage from "./pages/APIDetailPage";
import ExamplesGalleryPage from "./pages/ExamplesGalleryPage";
import GuidesListingPage from "./pages/GuidesListingPage";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/a-p-i-detail" element={<APIDetailPage />} />
          <Route path="/examples-gallery" element={<ExamplesGalleryPage />} />
          <Route path="/guides-listing" element={<GuidesListingPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
