"use client"

import { useEffect, useState } from "react"

export default function SocialFeed() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("social-feed")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="social-feed" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#A91D3A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A91D3A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Følg Med På Facebook</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Se de seneste opslag og billeder fra vores restaurant
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "200ms" }}
        >
          {/* Facebook Post 1 */}
          <div className="flex justify-center">
            <div className="w-full max-w-[650px] bg-gradient-to-br from-[#A91D3A]/20 to-black/40 rounded-2xl p-4 border border-[#A91D3A]/30 hover:border-[#A91D3A]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#A91D3A]/20">
              <iframe
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D122110422939152447%26set%3Da.122095785849152447%26type%3D3&show_text=true&width=600"
                width="100%"
                height="600"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Facebook Post 2 */}
          <div className="flex justify-center">
            <div className="w-full max-w-[600px] bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-[#A91D3A]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#A91D3A]/10">
              <iframe
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0HC2o1xhXTnRuH9KLDhBpyiXKgP1CmiaRfwYG2thKq1KaP95BhFb72Law3b2ZKPMPl%26id%3D61584573419070&show_text=true&width=600"
                width="100%"
                height="700"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
