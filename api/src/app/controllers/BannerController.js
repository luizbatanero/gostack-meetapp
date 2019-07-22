import fs from 'fs';
import sharp from 'sharp';
import File from '../models/File';

class BannerController {
  async store(req, res) {
    const { originalname: name, filename, path } = req.file;

    const buffer = await sharp(path)
      .resize(900, 340)
      .toBuffer();

    fs.writeFile(path, buffer, err => {
      if (err) throw err;
    });

    const file = await File.create({
      name,
      path: filename,
    });

    return res.json(file);
  }
}

export default new BannerController();
