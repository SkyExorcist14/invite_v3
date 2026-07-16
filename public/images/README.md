# Image placeholders

Drop your photos / caricatures here using these exact filenames so the site
picks them up automatically (the layout never breaks if a file is missing —
it just shows a soft placeholder until you add one):

- couple-main.png        — main hero / landing couple photo (optional)
- haldi-photo.png        — Haldi & Mehendi event photo or caricature
- sangeet-caricature.png — Sangeet event photo or caricature
- anand-karaj-photo.png  — Anand Karaj event photo
- reception-photo.png    — Reception event photo

Recommended size: at least 1200px on the longest side, landscape orientation
(roughly 4:3 or 16:9) works best inside the event card image frame.

To actually display an image once you've added a file, open
`src/components/EventCard.tsx` and replace the placeholder `<div>` block
with:

    import Image from "next/image";
    <Image src={event.imagePath} alt={event.title} fill className="object-cover" />
