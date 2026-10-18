# Asset provenance

- Courtyard, studio, facade/sign textures, temporary articulated character pose rig and illustrated founder concepts: original project artwork. The former vector city backdrop is removed.
- Studio and title environment: original procedural geometry; no external human models, photographic textures or animation clips.
- Atlas: `src/components/worldPaths.ts` is a simplified equirectangular derivative of Natural Earth's 1:110m country polygons. Natural Earth data is public domain: https://www.naturalearthdata.com/about/terms-of-use/ . Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson . Countries are grouped using the dataset's continent field. This is a stylized game selector, not an assertion of borders or identities.
- DM Sans: SIL Open Font License 1.1, distributed via `@fontsource/dm-sans`. Playfair Display is no longer used. Copies are included in `public/licenses/` and the production output.
- Lucide React icons: ISC license, distributed with `lucide-react`; license included in `public/licenses/`.

No third-party photographs, human models, sound or music are included. Future assets require their own license review.
