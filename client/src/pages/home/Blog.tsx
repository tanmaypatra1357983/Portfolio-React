import { motion } from "framer-motion";
import { blogData } from "@/data/blogData";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Blog = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: true,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameId = useRef<number>();

  // Calculate content dimensions based on actual card sizes
  const CARD_WIDTH = 400; // Match min-w-[400px] on md screens
  const GAP = 24; // Match gap-6 (6 * 4px = 24px)
  const SCROLL_SPEED = 1.2; // Pixels per frame (adjust for speed)
  const CONTENT_WIDTH = (CARD_WIDTH + GAP) * blogData.length;

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = CARD_WIDTH + GAP;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Smooth infinite scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let scrollPosition = container.scrollLeft;

    const animate = () => {
      if (!container || isPaused) return;

      // Increment scroll position
      scrollPosition += SCROLL_SPEED;

      // Reset to beginning when reaching the end of first set
      if (scrollPosition >= CONTENT_WIDTH) {
        scrollPosition = 0;
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = scrollPosition;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPaused, CONTENT_WIDTH]);

  return (
    <section id="blog" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold gradient-text heading-float text-center"
          >
            Latest Blog Posts
          </motion.h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 pb-8 hide-scrollbar"
            style={{ 
              overflowX: 'auto',
              scrollBehavior: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Triple the content for seamless infinite loop */}
            {[...blogData, ...blogData, ...blogData].map((blog, index) => (
              <motion.article
                key={`blog-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={isSectionVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: (index % blogData.length) * 0.1 }}
                className="min-w-[300px] md:min-w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10 flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(blog.date), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  
                  {blog.link && blog.link !== '#' ? (
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-gray-400 cursor-not-allowed">
                      Coming Soon
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Gradient fade effects for better visual */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 pointer-events-none z-10" />
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Blog;
