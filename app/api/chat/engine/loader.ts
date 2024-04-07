import { Document } from "llamaindex";

export const DATA_DIR = "./data";

const remoteLocation = 'https://github.com/maxprilutskiy/opensource.lawyer/blob/main/data';
const licenseIds = [
  'MIT',
  'ISC',
];

export async function getDocuments() {
  return await Promise.all(
    licenseIds.map((id) => 
      fetch(`${remoteLocation}/${id}.md?raw=true`)
        .then((response) => response.text())
        .catch((error) => {
          console.error(`Failed to fetch license ${id}: ${error}`);
          return '';
        })
        .then((text) => new Document({ id_: id, text })),
    ),
  );
}
