import ContactMeComponent from '@/components/ContactSection'
import BlogReviews from '@/components/BlogReviews'
import AnimatedFooter from '@/components/Footer'
import React from 'react'

function page() {
  return (
    <div>
      <ContactMeComponent
        eyebrow="GET IN TOUCH"
        heading={
          <>
            Let's build something{' '}
            <span className="text-white underline decoration-2 decoration-zinc-500 underline-offset-4">
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