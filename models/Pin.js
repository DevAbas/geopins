const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema(
  {
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longtitude: Number,
    author: { type: Schema.ObjectId, ref: 'User' },
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: Schema.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pin', PinSchema);
