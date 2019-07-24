import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  fileFilter(req, file, cb) {
    const types = ['jpeg', 'jpg', 'png'];
    const typesRegex = new RegExp(types.join('|'), 'i');

    const mime = typesRegex.test(file.mimetype);
    const ext = typesRegex.test(extname(file.originalname));

    if (mime && ext) {
      return cb(null, true);
    }

    return cb({
      message: `File upload only supports the following types: ${types.join(
        ', '
      )}`,
    });
  },
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
  limits: {
    fileSize: 2 * (1024 * 1024), // 2 MB,
  },
};
