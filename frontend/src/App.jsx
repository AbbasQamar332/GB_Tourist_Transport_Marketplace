import { useEffect, useState } from 'react'

const vehicles = [
  { id: 'corolla', name: 'Toyota Corolla', type: 'Car', seats: 4, price: 9000, area: 'Gilgit', driver: 'Noman Ali', rating: '4.7', trips: 17, image: 'photo-1549317661-bd32c8ce0db2', tags: ['Airport pickup', 'Air conditioning'], verified: true, availability: 'Available', route: 'Gilgit · Gilgit Airport · Naltar', driverBio: 'Noman provides comfortable transfers around Gilgit and nearby valleys.', reviews: [['Amna S.', 'Easy airport pickup and a comfortable ride into town.', '4.7']], pricing: { 'One Way': 7000, 'Round Trip': 13000, 'Full Day': 9000, 'Multi Day': 8500 } },
  { id: 'land-cruiser', name: 'Toyota Land Cruiser', type: 'Jeep / 4x4', seats: 6, price: 18000, area: 'Skardu', driver: 'Aamir Hussain', rating: '4.9', trips: 38, image: 'photo-1519641471654-76ce0107ad1b', tags: ['Mountain ready', 'Air conditioning'], verified: true, availability: 'Available', route: 'Gilgit · Hunza · Skardu', driverBio: 'Born in Skardu, Aamir has spent 8 years guiding visitors through the region’s mountain roads.', reviews: [['Maya T.', 'A thoughtful, careful driver who knew the Hunza route well.', '5.0'], ['Farhan K.', 'Comfortable vehicle and a smooth trip to Khaplu.', '4.8']], pricing: { 'One Way': 14500, 'Round Trip': 27000, 'Full Day': 18000, 'Multi Day': 16500 } },
  { id: 'prado', name: 'Toyota Prado', type: 'Prado', seats: 6, price: 16500, area: 'Gilgit', driver: 'Sajjad Ali', rating: '4.8', trips: 26, image: 'photo-1533473359331-0135ef1b58bf', tags: ['Comfort ride', 'Experienced driver'], verified: true, availability: 'Available', route: 'Gilgit · Hunza · Naltar', driverBio: 'Sajjad is a Gilgit local who enjoys sharing the region’s quieter routes with travellers.', reviews: [['Elena M.', 'Great communication and a lovely day in Naltar.', '4.8'], ['Hamid R.', 'On time, friendly, and a very capable driver.', '4.9']], pricing: { 'One Way': 13000, 'Round Trip': 25000, 'Full Day': 16500, 'Multi Day': 15000 } },
  { id: 'jeep', name: 'Mitsubishi Pajero', type: 'Jeep / 4x4', seats: 5, price: 15000, area: 'Hunza', driver: 'Karim Shah', rating: '4.7', trips: 19, image: 'photo-1503376780353-7e6692767b70', tags: ['High clearance', 'Local route expert'], verified: true, availability: 'Available', route: 'Hunza · Passu · Khunjerab', driverBio: 'Karim knows the upper Hunza road and its seasonal conditions well.', reviews: [['Daniel R.', 'A brilliant guide for the Khunjerab road.', '4.7']], pricing: { 'One Way': 12000, 'Round Trip': 23000, 'Full Day': 15000, 'Multi Day': 14000 } },
  { id: 'hiace', name: 'Toyota Hiace Grand Cabin', type: 'Hiace', seats: 10, price: 22000, area: 'Hunza', driver: 'Naveed Karim', rating: '4.9', trips: 51, image: 'photo-1549317661-bd32c8ce0db2', tags: ['Group travel', 'Luggage space'], verified: true, availability: 'Available', route: 'Gilgit · Hunza · Skardu', driverBio: 'Naveed has helped families and groups travel comfortably across Gilgit-Baltistan for 10 years.', reviews: [['Aisha B.', 'Spacious van, patient driver, excellent family trip.', '5.0'], ['Peter W.', 'Naveed made a long drive feel easy.', '4.8']], pricing: { 'One Way': 18000, 'Round Trip': 34000, 'Full Day': 22000, 'Multi Day': 20500 } },
  { id: 'coaster', name: 'Toyota Coaster', type: 'Coaster', seats: 22, price: 32000, area: 'Gilgit', driver: 'Wajid Hussain', rating: '4.8', trips: 34, image: 'photo-1519641471654-76ce0107ad1b', tags: ['Large groups', 'Air conditioning'], verified: true, availability: 'Available', route: 'Gilgit · Hunza · Nagar', driverBio: 'Wajid specialises in group transport and multi-day valley itineraries.', reviews: [['Northbound Group', 'Well organised transport for our whole group.', '4.8']], pricing: { 'One Way': 27000, 'Round Trip': 50000, 'Full Day': 32000, 'Multi Day': 30000 } },
  { id: 'bus', name: 'Toyota Grand Cabin Bus', type: 'Bus', seats: 30, price: 42000, area: 'Skardu', driver: 'Ghulam Abbas', rating: '4.6', trips: 22, image: 'photo-1533473359331-0135ef1b58bf', tags: ['Group journeys', 'Luggage storage'], verified: true, availability: 'Available', route: 'Skardu · Shigar · Khaplu', driverBio: 'Ghulam has extensive experience coordinating group trips around Skardu.', reviews: [['Sara N.', 'Reliable for a large family group.', '4.6']], pricing: { 'One Way': 35000, 'Round Trip': 67000, 'Full Day': 42000, 'Multi Day': 39000 } },
]

const vehicleTypes = ['Car', 'Prado', 'Jeep / 4x4', 'Hiace', 'Coaster', 'Bus']
const tripTypes = ['One Way', 'Round Trip', 'Full Day', 'Multi Day']
const bookingStatuses = ['Pending', 'Accepted', 'Confirmed', 'Completed', 'Cancelled']
const locations = ['Gilgit', 'Gilgit Airport', 'Hunza', 'Karimabad', 'Passu', 'Skardu', 'Fairy Meadows', 'Naltar Valley', 'Khunjerab Pass', 'Shigar', 'Khaplu']
const bookingsStorageKey = 'gb-tourist-bookings'
let memoryBookings = []

const driverLinks = [
  ['/driver-dashboard', 'Overview'], ['/driver-vehicle', 'My vehicle'], ['/availability', 'Availability'],
  ['/booking-requests', 'Booking requests'], ['/driver-profile', 'Driver profile'],
]
const adminLinks = [
  ['/admin-dashboard', 'Overview'], ['/driver-verification', 'Driver verification'],
  ['/vehicle-management', 'Vehicle management'], ['/booking-management', 'Booking management'],
]

function routeNow() {
  return window.location.hash.slice(1).split('?')[0] || '/'
}

function routeParams() {
  return new URLSearchParams(window.location.hash.slice(1).split('?')[1] || '')
}

