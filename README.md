# Jacob Griscom

Personal site for [jacobgriscom.com](https://jacobgriscom.com): stories, work, music, the network, and the awareness library. This is the migration off Replit onto the same shape used for COMPART and DebateHUB — GitHub for the source, Neon for Postgres, and Vercel for hosting.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on port 47231.

Contact and newsletter forms write to `.data/inbox.json` when `DATABASE_URL` is unset. Copy `.env.example` to `.env.local` and add a Neon connection string to store them in Postgres instead.

```bash
npm run db:setup
```

That creates `subscribers` and `contact_messages`. The app also creates those tables on the first successful write.

## Deploy

1. Push this repository to GitHub.
2. Create a Neon project and copy the pooled connection string into `DATABASE_URL`.
3. Import the repo in Vercel. Add `DATABASE_URL`. Set `NEXT_PUBLIC_SITE_URL` to `https://jacobgriscom.com`.
4. Point the `jacobgriscom.com` domain at the Vercel project.
5. Optional: set `STRIPE_SECRET_KEY` (and `STRIPE_PRICE_ID` if you already have a $1,250 price) to turn on Crypto Sovereignty checkout. Without those keys the button explains that checkout is not configured. The Ayurvedic business book still uses the existing PayPal hosted button.

## What moved

Editorial content, the music catalog, and the public pages from the Replit site are in this repo. Newsletter signup and the contact form now save to Neon instead of Ontraport. The previous Ontraport form ids were `p2c266088f1` (footer) and `p2c266088f2` (contact), if you want to reconnect that CRM later.

One original recording, `1950s America`, could not be copied because the current host returns HTTP 500 for that file. The page links back to the existing URL until the file can be added under `public/audio/`.
