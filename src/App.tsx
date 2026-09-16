import { useEffect, useRef, useState } from 'react'
import {
  AirVent, ArrowLeft, ArrowRight, Bath, BedDouble, ChevronDown, CircleUserRound,
  Globe, Heart, House, Info, Leaf, Menu, Minus, Plus, Search, Share, ShieldCheck,
  Star, Users, Wifi, X, Zap,
} from 'lucide-react'
import { listing } from './data/listing'

type Modal = 'tour' | 'lightbox' | 'amenities' | null

function useModalLock(open: boolean) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])
}

function Header({ onSearch }: { onSearch: () => void }) {
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Airbnb home"><span className="brand-mark">⌂</span><span>airbnb</span></a>
    <button className="search-pill" onClick={onSearch} aria-label="Search destinations and dates">
      <strong>Anywhere</strong><span className="pill-divider" /><strong>Any week</strong><span className="pill-divider" /><span className="muted">Add guests</span><span className="search-icon"><Search size={15} strokeWidth={3} /></span>
    </button>
    <nav className="header-actions" aria-label="Account navigation">
      <button className="plain-action">Airbnb your home</button>
      <button className="icon-action" aria-label="Choose language"><Globe size={19} /></button>
      <button className="account-menu" aria-label="Open account menu"><Menu size={18} /><CircleUserRound size={30} fill="#717171" color="#717171" /></button>
    </nav>
  </header>
}

function Gallery({ onOpen }: { onOpen: (index?: number) => void }) {
  return <section className="gallery" aria-label="Property photos">
    <button className="gallery-main photo-button" onClick={() => onOpen(0)}><img src={listing.images[0].src} alt={listing.images[0].alt} /></button>
    <div className="gallery-grid">
      {listing.images.slice(1, 5).map((image, index) => <button className="photo-button" key={image.src} onClick={() => onOpen(index + 1)}><img src={image.src} alt={image.alt} /></button>)}
    </div>
    <button className="show-all" onClick={() => onOpen(0)}><Menu size={15} /> Show all photos</button>
  </section>
}

function BookingCard() {
  const [guests, setGuests] = useState(1)
  return <aside className="booking-card">
    <div className="booking-top"><div><span className="price">${listing.price}</span> <span className="night">night</span></div><span className="booking-rating"><Star size={13} fill="currentColor" /> {listing.rating} · {listing.reviews} reviews</span></div>
    <div className="date-grid"><button><span>CHECK-IN</span><strong>10/18/2026</strong></button><button><span>CHECKOUT</span><strong>10/23/2026</strong></button></div>
    <div className="guest-row"><button className="guest-select"><span><em>GUESTS</em><strong>{guests} guest{guests > 1 ? 's' : ''}</strong></span><ChevronDown size={16} /></button><div className="guest-stepper"><button onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Decrease guests"><Minus size={15} /></button><button onClick={() => setGuests(Math.min(8, guests + 1))} aria-label="Increase guests"><Plus size={15} /></button></div></div>
    <button className="reserve-button">Reserve</button>
    <p className="no-charge">You won't be charged yet</p>
    <div className="fee-line"><span>${listing.price} x 5 nights</span><span>${listing.price * 5}</span></div>
    <div className="fee-line"><span>Airbnb service fee</span><span>$228</span></div>
    <div className="total-line"><strong>Total before taxes</strong><strong>${listing.price * 5 + 228}</strong></div>
  </aside>
}

function PhotoModal({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(Math.min(startIndex, listing.images.length - 1))
  const closeRef = useRef<HTMLButtonElement>(null)
  useModalLock(true)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + listing.images.length) % listing.images.length)
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % listing.images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
    <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close photo viewer"><X /></button>
    <button className="modal-arrow left" onClick={() => setIndex((index - 1 + listing.images.length) % listing.images.length)} aria-label="Previous photo"><ArrowLeft /></button>
    <figure className="lightbox-figure"><img src={listing.images[index].src} alt={listing.images[index].alt} /><figcaption>{index + 1} / {listing.images.length}</figcaption></figure>
    <button className="modal-arrow right" onClick={() => setIndex((index + 1) % listing.images.length)} aria-label="Next photo"><ArrowRight /></button>
  </div>
}

