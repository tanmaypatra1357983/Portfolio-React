import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { contactFormSchema } from "@shared/schema";
import { socialLinks } from "@/data/aboutData";

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", values);
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text heading-float"
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <a href="mailto:hello@developer.com" className="text-primary hover:underline">
                    hello@developer.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <a href="tel:+1234567890" className="text-primary hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    San Francisco, California
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-semibold text-lg mb-4">Connect on Social Media</h4>
              <div className="flex space-x-6">
                {socialLinks.map((link, index) => {
                  // Render the appropriate icon based on iconType
                  let IconComponent;
                  
                  if (link.iconType === "github") {
                    IconComponent = Github;
                  } else if (link.iconType === "linkedin") {
                    IconComponent = Linkedin;
                  } else if (link.iconType === "twitter") {
                    IconComponent = Twitter;
                  } else if (link.iconType === "instagram") {
                    IconComponent = Instagram;
                  }
                  
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                      aria-label={link.name}
                    >
                      <div className="h-6 w-6">
                        {IconComponent && <IconComponent />}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full rounded-lg hover-lift"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