function detailRoute(path, vehicleId, params = new URLSearchParams()) {
  const query = new URLSearchParams(params)
  query.set('id', vehicleId)
  return `${path}?${query}`
}

function formatPrice(amount) {
  return `PKR ${amount.toLocaleString('en-PK')}`
}

function estimatePriceFor(vehicle, tripType, startDate, returnDate) {
  const base = vehicle.pricing[tripType] || vehicle.price
  if (tripType !== 'Multi Day' || !returnDate) return base
  const start = new Date(startDate)
  const end = new Date(returnDate)
  const days = Math.max(1, Math.ceil((end - start) / 86400000))
  return base * days
}

function estimatePrice(vehicle, tripType, returnDate) {
  return estimatePriceFor(vehicle, tripType, routeParams().get('date'), returnDate)
}

function loadLocalBookings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(bookingsStorageKey) || '[]')
    return Array.isArray(saved) ? saved : memoryBookings
  } catch {
    return memoryBookings
  }
}

function Link({ to, className = '', children, ...props }) {
  return <a href={`#${to}`} className={className} {...props}>{children}</a>
}

function Brand({ inverse = false }) {
  return <Link to="/" className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="GB Tourist Transport home">
    <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 32"><path d="M2 28 14 8l7 11 5-8 12 17H2Z" /><path d="m9 28 10-12 9 12" /></svg></span>
    <span><strong>GB Tourist</strong><small>TRANSPORT</small></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="header-inner"><Brand />
    <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
      <Link to="/search" onClick={() => setOpen(false)}>Find transport</Link><Link to="/vehicle-results" onClick={() => setOpen(false)}>Vehicles</Link><Link to="/my-bookings" onClick={() => setOpen(false)}>My bookings</Link>
      <Link to="/driver-dashboard" onClick={() => setOpen(false)}>Driver portal</Link><Link to="/admin-dashboard" onClick={() => setOpen(false)}>Admin</Link>
      <Link to="/login" className="nav-login" onClick={() => setOpen(false)}>Log in</Link><Link to="/register" className="button button-small button-green" onClick={() => setOpen(false)}>Join as a driver</Link>
    </nav>
  </div></header>
}

function Button({ to, children, kind = 'green', className = '', ...props }) {
  const classNames = `button button-${kind} ${className}`
  const buttonChildren = to?.startsWith('/booking-request') ? <>Request Booking <span aria-hidden="true">→</span></> : children
  return to ? <Link to={to} className={classNames} {...props}>{buttonChildren}</Link> : <button className={classNames} {...props}>{children}</button>
}

function Field({ label, name, type = 'text', placeholder, required = false, defaultValue, options, ...props }) {
  return <label className="field" htmlFor={name}><span>{label}{required && <span className="required"> *</span>}</span>
    {options ? <select id={name} name={name} defaultValue={defaultValue || ''} required={required} {...props}>{!options[0]?.startsWith('Any ') && <option value="" disabled>{placeholder || 'Select an option'}</option>}{options.map(option => <option key={option} value={option.startsWith('Any ') ? '' : option}>{option}</option>)}</select> : <input id={name} name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} {...props} />}
  </label>
}

function Eyebrow({ children }) { return <p className="eyebrow">{children}</p> }
function PageTitle({ eyebrow, title, text, action }) { return <div className="page-title-row"><div>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h1>{title}</h1>{text && <p>{text}</p>}</div>{action}</div> }
function SectionHeading({ eyebrow, title, text, linkTo, linkText }) { return <div className="section-heading"><div>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{text && <p>{text}</p>}</div>{linkTo && <Link className="text-link" to={linkTo}>{linkText || 'Explore all'} <span aria-hidden="true">↗</span></Link>}</div> }

function HomePage() {
  return <><Header /><main>
    <section className="hero"><div className="hero-shade" /><div className="hero-content"><Eyebrow>LOCAL KNOW-HOW. UNFORGETTABLE ROADS.</Eyebrow><h1>Travel Gilgit-Baltistan<br /><em>with trusted local drivers.</em></h1><p>Find the right ride for your journey through Pakistan's northern valleys.</p><Button to="/search" kind="lime">Find your transport <span aria-hidden="true">→</span></Button><div className="hero-caption"><span className="caption-line" /> KKH · HUNZA · SKARDU · GHIZER</div></div><div className="hero-photo-credit">Karakoram Range, Gilgit-Baltistan</div></section>
    <section className="search-strip"><form className="quick-search" onSubmit={event => { event.preventDefault(); const values = new FormData(event.currentTarget); const params = new URLSearchParams(); if (values.get('destination')) params.set('to', values.get('destination')); params.set('passengers', values.get('passengers') || '2'); window.location.hash = `/search?${params}` }}><Field label="Going to" name="destination" placeholder="Choose a destination" options={locations} /><Field label="Travel date" name="date" type="date" /><Field label="Passengers" name="passengers" type="number" min="1" max="30" defaultValue="2" /><Button kind="green" type="submit">Search rides <span aria-hidden="true">→</span></Button></form></section>
    <section className="section destinations"><div className="content-width"><SectionHeading eyebrow="THE JOURNEY IS YOURS" title="Find your way north" text="From quiet valley roads to high mountain passes, start with a ride that fits." /><div className="destination-grid">{[['Hunza Valley', 'Passu · Karimabad · Attabad Lake', 'photo-1519681393784-d120267933ba'], ['Skardu', 'Shigar · Khaplu · Deosai', 'photo-1464822759023-fed622ff2c3b'], ['Fairy Meadows', 'Raikot Bridge · Nanga Parbat', 'photo-1500530855697-b586d89ba3ee']].map(([name, sub, image]) => <Link className="destination-card" key={name} to="/vehicle-results" style={{ backgroundImage: `linear-gradient(0deg, rgba(12,31,25,.78), transparent 75%), url(https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=85)` }}><span className="destination-arrow" aria-hidden="true">↗</span><div><h3>{name}</h3><p>{sub}</p></div></Link>)}</div></div></section>
    <section className="trust-band"><div className="content-width trust-inner"><div><Eyebrow>THE GB TOURIST DIFFERENCE</Eyebrow><h2>Go further, with someone<br />who knows the way.</h2></div><div className="trust-points"><article><span>01</span><div><h3>Local, by nature</h3><p>Connect with drivers who call these valleys home.</p></div></article><article><span>02</span><div><h3>Choose with confidence</h3><p>Compare vehicles and clear daily rates before you travel.</p></div></article><article><span>03</span><div><h3>Made for the mountains</h3><p>Find a suitable ride for winding roads and open horizons.</p></div></article></div></div></section>
    <section className="section fleet-preview"><div className="content-width"><SectionHeading eyebrow="YOUR RIDE NORTH" title="A vehicle for every road" text="Browse local transport for solo travellers, families, and groups." linkTo="/vehicle-results" linkText="See all vehicles" /><VehicleGrid items={vehicles.slice(0, 2)} /></div></section>
    <section className="driver-cta"><div className="content-width driver-cta-inner"><div><Eyebrow>FOR LOCAL DRIVERS & COMPANIES</Eyebrow><h2>Bring your local expertise<br />to the road.</h2><p>Share your vehicle with travellers planning their next trip north.</p><Button to="/register" kind="light">Join as a transport provider <span aria-hidden="true">→</span></Button></div><div className="road-art" aria-hidden="true"><svg viewBox="0 0 420 210"><path d="M0 170 95 50l55 68 48-82 113 138H0Z"/><path d="m125 170 86-95 86 95"/><path className="road-mark" d="M279 210c-43-65 10-88 70-116"/></svg></div></div></section>
  </main><Footer /></>
}

