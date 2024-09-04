import ExifReader from 'exifreader';
import getExif from './helpers/getExif';

process.on('message', async (msg: string) => {
  if (msg == 'Init') {
    process.send({ initMsg: `Process has ${process.pid} pid` });
  } else {
    const { index, buffer } = JSON.parse(msg);
    const rawData = Buffer.from(buffer.data);
    try {
      const tags = await ExifReader.load(rawData, {
        async: true,
        expanded: true,
      });
      const extractData = getExif(tags.exif);
      process.send({ index, extractData, done: true });
    } catch (err) {
      process.send({ done: false, errMsg: err.message });
    }
  }
});
