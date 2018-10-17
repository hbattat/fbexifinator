var piexif = require('piexifjs');
var fs = require('fs');

helper = {
  insertExif: function(inputFile, outputFile, timestamp) {
    var jpeg = fs.readFileSync(inputFile);
    var data = jpeg.toString('binary');
    var exifObj = piexif.load(data);
    var zeroth = {};
    var exif = {};
    var gps = {};

    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var formattedDate = year + ':' + pad(month) + ':' + pad(day) + ' ' + pad(hour) + ':' + pad(min) + ':' + pad(sec);

    zeroth[piexif.ImageIFD.Make] = 'Imported from Facebook';
    zeroth[piexif.ImageIFD.XResolution] = [72, 1];
    zeroth[piexif.ImageIFD.YResolution] = [72, 1];
    zeroth[piexif.ImageIFD.Software] = 'FBExifinator';
    exif[piexif.ExifIFD.DateTimeOriginal] = formattedDate;
    exif[piexif.ExifIFD.LensMake] = 'FBExifinator';

    var exifObj = {'0th':zeroth, 'Exif':exif};
    var exifbytes = piexif.dump(exifObj);
    var newData = piexif.insert(exifbytes, data);
    var newJpeg = new Buffer(newData, 'binary');
    fs.writeFileSync(outputFile, newJpeg);
  }
}

function pad (value) {
  if(parseInt(value, 10) < 10) {
    return '0' + value;
  } else {
    return value;
  }
}

module.exports = helper;
    