function Footer() {
  return <footer className="site-footer"><div className="content-width footer-inner"><Brand inverse /><p>Connecting travellers with the people and places of Gilgit-Baltistan.</p><div className="footer-links"><Link to="/search">Find transport</Link><Link to="/my-bookings">My bookings</Link><Link to="/register">Become a provider</Link><Link to="/driver-dashboard">Driver portal</Link><Link to="/admin-dashboard">Admin portal</Link></div><small>© 2026 GB Tourist Transport · Gilgit-Baltistan, Pakistan</small></div></footer>
}

function VehicleCard({ vehicle }) {
  const params = routeParams()
  const tripType = params.get('tripType') || 'Full Day'
  const estimate = formatPrice(estimatePrice(vehicle, tripType, params.get('returnDate')))
  const detailsRoute = detailRoute('/vehicle-details', vehicle.id, params)
  return <article className="vehicle-card"><Link to={detailsRoute} className="vehicle-image-link" aria-label={`View ${vehicle.name}`}><img className="vehicle-image" src={`https://images.unsplash.com/${vehicle.image}?auto=format&fit=crop&w=900&q=85`} alt={`${vehicle.type} vehicle available near ${vehicle.area}`} /><span className="image-label">{vehicle.type}</span></Link><div className="vehicle-card-content"><div className="vehicle-card-heading"><div><h3><Link to={detailsRoute}>{vehicle.name}</Link></h3><p>{vehicle.driver} · {vehicle.seats} passengers</p></div><div className="rating"><span aria-hidden="true">★</span> {vehicle.rating}</div></div><div className="vehicle-trust-row"><span className="verified-badge"><span aria-hidden="true">✓</span> Verified driver</span><span className="availability-badge"><i />{vehicle.availability}</span></div><div className="vehicle-card-meta"><span>{vehicle.trips} completed trips</span><span>{vehicle.area}</span></div><div className="vehicle-card-bottom"><div><strong>{estimate}</strong><small>{tripType === 'Multi Day' && params.get('returnDate') ? ' total' : ` / ${tripType === 'Multi Day' ? 'day' : tripType.toLowerCase()}`}</small></div><Button to={detailsRoute} kind="outline" className="button-compact">View details <span aria-hidden="true">→</span></Button></div></div></article>
}
function VehicleGrid({ items }) { return <div className="vehicle-grid">{items.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div> }

function SearchPage() {
  const params = routeParams()
  const submitSearch = event => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const query = new URLSearchParams()
    for (const [key, value] of values.entries()) if (value) query.set(key, value)
    window.location.hash = `/vehicle-results?${query}`
  }
  return <><Header /><main className="public-page"><div className="content-width"><PageTitle eyebrow="PLAN YOUR JOURNEY" title="Find transport" text="Share your route and trip details to find a suitable local vehicle." /><form className="panel search-form" onSubmit={submitSearch}><div className="form-grid search-fields"><Field label="From location" name="from" placeholder="Choose a pickup location" options={locations} defaultValue={params.get('from') || ''} required /><Field label="To location" name="to" placeholder="Choose a destination" options={locations} defaultValue={params.get('to') || ''} required /><Field label="Travel date" name="date" type="date" defaultValue={params.get('date') || ''} required /><Field label="Return date (optional)" name="returnDate" type="date" defaultValue={params.get('returnDate') || ''} /><Field label="Number of passengers" name="passengers" type="number" min="1" max="30" defaultValue={params.get('passengers') || '2'} required /><Field label="Vehicle type" name="vehicleType" placeholder="Any vehicle type" options={vehicleTypes} defaultValue={params.get('vehicleType') || ''} /></div><fieldset className="trip-type-fieldset"><legend>Trip type</legend><div className="trip-type-options">{tripTypes.map((tripType, index) => <label className="trip-type-option" key={tripType}><input type="radio" name="tripType" value={tripType} defaultChecked={params.get('tripType') ? params.get('tripType') === tripType : index === 0} /><span>{tripType}</span></label>)}</div></fieldset><div className="form-actions"><p>Compare estimated prices from listed local transport providers.</p><Button kind="green" type="submit">See available vehicles <span aria-hidden="true">→</span></Button></div></form><div className="search-note"><span aria-hidden="true">i</span><p>Mountain travel times vary with weather and road conditions. Confirm your final itinerary with your driver.</p></div></div></main><Footer /></>
}

