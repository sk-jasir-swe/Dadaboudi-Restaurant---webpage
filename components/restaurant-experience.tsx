"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const signatureDishes = [
  { image: "/brand/best-1.jpg", name: "A Flavourful Curry", detail: "Rich colour, generous flavour" },
  { image: "/brand/best-2.jpg", name: "From the Grill", detail: "A centrepiece made to share" },
  { image: "/brand/best-3.jpg", name: "Whole Fish, Beautifully Spiced", detail: "A feast for the table" },
  { image: "/brand/best-4.jpg", name: "Steamed Dumplings", detail: "Warm, tender bites to share" },
  { image: "/brand/best-5.jpg", name: "Fresh from the Tandoor", detail: "Smoky, savoury and satisfying" },
  { image: "/brand/best-6.jpg", name: "A Bright, Flavourful Plate", detail: "Fresh from the kitchen" },
  { image: "/brand/best-7.jpg", name: "Grilled Favourites", detail: "A little char, lots of flavour" },
  { image: "/brand/best-8.jpg", name: "A Platter to Share", detail: "Bring everyone to the table" },
  { image: "/brand/best-9.jpg", name: "A Cool, Colourful Finish", detail: "Sip something refreshing" },
];

const menuCategories = [
  { index: "01", title: "Biriyani", items: [["Mutton Biriyani", "₹320*", "/brand/hero-crop.jpg"], ["Chicken Biriyani", "₹230*", "/brand/hero-crop.jpg"], ["Special Mutton Biriyani", "₹590", "/brand/hero-crop.jpg"]] },
  { index: "02", title: "Indian kitchen", items: [["Butter Chicken", "₹300", "/brand/best-1.jpg"], ["Mutton Kosha", "₹260", "/brand/best-1.jpg"], ["Paneer Lajawab", "₹240", "/brand/best-1.jpg"]] },
  { index: "03", title: "Tandoor & more", items: [["Chicken Kalmi Kabab", "from ₹170", "/brand/best-5.jpg"], ["Cheese Garlic Fish Tikka", "₹400", "/brand/best-2.jpg"], ["Dada Boudi Special Faluda", "₹190", "/brand/best-9.jpg"]] },
];

