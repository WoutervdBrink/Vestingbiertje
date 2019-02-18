# [Vestingbiertje](https://vestingbiertje.nl/)

**Vestingbiertje** or Vestingbeer is a small tool I wrote which allows guests of [Vestingbar](https://www.vestingbar.nl/) to easily choose one of the wonderful special beers they offer. What started out as a bodged together project with an outdated database has now grown into a relatively less bodged together Vue SPA with more options and a fresh, up-to-date database!

## Development
Start by cloning the project and installing the dependencies using either Yarn or NPM. Then, run either `yarn dev` (Yarn) or `npm run dev` (NPM) to start a Parcel development server. Hot reloading is enabled; changes are immediate.

## Deployment / building
Creating a production-ready version of Vestingbiertje is possible with the `build` script: either run `yarn build` (Yarn) or `npm run build` (NPM) to compile a production build. It'll end up in the `public` folder.

Two Parcel plugins are enabled; [parcel-static-files-copy](https://www.npmjs.com/package/parcel-plugin-static-files-copy) enables us to drop in `robots.txt` and `.htaccess` while building, while [parcel-plugin-sw-cache](https://www.npmjs.com/package/parcel-plugin-sw-cache) enables offline access using a service worker.

## License
MIT; see [LICENSE](LICENSE).
