import request from 'request';
import fs from 'fs';
import path from 'path';

export class Manga {
    id: string;
    type: string;
    attributes: any;
    relationships: any[];

    constructor(id: string, type: string, attributes: any, relationships: any[]) {
        this.id = id;
        this.type = type;
        this.attributes = attributes;
        this.relationships = relationships;
    }

    writeToMarkdown() {
        const dir = '/home/chris/code/obsidian_mangadex/_inbox/';
        // dir = __dirname;

        const title = this.attributes.title.en;
        console.log(title);
        const filePath = path.join(dir, `${title}.md`);

//         const fileContents = `---
// title: ${this.attributes.title.en}
// ---`;

        let fileContents = '---\n';
        fileContents += `title: ${this.attributes.title.en}\n`;

        for (const key in this.attributes) {

 

            if (this.attributes.hasOwnProperty(key)) {
                const value = this.attributes[key];

                if (key === 'altTitles') {
                    let altTitles = value.map((titleObj: any) => Object.values(titleObj).join(', ')).join('; ');

                    console.log("!!!!!!");
                    console.log(altTitles);
                    fileContents += `${key}: ${altTitles}\n`;
                }
                else if(key === 'tags'){
                    let tags = value.map((tagObj: any) => tagObj.attributes.name.en).join(', ');
                    fileContents += `${key}: ${tags}\n`;
                    continue;
                }
                else {
                    if (typeof value === 'object' && !Array.isArray(value)) {
                        for (const subKey in value) {
                            if (value.hasOwnProperty(subKey)) {
                                fileContents += `${subKey}: ${value[subKey]}\n`;
                            }
                        }
                    } else {
                        fileContents += `${key}: ${value}\n`;
                    }
                }
            }
        }

        fileContents += '---';

        fs.writeFile(filePath, fileContents, (err) => {
            if (err) {
                console.error(`Error writing to file: ${err}`);
            } else {
                console.log(`File written: ${filePath}`);
            }
        });
    }
}

// export class MangaDexReader {
//     async getMangaById(id: string): Promise<Manga> {

//         const url = `https://api.mangadex.org/manga/${id}`;
//         console.log(url);

        // const response = await fetch(url, {
        //     method: 'GET',
        //     mode: 'no-cors', // no-cors mode
        //     headers: {
        //         'accept': 'application/json'
        //     }
        // });

        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const data = await response.json();
        // return new Manga(data.data.id, data.data.type, data.data.attributes, data.data.relationships);
//     }
// }

export class MangaDexReader {
    getMangaById(id: string): Promise<Manga> {
        return new Promise((resolve, reject) => {
            const url = `https://api.mangadex.org/manga/${id}`;

            console.log(url);

            request(url, { 
                json: true ,
                headers: {
                    'User-Agent': 'obsidian-mangadex'
                } 
            }, (error, response, body) => {

                // console.log(response)

                if (error) {
                    reject(error);
                } else if (response.statusCode !== 200) {
                    reject(new Error(`HTTP error! status: ${response.statusCode}`));
                } else {
                    resolve(new Manga(body.data.id, body.data.type, body.data.attributes, body.data.relationships));
                }
            });
        });
    }

    // search
    // curl -X 'GET' \
    // 'https://api.mangadex.org/manga?limit=10&title=beat%20motion'
    // 'https://api.mangadex.org/manga?limit=10&title=beat%20motion&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc' \
    // -H 'accept: application/json'
}