"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const signatureDishes = [
  { image: "/brand/best-1.jpg", name: "The Biriyani", detail: "A Dada Boudi classic" },
  { image: "/brand/best-2.jpg", name: "From the wok", detail: "Bold spice, bright flavour" },
  { image: "/brand/best-3.jpg", name: "Steamed moments", detail: "Made to share" },
  { image: "/brand/best-4.jpg", name: "House favourites", detail: "The best of our kitchen" },
  { image: "/brand/best-5.jpg", name: "A little heat", detail: "Fresh from the tandoor" },
  { image: "/brand/best-6.jpg", name: "Table stories", detail: "Comfort, the Kolkata way" },
  { image: "/brand/best-7.jpg", name: "Chef’s selection", detail: "Made with care" },
  { image: "/brand/best-8.jpg", name: "For every craving", detail: "A colourful spread" },
  { image: "/brand/best-9.jpg", name: "Small plates", detail: "Big on flavour" },
];

const menuCategories = [
  { index: "01", title: "Biriyani", items: [["Mutton Biriyani", "₹320*"], ["Chicken Biriyani", "₹230*"], ["Special Mutton Biriyani", "₹590"]] },
  { index: "02", title: "Indian kitchen", items: [["Butter Chicken", "₹300"], ["Mutton Kosha", "₹260"], ["Paneer Lajawab", "₹240"]] },
  { index: "03", title: "Tandoor & more", items: [["Chicken Kalmi Kabab", "from ₹170"], ["Cheese Garlic Fish Tikka", "₹400"], ["Dada Boudi Special Faluda", "₹190"]] },
];

export default function RestaurantExperience() {
  const root = useRef<HTMLDivElement>(null);
  const menuSection = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", { y: 32, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.1 });
      gsap.to(".hero-content", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".cinematic-media", { scale: 1.1, ease: "none", scrollTrigger: { trigger: ".experience", start: "top top", end: "bottom bottom", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".signature-card").forEach((card, index) => {
        gsap.fromTo(card, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: (index % 3) * 0.07, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 92%", once: true } });
      });
      gsap.to(".scroll-progress span", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".experience", start: "top top", end: "bottom bottom", scrub: 0.15 } });
    }, root);

    return () => { context.revert(); gsap.ticker.remove(updateLenis); lenis.destroy(); };
  }, []);

  const exploreMenu = () => menuSection.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="experience" ref={root}>
      <div className="cinematic-background" aria-hidden="true">
        <video className="cinematic-media" autoPlay loop muted playsInline preload="metadata"><source src="/video/makhani.mp4" type="video/mp4" /></video>
        <div className="video-vignette" /><div className="film-grain" />
      </div>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Dada Boudi home"><img src="/brand/logo192.png" alt="Dada Boudi Hotel" /><span>Dada Boudi<br />Restaurant</span></a>
        <nav aria-label="Main navigation"><a href="#story">Our story</a><a href="#signature">Signature</a><a href="#menu">Menu</a><a href="#catering">Catering</a></nav>
        <a className="book-link" href="tel:8100510647">Order / Enquire <span>↗</span></a>
      </header>
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow" data-hero-reveal>Biriyani Manei Dada Boudi</p>
            <h1 id="hero-title" data-hero-reveal>A Kolkata classic,<br /><em>served with heart.</em></h1>
            <div className="hero-bottom" data-hero-reveal><p>From our kitchen to your table—<br />a taste that brings everyone together.</p><button type="button" onClick={exploreMenu}>Discover the menu <span>↓</span></button></div>
          </div>
          <p className="vertical-copy">Scroll to discover Dada Boudi</p>
        </section>

        <section className="story section" id="story" aria-labelledby="story-title">
          <div className="section-number" data-reveal>1961 <span>Our story begins</span></div>
          <div className="story-copy" data-reveal><p className="eyebrow">A legacy at the table</p><h2 id="story-title">A family story,<br /><em>seasoned by time.</em></h2><p className="body-copy">What began as a modest eatery near Barrackpore railway station grew through patience, hard work and the warm welcome of generations of guests. The name Dada Boudi carries that family spirit into every plate.</p></div>
          <figure className="founder-card" data-reveal><img src="/brand/founder.jpg" alt="Dada Boudi founders" /><figcaption>Dhiren Saha &amp; Sandhya Rani Saha <span>Founders</span></figcaption></figure>
        </section>

        <section className="signature-section" id="signature" aria-labelledby="signature-title">
          <div className="section-intro" data-reveal><p className="eyebrow">Made for every appetite</p><h2 id="signature-title">The dishes people<br /><em>come back for.</em></h2><p>From the beloved biriyani to tandoor classics, Chinese favourites and sweet endings—every table has its own Dada Boudi story.</p></div>
          <div className="signature-grid">
            {signatureDishes.map((dish, index) => <article className={`signature-card signature-card-${index + 1}`} key={dish.image}><img src={dish.image} alt="Dada Boudi food selection" /><div><span>0{index + 1}</span><h3>{dish.name}</h3><p>{dish.detail}</p></div></article>)}
          </div>
        </section>

        <section className="menu-section" id="menu" ref={menuSection} aria-labelledby="menu-title">
          <div className="menu-heading" data-reveal><p className="eyebrow">The Dada Boudi menu</p><h2 id="menu-title">Find your<br /><em>favourite plate.</em></h2><p>Explore the full selection, from biriyani and Indian favourites to Chinese dishes, tandoor and desserts.</p></div>
          <div className="menu-columns" data-reveal>
            {menuCategories.map((category) => <article className="menu-category" key={category.index}><div className="menu-category-heading"><span>{category.index}</span><h3>{category.title}</h3></div><ul>{category.items.map(([item, price]) => <li key={item}><span>{item}</span><b>{price}</b></li>)}</ul></article>)}
            <a className="menu-cta" href="https://dadaboudihotel.in/menu" target="_blank" rel="noreferrer">View the full menu <span>↗</span></a>
          </div>
        </section>

        <section className="locations-section" aria-labelledby="locations-title">
          <div className="location-image location-image-main" data-reveal><img src="/brand/restaurant.jpg" alt="Dada Boudi restaurant interior" /></div>
          <div className="location-copy" data-reveal><p className="eyebrow">A seat for everyone</p><h2 id="locations-title">Come for the<br /><em>flavour. Stay for<br />the feeling.</em></h2><p>From a humble 200-square-foot beginning to a restaurant loved by families, every Dada Boudi visit is made to feel like an occasion.</p></div>
          <div className="location-image location-image-side" data-reveal><img src="/brand/front.jpg" alt="Dada Boudi restaurant front" /></div>
        </section>

        <section className="catering-section" id="catering" aria-labelledby="catering-title"><img className="catering-image" src="/brand/sodepur.jpg" alt="Dada Boudi dining scene" /><div className="catering-overlay" /><div className="catering-copy" data-reveal><p className="eyebrow">Dada Boudi catering service</p><h2 id="catering-title">Bring Dada Boudi<br /><em>to your celebration.</em></h2><p>For family gatherings, celebrations and events, our team brings the generous Dada Boudi experience to your guests.</p><a href="tel:9831318010">Plan an event <span>↗</span></a></div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><img src="/brand/logo192.png" alt="Dada Boudi Hotel" /><p>Dada Boudi Restaurant<br />Kolkata</p></div><p>Made with heart, shared with everyone.</p><div className="footer-links"><a href="https://www.instagram.com/dadaboudihotelofficial/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/officialdadaboudihotel" target="_blank" rel="noreferrer">Facebook</a></div></footer>
    </div>
  );
}