function ResultsPage() {
  const params = routeParams()
  const [vehicleType, setVehicleType] = useState(params.get('vehicleType') || '')
  const [passengers, setPassengers] = useState(Number(params.get('passengers') || 1))
  const [sort, setSort] = useState('recommended')
  const destination = params.get('to') || ''
  const results = vehicles.filter(vehicle => vehicle.seats >= passengers && (!vehicleType || vehicle.type === vehicleType) && (!destination || vehicle.route.toLowerCase().includes(destination.toLowerCase()) || vehicle.area.toLowerCase() === destination.toLowerCase()))
  if (sort === 'price') results.sort((a, b) => estimatePrice(a, params.get('tripType') || 'Full Day', params.get('returnDate')) - estimatePrice(b, params.get('tripType') || 'Full Day', params.get('returnDate')))
  if (sort === 'rating') results.sort((a, b) => Number(b.rating) - Number(a.rating))
  const searchSummary = [params.get('from'), destination, params.get('date'), params.get('passengers') && `${params.get('passengers')} passengers`, params.get('tripType')].filter(Boolean).join(' · ')
  return <><Header /><main className="public-page"><div className="content-width"><div className="results-intro"><div><Eyebrow>YOUR NORTHBOUND OPTIONS</Eyebrow><h1>Vehicles for your journey</h1><p>{searchSummary || 'Browse verified local transport providers serving Gilgit-Baltistan.'}</p></div><Link to={`/search?${params}`} className="filter-link">Edit search <span aria-hidden="true">↗</span></Link></div><div className="results-layout"><aside className="filter-panel"><h2>Refine your search</h2><Field label="Vehicle type" name="filterVehicle" options={['Any vehicle type', ...vehicleTypes]} defaultValue={vehicleType || ''} onChange={event => setVehicleType(event.target.value === 'Any vehicle type' ? '' : event.target.value)} /><Field label="Passengers" name="filterGuests" type="number" min="1" max="30" defaultValue={String(passengers)} onChange={event => setPassengers(Math.max(1, Number(event.target.value) || 1))} /><div className="filter-summary"><span>Pickup</span><strong>{params.get('from') || 'Flexible'}</strong><span>Destination</span><strong>{destination || 'All listed routes'}</strong><span>Trip type</span><strong>{params.get('tripType') || 'Full Day'}</strong></div></aside><div className="results-main"><div className="results-toolbar"><p><strong>{results.length} vehicles</strong> match your trip</p><label className="sort-field">Sort by <select value={sort} onChange={event => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="price">Price: low to high</option><option value="rating">Rating</option></select></label></div>{results.length ? <VehicleGrid items={results} /> : <div className="empty-results"><h2>No vehicles match those details</h2><p>Try a different vehicle type or reduce the passenger count.</p><Link to={`/search?${params}`} className="button button-green">Edit trip details</Link></div>}</div></div></div></main><Footer /></>
}

function VehicleDetailsPage() {
  const vehicleId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('id')
  const vehicle = vehicles.find(item => item.id === vehicleId) || vehicles[0]
  const params = routeParams()
  const tripType = params.get('tripType') || 'Full Day'
  const estimate = estimatePrice(vehicle, tripType, params.get('returnDate'))
  const routeText = [params.get('from'), params.get('to')].filter(Boolean).join(' → ') || vehicle.route
  const requestRoute = detailRoute('/booking-request', vehicle.id, params)
  return <><Header /><main className="public-page"><div className="content-width"><Link to="/vehicle-results" className="back-link">← Back to vehicles</Link><div className="detail-layout"><section className="detail-main"><div className="detail-photo"><img src={`https://images.unsplash.com/${vehicle.image}?auto=format&fit=crop&w=1500&q=90`} alt={`${vehicle.type} vehicle offered by ${vehicle.driver}`} /><span>{vehicle.type}</span></div><div className="detail-title"><div><Eyebrow>LOCAL TRANSPORT · {vehicle.area.toUpperCase()}</Eyebrow><h1>{vehicle.name}</h1><p>{vehicle.seats} passengers · {vehicle.availability} · {vehicle.route}</p></div><div className="rating rating-large"><span aria-hidden="true">★</span> {vehicle.rating} <small>({vehicle.reviews.length} reviews)</small></div></div><section className="detail-section driver-profile-detail"><div className="avatar avatar-large">{vehicle.driver.split(' ').map(part => part[0]).join('')}</div><div className="driver-profile-copy"><div className="driver-profile-heading"><h2>{vehicle.driver}</h2>{vehicle.verified && <span className="verified-badge"><span aria-hidden="true">✓</span> Verified driver</span>}</div><p>{vehicle.driverBio}</p><span className="driver-trip-count">{vehicle.trips} completed trips · Based in {vehicle.area}</span></div></section><section className="detail-section"><h2>Vehicle information</h2><div className="vehicle-info-grid"><div><span>Vehicle type</span><strong>{vehicle.type}</strong></div><div><span>Passenger capacity</span><strong>Up to {vehicle.seats} people</strong></div><div><span>Availability</span><strong className="availability-text"><i />{vehicle.availability}</strong></div><div><span>Area served</span><strong>{vehicle.area}</strong></div></div></section><section className="detail-section"><h2>Route information</h2><div className="route-summary"><span className="route-dot" /><div><span>YOUR TRIP</span><strong>{routeText}</strong><small>{params.get('date') ? `Travel date: ${params.get('date')}` : `Regular routes: ${vehicle.route}`}</small></div></div><p className="route-note">Route, road conditions, and stops can be discussed directly with the driver before confirming your trip.</p></section><section className="detail-section"><h2>Estimated pricing</h2><div className="pricing-list">{tripTypes.map(type => <div className={type === tripType ? 'pricing-selected' : ''} key={type}><span>{type}</span><strong>{formatPrice(vehicle.pricing[type])}{type === 'Multi Day' ? ' / day' : ''}</strong></div>)}</div><p className="route-note">Estimate for your selected trip: <strong>{formatPrice(estimate)}{tripType === 'Multi Day' && params.get('returnDate') ? ' total' : ''}</strong>. Final itinerary and price are confirmed with the provider.</p></section><section className="detail-section reviews-section"><div className="reviews-heading"><h2>Traveller reviews</h2><span className="rating"><span aria-hidden="true">★</span> {vehicle.rating} average</span></div>{vehicle.reviews.map(([name, review, rating]) => <article className="review-item" key={name}><div className="review-top"><strong>{name}</strong><span className="rating"><span aria-hidden="true">★</span> {rating}</span></div><p>{review}</p></article>)}</section></section><aside className="booking-panel"><p className="price-line"><strong>{formatPrice(estimate)}</strong><span>{tripType === 'Multi Day' && params.get('returnDate') ? ' total' : ` / ${tripType === 'Multi Day' ? 'day' : tripType.toLowerCase()}`}</span></p><div className="booking-trip-summary"><span>ROUTE</span><strong>{routeText}</strong><span>PASSENGERS · TRIP TYPE</span><strong>{params.get('passengers') || 'Choose'} · {tripType}</strong></div><p className="booking-helper">No payment or booking is made at this step. Send a request preview to continue.</p><Button to={requestRoute} kind="green" className="button-full">Booking Request <span aria-hidden="true">→</span></Button><p className="booking-footnote">Requesting a trip does not guarantee availability.</p></aside></div></div></main><Footer /></>
}

function BookingRequestPage() {
  const params = routeParams()
  const vehicle = vehicles.find(item => item.id === params.get('id')) || vehicles[0]
  const [trip, setTrip] = useState({
    from: params.get('from') || '',
    to: params.get('to') || '',
    date: params.get('date') || '',
    returnDate: params.get('returnDate') || '',
    passengers: params.get('passengers') || '2',
    tripType: params.get('tripType') || 'One Way',
  })
  const routeText = [trip.from, trip.to].filter(Boolean).join(' → ') || 'Add your route below'
  const estimate = estimatePriceFor(vehicle, trip.tripType, trip.date, trip.returnDate)
  const detailsRoute = detailRoute('/vehicle-details', vehicle.id, params)
  const updateTrip = event => setTrip(current => ({ ...current, [event.target.name]: event.target.value }))
  const onSubmit = event => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    const booking = {
      id: `GB-${Date.now().toString(36).toUpperCase()}`,
      status: 'Pending',
      customerName: values.customerName,
      phone: values.phone,
      email: values.email,
      from: values.from,
      to: values.to,
      route: `${values.from} → ${values.to}`,
      date: values.date,
      returnDate: values.returnDate,
      pickupTime: values.pickupTime,
      passengers: Number(values.passengers),
      tripType: values.tripType,
      vehicleId: vehicle.id,
      vehicle: vehicle.name,
      driver: vehicle.driver,
      estimatedPrice: formatPrice(estimatePriceFor(vehicle, values.tripType, values.date, values.returnDate)),
      specialInstructions: values.specialInstructions,
    }
    const bookings = loadLocalBookings()
    bookings.unshift(booking)
    memoryBookings = bookings
    try {
      window.localStorage.setItem(bookingsStorageKey, JSON.stringify(bookings))
    } catch {
      window.sessionStorage.setItem(`booking-${booking.id}`, JSON.stringify(booking))
    }
    window.location.hash = `/booking-submitted?id=${encodeURIComponent(booking.id)}`
  }

  return <><Header /><main className="public-page booking-request-page"><div className="content-width"><Link to={detailsRoute} className="back-link">← Back to vehicle details</Link><PageTitle eyebrow="YOUR TRIP ENQUIRY" title="Request booking" text="Add your contact details and check the trip summary before requesting this vehicle." /><div className="request-layout"><form className="panel booking-request-form" onSubmit={onSubmit}>
    <section className="request-form-section"><h2>Trip details</h2><div className="form-grid">
      <Field label="Customer name" name="customerName" autoComplete="name" placeholder="Your full name" required />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="Include country code" required />
      <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      <Field label="Pickup location" name="from" placeholder="Pickup location" options={locations} defaultValue={trip.from} onChange={updateTrip} required />
      <Field label="Destination" name="to" placeholder="Destination" options={locations} defaultValue={trip.to} onChange={updateTrip} required />
      <Field label="Travel date" name="date" type="date" defaultValue={trip.date} onChange={updateTrip} required />
      <Field label="Return date (optional)" name="returnDate" type="date" defaultValue={trip.returnDate} onChange={updateTrip} />
      <Field label="Pickup time" name="pickupTime" type="time" required />
      <Field label="Number of passengers" name="passengers" type="number" min="1" max={vehicle.seats} defaultValue={trip.passengers} onChange={updateTrip} required />
      <Field label="Selected vehicle" name="selectedVehicle" defaultValue={vehicle.name} readOnly />
      <Field label="Trip type" name="tripType" options={tripTypes} defaultValue={trip.tripType} onChange={updateTrip} required />
    </div></section>
    <section className="request-form-section"><h2>Special instructions</h2><label className="field request-notes" htmlFor="specialInstructions"><span>Special instructions (optional)</span><textarea id="specialInstructions" name="specialInstructions" rows="3" placeholder="Luggage, stops, or other trip details" /></label></section>
    <div className="request-submit"><p>Demo only: your request is stored in this browser. No payment is taken.</p><Button kind="green" type="submit">Request Booking <span aria-hidden="true">→</span></Button></div>
  </form><aside className="panel request-summary"><img src={`https://images.unsplash.com/${vehicle.image}?auto=format&fit=crop&w=700&q=85`} alt={`${vehicle.type} vehicle`} /><div className="request-summary-content"><span className="verified-badge"><span aria-hidden="true">✓</span> Verified driver</span><h2>{vehicle.name}</h2><p>{vehicle.driver} · {vehicle.rating} ★</p><div className="booking-trip-summary"><span>VEHICLE</span><strong>{vehicle.name}</strong><span>DRIVER</span><strong>{vehicle.driver}</strong><span>ROUTE</span><strong>{routeText}</strong><span>DATE</span><strong>{trip.date || 'Choose a travel date'}</strong><span>PASSENGERS</span><strong>{trip.passengers}</strong><span>ESTIMATED PRICE</span><strong>{formatPrice(estimate)}</strong></div><Link to={detailsRoute} className="text-link">Review vehicle details ↗</Link></div></aside></div></div></main><Footer /></>
}

