# Obsidian Plugin - MangaDex Downloader
# Obsidian plugin to download markdown from MangaDex search results 

WORK IN PROGRESS

0.0.1 - hardcoded search by ID

TODO:
- [ ] implement search

- [ ] map/load relationships
  - [ ] author
  - [ ] artist
  - [ ] cover_art
  - [ ] creator

- [ ] rename/cleanup sample classes

- [ ] generate MAL url from id 
  - https://myanimelist.net/manga/156308

- [ ] datetime properties (not string)
  - [ ] createdAt
  - [ ] updatedAt

- [ ] alt title as list not string

- [ ] setting folder suggest - https://github.com/anpigon/obsidian-book-search-plugin/blob/2d0349e0054cc515319ebaedaee107e45a478870/src/settings/suggesters/FolderSuggester.ts#L6

## Notes

Build a plugin - https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin

Mangadex swagger 
- search - https://api.mangadex.org/docs/swagger.html#/Manga/get-search-manga
- manga/{id} - https://api.mangadex.org/docs/swagger.html#/Manga/get-manga-id
  - sample - https://api.mangadex.org/manga?limit=10&title=beat%20motion
- https request / CORS workaround - https://forum.obsidian.md/t/make-http-requests-from-plugins/15461/8
- plugins dir - https://forum.obsidian.md/t/how-to-get-current-plugins-directory/26427