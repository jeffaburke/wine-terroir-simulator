# Wine Terroir Simulator

An interactive web application that explores how climate and soil conditions affect wine regions and grape varieties.

**Live Demo:** [https://your-username.github.io/wine-terroir-simulator/](https://your-username.github.io/wine-terroir-simulator/)

## Features

- 🌡️ **Interactive Controls** - Adjust temperature, rainfall, altitude, and soil type
- 🗺️ **World Map** - Visual representation of matching wine regions
- 🍇 **Grape Matching** - Discover which grape varieties thrive in your selected conditions
- 📊 **Flavor Profile** - See the expected wine characteristics based on terroir
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- React 19 + TypeScript
- Vite
- TailwindCSS
- D3-geo for map projections

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Update `vite.config.ts` - change `base` to match your repo name:
   ```ts
   base: '/your-repo-name/',
   ```
3. Push your code to the `main` branch
4. Go to **Settings > Pages** in your GitHub repo
5. Under "Build and deployment", select **GitHub Actions**
6. The site will automatically deploy on each push to `main`

## Credits

Created by **Jeffrey Burke** ([jab9209@rit.edu](mailto:jab9209@rit.edu))

For **Wines of The World 1** (HSPT.161.02) at Rochester Institute of Technology

## Data Sources

- Wikipedia - Willamette Valley climate data
- Britannica - Oregon climate information
- For The Love Of Port - Douro Valley weather
- Primary Industries and Regions SA - Barossa Valley data
- Weather and Climate - Napa precipitation
- Berry Bros & Rudd - Bordeaux climate
- Argento Wine - Mendoza region altitudes

## License

This project is for educational purposes.