function BookingSubmittedPage() {
  const bookingId = routeParams().get('id')
  let booking = loadLocalBookings().find(item => item.id === bookingId)
  if (!booking && bookingId) {
    try { booking = JSON.parse(window.sessionStorage.getItem(`booking-${bookingId}`) || 'null') } catch { booking = null }
  }
  return <><Header /><main className="public-page booking-submitted-page"><div className="content-width">{booking ? <section className="booking-confirmation"><span className="confirmation-mark" aria-hidden="true">✓</span><Eyebrow>REQUEST RECEIVED</Eyebrow><h1>Booking Request Submitted</h1><p className="confirmation-intro">Your request is saved in this browser. Its status is Pending; no driver has been contacted.</p><div className="confirmation-id"><span>BOOKING ID</span><strong>{booking.id}</strong></div><div className="confirmation-grid">{[['Booking status', booking.status], ['Driver name', booking.driver], ['Route', booking.route], ['Date', booking.date], ['Vehicle', booking.vehicle], ['Estimated price', booking.estimatedPrice]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="confirmation-actions"><Button to="/my-bookings" kind="green">View My Bookings <span aria-hidden="true">→</span></Button><Link to="/vehicle-results" className="text-link">Continue browsing vehicles</Link></div></section> : <section className="booking-confirmation"><Eyebrow>BOOKING REQUEST</Eyebrow><h1>Request not found</h1><p className="confirmation-intro">This local booking record is unavailable in this browser.</p><Button to="/my-bookings" kind="green">Go to My Bookings</Button></section>}</div></main><Footer /></>
}

function MyBookingsPage() {
  const [bookings] = useState(loadLocalBookings)
  const [activeStatus, setActiveStatus] = useState('All')
  const visibleBookings = activeStatus === 'All' ? bookings : bookings.filter(booking => booking.status === activeStatus)
  const filters = ['All', ...bookingStatuses]
  return <><Header /><main className="public-page my-bookings-page"><div className="content-width"><PageTitle eyebrow="YOUR TRAVEL PLANS" title="My Bookings" text="Review booking requests saved in this browser." action={<Button to="/search" kind="green">Find transport <span aria-hidden="true">→</span></Button>} /><div className="booking-status-tabs" role="tablist" aria-label="Filter bookings by status">{filters.map(status => <button type="button" role="tab" aria-selected={activeStatus === status} className={activeStatus === status ? 'booking-tab booking-tab-active' : 'booking-tab'} key={status} onClick={() => setActiveStatus(status)}>{status}<span>{status === 'All' ? bookings.length : bookings.filter(booking => booking.status === status).length}</span></button>)}</div>{visibleBookings.length ? <div className="tourist-booking-list">{visibleBookings.map(booking => <article className="tourist-booking-card" key={booking.id}><div className="tourist-booking-heading"><div><span className="booking-id-label">{booking.id}</span><h2>{booking.vehicle}</h2><p>{booking.driver}</p></div><span className={`booking-state booking-state-${booking.status.toLowerCase()}`}>{booking.status}</span></div><div className="tourist-booking-details"><div><span>ROUTE</span><strong>{booking.route}</strong></div><div><span>DATE</span><strong>{booking.date}{booking.returnDate ? ` – ${booking.returnDate}` : ''}</strong></div><div><span>PASSENGERS</span><strong>{booking.passengers}</strong></div><div><span>ESTIMATED PRICE</span><strong>{booking.estimatedPrice}</strong></div></div></article>)}</div> : <section className="my-bookings-empty"><h2>{activeStatus === 'All' ? 'No bookings yet' : `No ${activeStatus.toLowerCase()} bookings`}</h2><p>{activeStatus === 'All' ? 'Your local booking requests will appear here after you submit one.' : `Bookings with ${activeStatus.toLowerCase()} status will appear here.`}</p><Button to="/search" kind="outline">Search transport <span aria-hidden="true">→</span></Button></section>}</div></main><Footer /></>
}

function AccountPage({ register = false }) {
  const [notice, setNotice] = useState('')
  return <><Header /><main className="account-page"><div className="account-image"><div><Eyebrow>THE ROAD NORTH IS WAITING</Eyebrow><h2>Every journey<br />starts with a local.</h2><p>Plan your next trip through Gilgit-Baltistan.</p></div></div><section className="account-form-wrap"><div className="account-form"><Eyebrow>{register ? 'JOIN THE LOCAL NETWORK' : 'WELCOME BACK'}</Eyebrow><h1>{register ? 'Create an account' : 'Log in'}</h1><p>{register ? 'Register your interest as a local driver or transport company.' : 'Sign-in is not connected in this frontend preview.'}</p><form onSubmit={event => { event.preventDefault(); setNotice(register ? 'Demo only: registration is not connected.' : 'Demo only: authentication is not connected.') }}>{register && <><Field label="I am joining as" name="accountType" options={['Local driver', 'Transport company']} placeholder="Choose account type" required /><Field label="Full name" name="name" placeholder="Your name" autoComplete="name" required /></>}<Field label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />{register && <Field label="Phone number" name="phone" type="tel" placeholder="+92 300 0000000" autoComplete="tel" required />}<Field label="Password" name="password" type="password" placeholder="At least 8 characters" autoComplete={register ? 'new-password' : 'current-password'} minLength="8" required /><Button type="submit" kind="green" className="button-full">{register ? 'Create account' : 'Log in'} <span aria-hidden="true">→</span></Button></form>{notice && <p className="form-notice" role="status">{notice}</p>}<p className="account-switch">{register ? 'Already have an account?' : 'New to GB Tourist Transport?'} <Link to={register ? '/login' : '/register'}>{register ? 'Log in' : 'Register as a provider'}</Link></p></div></section></main><Footer /></>
}

function PortalLayout({ role, title, children }) {
  const links = role === 'driver' ? driverLinks : adminLinks
  const current = routeNow()
  return <div className="portal"><aside className="portal-sidebar"><Brand inverse /><div className="portal-role">{role === 'driver' ? 'DRIVER PORTAL' : 'ADMINISTRATION'}</div><nav aria-label={`${role} navigation`} className="portal-nav">{links.map(([path, label], index) => <Link key={path} to={path} className={current === path ? 'portal-active' : ''}><span className="nav-index">0{index + 1}</span>{label}</Link>)}</nav><div className="sidebar-bottom"><Link to="/">← View public site</Link><div className="profile-chip"><span className="avatar avatar-small">{role === 'driver' ? 'AH' : 'AD'}</span><span><strong>{role === 'driver' ? 'Aamir Hussain' : 'Admin user'}</strong><small>{role === 'driver' ? 'Local driver' : 'Operations'}</small></span></div></div></aside><main className="portal-main"><header className="portal-topbar"><span>GB TOURIST TRANSPORT <b>/</b> {role.toUpperCase()}</span><div><span className="portal-status"><i /> {role === 'driver' ? 'Profile listed' : 'System overview'}</span><Link to="/" aria-label="Go to public home" className="portal-home">↗</Link></div></header><div className="portal-content">{title}{children}</div></main></div>
}

function StatGrid({ items }) { return <div className="stat-grid">{items.map(([label, value, detail, tone]) => <article className="stat-card" key={label}><span>{label}</span><strong className={tone || ''}>{value}</strong><small>{detail}</small></article>)}</div> }
function Table({ headers, rows }) { return <div className="table-wrap"><table><thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{headers[j] === 'DAILY RATE' && typeof cell === 'number' ? formatPrice(cell) : cell}</td>)}</tr>)}</tbody></table></div> }
function Status({ children, tone = 'gold' }) { return <span className={`status status-${tone}`}><i />{children}</span> }
function Panel({ title, linkTo, children }) { return <section className="data-panel"><div className="panel-heading"><h2>{title}</h2>{linkTo && <Link to={linkTo} className="text-link">View all <span aria-hidden="true">→</span></Link>}</div>{children}</section> }

