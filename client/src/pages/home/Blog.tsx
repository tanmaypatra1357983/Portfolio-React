import { motion } from "framer-motion";
import { blogData } from "@/data/blogData";
import { useRef, useState } from "react";
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

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="blog" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold gradient-text heading-float"
          >
            Latest Blog Posts
          </motion.h2>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogData.map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isSectionVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="min-w-[300px] md:min-w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden snap-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                  {blog.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(blog.date), 'MMM d, yyyy')}
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

                <a
                  href={blog.link}
                  className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Blog;