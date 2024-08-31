import ExifReader from 'exifreader';
import getExif from '../../child-process/helpers/getExif';

async function subprocess() {
  process.on('message', async (m: string) => {
    const buffer = Buffer.from(JSON.parse(m).data);
    const tags = await ExifReader.load(buffer, {
      async: true,
      expanded: true,
    });
    console.log(tags);
    const extractData = getExif(tags.exif);
    process.send(extractData);
  });
}

subprocess();
