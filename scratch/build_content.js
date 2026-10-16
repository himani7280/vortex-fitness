const fs = require('fs');
const path = require('path');

const siteData = require('../data/siteData.json');

// Read team.ts
const teamTs = fs.readFileSync(path.join(__dirname, '../data/team.ts'), 'utf-8');
const teamDataMatch = teamTs.match(/export const teamData: TeamMember\[\] = (\[[\s\S]*?\]);/);
let teamData = [];
if (teamDataMatch) {
  try {
    teamData = eval(teamDataMatch[1]);
  } catch (e) {
    console.error('Error evaluating teamData:', e);
  }
}

// Read blogs.ts
const blogsTs = fs.readFileSync(path.join(__dirname, '../data/blogs.ts'), 'utf-8');
const blogPostsMatch = blogsTs.match(/export const blogPosts = (\[[\s\S]*?\]);/);
const categoriesMatch = blogsTs.match(/export const categories = (\[[\s\S]*?\]);/);
const recentPostsMatch = blogsTs.match(/export const recentPosts = (\[[\s\S]*?\]);/);
let blogPosts = [];
let categories = [];
let recentPosts = [];
if (blogPostsMatch) blogPosts = eval(blogPostsMatch[1]);
if (categoriesMatch) categories = eval(categoriesMatch[1]);
if (recentPostsMatch) recentPosts = eval(recentPostsMatch[1]);

// Map team members profile dict
const teamProfileDict = {};
teamData.forEach(m => {
  teamProfileDict[m.id] = {
    id: m.id,
    name: m.name,
    role: m.role,
    image: m.image,
    experience: m.experience,
    clients: m.clients,
    specializationsTitle: m.specializationsTitle,
    description: m.description,
    about: m.about,
    quote: m.quote,
    socials: m.socials,
    specializations: m.specializations,
    enquiryLink: '/enquire'
  };
});

// Map blog posts dict
const blogDetailDict = {};
blogPosts.forEach(b => {
  blogDetailDict[b.id.toString()] = {
    id: b.id,
    slug: b.id.toString(),
    title: b.title,
    category: b.category,
    date: b.date,
    author: b.author,
    image: b.image,
    heroImage: '/images/page_header_bg.jpg',
    description: b.description,
    content: b.content
  };
});

// Programs detail dict
const programDetailDict = {};
siteData.home.programs.cards.forEach(p => {
  programDetailDict[p.id.toString()] = {
    id: p.id,
    slug: p.id.toString(),
    title: p.title,
    description: p.description,
    image: p.image,
    heroImage: '/images/page_header_bg.jpg',
    paragraphs: [
      `Our ${p.title} program is designed to help you build strength, endurance, speed, and confidence through structured, result-driven training. Whether you are a beginner or looking to improve your technique, our expert coaches provide the right guidance.`,
      `This program includes a mix of focused techniques, conditioning drills, and high-intensity workouts to improve overall fitness, coordination, and mental discipline. You will train in a safe, motivating environment.`
    ],
    highlights: [
      { title: `${p.title.split(' ')[0]} Techniques`, desc: 'Learn proper techniques, combinations, and defensive moves.', icon: 'Target' },
      { title: 'Improved Endurance', desc: 'Increase stamina and cardiovascular fitness with high-intensity drills.', icon: 'Activity' },
      { title: 'Full Body Workout', desc: 'Engage multiple muscle groups for strength, power, and agility.', icon: 'Zap' },
      { title: 'Better Coordination', desc: 'Enhance hand-eye coordination, reflexes and footwork.', icon: 'Target' },
      { title: 'Mental Discipline', desc: 'Build focus, confidence and resilience both inside and outside the gym.', icon: 'Activity' },
      { title: 'Weight Management', desc: 'Burn calories, reduce stress and maintain a healthier lifestyle.', icon: 'Zap' }
    ],
    phone: '+1 00000 00000',
    helpTitle: 'Need Help?',
    helpSubtitle: 'Talk to an Expert',
    helpButtonText: 'Enquire Now',
    helpButtonLink: '/enquire'
  };
});

