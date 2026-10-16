const fs = require('fs');
const path = require('path');

const siteDataPath = path.join(__dirname, '../data/siteData.json');
const siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf-8'));

// 1. Enquire Data
const enquireData = {
  badge: "GET IN TOUCH",
  titleStart: "Transform Your Body",
  titleHighlight: "With Expert Training",
  description: "Take the first step towards a healthier, stronger you. Contact us today to schedule your complimentary fitness consultation and gym tour.",
  image: "/images/enquire_woman.jpg",
  imageCallout: "GET UP TO 25% OFF YOUR FIRST MEMBERSHIP",
  submitText: "SUBMIT ENQUIRY",
  benefits: [
    {
      icon: "Users",
      title: "Certified Trainers",
      description: "Work with experienced fitness professionals dedicated to your success."
    },
    {
      icon: "Calendar",
      title: "Flexible Scheduling",
      description: "Choose session times that fit seamlessly into your lifestyle."
    },
    {
      icon: "Dumbbell",
      title: "Tailored Workouts",
      description: "Custom exercise routines designed around your fitness level and goals."
    },
    {
      icon: "Headset",
      title: "Continuous Support",
      description: "Ongoing guidance, motivation, and accountability every step of the way."
    }
  ],
  form: {
    badge: "ENQUIRY",
    titleStart: "Enquiry",
    titleHighlight: "Form",
    fullNamePlaceholder: "Full Name *",
    phonePlaceholder: "Phone Number *",
    emailPlaceholder: "Email Address *",
    programPlaceholder: "Select Program Interested In *",
    programOptions: [
      { value: "gym", label: "Gym Fitness Class" },
      { value: "powerlifting", label: "Power Lifting Class" },
      { value: "bodybuilding", label: "Body Building" },
      { value: "boxing", label: "Boxing Class" },
      { value: "yoga", label: "Yoga & Flexibility" }
    ],
    messagePlaceholder: "Your Message *",
    consentText: "I agree to be contacted by the VortexFit team.",
    submitButtonText: "SUBMIT ENQUIRY",
    responseTimeNotice: "We typically respond within 24 hours."
  }
};

// 2. Thank You Data
const thankYouData = {
  badge: "APPLICATION RECEIVED",
  titleStart: "Thank You For",
  titleHighlight: "Reaching Out!",
  message: "We have received your enquiry and our fitness consultation team will get back to you within 24 hours.",
  subMessage: "In the meantime, feel free to explore our training programs or connect with us on social media.",
  buttonText: "Back to Home",
  buttonLink: "/"
};

// 3. Program details dict
const programDetailDict = {};
siteData.home.programs.cards.forEach(p => {
  const titleWord = p.title.split(' ')[0];
  programDetailDict[p.id.toString()] = {
    id: p.id,
    slug: p.id.toString(),
    title: p.title,
    category: p.category,
    description: p.description,
    image: p.image,
    heroImage: '/images/page_header_bg.jpg',
    paragraphs: [
      `Our ${p.title} program is designed to help you build strength, endurance, speed, and confidence through structured, result-driven training. Whether you are a beginner or looking to improve your technique, our expert coaches provide the right guidance.`,
      `This program includes a mix of focused techniques, conditioning drills, and high-intensity workouts to improve overall fitness, coordination, and mental discipline. You will train in a safe, motivating environment.`
    ],
    highlights: [
      { title: `${titleWord} Techniques`, desc: 'Learn proper techniques, combinations, and defensive moves.', icon: 'Target' },
      { title: 'Improved Endurance', desc: 'Increase stamina and cardiovascular fitness with high-intensity drills.', icon: 'Activity' },
      { title: 'Full Body Workout', desc: 'Engage multiple muscle groups for strength, power, and agility.', icon: 'Zap' },
      { title: 'Better Coordination', desc: 'Enhance hand-eye coordination, reflexes and footwork.', icon: 'Target' },
      { title: 'Mental Discipline', desc: 'Build focus, confidence and resilience both inside and outside the gym.', icon: 'Activity' },
      { title: 'Weight Management', desc: 'Burn calories, reduce stress and maintain a healthier lifestyle.', icon: 'Zap' }
    ],
    phone: '+1 00000',
    helpTitle: 'Have Questions?',
    helpSubtitle: "LET'S TALK",
    helpDescription: `Get in touch with our team for more details about the ${p.title} program.`,
    helpButtonText: 'Contact Us',
    helpButtonLink: '/contact'
  };
});

