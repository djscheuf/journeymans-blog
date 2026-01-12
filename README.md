# Journeyman's Travels

A technical blog focused on software engineering leadership and best practices, published at [daniel.scheufler.tech](https://daniel.scheufler.tech).

## About

**Next Iteration, We Should Try...** is a blog by Daniel Scheufler covering topics in software engineering, leadership, and consulting. The site features articles on agile practices, team development, technical decision-making, and lessons learned from real-world software projects.

## Technology Stack

This blog is built using [Hexo](https://hexo.io/), a fast and simple static site generator powered by Node.js. The site uses the "A la Clear" theme and includes:

- RSS feed generation
- SEO-friendly sitemaps
- Google Analytics integration
- Social media links
- Archive and tag organization

## Repository Structure

```
journeymans-blog/
├── source/
│   ├── _posts/          # Published blog posts (Markdown files)
│   ├── _drafts/         # Draft posts not yet published
│   └── about/           # About page and other static pages
├── themes/
│   └── A la Clear/      # Custom theme
├── public/              # Generated static site (git-ignored)
├── scaffolds/           # Post templates
├── _config.yml          # Hexo configuration
└── package.json         # Node.js dependencies
```

### Blog Posts

All published blog posts are stored as Markdown files in `source/_posts/`. Each post includes front matter with metadata such as title, date, categories, and tags.

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/djscheuf/journeymans-blog.git
   cd journeymans-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:
```bash
npm start
```

The site will be available at `http://localhost:4000` (or the port specified by `$PORT` environment variable).

### Building

Generate the static site:
```bash
npm run generate
```

The generated files will be placed in the `public/` directory.

### Cleaning

Remove generated files:
```bash
npm run clean
```

### Regenerate

Clean and rebuild the site:
```bash
npm run regen
```

## Creating New Posts

Create a new post using Hexo's CLI:
```bash
hexo new post "Your Post Title"
```

This creates a new Markdown file in `source/_posts/` using the template from `scaffolds/post.md`.

## Deployment

The site is configured to deploy via Git. Deployment configuration can be found in `_config.yml` under the `deploy` section.

## Site Configuration

Key configuration options are in `_config.yml`:
- **Site title**: "Next Iteration, We Should Try..."
- **Author**: Daniel Scheufler
- **URL**: https://daniel.scheufler.tech
- **Timezone**: America/Chicago
- **Posts per page**: 7 on homepage
- **Permalink format**: `/blog/:title/`

## Social Links

- [GitHub](https://github.com/djscheuf)
- [LinkedIn](https://www.linkedin.com/in/danielscheufler/)
- [Leanpub](https://leanpub.com/u/danielscheufler)
- [Podcast](https://anchor.fm/journeymans-travels)

## License

Private repository - All rights reserved.

## Contact

Daniel Scheufler - daniel@scheufler.tech