function PhotoTour({ onClose, onPhoto }: { onClose: () => void; onPhoto: (index: number) => void }) {
  useModalLock(true)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { closeRef.current?.focus(); const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [onClose])
  return <div className="tour" role="dialog" aria-modal="true" aria-label="Photo tour"><div className="tour-bar"><button ref={closeRef} className="tour-close" onClick={onClose}><X size={18} /> Close</button><span>{listing.title}</span><span className="tour-count">{listing.images.length} photos</span></div><div className="tour-grid">{listing.images.map((image, index) => <button className="tour-photo" key={image.src} onClick={() => onPhoto(index)}><img src={image.src} alt={image.alt} /></button>)}</div></div>
}

function AmenitiesModal({ onClose }: { onClose: () => void }) {
  useModalLock(true)
  return <div className="scrim" role="dialog" aria-modal="true" aria-label="Amenities"><div className="amenities-modal"><button className="modal-x" onClick={onClose} aria-label="Close amenities"><X size={19} /></button><h2>What this place offers</h2><div className="amenities-list">{listing.amenities.map((amenity) => <div key={amenity}><Zap size={20} strokeWidth={1.6} /><span>{amenity}</span></div>)}</div></div></div>
}

function App() {
  const [modal, setModal] = useState<Modal>(null)
  const [activePhoto, setActivePhoto] = useState(0)
  const openPhotos = (index = 0) => { setActivePhoto(index); setModal('tour') }
  return <div id="top">
    <Header onSearch={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />
    <main className="page-shell">
      <div className="listing-heading"><div><h1>{listing.title}</h1><p className="location">{listing.location}</p></div><div className="heading-actions"><button onClick={() => navigator.clipboard?.writeText(window.location.href)}><Share size={17} /> Share</button><button><Heart size={18} /> Save</button></div></div>
      <Gallery onOpen={openPhotos} />
      <div className="content-layout"><article className="listing-content">
        <section className="host-row"><div><h2>Entire cabin hosted by {listing.host}</h2><p>{listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.bathrooms} baths</p></div><div className="host-avatar">M</div></section>
        <section className="highlights"><div><House /><span><strong>Beautiful place</strong><small>Guests love this home’s quiet location</small></span></div><div><Leaf /><span><strong>Great for remote work</strong><small>Fast wifi and a dedicated workspace</small></span></div><div><ShieldCheck /><span><strong>Experienced host</strong><small>{listing.host} has {listing.hostYears} years of hosting experience</small></span></div></section>
        <section className="description"><p>Welcome to your modern mountain escape. This light-filled cabin pairs warm timber details with clean, considered design, creating a calm base for exploring Whistler in every season.</p><p>Start slow mornings with coffee on the deck, soak in the hot tub after the slopes, and gather around the fireplace when the sun goes down.</p><button className="text-button">Show more <ArrowRight size={15} /></button></section>
        <section className="amenities"><h2>What this place offers</h2><div className="amenity-grid">{listing.amenities.slice(0, 6).map((amenity, index) => <div key={amenity}><span className="amenity-icon">{index % 2 ? <Wifi /> : index === 0 ? <Leaf /> : index === 1 ? <House /> : <Bath />}</span>{amenity}</div>)}</div><button className="outline-button" onClick={() => setModal('amenities')}>Show all {listing.amenities.length} amenities</button></section>
      </article><div id="booking" className="booking-wrap"><BookingCard /></div></div>
      <section className="rating-section"><h2><Star size={20} fill="currentColor" /> {listing.rating}</h2><p>One of the most loved homes on Airbnb</p><div className="rating-bars"><div><span>Cleanliness</span><progress value="4.9" max="5" /></div><div><span>Communication</span><progress value="4.9" max="5" /></div><div><span>Check-in</span><progress value="4.8" max="5" /></div><div><span>Accuracy</span><progress value="4.9" max="5" /></div></div></section>
      <footer><span className="brand-footer">airbnb</span><span>© 2026 Airbnb Clone</span><span>Privacy · Terms · Sitemap</span></footer>
    </main>
    {modal === 'tour' && <PhotoTour onClose={() => setModal(null)} onPhoto={(index) => { setActivePhoto(index); setModal('lightbox') }} />}
    {modal === 'lightbox' && <PhotoModal startIndex={activePhoto} onClose={() => setModal(null)} />}
    {modal === 'amenities' && <AmenitiesModal onClose={() => setModal(null)} />}
  </div>
}

export default App
