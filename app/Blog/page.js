import BlogInsights from '@/components/BlogInsight'
import Blog from '@/components/BlogInsight'
import BlogReviews from '@/components/BlogReviews'
import AnimatedFooter from '@/components/Footer'
import React from 'react'

function page() {
  return (
    <div>
        <BlogInsights isHomePage={false} />
        <BlogReviews/>
        <AnimatedFooter/>
      
    </div>
  )
}

export default page