// Shared Hero Banner variants
const heroVariants = {
  FitnessHomeHero1: {
    title: 'Home',
    image: '/images/page_header_bg.jpg'
  },
  FitnessAboutHero1: {
    title: 'About Us',
    breadcrumb: 'About Us',
    image: '/images/page_header_bg.jpg'
  },
  FitnessProgramsHero1: {
    title: 'Our Programs',
    breadcrumb: 'Programs',
    image: '/images/page_header_bg.jpg'
  },
  FitnessProgramDetailHero1: {
    title: 'Program Details',
    breadcrumb: 'Program Details',
    image: '/images/page_header_bg.jpg'
  },
  FitnessOurTeamHero1: {
    title: 'Our Trainers',
    breadcrumb: 'Trainers',
    image: '/images/page_header_bg.jpg'
  },
  FitnessTeamDetailsHero1: {
    title: 'Trainer Profile',
    breadcrumb: 'Trainer Profile',
    image: '/images/page_header_bg.jpg'
  },
  FitnessPricingHero1: {
    title: 'Pricing Plans',
    breadcrumb: 'Pricing',
    image: '/images/page_header_bg.jpg'
  },
  FitnessGalleryHero1: {
    title: 'Fitness Gallery',
    breadcrumb: 'Gallery',
    image: '/images/page_header_bg.jpg'
  },
  FitnessBlogHero1: {
    title: 'Latest Blogs',
    breadcrumb: 'Blogs',
    image: '/images/page_header_bg.jpg'
  },
  FitnessBlogDetailHero1: {
    title: 'Blog Details',
    breadcrumb: 'Blog Details',
    image: '/images/page_header_bg.jpg'
  },
  FitnessTestimonialsHero1: {
    title: 'Testimonials',
    breadcrumb: 'Testimonials',
    image: '/images/page_header_bg.jpg'
  },
  FitnessContactHero1: {
    title: 'Contact Us',
    breadcrumb: 'Contact Us',
    image: '/images/page_header_bg.jpg'
  },
  FitnessEnquireHero1: {
    title: 'Enquire Now',
    breadcrumb: 'Enquire Now',
    image: '/images/page_header_bg.jpg'
  },
  FitnessThankYouHero1: {
    title: 'Thank You',
    breadcrumb: 'Thank You',
    image: '/images/page_header_bg.jpg'
  }
};

// Pricing variants data
const pricingVariantData = {
  badge: siteData.home.pricing.topText,
  titleStart: siteData.home.pricing.heading1,
  titleHighlight: siteData.home.pricing.heading2,
  description: siteData.home.pricing.description,
  currency: siteData.home.pricing.currency,
  period: siteData.home.pricing.period,
  planSuffix: siteData.home.pricing.planSuffix,
  popularBadge: siteData.home.pricing.popularBadge,
  button: siteData.home.pricing.button,
  plans: siteData.home.pricing.plans
};

// Gallery variants data
const galleryVariantData = {
  badge: siteData.gallery.topText,
  titleStart: siteData.gallery.heading1,
  titleHighlight: siteData.gallery.heading2,
  description: siteData.gallery.description,
  initialCount: siteData.gallery.initialCount,
  buttonText: siteData.gallery.buttonText,
  images: siteData.gallery.images
};

// Blog page variants data
const blogPageVariantData = {
  badge: 'OUR LATEST BLOGS',
  titleStart: 'Latest News',
  titleHighlight: '& Insights',
  description: 'Stay updated with expert tips, workout guides, nutrition advice and the latest fitness trends to help you live a healthier life.',
  readMoreText: 'Read More',
  categories: categories,
  recentPosts: recentPosts,
  items: blogPosts.map(b => ({
    id: b.id,
    date: b.date,
    category: b.category,
    author: b.author,
    title: b.title,
    description: b.description,
    image: b.image,
    href: '/blogs/' + b.id
  }))
};

// Program detail variants data
const programDetailVariantData = {
  programs: programDetailDict
};

// Team profile variants data
const teamProfileVariantData = {
  members: teamProfileDict
};

// Contact form variants data
const contactFormVariantData = {
  formBadge: 'SEND US A MESSAGE',
  formTitleStart: "Let's Start a",
  formTitleHighlight: 'Conversation',
  formDescription: 'Fill out the form below and our team will get back to you shortly.',
  namePlaceholder: 'Full Name *',
  emailPlaceholder: 'Email Address *',
  phonePlaceholder: 'Phone Number *',
  subjectPlaceholder: 'Subject *',
  messagePlaceholder: 'Tell us how we can help you...',
  submitText: 'Send Message',
  contactBadge: 'CONTACT INFORMATION',
  contactTitleStart: 'Reach Out to',
  contactTitleHighlight: 'Us',
  phone: siteData.header.topBar.phone,
  email: 'info@xyz.com',
  address: siteData.header.topBar.location,
  hours: 'Mon - Sun: 6:00 AM - 10:00 PM'
};