function DriverDashboard() {
  return <PortalLayout role="driver" title={<PageTitle eyebrow="TUESDAY, 06 OCTOBER 2026" title="Your dashboard" text="A quick look at your vehicle and recent trip requests." action={<Button to="/driver-vehicle" kind="green">Manage vehicle <span aria-hidden="true">→</span></Button>} />}><StatGrid items={ [['New requests', '03', '2 need a reply', 'stat-accent'], ['Upcoming trips', '02', 'Next trip · 12 Oct'], ['Completed trips', '38', 'Since joining'], ['Profile status', 'Listed', 'Visible to travellers', 'stat-green']] } /><div className="portal-columns"><Panel title="Recent booking requests" linkTo="/booking-requests"><Table headers={['TRAVELLER', 'ROUTE', 'DATE', 'STATUS']} rows={[[<>Maya Thompson</>, 'Gilgit → Hunza', '12 Oct', <Status>Awaiting reply</Status>], ['Usman Raza', 'Skardu → Khaplu', '16 Oct', <Status tone="green">Confirmed</Status>], ['Elena Martin', 'Gilgit → Naltar', '21 Oct', <Status>Awaiting reply</Status>]]} /></Panel><Panel title="Your vehicle"><div className="vehicle-summary"><div className="summary-photo" style={{ backgroundImage: `url(https://images.unsplash.com/${vehicles[0].image}?auto=format&fit=crop&w=500&q=80)` }} /><div><strong>Toyota Land Cruiser</strong><p>4x4 SUV · 6 seats</p><Status tone="green">Listed</Status></div></div><Link to="/availability" className="availability-link"><span>Availability calendar</span><strong>Set dates →</strong></Link></Panel></div></PortalLayout>
}

