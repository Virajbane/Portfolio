import ContactMeComponent from '@/components/ContactSection'
import BlogReviews from '@/components/BlogReviews'
import AnimatedFooter from '@/components/Footer'
import React from 'react'

function page() {
  return (
    <div style={{ fontFamily: "'Space Mono', monospace" }}>
      <ContactMeComponent
        eyebrow="GET IN TOUCH"
        heading={
          <>
            Let's build something{' '}
            <span
              className="text-white underline decoration-2 decoration-[#666666] underline-offset-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              extraordinary
            </span>{' '}
            together.
          </>
        }
      />
      <BlogReviews />
      <AnimatedFooter />
    </div>
  )
}

export default page