// Contact location variants data
const contactLocationVariantData = {
  address: siteData.header.topBar.location,
  phone: siteData.header.topBar.phone,
  email: 'info@xyz.com',
  hours: 'Mon - Sun: 6:00 AM - 10:00 PM'
};

// Enquiry form variants data
const enquiryFormVariantData = {
  badge: 'GET IN TOUCH',
  titleStart: 'ENQUIRE',
  titleHighlight: 'NOW',
  description: 'Have questions about our memberships, training programs or facilities? Fill out the form and our team will get back to you shortly.',
  benefits: [
    {
      icon: 'Users',
      title: 'Expert Guidance',
      description: 'Get the right program for your goals.'
    },
    {
      icon: 'Calendar',
      title: 'Flexible Memberships',
      description: 'Plans that fit your lifestyle and schedule.'
    },
    {
      icon: 'Dumbbell',
      title: 'Modern Facilities',
      description: 'Train with world-class equipment.'
    },
    {
      icon: 'Headset',
      title: 'Quick Support',
      description: 'Our team is here to answer queries.'
    }
  ],
  image: '/images/about_programs_woman.jpg',
  imageCallout: 'START YOUR FITNESS JOURNEY TODAY',
  submitText: 'Submit Enquiry',
  formFields: [
    { name: 'name', placeholder: 'Full Name *', type: 'text' },
    { name: 'email', placeholder: 'Email Address *', type: 'email' },
    { name: 'phone', placeholder: 'Phone Number *', type: 'tel' },
    {
      name: 'interest',
      placeholder: 'Select Program',
      type: 'select',
      options: [
        'General Fitness',
        'Strength Training',
        'Personal Training',
        'Weight Loss',
        'Boxing / HIIT'
      ]
    },
    { name: 'message', placeholder: 'Tell us about your fitness goals...', type: 'textarea' }
  ]
};

// Thank you variants data
const thankYouVariantData = {
  badge: 'SUBMISSION RECEIVED',
  title: 'Thank You for Reaching Out!',
  description: 'Your enquiry has been received successfully. One of our certified fitness consultants will get in touch with you shortly to answer your questions and guide you on your fitness journey.',
  buttonText: 'Back to Home',
  buttonLink: '/'
};

// SiteChrome data
const siteChromeVariantData = {
  logo: '/logo-white.png',
  brandName: 'VortexFit Gym & Fitness',
  metadata: {
    title: 'VortexFit - Premium Fitness & Gym Center',
    description: 'Train with purpose, stay consistent and unlock a healthier, stronger, and more confident you.'
  },
  header: {
    topBar: siteData.header.topBar,
    navigation: {
      items: siteData.header.navLinks.map(n => ({
        key: n.path === '/' ? 'home' : n.path.replace('/', ''),
        label: n.name,
        href: n.path,
        activePaths: [n.path]
      })),
      ctaButton: siteData.header.button
    }
  },
  footer: siteData.footer
};

