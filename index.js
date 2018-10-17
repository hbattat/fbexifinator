const commander = require('commander');
const helper = require('./helper');
const glob = require('glob');
const fs = require('fs');

const albumsFolder = 'album'

commander
  .option('-p, --input-path [input path]',
  	'Path to the Facebook downloaded (and extracted) folder',
  	'../photos_and_videos')
  .option('-o, --output-path [output path]',
  	'Path path where you want to save the modified images',
  	'../processed_images')
  .parse(process.argv);

glob(commander.inputPath + '/' + albumsFolder + '/*.json', function(err, files) {
  if(err) {
    console.log('cannot read the folder, something goes wrong with glob', err);
  }
  var photos;
  files.forEach(function(file) {
    fs.readFile(file, 'utf8', function (err, data) {
      if(err) {
        console.log('cannot read the file, something goes wrong with the file', err);
      }
      var album = JSON.parse(data);
      if (album.photos) {
        album.photos.forEach(function(photo) {
          if (photo.uri.split('.').pop() == 'jpg') {
            var fileName = photo.uri.split('/').pop();
            var albumFolder = photo.uri.split('/')[1].split('_')[0];
            var inputFile = '../' + photo.uri;
            var outputFile = commander.outputPath + '/' + albumFolder + '_' + fileName;
            var timestamp = photo.creation_timestamp;
            
            helper.insertExif(inputFile, outputFile, timestamp);
          }
        })
      }
    })
  })
})
