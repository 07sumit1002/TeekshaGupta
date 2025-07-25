import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: "Serene Modern Residence",
    description:
  "The Serene Modern Residence embodies calm sophistication and refined living. Designed to harmonize with its natural surroundings, the home features clean architectural lines, expansive glazing, and a soothing material palette. Sunlight pours through floor-to-ceiling windows, illuminating airy interiors that balance minimalism with warmth. Thoughtfully integrated smart technology and sustainable materials enhance comfort, while landscaped courtyards and panoramic views offer a constant connection to nature. Every element is curated to create a peaceful, timeless sanctuary.",
    image: "/villa1.jpeg",
    link: "/projects/modern-residential-home",
  },
  {
    id: 2,
    title: "Commercial Space",
    description:
  "This premium commercial showroom concept reimagines the jewellery retail experience—where elegance, brand presence, and customer engagement take center stage. Adaptive display arrangements highlight signature collections, while plush consultation zones and ambient lighting curate a personalized buying journey. Glass facades, high-gloss finishes, and artisanal detailing establish a refined atmosphere that enhances product value and client perception. The design merges luxury with functionality, offering a space that’s commercially strategic and visually captivating.",
    image: "/pro1a.jpg",
    link: "/projects/commercial-showroom",
  },
  {
  id: 3,
  title: "Office Building",
  description: "Urban Collaborative Workspace redefines the modern office by merging functionality, aesthetics, and community in a dynamic urban environment. Located in the heart of the city, this workspace promotes productivity and well-being through smart design and sustainable innovation. Features such as energy-efficient systems, biophilic elements, and green rooftops align with forward-thinking values. Amenities include state-of-the-art meeting rooms, wellness zones, rooftop breakout areas, and flexible co-working hubs—fostering creativity, focus, and connection. Interiors boast sleek, open layouts with smart technologies and abundant natural light, offering professionals a refined, energizing environment to thrive.",
  image: "/pro2a.jpeg",
  link: "/projects/commercial-workspace"
},
{
  id: 4,
  title: "Adaptive Furniture Design",
  description: "Adaptive Furniture Design reimagines the modern workspace through the art of functional and aesthetic furniture solutions. Designed for dynamic urban environments, each piece balances ergonomics, sustainability, and style to enhance productivity and well-being. From modular workstations and adaptable seating to creative lounge settings and biophilic design elements, the collection supports diverse work styles and fosters connection. Crafted with eco-conscious materials and smart features, the furniture complements open, light-filled interiors—creating refined, versatile environments where form meets function.",
  image: "/fur1.jpeg",
  link: "/projects/furniture-design"
}
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
      !isEven ? 'lg:flex-row-reverse' : ''
    }`}>
      {/* Image Container - Takes up more space */}
      <div className="flex-1 lg:flex-[1.4] w-full">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
          {/* Fixed aspect ratio container that works on all screen sizes */}
          <div className="relative w-full h-0 pb-[75%] sm:pb-[66.67%] lg:pb-[75%]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              priority={index === 0}
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            {/* Overlay for better text readability on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Floating project number */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/90 backdrop-blur-sm text-gray-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg">
            {String(project.id).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 space-y-4 sm:space-y-6 w-full">
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-2xl sm:text-3xl lg:text-3xl font-black text-white tracking-wider leading-tight"  style={{ fontFamily: "Lato, sans-serif" }}>
            {project.title}
          </h3>
          <p className="text-white/75 tracking-wider leading-relaxed text-sm sm:text-base" style={{ fontFamily: "Lato, sans-serif" }}>
            {project.description}
          </p>
        </div>
        
        <Link 
          href={project.link}
          className="inline-flex items-center gap-3 text-white font-medium text-base sm:text-lg hover:gap-4 hover:text-amber-300 transition-all duration-300 group"  style={{ fontFamily: "Lato, sans-serif" }}
        >
          View Project
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const ProjectSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 lg:py-12 bg-black">
      <div className="max-w-8xl mx-auto px-12 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-24" style={{ fontFamily: "Lato, sans-serif" }}>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
            Featured <span className="font-bold bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed tracking-wide px-4">
            Discover our latest interior design projects that showcase innovative spaces, 
            thoughtful functionality, and timeless aesthetic appeal.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;