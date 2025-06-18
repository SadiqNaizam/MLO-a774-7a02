import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Custom Components
import APIMemberCard, { APIMemberCardProps } from '@/components/APIMemberCard';
import CodeBlockViewer from '@/components/CodeBlockViewer';
import InteractiveAnimationDemo from '@/components/InteractiveAnimationDemo';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Home, BookOpen, Code, PlayCircle, Settings, ChevronRight, ChevronsUpDown, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile sidebar

// Placeholder API Data - In a real app, this would come from a CMS or API
const apiDataStore: Record<string, any> = {
  "AnimationPlayer": {
    name: "AnimationPlayer",
    description: "The AnimationPlayer class is the core of the animation system. It provides fine-grained control over animation playback, allowing you to start, pause, resume, seek, and cancel animations. It operates on a timeline and can manage multiple keyframes and easing functions.",
    constructorParams: [
      { name: "targetElement", type: "HTMLElement", description: "The DOM element to be animated." },
      { name: "keyframes", type: "Keyframe[] | PropertyIndexedKeyframes", description: "An array of keyframes or a keyframe object defining the animation states." },
      { name: "options?", type: "number | KeyframeAnimationOptions", description: "Optional. Animation duration in milliseconds or a comprehensive options object (e.g., duration, easing, iterations)." }
    ],
    properties: [
      { name: "currentTime", memberType: 'property' as APIMemberCardProps['memberType'], signature: "currentTime: number | null", description: "Gets or sets the current time of the animation in milliseconds. Setting it to null makes the animation timeless.", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=currentTime" },
      { name: "duration", memberType: 'property' as APIMemberCardProps['memberType'], signature: "duration: number", description: "Returns the read-only duration of the animation in milliseconds, as computed by the timing function.", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=duration" },
      { name: "playState", memberType: 'property' as APIMemberCardProps['memberType'], signature: "playState: AnimationPlayState", description: "Indicates the current playback state ('idle', 'running', 'paused', 'finished').", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=playState", deprecated: true },
      { name: "playbackRate", memberType: 'property' as APIMemberCardProps['memberType'], signature: "playbackRate: number", description: "Gets or sets the playback rate of the animation. Default is 1 (normal speed).", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=playbackRate" },
    ],
    methods: [
      { name: "play", memberType: 'method' as APIMemberCardProps['memberType'], signature: "play(): void", description: "Starts or resumes playback of the animation from its current time.", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=play" },
      { name: "pause", memberType: 'method' as APIMemberCardProps['memberType'], signature: "pause(): void", description: "Pauses the animation at its current time.", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=pause" },
      { name: "finish", memberType: 'method' as APIMemberCardProps['memberType'], signature: "finish(): void", description: "Advances the animation to its end state and marks it as 'finished'.", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=finish" },
      { name: "cancel", memberType: 'method' as APIMemberCardProps['memberType'], signature: "cancel(): void", description: "Cancels the animation, removing its effects and setting its state to 'idle'.", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=cancel" },
      { name: "reverse", memberType: 'method' as APIMemberCardProps['memberType'], signature: "reverse(): void", description: "Reverses the playback direction of the animation. If playing forward, it will play backward, and vice-versa.", docLink: "/a-p-i-detail?entity=AnimationPlayer&member=reverse" },
    ],
    usageExamples: [
      { title: "Creating and Playing an Animation", language: "typescript", code: 
`const element = document.getElementById('myElement');
if (element) {
  const player = new AnimationPlayer(
    element, 
    [ 
      { transform: 'translateX(0px) rotate(0deg)', opacity: 1 }, 
      { transform: 'translateX(200px) rotate(180deg)', opacity: 0.5 } 
    ], 
    { duration: 2000, easing: 'ease-in-out', iterations: Infinity, direction: 'alternate' }
  );
  player.play();
}`},
      { title: "Playback Control", language: "typescript", code: 
`// Assuming 'player' is an AnimationPlayer instance
const pauseButton = document.getElementById('pauseBtn');
const playButton = document.getElementById('playBtn');

pauseButton?.addEventListener('click', () => player.pause());
playButton?.addEventListener('click', () => player.play());

// Change speed
// player.playbackRate = 2; // Double speed
// player.playbackRate = 0.5; // Half speed
`}
    ],
    relatedLinks: [
      { text: "Comprehensive Keyframes Guide", href: "/guides-listing?guide=keyframes" },
      { text: "Understanding Easing Functions", href: "/a-p-i-detail?entity=EasingFunctions" }
    ]
  },
  "EasingFunctions": { // Example for a related link
    name: "EasingFunctions",
    description: "Provides a collection of common easing functions for use in animations.",
    properties: [], methods: [], usageExamples: [], relatedLinks: [] // Simplified for brevity
  }
};


const APIDetailPage = () => {
  console.log('APIDetailPage loaded');
  const [searchParams] = useSearchParams();
  const entityName = searchParams.get('entity') || "AnimationPlayer"; // Default to AnimationPlayer if no entity specified
  const apiEntity = apiDataStore[entityName] || apiDataStore["AnimationPlayer"]; // Fallback

  const sections = [
    { id: "overview", name: "Overview", icon: BookOpen },
    ...(apiEntity.constructorParams && apiEntity.constructorParams.length > 0 ? [{ id: "constructor", name: "Constructor", icon: Settings }] : []),
    ...(apiEntity.properties && apiEntity.properties.length > 0 ? [{ id: "properties", name: "Properties", icon: ChevronsUpDown }] : []),
    ...(apiEntity.methods && apiEntity.methods.length > 0 ? [{ id: "methods", name: "Methods", icon: Code }] : []),
    ...(apiEntity.usageExamples && apiEntity.usageExamples.length > 0 ? [{ id: "examples", name: "Usage Examples", icon: Code }] : []),
    { id: "interactive-demo", name: "Interactive Demo", icon: PlayCircle },
    ...(apiEntity.relatedLinks && apiEntity.relatedLinks.length > 0 ? [{ id: "related", name: "Related", icon: ChevronRight }] : []),
  ];

  const SidebarContent = () => (
    <nav className="space-y-1 py-4">
      <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">On this page</h3>
      {sections.map(section => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <section.icon className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>{section.name}</span>
        </a>
      ))}
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Simulated Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <PlayCircle className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block">AnimDocs</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/guides-listing" className="text-muted-foreground transition-colors hover:text-foreground">Guides</Link>
              <Link to="/a-p-i-detail" className="text-foreground font-semibold transition-colors hover:text-foreground">API</Link>
              <Link to="/examples-gallery" className="text-muted-foreground transition-colors hover:text-foreground">Examples</Link>
            </nav>
          </div>
          
          {/* Mobile Menu & Logo */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link to="/" className="flex items-center space-x-2 px-4 py-2 border-b">
                  <PlayCircle className="h-6 w-6 text-primary" />
                  <span className="font-bold">AnimDocs</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] overflow-y-auto">
                  <nav className="flex flex-col space-y-3 px-4">
                    <Link to="/guides-listing" className="text-muted-foreground transition-colors hover:text-foreground">Guides</Link>
                    <Link to="/a-p-i-detail" className="text-foreground font-semibold transition-colors hover:text-foreground">API</Link>
                    <Link to="/examples-gallery" className="text-muted-foreground transition-colors hover:text-foreground">Examples</Link>
                  </nav>
                  <div className="mt-6 px-4 border-t pt-4">
                    <SidebarContent />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
             <form action="/search" method="GET" className="w-full max-w-xs sm:max-w-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="search" name="query" placeholder="Search documentation..." className="h-10 w-full rounded-md pl-10 pr-4 text-sm"/>
                </div>
            </form>
          </div>
        </div>
      </header>

      {/* Page Content Area */}
      <div className="container mx-auto flex flex-1 py-6 lg:py-10">
        {/* DocsContentSidebar (Left Sidebar - Desktop) */}
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 pr-8">
          <div className="sticky top-20 h-[calc(100vh-5rem-env(safe-area-inset-bottom))] overflow-y-auto"> {/* Adjust top for header height */}
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0"> {/* min-w-0 for flex child truncation within flex layouts */}
          <Breadcrumb className="mb-6 md:mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/"><Home className="h-4 w-4 mr-1.5 inline-block" />Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/a-p-i-detail">API Reference</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{apiEntity.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none"> {/* Using Tailwind Typography plugin classes */}
            <header id="overview" className="mb-8 scroll-mt-24"> {/* scroll-mt for sticky header offset */}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-3">{apiEntity.name}</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">{apiEntity.description}</p>
            </header>
            
            {apiEntity.constructorParams && apiEntity.constructorParams.length > 0 && (
              <section id="constructor" className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Constructor</h2>
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-mono"><code>new {apiEntity.name}(...)</code></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-3 text-base">Parameters:</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {apiEntity.constructorParams.map((param: any, index: number) => (
                        <AccordionItem value={`param-${index}`} key={index}>
                          <AccordionTrigger className="text-sm hover:no-underline">
                            <code className="font-semibold">{param.name}</code>: <code className="text-blue-600 dark:text-blue-400">{param.type}</code>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm">
                            <p>{param.description}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </section>
            )}

            <Tabs defaultValue={apiEntity.properties?.length > 0 ? "properties" : (apiEntity.methods?.length > 0 ? "methods" : "examples")} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2 sm:grid-cols-4 gap-2">
                {apiEntity.properties && apiEntity.properties.length > 0 && <TabsTrigger value="properties">Properties</TabsTrigger>}
                {apiEntity.methods && apiEntity.methods.length > 0 && <TabsTrigger value="methods">Methods</TabsTrigger>}
                {apiEntity.usageExamples && apiEntity.usageExamples.length > 0 && <TabsTrigger value="examples">Examples</TabsTrigger>}
                <TabsTrigger value="interactive-demo">Demo</TabsTrigger>
              </TabsList>

              {apiEntity.properties && apiEntity.properties.length > 0 && (
                <TabsContent value="properties" id="properties" className="scroll-mt-24 space-y-6">
                  {apiEntity.properties.map((prop: any) => (
                    <APIMemberCard
                      key={prop.name}
                      name={prop.name}
                      memberType={prop.memberType}
                      signature={prop.signature}
                      description={prop.description}
                      docLink={prop.docLink}
                      deprecated={prop.deprecated}
                    />
                  ))}
                </TabsContent>
              )}

              {apiEntity.methods && apiEntity.methods.length > 0 && (
                <TabsContent value="methods" id="methods" className="scroll-mt-24 space-y-6">
                  {apiEntity.methods.map((method: any) => (
                     <APIMemberCard
                        key={method.name}
                        name={method.name}
                        memberType={method.memberType}
                        signature={method.signature}
                        description={method.description}
                        docLink={method.docLink}
                      />
                  ))}
                </TabsContent>
              )}

              {apiEntity.usageExamples && apiEntity.usageExamples.length > 0 && (
                <TabsContent value="examples" id="examples" className="scroll-mt-24">
                  {apiEntity.usageExamples.map((example: any, index: number) => (
                    <CodeBlockViewer
                      key={index}
                      fileName={example.title}
                      language={example.language}
                      codeString={example.code}
                    />
                  ))}
                </TabsContent>
              )}

              <TabsContent value="interactive-demo" id="interactive-demo" className="scroll-mt-24">
                <InteractiveAnimationDemo animationType="slide" />
              </TabsContent>
            </Tabs>
            
            {apiEntity.relatedLinks && apiEntity.relatedLinks.length > 0 && (
              <section id="related" className="mt-12 pt-8 border-t scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-4">Related Information</h2>
                <ul className="list-none pl-0 space-y-2">
                  {apiEntity.relatedLinks.map((link: any, index: number) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                      <Link to={link.href} className="text-primary hover:underline">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </main>
      </div>

      {/* Simulated Footer */}
      <footer className="py-8 mt-auto border-t bg-muted/30 dark:bg-muted/10">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Animation System Documentation. All rights reserved.</p>
          <nav className="mt-2 space-x-4">
            <Link to="/" className="hover:underline">Homepage</Link>
            <Link to="/guides-listing" className="hover:underline">Guides</Link>
            <Link to="/a-p-i-detail" className="hover:underline">API Index</Link>
            <Link to="/examples-gallery" className="hover:underline">Examples Gallery</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default APIDetailPage;