/**
 * SUSHI BACKUP
 * ============
 * Alt sushi-indhold fjernet fra siden under sommerkampagnen (5. juli - 9. august).
 * Nar sushi skal tilbage: kopier "sushi"-sektionen tilbage i menuSections i app/menu/page.tsx
 * og gendan teksterne beskrevet nederst i denne fil.
 */

export const sushiMenuSection = {
  sushi: {
    title: "Sushi",
    subtitle: "Traditionelle japanske specialiteter",
    categories: {
      sashimi: {
        name: "Sashimi",
        description: "Tynde skiver af rå fisk",
        items: [
          { number: "20", name: "Laks Sashimi", description: "3 skiver" },
          { number: "21", name: "Tun Sashimi", description: "3 skiver" },
        ],
      },
      toppet: {
        name: "Toppet",
        description: "Sushi med topping",
        items: [
          { number: "29", name: "Grillet Laks Deluxe Roll" },
          { number: "30", name: "Laks Deluxe Roll" },
          { number: "32", name: "Rainbow Roll" },
        ],
      },
      uramaki: {
        name: "Uramaki",
        description: "Inside-out ruller",
        items: [
          { number: "38", name: "Alaska Roll" },
          { number: "39", name: "California Roll" },
          { number: "40", name: "Spicy Laks Roll" },
        ],
      },
      hosomaki: {
        name: "Hosomaki",
        description: "Tynde ruller",
        items: [
          { number: "43", name: "Tigerrejer Hosomaki" },
          { number: "44", name: "Tun Hosomaki" },
          { number: "45", name: "Laks Hosomaki" },
          { number: "46", name: "Agurk Hosomaki" },
        ],
      },
      nigiri: {
        name: "Nigiri",
        description: "Håndformede sushi",
        items: [
          { number: "59", name: "Laks Nigiri" },
          { number: "60", name: "Grillet Laks Nigiri" },
          { number: "63", name: "Tun Nigiri" },
          { number: "68", name: "Tigerrejer Nigiri" },
          { number: "73", name: "Avocado Nigiri" },
        ],
      },
    },
  },
}

/**
 * TEKSTER DER BLEV AENDRET (gendan disse nar sushi kommer tilbage):
 *
 * components/story.tsx (intro):
 *   "Nomi BBQ & Sushi byder på det bedste fra to verdener: Du kan grille din egen
 *    Koreanske BBQ ved bordet og spise frisk sushi."
 *
 * components/story.tsx (Vores Koncept):
 *   "... fra udvalgte kødudskæringer til elegant tilberedt sushi."
 *
 * components/story.tsx (Menu og Bestilling, punkt):
 *   "Frisk sushi: Forberedt dagligt af vores sushikokke — nigiri, sashimi, maki og specialruller."
 *
 * app/about/page.tsx (intro):
 *   "Nomi BBQ & Sushi byder velkommen til en kulinarisk oplevelse, hvor koreansk grillkultur
 *    møder japansk sushi-håndværk. Vores koncept kombinerer bordgrillet Korean BBQ med
 *    frisklavet sushi, så gæsterne kan nyde det bedste fra begge køkkener i et moderne og
 *    indbydende miljø."
 *
 * app/about/page.tsx + components/policy-modal.tsx (madspild):
 *   "Sushi: Hvis der efterlades mere end 3 stk., opkræves 10 kr. pr. stk."
 *
 * components/soft-opening-banner.tsx:
 *   "🍣 Sushi & varme retter"
 *
 * components/menu-preview.tsx:
 *   category: "Sushi Specialiteter"
 *
 * components/footer.tsx (tagline):
 *   "Autentisk koreansk BBQ & japansk sushi i hjertet af Brønderslev"
 *
 * app/layout.tsx (metadata):
 *   title: "Nomi B.B.Q & Sushi | Koreansk BBQ × Japansk Sushi i Brønderslev"
 *   description: "Oplev hvor koreansk BBQ mødes med japansk sushi på Peder Nielsens Plads 8B
 *     i Brønderslev. Autentisk bordgrill-oplevelse med friske råvarer. All You Can Eat fra 279,-. Book bord nu!"
 *   keywords: "sushi Brønderslev"
 */
