import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import HolidayHours from "@/components/holiday-hours"
import Story from "@/components/story"
import MenuPreview from "@/components/menu-preview"
import BookingCTA from "@/components/booking-cta"
import SocialFeed from "@/components/social-feed"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <Hero />
      <HolidayHours />
      <Story />
      <MenuPreview />
      <BookingCTA />
      <SocialFeed />
      <Footer />
    </main>
  )
}
