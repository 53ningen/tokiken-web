#!/bin/bash

for i in `ls | grep .png | grep -v "@"`;
do
    convert -thumbnail 600x600 -quality 70 ${i%.*}.png ${i%.*}@M.png;
    convert -thumbnail 300x300 -quality 70 ${i%.*}.png ${i%.*}@S.png;
done
