import { useEffect, useRef, useState } from "react";

export default function ResumeTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
      const sections = timelineRef.current.querySelectorAll(".timeline-section");
      let foundActive = false;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          setActiveSection(index);
          foundActive = true;
        }
      });
      if (!foundActive && sections.length > 0) {
        const firstSectionTop = sections[0].getBoundingClientRect().top;
        if (firstSectionTop > 0) setActiveSection(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveSection(0);
    const timer = setTimeout(() => {
      const sections = timelineRef.current?.querySelectorAll(".timeline-section");
      if (sections && sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(i);
            break;
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Reusable timeline element - ODD sections (1,3,5,7) - content LEFT, circle RIGHT
  const OddTimeline = ({ index, isLast }) => (
    <div className="w-full md:w-5/12 relative">
      <div className="absolute top-10 left-0 w-full h-1" style={{ background: '#666666' }}></div>
      <div
        className="absolute top-10 left-0 h-1"
        style={{
          background: 'linear-gradient(to right, #FFFFFF, #A1A1AA)',
          width: activeSection >= index ? "100%" : "0%",
          transition: "width 0.8s ease-out",
          boxShadow: activeSection === index ? "0 0 8px #FFFFFF88" : "none",
        }}
      ></div>
      <div className="absolute z-10 top-8 right-0 transform translate-x-1/2">
        <div
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center z-10"
          style={{
            borderColor: activeSection === index ? '#FFFFFF' : '#666666',
            background: 'transparent',
          }}
        >
          <span
            className="text-lg font-bold"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: activeSection === index ? '#FFFFFF' : '#A1A1AA',
            }}
          >{index + 1}</span>
        </div>
      </div>
      {!isLast && <>
        <div className="absolute top-10 right-0 transform translate-x-1/2 w-1 h-full" style={{ background: '#666666' }}></div>
        <div
          className="absolute top-10 right-0 transform translate-x-1/2 w-1"
          style={{
            background: 'linear-gradient(to bottom, #FFFFFF, #A1A1AA)',
            height: activeSection >= index ? "100%" : "0%",
            transition: "height 0.8s ease-out",
            opacity: activeSection >= index + 1 ? 1 : 0,
            boxShadow: activeSection === index || activeSection === index + 1 ? "0 0 8px #FFFFFF88" : "none",
          }}
        ></div>
      </>}
    </div>
  );

  // Reusable timeline element - EVEN sections (2,4,6) - content RIGHT, circle LEFT
  const EvenTimeline = ({ index, isLast }) => (
    <div className="w-full md:w-5/12 relative">
      <div className="absolute top-10 right-0 w-full h-1" style={{ background: '#666666' }}></div>
      <div
        className="absolute top-10 right-0 h-1"
        style={{
          background: 'linear-gradient(to left, #FFFFFF, #A1A1AA)',
          width: activeSection >= index ? "100%" : "0%",
          transition: "width 0.8s ease-out",
          boxShadow: activeSection === index ? "0 0 8px #FFFFFF88" : "none",
        }}
      ></div>
      <div className="absolute z-10 top-8 left-0 transform -translate-x-1/2">
        <div
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center z-10"
          style={{
            borderColor: activeSection === index ? '#FFFFFF' : '#666666',
            background: 'transparent',
          }}
        >
          <span
            className="text-lg font-bold"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: activeSection === index ? '#FFFFFF' : '#A1A1AA',
            }}
          >{index + 1}</span>
        </div>
      </div>
      {!isLast && <>
        <div className="absolute top-10 left-0 transform -translate-x-1/2 w-1 h-full" style={{ background: '#666666' }}></div>
        <div
          className="absolute top-10 left-0 transform -translate-x-1/2 w-1"
          style={{
            background: 'linear-gradient(to bottom, #FFFFFF, #A1A1AA)',
            height: activeSection >= index ? "100%" : "0%",
            transition: "height 0.8s ease-out",
            opacity: activeSection >= index + 1 ? 1 : 0,
            boxShadow: activeSection === index || activeSection === index + 1 ? "0 0 8px #FFFFFF88" : "none",
          }}
        ></div>
      </>}
    </div>
  );

  return (
    <div className="bg-transparent text-white" ref={timelineRef} style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl mb-12 sm:mb-24 text-center"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}
        >My Journey</h1>

        <div className="relative">

          {/* Section 1 (ODD) - SSC - content LEFT, circle RIGHT */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-7/12 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Secondary Education</h2>
                <p className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>SSC — Maharashtra Board</p>
                <p className="mb-1" style={{ color: '#D4D4D8' }}>St. Anthony's High School</p>
                <p className="mb-4 sm:mb-6" style={{ color: '#A1A1AA' }}>2020 · 84%</p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Completed SSC with 84%, scoring 91 in Mathematics and 94 in Science & Technology — sparking an early interest in technical fields.
                </p>
              </div>
              <OddTimeline index={0} />
            </div>
          </div>

          {/* Section 2 (EVEN) - Diploma - content RIGHT, circle LEFT */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="w-full md:w-7/12 md:pl-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Diploma Education</h2>
                <p className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>Diploma in Computer Engineering</p>
                <p className="mb-1" style={{ color: '#D4D4D8' }}>Vidyavardhini's Bhausaheb Vartak Polytechnic</p>
                <p className="mb-4 sm:mb-6" style={{ color: '#A1A1AA' }}>2020 – 2023 · First Class Distinction (78.23%)</p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Built a strong foundation in computer engineering — covering Data Structures, Python, Web-Based Application Development, and Mobile App Development.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Graduated with First Class Distinction (78.23%), developing strong problem-solving abilities through coursework and a capstone project.
                </p>
              </div>
              <EvenTimeline index={1} />
            </div>
          </div>

          {/* Section 3 (ODD) - Engineering - content LEFT, circle RIGHT */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-7/12 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Engineering Education</h2>
                <p className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>B.E. Computer Science & Engineering</p>
                <p className="mb-1" style={{ color: '#D4D4D8' }}>Viva Institute of Technology, University of Mumbai</p>
                <p className="mb-1 sm:mb-2" style={{ color: '#A1A1AA' }}>Specialization: Artificial Intelligence & Machine Learning</p>
                <p className="mb-4 sm:mb-6" style={{ color: '#A1A1AA' }}>2023 – 2026 · Graduated · CGPA: 8.0</p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Specialized in AI & ML — studying Deep Learning, NLP, Machine Learning, Big Data Analytics, Data Warehousing, Image & Video Processing, and Blockchain Technologies.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Consistently improved each semester: SGPI grew from 7.65 in Sem III to 8.70 in Sem VI.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Actively participated in hackathons, national conferences, and research to bridge theory with real-world AI applications.
                </p>
              </div>
              <OddTimeline index={2} />
            </div>
          </div>

          {/* Section 4 (EVEN) - Web Dev - content RIGHT, circle LEFT */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="w-full md:w-7/12 md:pl-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Web Development Foundations</h2>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Started with HTML and CSS fundamentals, then progressed to JavaScript — building interactive, responsive interfaces from scratch.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Gained hands-on Python development experience through an internship at Branding Catalyst Pvt. Ltd. (Jul–Aug 2022), working on real-world projects.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Explored the connection between visual design and code structure, developing a strong eye for clean, effective user experiences.
                </p>
              </div>
              <EvenTimeline index={3} />
            </div>
          </div>

          {/* Section 5 (ODD) - Advanced Dev - content LEFT, circle RIGHT */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-7/12 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Advanced Development & AI/ML</h2>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Mastered React, Next.js, and Tailwind CSS for frontend, and Node.js, Express, and MySQL for full-stack development.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Expanded into AI & ML — fine-tuned transformer models (DistilBERT, BERT) using PyTorch and HuggingFace Transformers, and deployed models on Hugging Face Hub.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Completed NPTEL Deep Learning from IIT Ropar (Elite badge, Jul–Oct 2025) and built AI systems using Ollama, Qwen2.5, and Python FastAPI.
                </p>
                <p className="mb-4 text-sm sm:text-base" style={{ color: '#A1A1AA' }}>
                  Core stack: React · Next.js · Node.js · Python · PyTorch · HuggingFace · Ollama · MySQL · MongoDB · Supabase · Tailwind CSS
                </p>
              </div>
              <OddTimeline index={4} />
            </div>
          </div>

          {/* Section 6 (EVEN) - Projects - content RIGHT, circle LEFT */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="w-full md:w-7/12 md:pl-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Key Projects</h2>

                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>AI DB Agent</h3>
                  <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    Multilingual NL-to-database interface (English, Hindi, Marathi) for MongoDB, PostgreSQL, MySQL, Redis & Supabase. Powered by Ollama + Qwen2.5-Coder, Next.js, and Python FastAPI with safety guardrails.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>EDU.AI — Mumbai Hack 2024</h3>
                  <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    AI classroom platform built at the world's largest Gen AI Hackathon (Guinness Record). Python ML microservices for lecture summarization, transcript analysis & keyframe extraction. Stack: Next.js, Supabase, Prisma, Google OAuth.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Twitter Sentiment Analysis — HuggingFace</h3>
                  <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    Fine-tuned DistilBERT on ~10,000 tweets for binary sentiment classification. Built with PyTorch, deployed on Hugging Face Hub.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Resume–Job Matcher — HuggingFace</h3>
                  <p className="mb-4 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    BERT fine-tuned for semantic resume-job matching. Understands context beyond keywords, outputs match probability. Deployed on Hugging Face Hub.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Move On — Ride-Hailing App</h3>
                  <p className="text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    Next.js + Clerk auth + Google Maps API + Razorpay. Live ride tracking and secure payments. Deployed on Netlify.
                  </p>
                </div>
              </div>
              <EvenTimeline index={5} />
            </div>
          </div>

          {/* Section 7 (ODD) - Achievements - content LEFT, circle RIGHT */}
          <div className="timeline-section relative">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-7/12 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}>Achievements & Activities</h2>

                <div className="mb-5">
                  <p className="text-base sm:text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>Research Paper — NCRENB 2026</p>
                  <p className="mb-2 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    Published "EYES.AI: Assistive System for Visually Impaired using AI" at NCRENB 2026, Viva Institute. In VIVA-TECH IJRI (ISSN: 2581-7280).
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-base sm:text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>Aavishkar 2025–26 — University of Mumbai</p>
                  <p className="mb-2 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    Presented Eyes.AI at 20th Aavishkar Inter-Collegiate Research Convention (Zonal Round), A.P. Shah Institute of Technology, Thane (Dec 2025).
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-base sm:text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>INGENIOUS 2025 — Viva Institute of Technology</p>
                  <p className="mb-2 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    Secured 3rd Place in both Poster Presentation and Video Showcase competitions with the Eye.AI project.
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-base sm:text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>Guinness World Record — Mumbai Hack 2024</p>
                  <p className="mb-2 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                    Participated in the world's largest Generative AI Hackathon (Oct 2024). Received official Guinness World Record certificate.
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-base sm:text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>Hackathons</p>
                  <p className="mb-1 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>Algorithm 9.0 — 32-hour National Level Hackathon (Feb 2025)</p>
                  <p className="mb-1 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>Coherence '25 — Microsoft Learn Students Club Hackathon (2024–25)</p>
                  <p className="mb-2 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>Smart India Hackathon (SIH) 2024 — Campus Internal Round</p>
                </div>

                <div className="mb-5">
                  <p className="text-base sm:text-lg font-bold mb-1" style={{ color: '#FFFFFF' }}>Certifications</p>
                  <p className="mb-1 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>NPTEL Deep Learning — IIT Ropar via SWAYAM (Elite, Jul–Oct 2025)</p>
                  <p className="mb-2 text-sm sm:text-base" style={{ color: '#D4D4D8' }}>Cyber Security — Atos Prayas Foundation / ICT Academy, Grade B (Jul–Aug 2025)</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold mb-2 text-sm sm:text-base" style={{ color: '#FFFFFF' }}>Technical Skills</p>
                  <p className="text-sm sm:text-base" style={{ color: '#A1A1AA' }}>
                    React · Next.js · Node.js · Python · PyTorch · HuggingFace · Ollama · Deep Learning · NLP · FastAPI · MySQL · MongoDB · Supabase · Tailwind CSS · Java · JavaScript
                  </p>
                </div>

                <p className="text-sm sm:text-base" style={{ color: '#D4D4D8' }}>
                  Video & Photography Head of the CSE(AI&ML) department at Viva Institute. Passionate about traveling, creating reels, and video editing.
                </p>
              </div>
              <OddTimeline index={6} isLast={true} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}