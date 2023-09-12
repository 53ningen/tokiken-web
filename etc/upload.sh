#!/bin/bash

BUCKET=tokikenweb225505-prod
PROFILE=53ningen

for i in `ls | grep .png | grep -v "@"`;
do
    aws s3 cp ${i%.*}.png s3://$BUCKET/public/costumes/${i%-*}/${i%.*}.png --profile $PROFILE
    aws s3 cp ${i%.*}@M.png s3://$BUCKET/public/costumes/${i%-*}/${i%.*}@M.png --profile $PROFILE
    aws s3 cp ${i%.*}@S.png s3://$BUCKET/public/costumes/${i%-*}/${i%.*}@S.png --profile $PROFILE
done