function DriverVehicle() {
  const [notice, setNotice] = useState('')
  return <PortalLayout role="driver" title={<PageTitle eyebrow="YOUR LISTING" title="My vehicle" text="Keep your vehicle details clear and up to date for travellers." action={<Status tone="green">Listed</Status>} />}><form className="panel portal-form" onSubmit={event => { event.preventDefault(); setNotice('Demo only: vehicle changes have not been saved.') }}><h2>Vehicle details</h2><p className="panel-intro">Information displayed on your public listing.</p><div className="form-grid"><Field label="Vehicle make and model" name="vehicleName" defaultValue="Toyota Land Cruiser" required /><Field label="Vehicle type" name="vehicleType" options={['4x4 SUV', 'Van', 'Car', 'Coaster']} defaultValue="4x4 SUV" required /><Field label="Passenger seats" name="seats" type="number" min="1" max="30" defaultValue="6" required /><Field label="Home area" name="area" options={['Gilgit', 'Hunza', 'Skardu', 'Ghizer', 'Nagar']} defaultValue="Skardu" required /><Field label="Daily rate (PKR)" name="rate" type="number" min="1" defaultValue="18000" required /><Field label="Vehicle registration" name="registration" placeholder="Enter registration number" required /></div><fieldset className="feature-fieldset"><legend>Vehicle features</legend><label className="check-field"><input type="checkbox" defaultChecked /> Air conditioning</label><label className="check-field"><input type="checkbox" defaultChecked /> Luggage space</label><label className="check-field"><input type="checkbox" /> Child seat available</label></fieldset><div className="form-actions"><span>{notice && <span className="form-notice" role="status">{notice}</span>}</span><Button type="submit" kind="green">Save vehicle details</Button></div></form></PortalLayout>
}

function AvailabilityPage() {
  const [notice, setNotice] = useState('')
  return <PortalLayout role="driver" title={<PageTitle eyebrow="PLAN AHEAD" title="Availability" text="Set the dates when travellers can request your vehicle." />}><div className="availability-layout"><section className="panel availability-panel"><div className="availability-month"><button type="button" aria-label="Previous month">‹</button><h2>October 2026</h2><button type="button" aria-label="Next month">›</button></div><div className="calendar-grid calendar-head">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{Array.from({ length: 35 }, (_, i) => { const day = i - 2; const inMonth = day >= 1 && day <= 31; const busy = [12, 13, 21].includes(day); return <button className={`calendar-day ${inMonth ? '' : 'calendar-muted'} ${busy ? 'calendar-busy' : ''}`} type="button" key={i} aria-label={inMonth ? `${day} October${busy ? ', unavailable' : ', available'}` : 'Outside October'}>{inMonth ? day : day < 1 ? 28 + day : day - 31}</button> })}</div><div className="calendar-legend"><span><i className="legend-open" /> Available</span><span><i className="legend-busy" /> Unavailable</span></div></section><aside className="panel availability-settings"><h2>Manage dates</h2><p>Choose dates you cannot accept trip requests.</p><Field label="Mark dates unavailable" name="blockedDate" type="date" /><Button type="button" kind="green" className="button-full" onClick={() => setNotice('Demo only: availability has not been saved.')}>Update availability</Button>{notice && <p className="form-notice" role="status">{notice}</p>}<div className="availability-tip"><strong>Good to know</strong><p>Confirmed trips stay reserved even if you update other available dates.</p></div></aside></div></PortalLayout>
}

function BookingRequests() {
  return <PortalLayout role="driver" title={<PageTitle eyebrow="TRIP ENQUIRIES" title="Booking requests" text="Review traveller enquiries and keep trip details together." />}><div className="toolbar-row"><div className="segmented"><button className="segment-active" type="button">All <span>3</span></button><button type="button">Needs reply <span>2</span></button><button type="button">Confirmed</button></div><label className="sort-field">Filter <select><option>All statuses</option><option>Awaiting reply</option><option>Confirmed</option></select></label></div><div className="request-list">{[['Maya Thompson', 'United Kingdom', 'Gilgit → Karimabad → Passu', '12–15 Oct 2026', '4 passengers', 'Awaiting reply', 'gold'], ['Usman Raza', 'Lahore, Pakistan', 'Skardu → Khaplu', '16–18 Oct 2026', '3 passengers', 'Confirmed', 'green'], ['Elena Martin', 'France', 'Gilgit → Naltar Valley', '21 Oct 2026', '2 passengers', 'Awaiting reply', 'gold']].map(([name, origin, route, date, pax, status, tone]) => <article className="request-card" key={name}><div className="request-person"><div className="avatar">{name.split(' ').map(n => n[0]).join('')}</div><div><h2>{name}</h2><p>{origin}</p></div><Status tone={tone}>{status}</Status></div><div className="request-route"><span>REQUESTED ROUTE</span><strong>{route}</strong></div><div className="request-meta"><span>{date}</span><span>{pax}</span></div><div className="request-actions"><Button type="button" kind="outline" onClick={event => { event.currentTarget.textContent = 'Demo only · no message sent' }}>View enquiry</Button>{tone === 'gold' && <Button type="button" kind="green" onClick={event => { event.currentTarget.textContent = 'Demo only · not confirmed' }}>Respond</Button>}</div></article>)}</div></PortalLayout>
}

function DriverProfile() {
  const [notice, setNotice] = useState('')
  return <PortalLayout role="driver" title={<PageTitle eyebrow="YOUR PUBLIC PRESENCE" title="Driver profile" text="Help travellers get to know the person behind the wheel." />}><form className="panel portal-form" onSubmit={event => { event.preventDefault(); setNotice('Demo only: profile changes have not been saved.') }}><div className="profile-header"><div className="avatar avatar-large">AH</div><div><h2>Aamir Hussain</h2><p>Local driver · Skardu</p><Status tone="green">Profile listed</Status></div></div><div className="form-grid"><Field label="Full name" name="fullName" defaultValue="Aamir Hussain" required /><Field label="Phone number" name="phone" type="tel" defaultValue="+92 300 1234567" required /><Field label="Email address" name="email" type="email" defaultValue="aamir@example.com" required /><Field label="Home area" name="homeArea" options={['Gilgit', 'Hunza', 'Skardu', 'Ghizer', 'Nagar']} defaultValue="Skardu" required /></div><Field label="A little about you" name="bio" placeholder="Share your local experience and the trips you enjoy driving." /><div className="form-actions"><span>{notice && <span className="form-notice" role="status">{notice}</span>}</span><Button type="submit" kind="green">Save profile</Button></div></form></PortalLayout>
}

