# Огонёк

A tiny anonymous shared text space.

A green desktop-like field with white text and a blinking spark in the corner.

Anyone can open the page and edit the same text.

No accounts.  
No usernames.  
No private messages.

## Structure

```text
ogonek/
├── index.html
├── style.css
├── app.js
└── README.md
```

## How it works

The page is hosted on GitHub Pages.

The shared text is stored in Cloudflare KV through a Cloudflare Worker.

All visitors see the same text and can edit it.

## Frontend

- GitHub Pages
- HTML
- CSS
- JavaScript

## Backend

- Cloudflare Workers
- Cloudflare KV

## Public page

https://indexmod.github.io/ogonek/

## Worker

https://ogonek.wiki-self.workers.dev/