export default function RestaurantExperience() {
  const root = useRef<HTMLDivElement>(null);
  const menuSection = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [reviewRating, setReviewRating] = useState("");
  const [reviewLink, setReviewLink] = useState("");
  const [menuFilter, setMenuFilter] = useState("All");
  const [menuSearch, setMenuSearch] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: { duration: 1.2 } });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", { y: 32, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.1 });
      gsap.to(".hero-content", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".cinematic-media", { scale: 1.1, ease: "none", scrollTrigger: { trigger: ".experience", start: "top top", end: "bottom bottom", scrub: true } });
      gsap.to(".biryani-feature-media", { yPercent: 8, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".biryani-feature", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".signature-card").forEach((card, index) => {
        gsap.fromTo(card, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: (index % 3) * 0.07, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 92%", once: true } });
      });
      gsap.to(".scroll-progress span", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".experience", start: "top top", end: "bottom bottom", scrub: 0.15 } });
    }, root);

    return () => { context.revert(); lenis.off("scroll", ScrollTrigger.update); gsap.ticker.remove(updateLenis); lenis.destroy(); lenisRef.current = null; };
  }, []);

  const exploreMenu = () => {
    if (!menuSection.current) return;
    if (lenisRef.current) lenisRef.current.scrollTo(menuSection.current, { duration: 1.2 });
    else menuSection.current.scrollIntoView({ behavior: "auto" });
  };

  const prepareReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("reviewer-name") ?? "").trim();
    const review = String(formData.get("review-text") ?? "").trim();
    const message = `Hi Dada Boudi, I'd like to share a review.\nName: ${name}\nRating: ${reviewRating}/5\nReview: ${review}`;
    setReviewLink(`https://wa.me/919831318010?text=${encodeURIComponent(message)}`);
  };

  const visibleMenuCategories = menuCategories
    .filter((category) => menuFilter === "All" || category.title === menuFilter)
    .map((category) => ({
      ...category,
      items: category.items.filter(([item]) => item.toLowerCase().includes(menuSearch.trim().toLowerCase())),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="experience" ref={root}>
      <div className="cinematic-background" aria-hidden="true">
        <video className="cinematic-media" autoPlay loop muted playsInline preload="metadata"><source src="/video/makhani.mp4" type="video/mp4" /></video>
        <div className="video-vignette" /><div className="film-grain" />
      </div>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Dada Boudi home"><img src="/brand/logo192.png" alt="Dada Boudi Hotel" /><span>Dada Boudi<br />Restaurant</span></a>
        <nav aria-label="Main navigation"><a href="#story">Our story</a><a href="#signature">Signature</a><a href="#menu">Menu</a><a href="#catering">Catering</a></nav>
        <details className="mobile-nav"><summary aria-label="Open navigation menu"><span></span><span></span><span></span></summary><nav aria-label="Mobile navigation"><a href="#story" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>Our story</a><a href="#signature" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>Signature</a><a href="#menu" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>Menu</a><a href="#locations-title" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>Find us</a><a href="#catering" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>Catering</a></nav></details>
        <a className="book-link" href="https://wa.me/919831318010?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order" target="_blank" rel="noreferrer">Order on WhatsApp <span>↗</span></a>
      </header>
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow" data-hero-reveal>Biriyani Manei Dada Boudi</p>
            <h1 id="hero-title" data-hero-reveal>A Kolkata classic,<br /><em>served with heart.</em></h1>
            <div className="hero-bottom" data-hero-reveal><p>From our kitchen to your table—<br />a taste that brings everyone together.</p><div className="hero-actions"><button type="button" onClick={exploreMenu}>Discover the menu <span>↓</span></button><a className="hero-order-link" href="https://wa.me/919831318010?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order" target="_blank" rel="noreferrer">Order on WhatsApp <span>↗</span></a></div></div>
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
            {signatureDishes.map((dish, index) => <article className={`signature-card signature-card-${index + 1}`} key={dish.image}><img src={dish.image} alt={dish.name} loading="lazy" /><div><span>0{index + 1}</span><h3>{dish.name}</h3><p>{dish.detail}</p></div></article>)}
          </div>
        </section>

        <section className="biryani-feature" aria-labelledby="biryani-feature-title">
          <img className="biryani-feature-media" src="/brand/hero-crop.jpg" alt="Dada Boudi mutton biryani with rice and potato" loading="lazy" />
          <div className="biryani-feature-overlay" />
          <div className="biryani-feature-content" data-reveal><p className="eyebrow">The Barrackpore classic</p><h2 id="biryani-feature-title">A Kolkata classic,<br /><em>made to be shared.</em></h2><p>Mutton biriyani, served with the warmth and generosity Dada Boudi is known for.</p><a href="https://wa.me/919831318010?text=Hi%2C%20I%27d%20like%20to%20order%20mutton%20biriyani" target="_blank" rel="noreferrer">Order mutton biriyani <span>↗</span></a></div>
          <p className="biryani-feature-stamp" aria-hidden="true">Dada Boudi <span>Since 1961</span></p>
        </section>

        <section className="menu-section" id="menu" ref={menuSection} aria-labelledby="menu-title">
          <div className="menu-heading" data-reveal><p className="eyebrow">Popular from the Dada Boudi menu</p><h2 id="menu-title">Find your<br /><em>favourite plate.</em></h2><p>Search these guest favourites, then browse the complete online menu.</p></div>
          <div className="menu-columns" data-reveal>
            <div className="menu-controls"><label className="menu-search" htmlFor="menu-search">Search dishes<input id="menu-search" type="search" value={menuSearch} onChange={(event) => setMenuSearch(event.target.value)} placeholder="Try biriyani, kebab…" /></label><div className="menu-filters" role="group" aria-label="Filter menu by category">{["All", ...menuCategories.map((category) => category.title)].map((filter) => <button type="button" className={menuFilter === filter ? "is-active" : ""} aria-pressed={menuFilter === filter} onClick={() => setMenuFilter(filter)} key={filter}>{filter}</button>)}</div></div>
            {visibleMenuCategories.length ? visibleMenuCategories.map((category) => <article className="menu-category" key={category.index}><div className="menu-category-heading"><span>{category.index}</span><h3>{category.title}</h3></div><ul>{category.items.map(([item, price, image]) => <li key={item}><button className="menu-item-preview-trigger" type="button" aria-label={`Preview ${item}`}><span>{item}</span></button><b>{price}</b><img className="menu-item-preview" src={image} alt="" loading="lazy" /></li>)}</ul></article>) : <p className="menu-empty-state">No dishes match that search. Try another name.</p>}
            <p className="menu-price-note">Prices may vary by branch and can change; please confirm before ordering.</p>
            <a className="menu-cta" href="https://www.zomato.com/kolkata/dada-boudi-restaurant-barrackpore/order" target="_blank" rel="noreferrer">Browse the full menu on Zomato <span>↗</span></a>
          </div>
        </section>

        <section className="testimonials-section" aria-labelledby="testimonials-title">
          <div className="testimonials-heading"><p className="eyebrow">A little love from our guests</p><h2 id="testimonials-title">Stories shared<br /><em>around the table.</em></h2></div>
          <div className="testimonials-grid">
            <figure className="testimonial-card"><div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“Mutton quality was really awesome.”</blockquote><figcaption>Sudip B. <span>Google review · Oct 2025</span></figcaption></figure>
            <figure className="testimonial-card"><div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“Soft rice, flavourful aroma, and the mutton pieces are big and perfectly cooked.”</blockquote><figcaption>Tiyasa P. <span>Google review · Nov 2025</span></figcaption></figure>
          </div>
        </section>

        <section className="locations-section" aria-labelledby="locations-title">
          <div className="locations-heading"><p className="eyebrow">A seat for everyone</p><h2 id="locations-title">Two neighbourhoods,<br /><em>one Dada Boudi.</em></h2></div>
          <div className="locations-grid">
            <article className="location-card" data-reveal><img src="/brand/front.jpg" alt="Dada Boudi Hotel in Barrackpore" /><div className="location-card-copy"><p className="eyebrow">01 / Barrackpore</p><h3>Where our story began.</h3><div className="location-details"><p>1, Ghosh Para Road<br />Barrackpore, West Bengal 700120</p><p>Open daily <span>11:00 am – 10:30 pm</span></p></div><div className="location-actions"><a href="https://www.google.com/maps/search/?api=1&query=1+Ghosh+Para+Road%2C+Barrackpore%2C+West+Bengal+700120" target="_blank" rel="noreferrer">Get directions <span>↗</span></a><a href="tel:9831318010">Call <span>↗</span></a></div></div></article>
            <article className="location-card" data-reveal><img src="/brand/sodepur.jpg" alt="Dada Boudi Restaurant in Sodepur" /><div className="location-card-copy"><p className="eyebrow">02 / Sodepur</p><h3>Your Dada Boudi table, closer.</h3><div className="location-details"><p>33, Barrackpore Trunk Road<br />Kamarhati, Sodepur, Khardaha</p><p>Open daily <span>11:30 am – 10:30 pm</span></p></div><div className="location-actions"><a href="https://www.google.com/maps/search/?api=1&query=33+Barrackpore+Trunk+Road%2C+Kamarhati%2C+Sodepur%2C+Khardaha" target="_blank" rel="noreferrer">Get directions <span>↗</span></a><a href="tel:9748528886">Call <span>↗</span></a></div></div></article>
          </div>
        </section>

        <section className="catering-section" id="catering" aria-labelledby="catering-title"><img className="catering-image" src="/brand/sodepur.jpg" alt="Dada Boudi dining scene" /><div className="catering-overlay" /><div className="catering-copy" data-reveal><p className="eyebrow">Dada Boudi catering service</p><h2 id="catering-title">Bring Dada Boudi<br /><em>to your celebration.</em></h2><p>For family gatherings, celebrations and events, our team brings the generous Dada Boudi experience to your guests.</p><a href="tel:9831318010">Plan an event <span>↗</span></a></div></section>

        <section className="review-section" aria-labelledby="review-title">
          <div className="review-copy"><p className="eyebrow">Your experience matters</p><h2 id="review-title">Good food is<br /><em>better shared.</em></h2><p>Tell us how your visit went. Your feedback helps us make every table feel more welcoming.</p><div className="review-note"><span>★★★★★</span><small>A few words from you can make our day.</small></div></div>
          <form className="review-form" onSubmit={prepareReview}>
            <p className="review-form-title">Leave us a note</p>
            <fieldset className="rating-field"><legend>Your rating</legend><div className="rating-options">{[1, 2, 3, 4, 5].map((value) => <label className={`rating-option${Number(reviewRating) >= value ? " is-active" : ""}`} key={value}><input type="radio" name="rating" value={value} required checked={reviewRating === String(value)} onChange={(event) => setReviewRating(event.target.value)} /><span aria-hidden="true">★</span><span className="sr-only">{value} {value === 1 ? "star" : "stars"}</span></label>)}</div></fieldset>
            <label className="review-field" htmlFor="reviewer-name">Your name<input id="reviewer-name" name="reviewer-name" type="text" autoComplete="name" placeholder="How should we address you?" required maxLength={80} /></label>
            <label className="review-field" htmlFor="review-text">Your review<textarea id="review-text" name="review-text" placeholder="What did you enjoy most?" required minLength={10} maxLength={500} rows={4} /></label>
            <button className="review-submit" type="submit">Prepare my review <span>↗</span></button>
            {reviewLink && <p className="review-confirmation" role="status">Your message is ready. Continue to WhatsApp and tap send.<a href={reviewLink} target="_blank" rel="noreferrer">Send review on WhatsApp ↗</a></p>}
          </form>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><img src="/brand/logo192.png" alt="Dada Boudi Hotel" /><p>Dada Boudi Restaurant<br />Kolkata</p></div><p>Made with heart, shared with everyone.</p><div className="footer-links"><a href="https://www.instagram.com/dadaboudihotelofficial/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/officialdadaboudihotel" target="_blank" rel="noreferrer">Facebook</a></div></footer>
      <a className="mobile-order-bar" href="https://wa.me/919831318010?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order" target="_blank" rel="noreferrer"><span>Order on WhatsApp</span><span aria-hidden="true">↗</span></a>
    </div>
  );
}
