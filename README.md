# Marsupilami Modz Website

A modern website for sharing free RageMP modifications with a built-in CMS admin panel.

## Features

- 🎮 **Free Mods Gallery** - Browse and download RageMP modifications
- 🎥 **YouTube Integration** - Watch mod previews directly on the site
- 📸 **Screenshot Support** - Visual previews of mods
- 🌐 **Multi-language Support** - English, German, Spanish, French
- 🔐 **Admin Panel** - Easy content management with Netlify CMS
- 📱 **Responsive Design** - Works on all devices

## CMS Setup (Netlify CMS)

This website includes a no-code admin panel powered by Netlify (Decap) CMS.

### Quick Setup

1. **Deploy to Netlify**
   - Push this repository to GitHub
   - Connect your GitHub repo to Netlify
   - Deploy the site

2. **Enable Identity & Git Gateway**
   - Go to your Netlify site dashboard
   - Navigate to **Site settings** → **Identity**
   - Click **Enable Identity**
   - Go to **Site settings** → **Identity** → **Services**
   - Enable **Git Gateway**

3. **Invite Users**
   - Go to **Identity** → **Invite users**
   - Invite yourself (and others) by email
   - Accept the invitation via email

4. **Access Admin Panel**
   - Visit `https://your-site.netlify.app/admin/`
   - Log in with your GitHub account
   - Start adding mods!

### Adding Mods via CMS

1. Go to `/admin/` on your site
2. Click **"New Free Mods"**
3. Fill in the fields:
   - **Title**: Mod name
   - **YouTube Link**: Preview video URL
   - **Screenshot**: Upload an image
   - **Download Link**: Where users can download the mod
4. Click **"Save"**

The mod will automatically appear on your Free Modz page!

## File Structure

```
├── admin/
│   ├── index.html          # CMS admin interface
│   └── config.yml          # CMS configuration
├── mods/                   # Mod content (managed by CMS)
│   └── sample-mod.md       # Example mod file
├── images/
│   └── uploads/            # CMS uploaded images
├── index.html              # Homepage
├── about.html              # About page
├── free-modz.html          # Mods gallery (displays CMS content)
├── support.html            # Support page
├── login.html              # User login
├── register.html           # User registration
├── admin.html              # Admin dashboard
└── styles.css              # Main stylesheet
```

## CMS Configuration

The CMS is configured in `admin/config.yml`:

- **Backend**: Git Gateway (saves to your GitHub repo)
- **Media Folder**: `images/uploads/` (for screenshots)
- **Collections**: 
  - `mods` - Free mods with title, YouTube link, screenshot, download link

## Development

### Local Development

1. Clone the repository
2. Serve the files with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000`

### Modifying the CMS

To add new fields or collections, edit `admin/config.yml`:

```yaml
collections:
  - name: "mods"
    label: "Free Mods"
    folder: "mods"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "YouTube Link", name: "youtube", widget: "string" }
      - { label: "Screenshot", name: "screenshot", widget: "image" }
      - { label: "Download Link", name: "download", widget: "string" }
      # Add new fields here
      - { label: "Description", name: "description", widget: "text" }
```

## Troubleshooting

### CMS Not Loading
- Ensure Git Gateway is enabled in Netlify
- Check that you're logged in with GitHub
- Verify the `admin/config.yml` file is correct

### Mods Not Appearing
- Check browser console for errors
- Ensure mod files are in the `mods/` folder
- Verify markdown frontmatter format

### Images Not Loading
- Check that images are in `images/uploads/`
- Verify the `public_folder` setting in `config.yml`

## Support

For issues with the website or CMS setup, please check:
1. Browser console for errors
2. Netlify deployment logs
3. GitHub repository for file structure

## License

This project is open source. Feel free to use and modify as needed.
