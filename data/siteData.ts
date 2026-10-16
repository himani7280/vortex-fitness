import siteDataJson from './siteData.json';

/* ==========================================================================
   TYPES & INTERFACES FOR ALL COMPONENTS
   ========================================================================== */

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export interface Specialization {
  title: string;
  desc: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  clients: string;
  specializationsTitle: string;
  description: string;
  about: string;
  quote: string;
  socials: SocialLinks;
  specializations: Specialization[];
}

export interface BlogContentBlock {
  type: 'paragraph' | 'heading' | 'quote' | string;
  text: string;
}

export interface BlogPost {
  id: number;
  image: string;
  date: string;
  category: string;
  author: string;
  comments: number;
  title: string;
  description: string;
  content: BlogContentBlock[];
}

export interface BlogCategory {
  name: string;
  count: number;
}

export interface RecentPost {
  id: number;
  title: string;
  date: string;
  image: string;
}

export interface BannerSlide {
  id: number;
  image: string;
  alt: string;
}

export interface ProgramCard {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface HeaderData {
  topBar: {
    location: string;
    phone: string;
    socials: SocialLinks;
  };
  navLinks: {
    name: string;
    path: string;
  }[];
  button: {
    text: string;
    link: string;
  };
}

export interface FooterData {
  about: {
    text: string;
    logo: string;
  };
  links: {
    name: string;
    path: string;
  }[];
  contact: {
    location: string;
    phone: string;
    email: string;
  };
  copyright: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  featured: boolean;
  features: string[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  image: string;
  comment: string;
  rating: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ContactData {
  badge: string;
  titleStart: string;
  titleHighlight: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  boxes: {
    location: { title: string };
    call: { title: string };
    email: { title: string };
  };
  form: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    submitText: string;
  };
}

export interface EnquireBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface EnquireData {
  badge: string;
  titleStart: string;
  titleHighlight: string;
  description: string;
  benefits: EnquireBenefit[];
  image: string;
  imageCallout: string;
  submitText: string;
  formFields: {
    name: string;
    placeholder: string;
    type: string;
    options?: string[];
  }[];
}

export interface ThankYouData {
  badge: string;
  titleStart: string;
  titleHighlight: string;
  message: string;
  subMessage: string;
  buttonText: string;
  buttonLink: string;
}

export const Fitness = siteDataJson.Fitness;
export const sections = Fitness.sections;
export const templateComponents = Fitness.templateComponents;

// Direct variant exports for standard template usage
export const heroVariant = sections.Hero.variants.FitnessHomeHero1;
export const programsVariant = sections.Programs.variants.FitnessPrograms1;
export const programsPageVariant = sections.ProgramsPage.variants.FitnessProgramsPage1;
export const programDetailVariant = sections.ProgramDetail.variants.FitnessProgramDetail1;
export const trainersVariant = sections.Trainers.variants.FitnessTrainers1;
export const teamVariant = sections.Team.variants.FitnessTeam1;
export const teamProfileVariant = sections.TeamProfile.variants.FitnessTeamProfile1;
export const enquireVariant = sections.EnquiryForm.variants.FitnessEnquiryForm1;
export const thankYouVariant = sections.ThankYou.variants.FitnessThankYou1;
export const headerVariant = sections.SiteChrome.variants.FitnessHeader1;
export const footerVariant = sections.SiteChrome.variants.FitnessFooter1;

export const teamData: TeamMember[] = sections.Team.variants.FitnessTeam1.items as unknown as TeamMember[];
export const blogPosts: BlogPost[] = sections.BlogPage.variants.FitnessBlogPage1.items as unknown as BlogPost[];
export const categories: BlogCategory[] = [
  { name: "All", count: blogPosts.length },
  { name: "Strength", count: 4 },
  { name: "Cardio", count: 3 },
  { name: "Nutrition", count: 2 },
  { name: "Lifestyle", count: 2 },
];
export const recentPosts: RecentPost[] = blogPosts.slice(0, 6).map((post: any) => ({
  id: post.id,
  title: post.title,
  date: post.date,
  image: post.image,
}));

export const siteData = {
  Fitness,
  sections,
  templateComponents,
  header: sections.SiteChrome.variants.FitnessHeader1,
  footer: sections.SiteChrome.variants.FitnessFooter1,
  home: {
    hero: sections.Hero.variants.FitnessHomeHero1,
    about: sections.About.variants.FitnessAbout1,
    programs: sections.Programs.variants.FitnessPrograms1,
    workProcess: sections.WorkProcess.variants.FitnessWorkProcess1,
    process: sections.WorkProcess.variants.FitnessWorkProcess1,
    trainers: sections.Trainers.variants.FitnessTrainers1,
    cta: sections.CTA.variants.FitnessCTA1,
    testimonials: sections.Testimonials.variants.FitnessTestimonials1,
    testimonial: sections.Testimonials.variants.FitnessTestimonials1,
    pricing: sections.Pricing.variants.FitnessPricing1,
    gallery: sections.Gallery.variants.FitnessGallery1,
    blog: sections.Blog.variants.FitnessBlog1,
    recentArticles: {
      limit: 3,
      heading1: "Latest ",
      heading2: "Articles",
      description: "Read our latest fitness tips, nutrition guides, and expert advice to stay motivated."
    }
  },
  about: {
    hero: sections.Hero.variants.FitnessAboutHero1,
    details: sections.AboutPage.variants.FitnessAboutPage1,
    whyChooseUs: sections.WhyChooseUs.variants.FitnessWhyChooseUs1,
  },
  programsPage: {
    hero: sections.Hero.variants.FitnessProgramsHero1,
    fitnessPrograms: sections.ProgramsPage.variants.FitnessProgramsPage1,
    viewDetailsText: "View Details"
  },
  team: teamData,
  blogs: blogPosts,
  blogCategories: categories,
  gallery: sections.GalleryPage.variants.FitnessGalleryPage1,
  testimonialsPage: sections.Reviews.variants.FitnessReviews1,
  contact: {
    hero: sections.Hero.variants.FitnessContactHero1,
    form: sections.ContactForm.variants.FitnessContactForm1,
    location: sections.ContactLocation.variants.FitnessLocation1.address,
    phone: sections.ContactLocation.variants.FitnessLocation1.phone,
    email: sections.ContactLocation.variants.FitnessLocation1.email,
  },
  enquire: sections.EnquiryForm.variants.FitnessEnquiryForm1,
  thankYou: sections.ThankYou.variants.FitnessThankYou1,
};

export type SiteData = typeof siteData;
export default siteData;


