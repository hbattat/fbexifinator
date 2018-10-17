What is EXIF?
-------------
In short, it is just part of the image format and stores metadata about the image. Longer answer can be found [here](exif)
When you upload an image to Facebook, Facebook strips out the EXIF data from the image. EXIF data has metadata about the image such as the date is was taken, the location, the lens used, etc.

What does this script do?
-------------------------
It uses the date in the files downloaded from Facebook to add the EXIF date back the downloaded Facebook images.

What do I need the EXIF date for?
---------------------------------
For many people this does not matter, but if you are trying to move all/some of your Facebook images to another photo gallery software or service (e.g. Google Photos) this is an issue because the uploaded images would be treated as new images as if they were taken the day you uploaded them. This can cause them to be sorted incorrectly if you care about the timeline of your photos or *search-by-date* features the software you use may offer.

How do I use this scrip?
------------------------
**PREP**
1. Dowanload your photos from Facebook ([instructions](download)). Select only photos and videos, and the format must be **json**
2. Exctract the downloaded file's content into a folder.

**INSTALL**
1. Clone the repo or download the script.
2. Run `npm install`

**RUN**
1. Prepare your flags `-p <facebook folder or the extracted files> -o <output folder where you want to save the images>`
2. Run the script with your flags. Example: `node index.js -p ../photos_and_videos -o ../images`


[exif]:https://photographylife.com/what-is-exif-data
[download]:https://www.facebook.com/help/1701730696756992
