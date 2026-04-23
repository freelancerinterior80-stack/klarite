export const productsQuery = `*[_type == "product"] | order(_createdAt asc) {
  "slug": slug.current,
  "name": coalesce(name[_key == $locale][0].value, name[_key == "fr"][0].value),
  "shortDesc": coalesce(shortDesc[_key == $locale][0].value, shortDesc[_key == "fr"][0].value),
  "description": coalesce(description[_key == $locale][0].value, description[_key == "fr"][0].value),
  "ritual": coalesce(ritual[_key == $locale][0].value, ritual[_key == "fr"][0].value),
  originalName,
  category,
  price,
  accent,
  notes,
  "image": image { asset->, "alt": alt },
  "images": images[] { asset->, "alt": alt }
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  "quote": coalesce(quote[_key == $locale][0].value, quote[_key == "fr"][0].value),
  name,
  detail,
  "photoUrl": photo.asset->url
}`;

export const concernsQuery = `*[_type == "concern"] | order(order asc) {
  "title": coalesce(title[_key == $locale][0].value, title[_key == "fr"][0].value),
  "copy": coalesce(copy[_key == $locale][0].value, copy[_key == "fr"][0].value),
  "image": image { asset->, "alt": alt }
}`;

export const ritualStepsQuery = `*[_type == "ritualStep"] | order(order asc) {
  number,
  "title": coalesce(title[_key == $locale][0].value, title[_key == "fr"][0].value),
  "copy": coalesce(copy[_key == $locale][0].value, copy[_key == "fr"][0].value),
  "image": image { asset->, "alt": alt }
}`;

export const trustPointsQuery = `*[_type == "trustPoint"] | order(order asc) {
  "text": coalesce(text[_key == $locale][0].value, text[_key == "fr"][0].value)
}`;
