import { useEffect, useMemo, useState } from 'react'
import { Bath, BriefcaseBusiness, CarFront, ChevronLeft, ChevronRight, Globe2, Grid2X2, Heart, Home, MapPin, Maximize2, Menu, Minus, Plus, Search, Share2, Sparkles, Waves, X } from 'lucide-react'
import './App.css'

type Photo = { src: string; alt: string }
type Review = { name: string; meta: string; text: string; avatar?: string }

const photos: Photo[] = [
  { src: '/images/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg', alt: 'Living room with sofa and jacuzzi view' },
  { src: '/images/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg', alt: 'Living area second view' },
  { src: '/images/9be71047-fc52-438a-9270-75cb470f6752.jpeg', alt: 'Apartment interior' },
  { src: '/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg', alt: 'Bedroom' },
  { src: '/images/c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg', alt: 'Apartment view' },
  { src: '/images/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg', alt: 'Full kitchen' },
  { src: '/images/97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg', alt: 'Full bathroom' },
  { src: '/images/9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg', alt: 'Gym' },
  { src: '/images/23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg', alt: 'Exterior' },
  { src: '/images/fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg', alt: 'Pool' },
  { src: '/images/70325367-cbae-4993-b560-18cd3f6edd53.jpeg', alt: 'Additional photos' },
  { src: '/images/1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg', alt: 'Bedroom second view' },
  { src: '/images/ddc853d7-e658-405c-bedc-8f31106c447e.jpeg', alt: 'Kitchen second view' },
]
const tourPhotoIndexes = [0, 1, 5, 3, 6, 7, 8, 9, 10]
const amenities = ['Kitchen', 'Wifi', 'Dedicated workspace', 'Free parking on premises', 'Pool', 'Hot tub', 'Pets allowed', 'Exterior security cameras on property', 'Carbon monoxide alarm', 'Smoke alarm']
const reviews: Review[] = [
  { name: 'Amit', meta: '2 months on Airbnb · 1 week ago', text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.' },
  { name: 'Aheesh', meta: '3 years on Airbnb · 2 weeks ago', text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.' },
  { name: 'Samiksha', meta: '8 months on Airbnb · May 2026', text: 'the host nitish was really great help' },
  { name: 'Vedant', meta: '4 years on Airbnb · May 2026', text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived.' },
  { name: 'Vaibhav S', meta: '3 years on Airbnb · May 2026', text: "Great great experience living out there, can't expect more, will always look for it in the future." },
]
const nearby: Array<[string, string, string, number]> = [
  ['Beautiful Studio with a view to die for', '₹23,600', '4.91', 0],
  ['NAQAB - 1bhk with private pool', '₹42,218', '4.95', 1],
  ['Greentique Luxury Flat with plunge pool, Calangute', '₹44,506', '4.94', 2],
  ['The Tropical Studio | 5 mins to Beach', '₹22,824', '4.96', 3],
]

function App() {
  const [saved, setSaved] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [amenitiesOpen, setAmenitiesOpen] = useState(false)
  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [reviewsOpen, setReviewsOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [monthOffset, setMonthOffset] = useState(0)
  const [stickyVisible, setStickyVisible] = useState(false)

  const calendarMonths = useMemo(() => {
    const start = new Date(2026, 9 + monthOffset, 1)
    return [0, 1].map((offset) => new Date(start.getFullYear(), start.getMonth() + offset, 1))
  }, [monthOffset])

  useEffect(() => {
    if (!tourOpen && lightboxIndex === null && !amenitiesOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null)
        else if (tourOpen) setTourOpen(false)
        else setAmenitiesOpen(false)
      }
      if (lightboxIndex !== null && event.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % photos.length)
      if (lightboxIndex !== null && event.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown) }
  }, [tourOpen, lightboxIndex, amenitiesOpen])

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showToast = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200) }
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <header className="top-header">
        <a className="airbnb-logo" href="#top" aria-label="Airbnb home"><img className="logo-mark" src="/airbnb-logo.svg" alt="" /></a>
        <div className="search-pill" aria-label="Search"><button type="button">Anywhere</button><i /><button type="button">Anytime</button><i /><button type="button">Add guests</button><button className="search-go" type="button" aria-label="Search"><Search size={14} strokeWidth={3} /></button></div>
        <nav className="top-actions"><button type="button">Become a host</button><button type="button" aria-label="Choose language"><Globe2 size={16} strokeWidth={1.8} /></button><button type="button" className="menu-button" aria-label="Main menu"><Menu size={18} strokeWidth={2} /></button></nav>
      </header>
      <div className={`sticky-nav ${stickyVisible ? 'visible' : ''}`}><nav><button onClick={() => scrollTo('overview')}>Photos</button><button onClick={() => scrollTo('amenities-section')}>Amenities</button><button onClick={() => scrollTo('reviews-section')}>Reviews</button><button onClick={() => scrollTo('location-section')}>Location</button></nav><div><span>₹28,499 for 5 nights</span><strong>4.95 · 19 reviews</strong><button className="small-reserve" onClick={() => scrollTo('reserve')}>Reserve</button></div></div>

      <main className="page-shell" id="top">
        <section className="listing" id="overview" aria-labelledby="listing-title">
          <div className="listing-heading"><h1 id="listing-title">Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1><div className="listing-actions"><button type="button" className="text-button" onClick={() => showToast('Link copied to clipboard')}><Share2 size={15} strokeWidth={1.8} /> Share</button><button type="button" className={`text-button ${saved ? 'is-saved' : ''}`} onClick={() => setSaved(!saved)}><Heart size={15} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button></div></div>
          <div className="photo-grid" aria-label="Property photos"><button type="button" className="photo photo-main" onClick={() => setTourOpen(true)} aria-label="Open living room photo"><img src={photos[0].src} alt={photos[0].alt} /></button>{photos.slice(1, 5).map((photo, index) => <button type="button" className="photo" key={photo.src} onClick={() => setLightboxIndex(index + 1)} aria-label={`Open property photo ${index + 2}`}><img src={photo.src} alt={photo.alt} /></button>)}<button type="button" className="show-photos" onClick={() => setTourOpen(true)}><Grid2X2 size={15} strokeWidth={1.8} /> Show all photos</button></div>

          <div className="listing-layout">
            <div className="listing-copy">
              <div className="property-intro"><div><h2>Entire serviced apartment in Candolim, India</h2><p>3 guests · 1 bedroom · 1 bed · 1 bathroom</p></div><div className="host-avatar" aria-label="Hosted by Mirashya Homes">M</div></div>
              <div className="guest-favourite"><div className="laurel-row"><img src="/images/ui/laurel-left.png" alt="" /><strong>Guest favourite</strong><img src="/images/ui/laurel-right.png" alt="" /></div><span>One of the most loved homes on Airbnb, according to guests</span><b>4.95 <span aria-hidden="true">★</span> · 19 reviews</b></div>
              <div className="feature-row"><span className="feature-icon"><Waves size={24} strokeWidth={1.6} /></span><div><strong>Outdoor entertainment</strong><span>The pool and alfresco dining are great for summer trips.</span></div></div><div className="feature-row"><span className="feature-icon"><Sparkles size={24} strokeWidth={1.6} /></span><div><strong>Designed for staying cool</strong><span>Beat the heat with the A/C and ceiling fan.</span></div></div><div className="feature-row"><span className="feature-icon"><Home size={24} strokeWidth={1.6} /></span><div><strong>Self check-in</strong><span>You can check in with the building staff.</span></div></div>
              <div className="rule" /><h2>About this place</h2><p className={`description ${descriptionOpen ? 'expanded' : ''}`}>🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it&apos;s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴</p><button className="inline-more" onClick={() => setDescriptionOpen(!descriptionOpen)}>{descriptionOpen ? 'Show less' : 'Show more'}</button>

              <section className="detail-section sleep-section"><h2>Where you&apos;ll sleep</h2><div className="sleep-grid"><div><img src={photos[3].src} alt="Bedroom" /><strong>Bedroom</strong><span>1 double bed</span></div><div><img src={photos[0].src} alt="Living room" /><strong>Living room</strong><span>1 sofa</span></div></div></section>
              <section className="detail-section" id="amenities-section"><h2>What this place offers</h2><div className="amenity-grid">{amenities.slice(0, 10).map((item, index) => <div key={item}><span className="amenity-icon">{index === 0 ? <Home size={22} /> : index === 1 ? <Sparkles size={22} /> : index === 2 ? <BriefcaseBusiness size={22} /> : index === 3 ? <CarFront size={22} /> : index === 4 ? <Waves size={22} /> : <Bath size={22} />}</span>{item}</div>)}</div><button className="outline-button" onClick={() => setAmenitiesOpen(true)}>Show all 50 amenities</button></section>
              <section className="calendar-section"><h2>5 nights in Candolim</h2><p>18 Oct 2026 - 23 Oct 2026</p><div className="calendars"><button className="calendar-arrow left" onClick={() => setMonthOffset(monthOffset - 1)} aria-label="Previous month"><ChevronLeft size={16} /></button>{calendarMonths.map((date) => <Calendar key={date.toISOString()} date={date} />)}<button className="calendar-arrow right" onClick={() => setMonthOffset(monthOffset + 1)} aria-label="Next month"><ChevronRight size={16} /></button></div><button className="clear-dates" onClick={() => showToast('Dates cleared')}>Clear dates</button><p className="rare-find">This is a rare find. <u>Mirashya Homes&apos;s place is usually booked.</u></p></section>
              <section className="reviews-section" id="reviews-section"><div className="reviews-summary"><div className="laurel-row"><img src="/images/ui/laurel-left.png" alt="" /><strong>4.95</strong><img src="/images/ui/laurel-right.png" alt="" /></div><h2>Guest favourite</h2><p>This home is a guest favourite based on ratings, reviews and reliability</p></div><div className="rating-categories"><div><b>Overall rating</b><div className="overall-bars">{['5', '4', '3', '2', '1'].map((number, index) => <span key={number}><small>{number}</small><i><em style={{ width: `${[88, 10, 2, 0, 0][index]}%` }} /></i></span>)}</div></div>{[['cleanliness.png', '5.0', 'Cleanliness'], ['accuracy.png', '5.0', 'Accuracy'], ['comfort.png', '5.0', 'Check-in'], ['hospitality.png', '5.0', 'Communication'], ['location.png', '4.8', 'Location'], ['condition.png', '4.8', 'Value']].map(([image, rating, label]) => <div key={label}><img src={`/images/chips/${image}`} alt="" /><b>{rating}</b><span>{label}</span></div>)}</div><div className="review-grid">{reviews.slice(0, reviewsOpen ? reviews.length : 3).map((review) => <article className="review-card" key={review.name}><div className="review-head"><span>{review.name[0]}</span><div><strong>{review.name}</strong><small>{review.meta}</small></div></div><div className="stars">★★★★★</div><p>{review.text}</p></article>)}</div><button className="outline-button" onClick={() => setReviewsOpen(!reviewsOpen)}>{reviewsOpen ? 'Show fewer reviews' : 'Show all 19 reviews'}</button></section>
              <section className="location-section" id="location-section"><h2>Where you&apos;ll be</h2><p>Candolim, Goa, India</p><div className="map-card"><button className="map-fullscreen" aria-label="Enter fullscreen"><Maximize2 size={16} /></button><div className="map-controls"><button aria-label="Zoom in"><Plus size={18} /></button><button aria-label="Zoom out"><Minus size={18} /></button></div><span><MapPin size={24} /></span><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-pin"><MapPin size={25} /></div></div><p className="muted">Exact location will be provided after booking.</p></section>
              <section className="host-section"><h2>Meet your host</h2><div className="host-card"><div className="large-host"><img src="/images/avatars/host.jpeg" alt="Mirashya Homes" /></div><h3>Mirashya Homes</h3><span>Host</span><div className="host-stats"><b>1,463<small>Reviews</small></b><b>4.68 ★<small>Rating</small></b><b>2<small>Years hosting</small></b></div><p>Response rate: 100%<br />Responds within an hour</p><button className="outline-button">Message host</button></div></section>
              <section className="things-section"><h2>Things to know</h2><div className="things-grid"><div><h3>Cancellation policy</h3><p>Free cancellation before 17 October.</p><p>Cancel before check-in on 18 October for a partial refund.</p><u>Learn more</u></div><div><h3>House rules</h3><p>Check-in after 2:00 pm</p><p>Checkout before 11:00 am</p><p>3 guests maximum</p><u>Learn more</u></div><div><h3>Safety & property</h3><p>Carbon monoxide alarm not reported</p><p>Smoke alarm not reported</p><p>Exterior security cameras on property</p><u>Learn more</u></div></div></section>
            </div>
            <aside className="booking-card" id="reserve" aria-label="Reserve this stay"><div className="price"><strong>₹28,499</strong> for 5 nights</div><div className="booking-fields"><div><span>CHECK-IN</span><strong>18 Oct 2026</strong></div><div><span>CHECKOUT</span><strong>23 Oct 2026</strong></div><div className="guests"><span>GUESTS</span><strong>2 guests</strong></div></div><div className="cancellation-note"><b>Free cancellation</b> before 17 October</div><button type="button" className="reserve-button" onClick={() => showToast('Select dates to reserve this stay')}>Reserve</button><p className="no-charge">You won’t be charged yet</p></aside>
          </div>
          <section className="nearby-section"><div className="nearby-heading"><h2>More stays nearby</h2><span>1 / 2　‹　›</span></div><div className="nearby-grid">{nearby.map(([title, price, rating, imageIndex]) => <article key={title}><img src={photos[Number(imageIndex)].src} alt={title} /><strong>{title}</strong><span>{price} night · ★ {rating}</span></article>)}</div></section>
        </section>
      </main>

      {tourOpen && <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Photo tour"><button className="overlay-close" onClick={() => setTourOpen(false)} aria-label="Close photo tour"><X size={20} /></button><div className="tour-content"><div className="tour-intro"><strong>Photo tour</strong><span>{photos.length} photos</span></div><div className="tour-grid">{tourPhotoIndexes.map((photoIndex) => <button type="button" className="tour-photo" key={photos[photoIndex].src} onClick={() => setLightboxIndex(photoIndex)}><img src={photos[photoIndex].src} alt={photos[photoIndex].alt} /><span>{photos[photoIndex].alt}</span></button>)}</div><section className="tour-room"><h2>Living room 1</h2><p>Sofa · Air conditioning · Heating · TV</p><button type="button" className="tour-room-image" onClick={() => setLightboxIndex(0)}><img src={photos[0].src} alt="Living room 1" /></button></section></div></div>}
      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${lightboxIndex + 1} of ${photos.length}`}><button className="overlay-close" onClick={() => setLightboxIndex(null)} aria-label="Close photo viewer"><X size={20} /></button><button className="gallery-arrow gallery-prev" onClick={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)} aria-label="Previous photo"><ChevronLeft size={22} /></button><figure><img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt} /><figcaption>{lightboxIndex + 1} / {photos.length}</figcaption></figure><button className="gallery-arrow gallery-next" onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)} aria-label="Next photo"><ChevronRight size={22} /></button></div>}
      {amenitiesOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Amenities"><div className="amenities-modal"><button className="modal-close" onClick={() => setAmenitiesOpen(false)} aria-label="Close amenities"><X size={18} /></button><h2>What this place offers</h2>{amenities.concat(['Hairdryer', 'Washing machine', 'Air conditioning', 'TV', 'Patio or balcony']).map((item) => <div className="modal-amenity" key={item}><Sparkles size={20} />{item}</div>)}</div></div>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}

function Calendar({ date }: { date: Date }) {
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const offset = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  return <div className="calendar"><strong>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong><div className="weekday-row">{'SMTWTFS'.split('').map((day, index) => <span key={index}>{day}</span>)}</div><div className="days-grid">{Array.from({ length: offset }).map((_, index) => <i key={`empty-${index}`} />)}{Array.from({ length: days }, (_, index) => index + 1).map((day) => { const selectedMonth = date.getMonth() === 9; const dayClass = selectedMonth && day >= 18 && day <= 23 ? day === 18 ? 'range-start' : day === 23 ? 'range-end' : 'in-range' : ''; return <span className={dayClass} key={day}>{day}</span> })}</div></div>
}

export default App
