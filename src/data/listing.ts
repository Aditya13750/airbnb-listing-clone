export type ListingImage = { src: string; alt: string }

export const listing = {
  title: 'Modern alpine retreat with breathtaking views',
  location: 'Whistler, British Columbia, Canada',
  rating: 4.91,
  reviews: 127,
  host: 'Maya',
  hostYears: 7,
  guests: 6,
  bedrooms: 3,
  beds: 4,
  bathrooms: 2,
  price: 318,
  images: [
    { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=88', alt: 'Warm modern living room with mountain views' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=88', alt: 'Minimal kitchen with wood cabinetry' },
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=88', alt: 'Sunlit bedroom with linen bedding' },
    { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=88', alt: 'Stone bathroom with a freestanding tub' },
    { src: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=88', alt: 'Outdoor deck overlooking evergreen trees' },
    { src: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1000&q=88', alt: 'Cabin exterior in the mountains' },
    { src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=88', alt: 'Cozy cabin interior at dusk' },
    { src: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=88', alt: 'Aerial view of a forested valley' },
  ] satisfies ListingImage[],
  amenities: ['Mountain view', 'Kitchen', 'Free parking on premises', 'Wifi', 'Hot tub', 'Washer', 'Indoor fireplace', 'Dedicated workspace'],
}
