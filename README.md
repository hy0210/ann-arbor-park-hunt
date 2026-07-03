# 🎮 Ann Arbor Park Hunt

A location-based mobile web game inspired by Pokémon Legends: Arceus. Discover and visit parks in Ann Arbor to collect them!

**MVP Status**: Geolocation tracking + map display + park proximity detection

🌐 **Live Demo**: [ann-arbor-park-hunt.vercel.app](https://ann-arbor-park-hunt.vercel.app)

## 📱 Features

- **Real-time GPS Tracking** — Automatically detects your location
- **Interactive Map** — Built with Leaflet and OpenStreetMap
- **Park Detection** — Visual feedback when you enter a park area
- **Nearby Parks List** — Shows 5 closest parks with distances
- **Mobile-Friendly** — Responsive design optimized for phones

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 🗺️ Parks Included

The MVP includes 10 real parks in Ann Arbor:
- Gallup Park
- Burns Park
- Nichols Arboretum
- Matthaei Botanical Gardens
- Hudson Mills Metropark
- Riverside Park
- Buhr Park
- Slaughter Pen Mountain Bike Park
- Traverwood Park
- Furstenberg Park

*Note: Coordinates are approximate for MVP testing. Can be updated with real OpenStreetMap data.*

## 🛠️ Tech Stack

- **Vue 3** — Frontend framework
- **Leaflet** — Map library
- **Vite** — Build tool
- **Vercel** — Hosting & deployment

## 📂 Project Structure

```
src/
├── App.vue              # Main app component with map & geolocation
├── data/
│   └── parks.js         # Park locations & metadata
├── utils/
│   └── distance.js      # Distance calculation (Haversine formula)
├── main.js
└── style.css
```

## 🎯 MVP Features Implemented

- ✅ Geolocation API integration
- ✅ Map display with Leaflet
- ✅ Real-time location tracking
- ✅ Park proximity detection
- ✅ Distance calculation
- ✅ Mobile-responsive UI

## 🚧 Future Features (Post-MVP)

- Collection system (check off visited parks)
- Leaderboards
- Park info cards (photos, descriptions)
- Achievement badges
- Social sharing
- Offline support
- Sound effects & animations

## 📝 Development

### Start dev server
```bash
npm run dev
```

### Run build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 🚀 Deployment

Deployed on Vercel with automatic CI/CD from GitHub.

To deploy your own fork:
1. Push to GitHub
2. Connect repo to Vercel
3. Deploy automatically

## 📄 License

MIT

## 🤝 Contributing

Feedback and suggestions welcome! This is a prototype for testing the core concept.
