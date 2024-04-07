import { Document } from "llamaindex";

export const DATA_DIR = "./data";

const remoteLocation = 'https://github.com/maxprilutskiy/oss-license/blob/main/data';
const licenseIds = [
  'mit',
  'agpl',
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