const content = {
  Fitness: {
    templateComponents: {
      'template-1': {
        shared: {
          Header: 'FitnessHeader1',
          Footer: 'FitnessFooter1'
        },
        pages: {
          home: {
            components: [
              { key: 'Hero', component: 'FitnessHomeHero1' },
              { key: 'About', component: 'FitnessAbout1' },
              { key: 'Programs', component: 'FitnessPrograms1' },
              { key: 'WorkProcess', component: 'FitnessWorkProcess1' },
              { key: 'Trainers', component: 'FitnessTrainers1' },
              { key: 'CTA', component: 'FitnessCTA1' },
              { key: 'Testimonials', component: 'FitnessTestimonials1' },
              { key: 'Pricing', component: 'FitnessPricing1' },
              { key: 'Blog', component: 'FitnessBlog1' }
            ]
          },
          about: {
            components: [
              { key: 'Hero', component: 'FitnessAboutHero1' },
              { key: 'AboutPage', component: 'FitnessAboutPage1' },
              { key: 'WhyChooseUs', component: 'FitnessWhyChooseUs1' },
              { key: 'WorkProcess', component: 'FitnessWorkProcess1' },
              { key: 'Trainers', component: 'FitnessTrainers1' }
            ]
          },
          programs: {
            components: [
              { key: 'Hero', component: 'FitnessProgramsHero1' },
              { key: 'ProgramsPage', component: 'FitnessProgramsPage1' }
            ]
          },
          programDetail: {
            components: [
              { key: 'Hero', component: 'FitnessProgramDetailHero1' },
              { key: 'ProgramDetail', component: 'FitnessProgramDetail1' }
            ]
          },
          team: {
            components: [
              { key: 'Hero', component: 'FitnessOurTeamHero1' },
              { key: 'Team', component: 'FitnessTeam1' }
            ]
          },
          teamDetail: {
            components: [
              { key: 'Hero', component: 'FitnessTeamDetailsHero1' },
              { key: 'TeamProfile', component: 'FitnessTeamProfile1' }
            ]
          },
          pricing: {
            components: [
              { key: 'Hero', component: 'FitnessPricingHero1' },
              { key: 'PricingPage', component: 'FitnessPricingPage1' }
            ]
          },
          gallery: {
            components: [
              { key: 'Hero', component: 'FitnessGalleryHero1' },
              { key: 'GalleryPage', component: 'FitnessGalleryPage1' }
            ]
          },
          blogs: {
            components: [
              { key: 'Hero', component: 'FitnessBlogHero1' },
              { key: 'BlogPage', component: 'FitnessBlogPage1' }
            ]
          },
          blogDetail: {
            components: [
              { key: 'Hero', component: 'FitnessBlogDetailHero1' },
              { key: 'BlogDetail', component: 'FitnessBlogDetail1' }
            ]
          },
          testimonials: {
            components: [
              { key: 'Hero', component: 'FitnessTestimonialsHero1' },
              { key: 'Reviews', component: 'FitnessReviews1' }
            ]
          },
          contact: {
            components: [
              { key: 'Hero', component: 'FitnessContactHero1' },
              { key: 'ContactForm', component: 'FitnessContactForm1' },
              { key: 'ContactLocation', component: 'FitnessLocation1' }
            ]
          },
          enquire: {
            components: [
              { key: 'Hero', component: 'FitnessEnquireHero1' },
              { key: 'EnquiryForm', component: 'FitnessEnquiryForm1' }
            ]
          },
          thankYou: {
            components: [
              { key: 'Hero', component: 'FitnessThankYouHero1' },
              { key: 'ThankYou', component: 'FitnessThankYou1' }
            ]
          }
        }
      }
    },
    sections: {
      Hero: {
        variants: heroVariants
      },
      PageBanner: {
        variants: heroVariants
      },
      HomeHero: {
        variants: {
          FitnessHomeHero1: {
            badge: siteData.home.hero.topText,
            titleStart: siteData.home.hero.headingLine1,
            titleHighlight: siteData.home.hero.headingLine2,
            description: siteData.home.hero.description,
            primaryButton: siteData.home.hero.buttons.primary.text,
            primaryLink: siteData.home.hero.buttons.primary.link,
            secondaryButton: siteData.home.hero.buttons.video.text,
            secondaryLink: siteData.home.hero.buttons.video.link,
            backgroundImage: siteData.home.hero.backgroundImage,
            bannerImages: [
              '/images/banner_1.jpg',
              '/images/banner_2.jpg',
              '/images/banner_3.jpg'
            ]
          }
        }
      },
      About: {
        variants: {
          FitnessAbout1: {
            badge: siteData.home.about.topText,
            titleStart: siteData.home.about.heading1,
            titleHighlight: siteData.home.about.heading2,
            description: siteData.home.about.paragraph1,
            featureText: siteData.home.about.feature.text,
            image: '/images/about_home_final.png',
            imageAlt: 'Trainer helping with weights',
            buttonText: 'Know More',
            buttonLink: '/about'
          },
          FitnessAboutPage1: {
            badge: 'MORE ABOUT US',
            intro: siteData.about.details.intro,
            paragraphs: siteData.about.details.paragraphs,
            bulletPoints: siteData.about.details.bulletPoints,
            images: {
              main: '/images/about_programs_man.jpg',
              trainer: '/images/about_home_final.png'
            }
          }
        }
      },
      AboutPage: {
        variants: {
          FitnessAboutPage1: {
            badge: 'MORE ABOUT US',
            intro: siteData.about.details.intro,
            paragraphs: siteData.about.details.paragraphs,
            bulletPoints: siteData.about.details.bulletPoints,
            images: {
              main: '/images/about_programs_man.jpg',
              trainer: '/images/about_home_final.png'
            }
          }
        }
      },
      WhyChooseUs: {
        variants: {
          FitnessWhyChooseUs1: {
            badge: siteData.about.whyChooseUs.topText,
            titleStart: siteData.about.whyChooseUs.heading1,
            titleHighlight: siteData.about.whyChooseUs.heading2,
            description: siteData.about.whyChooseUs.description,
            image: siteData.about.whyChooseUs.image,
            cards: siteData.about.whyChooseUs.cards
          }
        }
      },
      Programs: {
        variants: {
          FitnessPrograms1: {
            badge: siteData.home.programs.topText,
            titleStart: siteData.home.programs.heading1,
            titleHighlight: siteData.home.programs.heading2,
            description: siteData.home.programs.description,
            backgroundImage: siteData.home.programs.backgroundImage,
            cards: siteData.home.programs.cards
          },
          FitnessProgramsPage1: {
            badge: siteData.programsPage.fitnessPrograms.topText,
            titleStart: siteData.programsPage.fitnessPrograms.headingLine1,
            titlePrefix: siteData.programsPage.fitnessPrograms.headingLine2Prefix,
            titleHighlight: siteData.programsPage.fitnessPrograms.headingHighlight,
            titleSuffix: siteData.programsPage.fitnessPrograms.headingLine2Suffix,
            description: siteData.programsPage.fitnessPrograms.description,
            features: siteData.programsPage.fitnessPrograms.features,
            cards: siteData.home.programs.cards
          }
        }
      },
      ProgramsPage: {
        variants: {
          FitnessProgramsPage1: {
            badge: siteData.programsPage.fitnessPrograms.topText,
            titleStart: siteData.programsPage.fitnessPrograms.headingLine1,
            titlePrefix: siteData.programsPage.fitnessPrograms.headingLine2Prefix,
            titleHighlight: siteData.programsPage.fitnessPrograms.headingHighlight,
            titleSuffix: siteData.programsPage.fitnessPrograms.headingLine2Suffix,
            description: siteData.programsPage.fitnessPrograms.description,
            features: siteData.programsPage.fitnessPrograms.features,
            cards: siteData.home.programs.cards
          }
        }
      },
      ProgramDetail: {
        variants: {
          FitnessProgramDetail1: programDetailVariantData
        }
      },
      ProgramDetailContent: {
        variants: {
          FitnessProgramDetail1: programDetailVariantData
        }
      },
      WorkProcess: {
        variants: {
          FitnessWorkProcess1: {
            badge: siteData.home.process.topText,
            titleStart: siteData.home.process.heading1,
            titleHighlight: siteData.home.process.heading2,
            description: siteData.home.process.description,
            steps: siteData.home.process.steps
          }
        }
      },
      Trainers: {
        variants: {
          FitnessTrainers1: {
            badge: siteData.home.trainers.topText,
            titleStart: siteData.home.trainers.heading1,
            titleHighlight: siteData.home.trainers.heading2,
            description: siteData.home.trainers.description,
            team: siteData.home.trainers.team
          }
        }
      },
      Team: {
        variants: {
          FitnessTeam1: {
            badge: 'OUR TRAINERS',
            titleStart: 'Meet Our ',
            titleHighlight: 'Amazing Team',
            description: 'Our certified trainers are passionate, experienced and dedicated to helping you achieve your fitness goals with the right guidance and support.',
            profileButton: 'View Profile',
            items: teamData
          }
        }
      },
      TeamProfile: {
        variants: {
          FitnessTeamProfile1: teamProfileVariantData
        }
      },
      TeamProfileContent: {
        variants: {
          FitnessTeamProfile1: teamProfileVariantData
        }
      },
      CTA: {
        variants: {
          FitnessCTA1: {
            badge: siteData.home.cta.topText,
            titleStart: siteData.home.cta.heading1,
            titleHighlight: siteData.home.cta.heading2,
            description: siteData.home.cta.description,
            button: siteData.home.cta.button,
            backgroundImage: siteData.home.cta.backgroundImage,
            imageAlt: siteData.home.cta.imageAlt
          }
        }
      },
      Pricing: {
        variants: {
          FitnessPricing1: pricingVariantData,
          FitnessPricingPage1: pricingVariantData
        }
      },
      PricingPage: {
        variants: {
          FitnessPricingPage1: pricingVariantData
        }
      },
      Testimonials: {
        variants: {
          FitnessTestimonials1: {
            badge: siteData.home.testimonial.topText,
            titleStart: siteData.home.testimonial.heading1,
            titleHighlight: siteData.home.testimonial.heading2,
            description: siteData.home.testimonial.description,
            items: siteData.home.testimonial.items
          }
        }
      },
      Reviews: {
        variants: {
          FitnessReviews1: {
            badge: siteData.testimonialsPage.topText,
            titleStart: siteData.testimonialsPage.heading1,
            titleHighlight: siteData.testimonialsPage.heading2,
            description: siteData.testimonialsPage.description,
            items: siteData.testimonialsPage.items
          }
        }
      },
      TestimonialsPage: {
        variants: {
          FitnessReviews1: {
            badge: siteData.testimonialsPage.topText,
            titleStart: siteData.testimonialsPage.heading1,
            titleHighlight: siteData.testimonialsPage.heading2,
            description: siteData.testimonialsPage.description,
            items: siteData.testimonialsPage.items
          }
        }
      },
      Gallery: {
        variants: {
          FitnessGallery1: galleryVariantData,
          FitnessGalleryPage1: galleryVariantData
        }
      },
      GalleryPage: {
        variants: {
          FitnessGalleryPage1: galleryVariantData
        }
      },
      Blog: {
        variants: {
          FitnessBlog1: {
            badge: siteData.home.blog.topText,
            titleStart: siteData.home.blog.heading1,
            titleHighlight: siteData.home.blog.heading2,
            titleEnd: siteData.home.blog.heading3,
            description: siteData.home.blog.description,
            readMoreText: siteData.home.blog.readMoreText,
            recentArticles: siteData.home.recentArticles,
            items: blogPosts.slice(0, 3).map(b => ({
              id: b.id,
              date: b.date,
              category: b.category,
              author: b.author,
              title: b.title,
              description: b.description,
              image: b.image,
              href: '/blogs/' + b.id
            }))
          }
        }
      },
      BlogPage: {
        variants: {
          FitnessBlogPage1: blogPageVariantData
        }
      },
      BlogDetail: {
        variants: {
          FitnessBlogDetail1: {
            recentPosts: recentPosts,
            categories: categories,
            blogs: blogDetailDict
          }
        }
      },
      BlogDetailContent: {
        variants: {
          FitnessBlogDetail1: {
            recentPosts: recentPosts,
            categories: categories,
            blogs: blogDetailDict
          }
        }
      },
      SiteChrome: {
        variants: {
          FitnessHeader1: siteChromeVariantData.header,
          FitnessFooter1: siteChromeVariantData.footer,
          FitnessSiteChrome1: siteChromeVariantData
        }
      },
      SiteChromeContent: {
        variants: {
          FitnessSiteChrome1: siteChromeVariantData
        }
      },
      ContactForm: {
        variants: {
          FitnessContactForm1: contactFormVariantData
        }
      },
      ContactFormContent: {
        variants: {
          FitnessContactForm1: contactFormVariantData
        }
      },
      ContactLocation: {
        variants: {
          FitnessLocation1: contactLocationVariantData
        }
      },
      Location: {
        variants: {
          FitnessLocation1: contactLocationVariantData
        }
      },
      EnquiryForm: {
        variants: {
          FitnessEnquiryForm1: enquiryFormVariantData
        }
      },
      EnquiryFormContent: {
        variants: {
          FitnessEnquiryForm1: enquiryFormVariantData
        }
      },
      ThankYou: {
        variants: {
          FitnessThankYou1: thankYouVariantData
        }
      },
      ThankYouContent: {
        variants: {
          FitnessThankYou1: thankYouVariantData
        }
      }
    }
  }
};

const outputPath = path.join(__dirname, '../data/content.json');
fs.writeFileSync(outputPath, JSON.stringify(content, null, 2), 'utf-8');
console.log('Successfully written data/content.json! Size:', fs.statSync(outputPath).size, 'bytes');

const fitnessJsonPath = path.join(__dirname, '../data/fitness.json');
fs.writeFileSync(fitnessJsonPath, JSON.stringify(content, null, 2), 'utf-8');
console.log('Successfully written data/fitness.json! Size:', fs.statSync(fitnessJsonPath).size, 'bytes');