// 4. Team profile dict
const teamProfileDict = {};
siteData.team.forEach(m => {
  teamProfileDict[m.id] = {
    ...m,
    enquiryLink: `/enquire?trainer=${encodeURIComponent(m.name)}`
  };
});

// 5. Blog details dict
const blogDetailDict = {};
siteData.blogs.forEach(b => {
  blogDetailDict[b.id.toString()] = {
    ...b,
    slug: b.id.toString(),
    heroImage: '/images/page_header_bg.jpg'
  };
});

const recentPosts = siteData.blogs.slice(0, 6).map(b => ({
  id: b.id,
  title: b.title,
  date: b.date,
  image: b.image
}));

// Build all sections with variants
const sections = {
  Hero: {
    variants: {
      FitnessHomeHero1: {
        badge: siteData.home.hero.topText,
        topText: siteData.home.hero.topText,
        titleStart: siteData.home.hero.headingLine1,
        headingLine1: siteData.home.hero.headingLine1,
        titleHighlight: siteData.home.hero.headingLine2,
        headingLine2: siteData.home.hero.headingLine2,
        description: siteData.home.hero.description,
        primaryButton: siteData.home.hero.buttons.primary.text,
        primaryLink: siteData.home.hero.buttons.primary.link,
        secondaryButton: siteData.home.hero.buttons.video.text,
        secondaryLink: siteData.home.hero.buttons.video.link,
        backgroundImage: siteData.home.hero.backgroundImage,
        bannerSlides: siteData.home.hero.bannerSlides,
        bannerImages: siteData.home.hero.bannerSlides.map(s => s.image)
      }
    }
  },
  HomeHero: {
    variants: {
      FitnessHomeHero1: {
        badge: siteData.home.hero.topText,
        topText: siteData.home.hero.topText,
        titleStart: siteData.home.hero.headingLine1,
        headingLine1: siteData.home.hero.headingLine1,
        titleHighlight: siteData.home.hero.headingLine2,
        headingLine2: siteData.home.hero.headingLine2,
        description: siteData.home.hero.description,
        primaryButton: siteData.home.hero.buttons.primary.text,
        primaryLink: siteData.home.hero.buttons.primary.link,
        secondaryButton: siteData.home.hero.buttons.video.text,
        secondaryLink: siteData.home.hero.buttons.video.link,
        backgroundImage: siteData.home.hero.backgroundImage,
        bannerSlides: siteData.home.hero.bannerSlides,
        bannerImages: siteData.home.hero.bannerSlides.map(s => s.image)
      }
    }
  },
  About: {
    variants: {
      FitnessAbout1: {
        badge: siteData.home.about.topText,
        topText: siteData.home.about.topText,
        titleStart: siteData.home.about.heading1,
        heading1: siteData.home.about.heading1,
        titleHighlight: siteData.home.about.heading2,
        heading2: siteData.home.about.heading2,
        description: siteData.home.about.paragraph1,
        paragraph1: siteData.home.about.paragraph1,
        feature: siteData.home.about.feature,
        featureText: siteData.home.about.feature.text,
        image: siteData.home.about.images.main,
        imageAlt: 'About VortexFit Main',
        images: siteData.home.about.images,
        button: siteData.home.about.button,
        buttonText: siteData.home.about.button.text,
        buttonLink: siteData.home.about.button.link
      },

      FitnessAboutPage1: {
        badge: 'MORE ABOUT US',
        intro: siteData.about.details.intro,
        paragraphs: siteData.about.details.paragraphs,
        bulletPoints: siteData.about.details.bulletPoints,
        images: siteData.home.about.images
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
        images: siteData.home.about.images
      }
    }
  },
  WhyChooseUs: {
    variants: {
      FitnessWhyChooseUs1: {
        badge: siteData.about.whyChooseUs.topText,
        topText: siteData.about.whyChooseUs.topText,
        titleStart: siteData.about.whyChooseUs.heading1,
        heading1: siteData.about.whyChooseUs.heading1,
        titleHighlight: siteData.about.whyChooseUs.heading2,
        heading2: siteData.about.whyChooseUs.heading2,
        images: siteData.about.whyChooseUs.images,
        features: siteData.about.whyChooseUs.features
      }
    }
  },
  Programs: {
    variants: {
      FitnessPrograms1: {
        badge: siteData.home.programs.topText,
        topText: siteData.home.programs.topText,
        titleStart: siteData.home.programs.heading1,
        heading1: siteData.home.programs.heading1,
        titleHighlight: siteData.home.programs.heading2,
        heading2: siteData.home.programs.heading2,
        description: siteData.home.programs.description,
        backgroundImage: siteData.home.programs.backgroundImage,
        cards: siteData.home.programs.cards
      },
      FitnessProgramsPage1: {
        badge: siteData.programsPage.fitnessPrograms.topText,
        topText: siteData.programsPage.fitnessPrograms.topText,
        titleStart: siteData.programsPage.fitnessPrograms.headingLine1,
        titlePrefix: siteData.programsPage.fitnessPrograms.headingLine2Prefix,
        titleHighlight: siteData.programsPage.fitnessPrograms.headingHighlight,
        titleSuffix: siteData.programsPage.fitnessPrograms.headingLine2Suffix,
        description: siteData.programsPage.fitnessPrograms.description,
        features: siteData.programsPage.fitnessPrograms.features,
        images: siteData.programsPage.fitnessPrograms.images,
        cards: siteData.home.programs.cards
      }
    }
  },
  ProgramsPage: {
    variants: {
      FitnessProgramsPage1: {
        badge: siteData.programsPage.fitnessPrograms.topText,
        topText: siteData.programsPage.fitnessPrograms.topText,
        titleStart: siteData.programsPage.fitnessPrograms.headingLine1,
        titlePrefix: siteData.programsPage.fitnessPrograms.headingLine2Prefix,
        titleHighlight: siteData.programsPage.fitnessPrograms.headingHighlight,
        titleSuffix: siteData.programsPage.fitnessPrograms.headingLine2Suffix,
        description: siteData.programsPage.fitnessPrograms.description,
        features: siteData.programsPage.fitnessPrograms.features,
        images: siteData.programsPage.fitnessPrograms.images,
        cards: siteData.home.programs.cards
      }
    }
  },

  ProgramDetail: {
    variants: {
      FitnessProgramDetail1: {
        badge: 'PROGRAM DETAILS',
        programs: programDetailDict,
        cards: siteData.home.programs.cards
      }
    }
  },
  WorkProcess: {
    variants: {
      FitnessWorkProcess1: {
        badge: siteData.home.process.topText,
        topText: siteData.home.process.topText,
        titleStart: siteData.home.process.heading1,
        heading1: siteData.home.process.heading1,
        titleHighlight: siteData.home.process.heading2,
        heading2: siteData.home.process.heading2,
        description: siteData.home.process.description,
        steps: siteData.home.process.steps
      }
    }
  },
  Trainers: {
    variants: {
      FitnessTrainers1: {
        badge: siteData.home.trainers.topText,
        topText: siteData.home.trainers.topText,
        titleStart: siteData.home.trainers.heading1,
        heading1: siteData.home.trainers.heading1,
        titleHighlight: siteData.home.trainers.heading2,
        heading2: siteData.home.trainers.heading2,
        description: siteData.home.trainers.description,
        team: siteData.home.trainers.team
      }
    }
  },
  Team: {
    variants: {
      FitnessTeam1: {
        badge: 'EXPERT TRAINERS',
        titleStart: 'Meet Our ',
        titleHighlight: 'Amazing Team',
        description: 'Our certified trainers are passionate, experienced and dedicated to helping you achieve your fitness goals with the right guidance and support.',
        profileButton: 'View Profile',
        items: siteData.team
      }
    }
  },
  TeamProfile: {
    variants: {
      FitnessTeamProfile1: {
        badge: 'TRAINER PROFILE',
        members: teamProfileDict,
        items: siteData.team
      }
    }
  },
  CTA: {
    variants: {
      FitnessCTA1: {
        badge: siteData.home.cta.topText,
        topText: siteData.home.cta.topText,
        titleStart: siteData.home.cta.heading1,
        heading1: siteData.home.cta.heading1,
        titleHighlight: siteData.home.cta.heading2,
        heading2: siteData.home.cta.heading2,
        description: siteData.home.cta.description,
        button: siteData.home.cta.button,
        backgroundImage: siteData.home.cta.backgroundImage,
        imageAlt: siteData.home.cta.imageAlt
      }
    }
  },
  Pricing: {
    variants: {
      FitnessPricing1: {
        badge: siteData.home.pricing.topText,
        topText: siteData.home.pricing.topText,
        titleStart: siteData.home.pricing.heading1,
        heading1: siteData.home.pricing.heading1,
        titleHighlight: siteData.home.pricing.heading2,
        heading2: siteData.home.pricing.heading2,
        description: siteData.home.pricing.description,
        currency: siteData.home.pricing.currency,
        period: siteData.home.pricing.period,
        planSuffix: siteData.home.pricing.planSuffix,
        popularBadge: siteData.home.pricing.popularBadge,
        button: siteData.home.pricing.button,
        plans: siteData.home.pricing.plans
      }
    }
  },
  PricingPage: {
    variants: {
      FitnessPricingPage1: {
        badge: siteData.home.pricing.topText,
        topText: siteData.home.pricing.topText,
        titleStart: siteData.home.pricing.heading1,
        heading1: siteData.home.pricing.heading1,
        titleHighlight: siteData.home.pricing.heading2,
        heading2: siteData.home.pricing.heading2,
        description: siteData.home.pricing.description,
        currency: siteData.home.pricing.currency,
        period: siteData.home.pricing.period,
        planSuffix: siteData.home.pricing.planSuffix,
        popularBadge: siteData.home.pricing.popularBadge,
        button: siteData.home.pricing.button,
        plans: siteData.home.pricing.plans
      }
    }
  },
  Testimonials: {
    variants: {
      FitnessTestimonials1: {
        badge: siteData.home.testimonial.topText,
        topText: siteData.home.testimonial.topText,
        titleStart: siteData.home.testimonial.heading1,
        heading1: siteData.home.testimonial.heading1,
        titleHighlight: siteData.home.testimonial.heading2,
        heading2: siteData.home.testimonial.heading2,
        description: siteData.home.testimonial.description,
        items: siteData.home.testimonial.items
      }
    }
  },
  Reviews: {
    variants: {
      FitnessReviews1: {
        badge: siteData.testimonialsPage.topText,
        topText: siteData.testimonialsPage.topText,
        titleStart: siteData.testimonialsPage.heading1,
        heading1: siteData.testimonialsPage.heading1,
        titleHighlight: siteData.testimonialsPage.heading2,
        heading2: siteData.testimonialsPage.heading2,
        description: siteData.testimonialsPage.description,
        items: siteData.testimonialsPage.items
      }
    }
  },
  Gallery: {
    variants: {
      FitnessGallery1: {
        badge: siteData.gallery.topText,
        topText: siteData.gallery.topText,
        titleStart: siteData.gallery.heading1,
        heading1: siteData.gallery.heading1,
        titleHighlight: siteData.gallery.heading2,
        heading2: siteData.gallery.heading2,
        description: siteData.gallery.description,
        initialCount: siteData.gallery.initialCount,
        buttonText: siteData.gallery.buttonText,
        images: siteData.gallery.images
      }
    }
  },
  GalleryPage: {
    variants: {
      FitnessGalleryPage1: {
        badge: siteData.gallery.topText,
        topText: siteData.gallery.topText,
        titleStart: siteData.gallery.heading1,
        heading1: siteData.gallery.heading1,
        titleHighlight: siteData.gallery.heading2,
        heading2: siteData.gallery.heading2,
        description: siteData.gallery.description,
        initialCount: siteData.gallery.initialCount,
        buttonText: siteData.gallery.buttonText,
        images: siteData.gallery.images
      }
    }
  },
  Blog: {
    variants: {
      FitnessBlog1: {
        badge: siteData.home.blog.topText,
        topText: siteData.home.blog.topText,
        titleStart: siteData.home.blog.heading1,
        heading1: siteData.home.blog.heading1,
        titleHighlight: siteData.home.blog.heading2,
        heading2: siteData.home.blog.heading2,
        titleEnd: siteData.home.blog.heading3,
        description: siteData.home.blog.description,
        readMoreText: siteData.home.blog.readMoreText,
        items: siteData.blogs.slice(0, 3)
      }
    }
  },
  BlogPage: {
    variants: {
      FitnessBlogPage1: {
        badge: 'OUR LATEST BLOGS',
        titleStart: 'Latest News ',
        titleHighlight: '& Insights',
        description: 'Stay updated with expert tips, workout guides, nutrition advice and the latest fitness trends to help you live a healthier life.',
        readMoreText: 'Read More',
        categories: siteData.blogCategories,
        recentPosts: recentPosts,
        items: siteData.blogs
      }
    }
  },
  BlogDetail: {
    variants: {
      FitnessBlogDetail1: {
        recentPosts: recentPosts,
        categories: siteData.blogCategories,
        blogs: blogDetailDict
      }
    }
  },
  SiteChrome: {
    variants: {
      FitnessHeader1: siteData.header,
      FitnessFooter1: siteData.footer
    }
  },
  ContactForm: {
    variants: {
      FitnessContactForm1: siteData.contact.form
    }
  },
  ContactLocation: {
    variants: {
      FitnessLocation1: {
        address: siteData.contact.address,
        phone: siteData.contact.phone,
        email: siteData.contact.email,
        hours: siteData.contact.hours,
        boxes: siteData.contact.boxes
      }
    }
  },
  EnquiryForm: {
    variants: {
      FitnessEnquiryForm1: enquireData
    }
  },
  ThankYou: {
    variants: {
      FitnessThankYou1: thankYouData
    }
  }
};

// Fitness template components mapping
const templateComponents = {
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
};

// Update siteData
siteData.enquire = enquireData;
siteData.thankYou = thankYouData;

siteData.Fitness = {
  templateComponents: templateComponents,
  sections: sections
};

siteData.sections = sections;
siteData.templateComponents = templateComponents;

fs.writeFileSync(siteDataPath, JSON.stringify(siteData, null, 2), 'utf-8');
console.log('✅ Updated data/siteData.json successfully!');
console.log('Total sections with variants:', Object.keys(sections).length);
console.log('enquire present:', !!siteData.enquire);
console.log('thankYou present:', !!siteData.thankYou);
console.log('EnquiryForm variant present:', !!sections.EnquiryForm.variants.FitnessEnquiryForm1);
console.log('ThankYou variant present:', !!sections.ThankYou.variants.FitnessThankYou1);
console.log('Programs variant present:', !!sections.Programs.variants.FitnessPrograms1);
console.log('ProgramDetail variant present:', !!sections.ProgramDetail.variants.FitnessProgramDetail1);
console.log('Team variant present:', !!sections.Team.variants.FitnessTeam1);
console.log('Hero variant present:', !!sections.Hero.variants.FitnessHomeHero1);
