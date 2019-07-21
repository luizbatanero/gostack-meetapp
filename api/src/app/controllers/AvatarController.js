import fs from 'fs';
import sharp from 'sharp';
import File from '../models/File';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename, path } = req.file;

    const buffer = await sharp(path)
      .resize(350, 350)
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

export default new AvatarController();