function AdminDashboard() {
  return <PortalLayout role="admin" title={<PageTitle eyebrow="OPERATIONS OVERVIEW" title="Admin dashboard" text="A snapshot of providers, vehicles, and trips across the marketplace." />}><StatGrid items={ [['Driver accounts', '42', 'All registered providers'], ['Needs verification', '06', 'Ready for review', 'stat-accent'], ['Vehicle listings', '36', '8 awaiting review'], ['Booking requests', '18', '5 upcoming trips']] } /><div className="portal-columns"><Panel title="Verification queue" linkTo="/driver-verification"><Table headers={['PROVIDER', 'AREA', 'SUBMITTED', 'STATUS']} rows={[[<>Hamza Karim</>, 'Hunza', '05 Oct', <Status>Needs review</Status>], ['Sanaullah Baig', 'Gilgit', '04 Oct', <Status>Needs review</Status>], ['Shahzad Hussain', 'Skardu', '03 Oct', <Status tone="green">Verified</Status>]]} /></Panel><Panel title="Recent bookings" linkTo="/booking-management"><Table headers={['ROUTE', 'DATE', 'PROVIDER', 'STATUS']} rows={[[<strong>Maya Thompson</strong>, 'Gilgit → Hunza', '12–15 Oct', 'Aamir Hussain', '4', <Status tone="green">Confirmed</Status>], [<strong>Usman Raza</strong>, 'Skardu → Khaplu', '16–18 Oct', 'Usman Raza', '3', <Status>Pending</Status>], [<strong>Elena Martin</strong>, 'Gilgit → Naltar', '21 Oct', 'Sajjad Ali', '2', <Status>Pending</Status>], [<strong>Daniel Reed</strong>, 'Hunza → Khunjerab', '25–27 Oct', 'Naveed Karim', '5', <Status tone="green">Confirmed</Status>]]} /></Panel></div></PortalLayout>
}

function DriverVerification() {
  const [notice, setNotice] = useState('')
  const providers = [['Hamza Karim', 'Hunza', '05 Oct 2026', 'hamza.k@example.com'], ['Sanaullah Baig', 'Gilgit', '04 Oct 2026', 'sanaullah@example.com'], ['Shahzad Hussain', 'Skardu', '03 Oct 2026', 'shahzad.h@example.com']]
  return <PortalLayout role="admin" title={<PageTitle eyebrow="PROVIDER ONBOARDING" title="Driver verification" text="Review the driver details submitted for marketplace listing." />}><div className="toolbar-row"><div className="segmented"><button className="segment-active" type="button">Needs review <span>6</span></button><button type="button">Verified</button><button type="button">All drivers</button></div><label className="sort-field">Area <select><option>All areas</option><option>Hunza</option><option>Gilgit</option><option>Skardu</option></select></label></div><div className="data-panel"><Table headers={['PROVIDER', 'HOME AREA', 'SUBMITTED', 'DOCUMENTS', 'STATUS', 'REVIEW']} rows={providers.map(([name, area, date, email]) => [<div className="table-person"><span className="avatar avatar-small">{name.split(' ').map(n => n[0]).join('')}</span><span><strong>{name}</strong><small>{email}</small></span></div>, area, date, <Link to="/driver-verification" className="text-link">View files ↗</Link>, <Status>Needs review</Status>, <Button type="button" kind="outline" className="button-compact" onClick={() => setNotice(`Demo only: ${name}'s review was not changed.`)}>Review</Button>])} /></div>{notice && <p className="form-notice" role="status">{notice}</p>}</PortalLayout>
}

function VehicleManagement() {
  const [notice, setNotice] = useState('')
  return <PortalLayout role="admin" title={<PageTitle eyebrow="LISTING OVERSIGHT" title="Vehicle management" text="Review transport listings visible to travellers." action={<Status>8 awaiting review</Status>} />}><div className="toolbar-row"><div className="segmented"><button className="segment-active" type="button">All vehicles <span>36</span></button><button type="button">Needs review <span>8</span></button><button type="button">Listed</button></div><label className="sort-field">Vehicle type <select><option>All types</option><option>4x4 SUV</option><option>Van</option><option>Car</option></select></label></div><div className="data-panel"><Table headers={['VEHICLE', 'PROVIDER', 'AREA', 'DAILY RATE', 'STATUS', 'ACTION']} rows={vehicles.map((vehicle, index) => [<div className="table-person"><img className="table-vehicle" src={`https://images.unsplash.com/${vehicle.image}?auto=format&fit=crop&w=100&q=70`} alt="" /><span><strong>{vehicle.name}</strong><small>{vehicle.type} · {vehicle.seats} seats</small></span></div>, vehicle.driver, vehicle.area, vehicle.price, index === 0 ? <Status tone="green">Listed</Status> : <Status>Needs review</Status>, <Button type="button" kind="outline" className="button-compact" onClick={() => setNotice(`Demo only: ${vehicle.name} listing was not changed.`)}>Review</Button>])} /></div>{notice && <p className="form-notice" role="status">{notice}</p>}</PortalLayout>
}

function BookingManagement() {
  return <PortalLayout role="admin" title={<PageTitle eyebrow="TRIP ACTIVITY" title="Booking management" text="Monitor traveller enquiries and confirmed trips." />}><div className="toolbar-row"><div className="segmented"><button className="segment-active" type="button">All bookings <span>18</span></button><button type="button">Pending</button><button type="button">Confirmed</button><button type="button">Completed</button></div><label className="sort-field">Date <select><option>All dates</option><option>Next 30 days</option><option>Past trips</option></select></label></div><div className="data-panel"><Table headers={['TRAVELLER', 'ROUTE', 'TRAVEL DATE', 'PROVIDER', 'PASSENGERS', 'STATUS']} rows={[[<strong>Maya Thompson</strong>, 'Gilgit → Hunza', '12–15 Oct', 'Aamir Hussain', '4', <Status tone="green">Confirmed</Status>], [<strong>Usman Raza</strong>, 'Skardu → Khaplu', '16–18 Oct', 'Usman Raza', '3', <Status>Pending</Status>], [<strong>Elena Martin</strong>, 'Gilgit → Naltar', '21 Oct', 'Sajjad Ali', '2', <Status>Pending</Status>], [<strong>Daniel Reed</strong>, 'Hunza → Khunjerab', '25–27 Oct', 'Naveed Karim', '5', <Status tone="green">Confirmed</Status>]]} /></div></PortalLayout>
}

function NotFound() { return <><Header /><main className="not-found"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>That trail ends here.</h1><p>The page may have moved. Head back and choose another route.</p><Button to="/" kind="green">Back to home</Button></main><Footer /></> }

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/')
  useEffect(() => {
    const updateRoute = () => { setRoute(window.location.hash.slice(1) || '/'); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])
  const pages = {
    '/': <HomePage />, '/search': <SearchPage />, '/vehicle-results': <ResultsPage />, '/vehicle-details': <VehicleDetailsPage />, '/booking-request': <BookingRequestPage />, '/booking-submitted': <BookingSubmittedPage />, '/my-bookings': <MyBookingsPage />,
    '/login': <AccountPage />, '/register': <AccountPage register />, '/driver-dashboard': <DriverDashboard />,
    '/driver-vehicle': <DriverVehicle />, '/availability': <AvailabilityPage />, '/booking-requests': <BookingRequests />,
    '/driver-profile': <DriverProfile />, '/admin-dashboard': <AdminDashboard />, '/driver-verification': <DriverVerification />,
    '/vehicle-management': <VehicleManagement />, '/booking-management': <BookingManagement />,
  }
  return <div key={route} className="route-root">{pages[route.split('?')[0]] || <NotFound />}</div>
}