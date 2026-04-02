import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await api.get("/testimonials");
      return response.data;
    },
  });

  if (isLoading) return null;

  return (
    <section className="py-20 wax-pattern">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            L'excellence racontée par <span className="text-primary">nos clients</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial: any, index: number) => (
            <div
              key={testimonial.id || index}
              className={`p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover-card-premium animate-fade-in-up stagger-${(index % 3) + 1}`}
            >
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg italic mb-8 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary">
                  {testimonial.avatar || testimonial.name[0]}
                </div>
                <div>
                  <p className="font-heading font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.quartier}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
