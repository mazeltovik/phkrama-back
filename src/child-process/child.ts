import ExifReader from 'exifreader';
import getExif from './helpers/getExif';

process.on('message', async (msg: string) => {
  process.send(msg);
  // if (msg == 'Init') {
  //   process.send(`Init ${process.pid} pid`);
  // } else {
  //   const buffer = Buffer.from(JSON.parse(msg).data);
  //   const tags = await ExifReader.load(buffer, {
  //     async: true,
  //     expanded: true,
  //   });
  //   const extractData = getExif(tags.exif);
  //   process.send(extractData);
});
