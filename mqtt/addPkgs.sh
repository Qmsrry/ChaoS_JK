#!/bin/zsh
##ShadowSocket
for a in {0..14}
do
    node client_pub.js $a
done